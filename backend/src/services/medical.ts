import { supabase } from "../config/supabase";
import { ConflictError, DatabaseError, NotFoundError } from "../utils/AppError";

import { CreateMedicalDto } from "../validators/medicalSchema";

export async function createMedical(adminId: string, payload: CreateMedicalDto) {
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
  Candidate Validation
  --------------------------------------------------------------------------
  */

  if (application.candidate_id !== payload.candidate_id) {
    throw new ConflictError("Candidate does not belong to this application.");
  }

  /*
  --------------------------------------------------------------------------
  Check Existing Active Medical
  --------------------------------------------------------------------------
  */

  const { data: existingMedical } = await supabase
    .from("medicals")
    .select("id,status")
    .eq("application_id", payload.application_id)
    .in("status", ["pending", "scheduled", "completed", "fit", "retest_required"])
    .maybeSingle();

  if (existingMedical) {
    throw new ConflictError("Medical record already exists.");
  }

  /*
  --------------------------------------------------------------------------
  Create Medical Record
  --------------------------------------------------------------------------
  */

  const { data: medical, error } = await supabase
    .from("medicals")
    .insert({
      application_id: payload.application_id,

      candidate_id: payload.candidate_id,

      employer_id: payload.employer_id,

      job_order_id: payload.job_order_id,

      scheduled_by: adminId,

      status: "pending",
    })
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to create medical record.", error);
  }

  /*
  --------------------------------------------------------------------------
  Medical History
  --------------------------------------------------------------------------
  */

  await supabase.from("medical_history").insert({
    medical_id: medical.id,

    action: "created",

    new_status: "pending",

    remarks: "Medical process initiated.",

    performed_by: adminId,
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: payload.candidate_id,

    title: "Medical Process Started",

    message: "Your medical verification process has started.",

    type: "medical",

    related_entity: "medical",

    related_entity_id: medical.id,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (payload.employer_id) {
    await supabase.from("notifications").insert({
      user_id: payload.employer_id,

      title: "Medical Created",

      message: `${application.candidate.name} has entered medical verification.`,

      type: "medical",

      related_entity: "medical",

      related_entity_id: medical.id,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Medical Created",

    entity: "medical",

    entity_id: medical.id,

    metadata: {
      application_id: payload.application_id,
    },
  });

  return medical;
}

import { ScheduleMedicalDto } from "../validators/medicalSchema";

export async function scheduleMedical(
  medicalId: string,
  adminId: string,
  payload: ScheduleMedicalDto,
) {
  /*
  --------------------------------------------------------------------------
  Fetch Medical
  --------------------------------------------------------------------------
  */

  const { data: medical, error } = await supabase
    .from("medicals")
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
    .eq("id", medicalId)
    .single();

  if (error || !medical) {
    throw new NotFoundError("Medical record not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (medical.status !== "pending" && medical.status !== "retest_required") {
    throw new ConflictError("Medical cannot be scheduled.");
  }

  /*
  --------------------------------------------------------------------------
  Update Medical
  --------------------------------------------------------------------------
  */

  const { data: updatedMedical, error: updateError } = await supabase
    .from("medicals")
    .update({
      hospital_name: payload.hospital_name,

      doctor_name: payload.doctor_name,

      appointment_date: payload.appointment_date,

      remarks: payload.remarks ?? null,

      status: "scheduled",

      updated_at: new Date().toISOString(),
    })
    .eq("id", medicalId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to schedule medical.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Medical History
  --------------------------------------------------------------------------
  */

  await supabase.from("medical_history").insert({
    medical_id: medicalId,

    action: "scheduled",

    old_status: medical.status,

    new_status: "scheduled",

    remarks: payload.remarks,

    performed_by: adminId,
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: medical.application.candidate_id,

    title: "Medical Scheduled",

    message: `Your medical has been scheduled on ${new Date(payload.appointment_date).toLocaleDateString()}.`,

    type: "medical",

    related_entity: "medical",

    related_entity_id: medicalId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (medical.application.employer_id) {
    await supabase.from("notifications").insert({
      user_id: medical.application.employer_id,

      title: "Medical Scheduled",

      message: "Candidate medical appointment has been scheduled.",

      type: "medical",

      related_entity: "medical",

      related_entity_id: medicalId,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Medical Scheduled",

    entity: "medical",

    entity_id: medicalId,

    metadata: {
      hospital: payload.hospital_name,

      doctor: payload.doctor_name,

      appointment: payload.appointment_date,
    },
  });

  return updatedMedical;
}

import { UploadMedicalReportDto } from "../validators/medicalSchema";

export async function uploadMedicalReport(
  medicalId: string,
  adminId: string,
  payload: UploadMedicalReportDto,
) {
  /*
  --------------------------------------------------------------------------
  Fetch Medical
  --------------------------------------------------------------------------
  */

  const { data: medical, error } = await supabase
    .from("medicals")
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
    .eq("id", medicalId)
    .single();

  if (error || !medical) {
    throw new NotFoundError("Medical record not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (medical.status !== "scheduled") {
    throw new ConflictError("Medical report can only be uploaded after scheduling.");
  }

  /*
  --------------------------------------------------------------------------
  Verify Document
  --------------------------------------------------------------------------
  */

  const { data: report } = await supabase
    .from("documents")
    .select("id,status")
    .eq("id", payload.report_document_id)
    .single();

  if (!report) {
    throw new NotFoundError("Medical report document not found.");
  }

  /*
  --------------------------------------------------------------------------
  Update Medical
  --------------------------------------------------------------------------
  */

  const { data: updatedMedical, error: updateError } = await supabase
    .from("medicals")
    .update({
      report_document_id: payload.report_document_id,

      status: "completed",

      updated_at: new Date().toISOString(),
    })
    .eq("id", medicalId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to upload medical report.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Medical History
  --------------------------------------------------------------------------
  */

  await supabase.from("medical_history").insert({
    medical_id: medicalId,

    action: "report_uploaded",

    old_status: medical.status,

    new_status: "completed",

    remarks: "Medical report uploaded.",

    performed_by: adminId,
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: medical.application.candidate_id,

    title: "Medical Report Uploaded",

    message: "Your medical report has been uploaded successfully.",

    type: "medical",

    related_entity: "medical",

    related_entity_id: medicalId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (medical.application.employer_id) {
    await supabase.from("notifications").insert({
      user_id: medical.application.employer_id,

      title: "Medical Report Uploaded",

      message: "Candidate medical report has been uploaded.",

      type: "medical",

      related_entity: "medical",

      related_entity_id: medicalId,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Medical Report Uploaded",

    entity: "medical",

    entity_id: medicalId,

    metadata: {
      report_document_id: payload.report_document_id,
    },
  });

  return updatedMedical;
}

import { ApproveMedicalDto } from "../validators/medicalSchema";

export async function approveMedical(
  medicalId: string,
  adminId: string,
  payload: ApproveMedicalDto,
) {
  /*
  --------------------------------------------------------------------------
  Fetch Medical
  --------------------------------------------------------------------------
  */

  const { data: medical, error } = await supabase
    .from("medicals")
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
    .eq("id", medicalId)
    .single();

  if (error || !medical) {
    throw new NotFoundError("Medical record not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (medical.status !== "completed") {
    throw new ConflictError("Only completed medicals can be approved.");
  }

  /*
  --------------------------------------------------------------------------
  Update Medical
  --------------------------------------------------------------------------
  */

  const { data: updatedMedical, error: updateError } = await supabase
    .from("medicals")
    .update({
      status: "fit",

      expiry_date: payload.expiry_date,

      remarks: payload.remarks ?? null,

      verified_by: adminId,

      verified_at: new Date().toISOString(),

      updated_at: new Date().toISOString(),
    })
    .eq("id", medicalId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to approve medical.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Medical History
  --------------------------------------------------------------------------
  */

  await supabase.from("medical_history").insert({
    medical_id: medicalId,

    action: "approved",

    old_status: medical.status,

    new_status: "fit",

    remarks: payload.remarks,

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
    .eq("id", medical.application.id);

  /*
  --------------------------------------------------------------------------
  Application History
  --------------------------------------------------------------------------
  */

  await supabase.from("application_status_history").insert({
    application_id: medical.application.id,

    status: "visa_processing",

    changed_by: adminId,

    remarks: "Medical cleared.",
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: medical.application.candidate_id,

    title: "Medical Approved",

    message: "Congratulations! Your medical examination has been approved.",

    type: "medical",

    related_entity: "medical",

    related_entity_id: medicalId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (medical.application.employer_id) {
    await supabase.from("notifications").insert({
      user_id: medical.application.employer_id,

      title: "Medical Cleared",

      message: "Candidate has successfully cleared the medical examination.",

      type: "medical",

      related_entity: "medical",

      related_entity_id: medicalId,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Medical Approved",

    entity: "medical",

    entity_id: medicalId,

    metadata: {
      application_id: medical.application.id,

      expiry_date: payload.expiry_date,
    },
  });

  return updatedMedical;
}

import { RejectMedicalDto } from "../validators/medicalSchema";

export async function rejectMedical(medicalId: string, adminId: string, payload: RejectMedicalDto) {
  /*
  --------------------------------------------------------------------------
  Fetch Medical
  --------------------------------------------------------------------------
  */

  const { data: medical, error } = await supabase
    .from("medicals")
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
    .eq("id", medicalId)
    .single();

  if (error || !medical) {
    throw new NotFoundError("Medical record not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (medical.status !== "completed") {
    throw new ConflictError("Only completed medicals can be rejected.");
  }

  /*
  --------------------------------------------------------------------------
  Reject Medical
  --------------------------------------------------------------------------
  */

  const { data: updatedMedical, error: updateError } = await supabase
    .from("medicals")
    .update({
      status: "retest_required",

      remarks: payload.reason,

      verified_by: adminId,

      verified_at: new Date().toISOString(),

      updated_at: new Date().toISOString(),
    })
    .eq("id", medicalId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to reject medical.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Medical History
  --------------------------------------------------------------------------
  */

  await supabase.from("medical_history").insert({
    medical_id: medicalId,

    action: "retest_required",

    old_status: medical.status,

    new_status: "retest_required",

    remarks: payload.reason,

    performed_by: adminId,
  });

  /*
  --------------------------------------------------------------------------
  Application Status
  --------------------------------------------------------------------------
  */

  await supabase
    .from("applications")
    .update({
      internal_status: "medical",

      last_status_change: new Date().toISOString(),
    })
    .eq("id", medical.application.id);

  /*
  --------------------------------------------------------------------------
  Application History
  --------------------------------------------------------------------------
  */

  await supabase.from("application_status_history").insert({
    application_id: medical.application.id,

    status: "medical",

    changed_by: adminId,

    remarks: payload.reason,
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: medical.application.candidate_id,

    title: "Medical Re-test Required",

    message: "Your medical examination requires a re-test. Please contact the recruitment team.",

    type: "medical",

    related_entity: "medical",

    related_entity_id: medicalId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (medical.application.employer_id) {
    await supabase.from("notifications").insert({
      user_id: medical.application.employer_id,

      title: "Medical Re-test Required",

      message: "Candidate requires another medical examination.",

      type: "medical",

      related_entity: "medical",

      related_entity_id: medicalId,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Medical Rejected",

    entity: "medical",

    entity_id: medicalId,

    metadata: {
      application_id: medical.application.id,

      reason: payload.reason,
    },
  });

  return updatedMedical;
}

export async function getMedical(medicalId: string) {
  const { data, error } = await supabase
    .from("medicals")
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
      ),

      report:documents(
        id,
        public_url,
        document_type,
        status
      )
    `,
    )
    .eq("id", medicalId)
    .single();

  if (error || !data) {
    throw new NotFoundError("Medical record not found.");
  }

  const { data: history } = await supabase
    .from("medical_history")
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
    .eq("medical_id", medicalId)
    .order("created_at", {
      ascending: false,
    });

  return {
    ...data,
    history: history ?? [],
  };
}

interface ListMedicalFilters {
  page?: number;
  limit?: number;

  candidateId?: string;

  employerId?: string;

  applicationId?: string;

  jobOrderId?: string;

  status?: string;
}

export async function listMedicals(filters: ListMedicalFilters = {}) {
  const page = filters.page ?? 1;

  const limit = filters.limit ?? 20;

  let query = supabase.from("medicals").select(
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
