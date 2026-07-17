import { supabase } from "../config/supabase";
import { ConflictError, DatabaseError, NotFoundError } from "../utils/AppError";

import { CreateVisaDto } from "../validators/visaSchema";

export async function createVisa(adminId: string, payload: CreateVisaDto) {
  /*
  --------------------------------------------------------------------------
  Verify Application
  --------------------------------------------------------------------------
  */

  const { data: application, error: applicationError } = await supabase
    .from("applications")
    .select(
      `
        *,
        candidate:candidates(
          id,
          name,
          email
        ),
        employer:employers(
          id,
          company_name
        )
      `,
    )
    .eq("id", payload.application_id)
    .single();

  if (applicationError || !application) {
    throw new NotFoundError("Application not found.");
  }

  /*
  --------------------------------------------------------------------------
  Verify Candidate
  --------------------------------------------------------------------------
  */

  if (application.candidate_id !== payload.candidate_id) {
    throw new ConflictError("Candidate does not belong to this application.");
  }

  /*
  --------------------------------------------------------------------------
  Medical Clearance
  --------------------------------------------------------------------------
  */

  const { data: medical } = await supabase
    .from("medicals")
    .select("id,status")
    .eq("application_id", payload.application_id)
    .eq("status", "fit")
    .maybeSingle();

  if (!medical) {
    throw new ConflictError("Medical clearance is required before creating a visa case.");
  }

  /*
  --------------------------------------------------------------------------
  Existing Visa
  --------------------------------------------------------------------------
  */

  const { data: existingVisa } = await supabase
    .from("visas")
    .select("id,status")
    .eq("application_id", payload.application_id)
    .in("status", ["pending", "submitted", "under_review", "approved", "issued"])
    .maybeSingle();

  if (existingVisa) {
    throw new ConflictError("An active visa record already exists.");
  }

  /*
  --------------------------------------------------------------------------
  Create Visa
  --------------------------------------------------------------------------
  */

  const { data: visa, error } = await supabase
    .from("visas")
    .insert({
      application_id: payload.application_id,

      candidate_id: payload.candidate_id,

      employer_id: payload.employer_id,

      job_order_id: payload.job_order_id,

      created_by: adminId,

      status: "pending",
    })
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to create visa record.", error);
  }

  /*
  --------------------------------------------------------------------------
  Visa History
  --------------------------------------------------------------------------
  */

  await supabase.from("visa_history").insert({
    visa_id: visa.id,

    action: "created",

    new_status: "pending",

    remarks: "Visa process initiated.",

    performed_by: adminId,
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: payload.candidate_id,

    title: "Visa Process Started",

    message: "Your visa application process has started.",

    type: "visa",

    related_entity: "visa",

    related_entity_id: visa.id,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (payload.employer_id) {
    await supabase.from("notifications").insert({
      user_id: payload.employer_id,

      title: "Visa Process Started",

      message: `${application.candidate.name} has entered visa processing.`,

      type: "visa",

      related_entity: "visa",

      related_entity_id: visa.id,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Visa Created",

    entity: "visa",

    entity_id: visa.id,

    metadata: {
      application_id: payload.application_id,
    },
  });

  return visa;
}

import { SubmitVisaDto } from "../validators/visaSchema";
import { ApproveVisaDto } from "../validators/visaSchema";

export async function approveVisa(visaId: string, adminId: string, payload: ApproveVisaDto) {
  /*
  --------------------------------------------------------------------------
  Fetch Visa
  --------------------------------------------------------------------------
  */

  const { data: visa, error } = await supabase
    .from("visas")
    .select(
      `
      *,
      application:applications(
        id,
        candidate_id,
        employer_id,
        internal_status
      )
    `,
    )
    .eq("id", visaId)
    .single();

  if (error || !visa) {
    throw new NotFoundError("Visa record not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (visa.status !== "submitted" && visa.status !== "under_review") {
    throw new ConflictError("Visa cannot be approved.");
  }

  /*
  --------------------------------------------------------------------------
  Approve Visa
  --------------------------------------------------------------------------
  */

  const { data: updatedVisa, error: updateError } = await supabase
    .from("visas")
    .update({
      status: "approved",

      remarks: payload.remarks ?? null,

      verified_by: adminId,

      updated_at: new Date().toISOString(),
    })
    .eq("id", visaId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to approve visa.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Visa History
  --------------------------------------------------------------------------
  */

  await supabase.from("visa_history").insert({
    visa_id: visaId,

    action: "approved",

    old_status: visa.status,

    new_status: "approved",

    remarks: payload.remarks,

    performed_by: adminId,
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: visa.application.candidate_id,

    title: "Visa Approved",

    message: "Your visa application has been approved.",

    type: "visa",

    related_entity: "visa",

    related_entity_id: visaId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (visa.application.employer_id) {
    await supabase.from("notifications").insert({
      user_id: visa.application.employer_id,

      title: "Visa Approved",

      message: "Candidate's visa application has been approved.",

      type: "visa",

      related_entity: "visa",

      related_entity_id: visaId,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Visa Approved",

    entity: "visa",

    entity_id: visaId,

    metadata: {
      application_id: visa.application.id,
    },
  });

  return updatedVisa;
}
export async function submitVisa(visaId: string, adminId: string, payload: SubmitVisaDto) {
  /*
  --------------------------------------------------------------------------
  Fetch Visa
  --------------------------------------------------------------------------
  */

  const { data: visa, error } = await supabase
    .from("visas")
    .select(
      `
      *,
      application:applications(
        id,
        candidate_id,
        employer_id
      )
    `,
    )
    .eq("id", visaId)
    .single();

  if (error || !visa) {
    throw new NotFoundError("Visa record not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (visa.status !== "pending") {
    throw new ConflictError("Visa application has already been submitted.");
  }

  /*
  --------------------------------------------------------------------------
  Submit Visa
  --------------------------------------------------------------------------
  */

  const { data: updatedVisa, error: updateError } = await supabase
    .from("visas")
    .update({
      embassy_name: payload.embassy_name,

      passport_number: payload.passport_number,

      submission_date: payload.submission_date,

      remarks: payload.remarks ?? null,

      status: "submitted",

      updated_at: new Date().toISOString(),
    })
    .eq("id", visaId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to submit visa.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Visa History
  --------------------------------------------------------------------------
  */

  await supabase.from("visa_history").insert({
    visa_id: visaId,

    action: "submitted",

    old_status: visa.status,

    new_status: "submitted",

    remarks: payload.remarks,

    performed_by: adminId,
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: visa.application.candidate_id,

    title: "Visa Submitted",

    message: "Your visa application has been submitted to the embassy.",

    type: "visa",

    related_entity: "visa",

    related_entity_id: visaId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (visa.application.employer_id) {
    await supabase.from("notifications").insert({
      user_id: visa.application.employer_id,

      title: "Visa Submitted",

      message: "Candidate's visa application has been submitted.",

      type: "visa",

      related_entity: "visa",

      related_entity_id: visaId,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Visa Submitted",

    entity: "visa",

    entity_id: visaId,

    metadata: {
      embassy: payload.embassy_name,

      passport_number: payload.passport_number,

      submission_date: payload.submission_date,
    },
  });

  return updatedVisa;
}

import { RejectVisaDto } from "../validators/visaSchema";

export async function rejectVisa(visaId: string, adminId: string, payload: RejectVisaDto) {
  /*
  --------------------------------------------------------------------------
  Fetch Visa
  --------------------------------------------------------------------------
  */

  const { data: visa, error } = await supabase
    .from("visas")
    .select(
      `
      *,
      application:applications(
        id,
        candidate_id,
        employer_id,
        internal_status
      )
    `,
    )
    .eq("id", visaId)
    .single();

  if (error || !visa) {
    throw new NotFoundError("Visa record not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (visa.status !== "submitted" && visa.status !== "under_review") {
    throw new ConflictError("Visa cannot be rejected.");
  }

  /*
  --------------------------------------------------------------------------
  Reject Visa
  --------------------------------------------------------------------------
  */

  const { data: updatedVisa, error: updateError } = await supabase
    .from("visas")
    .update({
      status: "rejected",

      remarks: payload.reason,

      verified_by: adminId,

      updated_at: new Date().toISOString(),
    })
    .eq("id", visaId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to reject visa.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Visa History
  --------------------------------------------------------------------------
  */

  await supabase.from("visa_history").insert({
    visa_id: visaId,

    action: "rejected",

    old_status: visa.status,

    new_status: "rejected",

    remarks: payload.reason,

    performed_by: adminId,
  });

  /*
  --------------------------------------------------------------------------
  Update Application
  --------------------------------------------------------------------------
  */

  await supabase
    .from("applications")
    .update({
      internal_status: "visa_processing",

      last_status_change: new Date().toISOString(),
    })
    .eq("id", visa.application.id);

  /*
  --------------------------------------------------------------------------
  Application History
  --------------------------------------------------------------------------
  */

  await supabase.from("application_status_history").insert({
    application_id: visa.application.id,

    status: "visa_processing",

    changed_by: adminId,

    remarks: payload.reason,
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: visa.application.candidate_id,

    title: "Visa Rejected",

    message:
      "Unfortunately, your visa application was rejected. Please contact your recruitment coordinator.",

    type: "visa",

    related_entity: "visa",

    related_entity_id: visaId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (visa.application.employer_id) {
    await supabase.from("notifications").insert({
      user_id: visa.application.employer_id,

      title: "Visa Rejected",

      message: "Candidate's visa application has been rejected.",

      type: "visa",

      related_entity: "visa",

      related_entity_id: visaId,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Visa Rejected",

    entity: "visa",

    entity_id: visaId,

    metadata: {
      application_id: visa.application.id,

      reason: payload.reason,
    },
  });

  return updatedVisa;
}

import { IssueVisaDto } from "../validators/visaSchema";

export async function issueVisa(visaId: string, adminId: string, payload: IssueVisaDto) {
  /*
  --------------------------------------------------------------------------
  Fetch Visa
  --------------------------------------------------------------------------
  */

  const { data: visa, error } = await supabase
    .from("visas")
    .select(
      `
      *,
      application:applications(
        id,
        candidate_id,
        employer_id,
        internal_status
      )
    `,
    )
    .eq("id", visaId)
    .single();

  if (error || !visa) {
    throw new NotFoundError("Visa record not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (visa.status !== "approved") {
    throw new ConflictError("Only approved visas can be issued.");
  }

  /*
  --------------------------------------------------------------------------
  Issue Visa
  --------------------------------------------------------------------------
  */

  const { data: updatedVisa, error: updateError } = await supabase
    .from("visas")
    .update({
      issue_date: payload.issue_date,

      status: "issued",

      updated_at: new Date().toISOString(),
    })
    .eq("id", visaId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to issue visa.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Visa History
  --------------------------------------------------------------------------
  */

  await supabase.from("visa_history").insert({
    visa_id: visaId,

    action: "issued",

    old_status: visa.status,

    new_status: "issued",

    remarks: "Visa issued successfully.",

    performed_by: adminId,
  });

  /*
  --------------------------------------------------------------------------
  Update Application
  --------------------------------------------------------------------------
  */

  await supabase
    .from("applications")
    .update({
      internal_status: "ticket_booking",

      last_status_change: new Date().toISOString(),
    })
    .eq("id", visa.application.id);

  /*
  --------------------------------------------------------------------------
  Application History
  --------------------------------------------------------------------------
  */

  await supabase.from("application_status_history").insert({
    application_id: visa.application.id,

    status: "ticket_booking",

    changed_by: adminId,

    remarks: "Visa issued successfully.",
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: visa.application.candidate_id,

    title: "Visa Issued",

    message: "Congratulations! Your visa has been issued. Ticket booking will begin shortly.",

    type: "visa",

    related_entity: "visa",

    related_entity_id: visaId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (visa.application.employer_id) {
    await supabase.from("notifications").insert({
      user_id: visa.application.employer_id,

      title: "Visa Issued",

      message: "Candidate visa has been issued successfully.",

      type: "visa",

      related_entity: "visa",

      related_entity_id: visaId,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Visa Issued",

    entity: "visa",

    entity_id: visaId,

    metadata: {
      application_id: visa.application.id,

      issue_date: payload.issue_date,
    },
  });

  return updatedVisa;
}

export async function getVisa(visaId: string) {
  const { data, error } = await supabase
    .from("visas")
    .select(
      `
      *,

      candidate:candidates(
        id,
        name,
        email,
        phone,
        nationality
      ),

      employer:employers(
        id,
        company_name
      ),

      application:applications(
        id,
        internal_status
      ),

      job_order:job_orders(
        id,
        title
      )
    `,
    )
    .eq("id", visaId)
    .single();

  if (error || !data) {
    throw new NotFoundError("Visa record not found.");
  }

  const { data: history } = await supabase
    .from("visa_history")
    .select(
      `
        id,
        action,
        old_status,
        new_status,
        remarks,
        performed_by,
        created_at
      `,
    )
    .eq("visa_id", visaId)
    .order("created_at", {
      ascending: false,
    });

  return {
    ...data,
    history: history ?? [],
  };
}

interface ListVisaFilters {
  page?: number;

  limit?: number;

  applicationId?: string;

  candidateId?: string;

  employerId?: string;

  jobOrderId?: string;

  status?: string;
}

export async function listVisas(filters: ListVisaFilters = {}) {
  const page = filters.page ?? 1;

  const limit = filters.limit ?? 20;

  let query = supabase.from("visas").select(
    `
      *,

      candidate:candidates(
        id,
        name
      ),

      employer:employers(
        id,
        company_name
      ),

      application:applications(
        id,
        internal_status
      ),

      job_order:job_orders(
        id,
        title
      )
      `,
    {
      count: "exact",
    },
  );

  if (filters.applicationId) {
    query = query.eq("application_id", filters.applicationId);
  }

  if (filters.candidateId) {
    query = query.eq("candidate_id", filters.candidateId);
  }

  if (filters.employerId) {
    query = query.eq("employer_id", filters.employerId);
  }

  if (filters.jobOrderId) {
    query = query.eq("job_order_id", filters.jobOrderId);
  }

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  query = query
    .order("created_at", {
      ascending: false,
    })
    .range((page - 1) * limit, page * limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return {
    data,

    pagination: {
      page,

      limit,

      total: count ?? 0,

      totalPages: Math.ceil((count ?? 0) / limit),
    },
  };
}
