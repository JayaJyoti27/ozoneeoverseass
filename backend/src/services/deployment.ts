import { supabase } from "../config/supabase";
import { ConflictError, DatabaseError, NotFoundError } from "../../../src/utils/AppError";

import { CreateDeploymentDto } from "../validators/deploymentSchema";

export async function createDeployment(adminId: string, payload: CreateDeploymentDto) {
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
  Verify Visa
  --------------------------------------------------------------------------
  */

  const { data: visa } = await supabase
    .from("visas")
    .select("id,status")
    .eq("id", payload.visa_id)
    .eq("status", "issued")
    .maybeSingle();

  if (!visa) {
    throw new ConflictError("Visa must be issued before deployment starts.");
  }

  /*
  --------------------------------------------------------------------------
  Existing Deployment
  --------------------------------------------------------------------------
  */

  const { data: existingDeployment } = await supabase
    .from("deployments")
    .select("id,status")
    .eq("application_id", payload.application_id)
    .in("status", [
      "pending",
      "ticket_booked",
      "travel_confirmed",
      "departed",
      "arrived",
      "deployed",
    ])
    .maybeSingle();

  if (existingDeployment) {
    throw new ConflictError("Deployment already exists for this application.");
  }

  /*
  --------------------------------------------------------------------------
  Create Deployment
  --------------------------------------------------------------------------
  */

  const { data: deployment, error } = await supabase
    .from("deployments")
    .insert({
      application_id: payload.application_id,

      candidate_id: payload.candidate_id,

      employer_id: payload.employer_id,

      job_order_id: payload.job_order_id,

      visa_id: payload.visa_id,

      created_by: adminId,

      status: "pending",
    })
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to create deployment.", error);
  }

  /*
  --------------------------------------------------------------------------
  Deployment History
  --------------------------------------------------------------------------
  */

  await supabase.from("deployment_history").insert({
    deployment_id: deployment.id,

    action: "created",

    new_status: "pending",

    remarks: "Deployment initiated.",

    performed_by: adminId,
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: payload.candidate_id,

    title: "Deployment Started",

    message: "Your deployment process has started. Ticket booking will begin shortly.",

    type: "deployment",

    related_entity: "deployment",

    related_entity_id: deployment.id,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (payload.employer_id) {
    await supabase.from("notifications").insert({
      user_id: payload.employer_id,

      title: "Deployment Started",

      message: `${application.candidate.name} is ready for deployment.`,

      type: "deployment",

      related_entity: "deployment",

      related_entity_id: deployment.id,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Deployment Created",

    entity: "deployment",

    entity_id: deployment.id,

    metadata: {
      application_id: payload.application_id,

      visa_id: payload.visa_id,
    },
  });

  return deployment;
}

import { BookTicketDto } from "../validators/deploymentSchema";

export async function bookTicket(deploymentId: string, adminId: string, payload: BookTicketDto) {
  /*
  --------------------------------------------------------------------------
  Fetch Deployment
  --------------------------------------------------------------------------
  */

  const { data: deployment, error } = await supabase
    .from("deployments")
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
    .eq("id", deploymentId)
    .single();

  if (error || !deployment) {
    throw new NotFoundError("Deployment record not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (deployment.status !== "pending") {
    throw new ConflictError("Ticket has already been booked.");
  }

  /*
  --------------------------------------------------------------------------
  Verify Ticket Document
  --------------------------------------------------------------------------
  */

  if (payload.ticket_document_id) {
    const { data: document } = await supabase
      .from("documents")
      .select("id")
      .eq("id", payload.ticket_document_id)
      .maybeSingle();

    if (!document) {
      throw new NotFoundError("Ticket document not found.");
    }
  }

  /*
  --------------------------------------------------------------------------
  Update Deployment
  --------------------------------------------------------------------------
  */

  const { data: updatedDeployment, error: updateError } = await supabase
    .from("deployments")
    .update({
      airline_name: payload.airline_name,

      flight_number: payload.flight_number,

      ticket_number: payload.ticket_number,

      departure_airport: payload.departure_airport,

      arrival_airport: payload.arrival_airport,

      departure_time: payload.departure_time,

      arrival_time: payload.arrival_time,

      ticket_document_id: payload.ticket_document_id ?? null,

      remarks: payload.remarks ?? null,

      status: "ticket_booked",

      updated_at: new Date().toISOString(),
    })
    .eq("id", deploymentId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to book ticket.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Deployment History
  --------------------------------------------------------------------------
  */

  await supabase.from("deployment_history").insert({
    deployment_id: deploymentId,

    action: "ticket_booked",

    old_status: deployment.status,

    new_status: "ticket_booked",

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
      internal_status: "ticket_booking",

      last_status_change: new Date().toISOString(),
    })
    .eq("id", deployment.application.id);

  /*
  --------------------------------------------------------------------------
  Application History
  --------------------------------------------------------------------------
  */

  await supabase.from("application_status_history").insert({
    application_id: deployment.application.id,

    status: "ticket_booking",

    changed_by: adminId,

    remarks: "Flight ticket booked.",
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: deployment.application.candidate_id,

    title: "Flight Ticket Booked",

    message: `Your flight has been booked with ${payload.airline_name}.`,

    type: "deployment",

    related_entity: "deployment",

    related_entity_id: deploymentId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (deployment.application.employer_id) {
    await supabase.from("notifications").insert({
      user_id: deployment.application.employer_id,

      title: "Flight Ticket Booked",

      message: "Candidate ticket has been booked successfully.",

      type: "deployment",

      related_entity: "deployment",

      related_entity_id: deploymentId,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Ticket Booked",

    entity: "deployment",

    entity_id: deploymentId,

    metadata: {
      airline: payload.airline_name,

      flight_number: payload.flight_number,

      ticket_number: payload.ticket_number,
    },
  });

  return updatedDeployment;
}

import { ConfirmTravelDto } from "../validators/deploymentSchema";

export async function confirmTravel(
  deploymentId: string,
  adminId: string,
  payload: ConfirmTravelDto,
) {
  /*
  --------------------------------------------------------------------------
  Fetch Deployment
  --------------------------------------------------------------------------
  */

  const { data: deployment, error } = await supabase
    .from("deployments")
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
    .eq("id", deploymentId)
    .single();

  if (error || !deployment) {
    throw new NotFoundError("Deployment record not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (deployment.status !== "ticket_booked") {
    throw new ConflictError("Travel cannot be confirmed.");
  }

  /*
  --------------------------------------------------------------------------
  Update Deployment
  --------------------------------------------------------------------------
  */

  const { data: updatedDeployment, error: updateError } = await supabase
    .from("deployments")
    .update({
      status: "travel_confirmed",

      remarks: payload.remarks ?? deployment.remarks,

      updated_at: new Date().toISOString(),
    })
    .eq("id", deploymentId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to confirm travel.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Deployment History
  --------------------------------------------------------------------------
  */

  await supabase.from("deployment_history").insert({
    deployment_id: deploymentId,

    action: "travel_confirmed",

    old_status: deployment.status,

    new_status: "travel_confirmed",

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
      internal_status: "travel_confirmed",

      last_status_change: new Date().toISOString(),
    })
    .eq("id", deployment.application.id);

  /*
  --------------------------------------------------------------------------
  Application History
  --------------------------------------------------------------------------
  */

  await supabase.from("application_status_history").insert({
    application_id: deployment.application.id,

    status: "travel_confirmed",

    changed_by: adminId,

    remarks: "Travel confirmed.",
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: deployment.application.candidate_id,

    title: "Travel Confirmed",

    message: "Your travel has been confirmed. Please prepare for departure.",

    type: "deployment",

    related_entity: "deployment",

    related_entity_id: deploymentId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (deployment.application.employer_id) {
    await supabase.from("notifications").insert({
      user_id: deployment.application.employer_id,

      title: "Travel Confirmed",

      message: "Candidate travel has been confirmed.",

      type: "deployment",

      related_entity: "deployment",

      related_entity_id: deploymentId,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Travel Confirmed",

    entity: "deployment",

    entity_id: deploymentId,

    metadata: {
      application_id: deployment.application.id,
    },
  });

  return updatedDeployment;
}

import { DepartDto } from "../validators/deploymentSchema";

export async function departCandidate(deploymentId: string, adminId: string, payload: DepartDto) {
  /*
  --------------------------------------------------------------------------
  Fetch Deployment
  --------------------------------------------------------------------------
  */

  const { data: deployment, error } = await supabase
    .from("deployments")
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
    .eq("id", deploymentId)
    .single();

  if (error || !deployment) {
    throw new NotFoundError("Deployment record not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (deployment.status !== "travel_confirmed") {
    throw new ConflictError("Candidate cannot depart yet.");
  }

  /*
  --------------------------------------------------------------------------
  Update Deployment
  --------------------------------------------------------------------------
  */

  const { data: updatedDeployment, error: updateError } = await supabase
    .from("deployments")
    .update({
      status: "departed",

      remarks: payload.remarks ?? deployment.remarks,

      updated_at: new Date().toISOString(),
    })
    .eq("id", deploymentId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to mark departure.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Deployment History
  --------------------------------------------------------------------------
  */

  await supabase.from("deployment_history").insert({
    deployment_id: deploymentId,

    action: "departed",

    old_status: deployment.status,

    new_status: "departed",

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
      internal_status: "departed",

      last_status_change: new Date().toISOString(),
    })
    .eq("id", deployment.application.id);

  /*
  --------------------------------------------------------------------------
  Application History
  --------------------------------------------------------------------------
  */

  await supabase.from("application_status_history").insert({
    application_id: deployment.application.id,

    status: "departed",

    changed_by: adminId,

    remarks: "Candidate departed.",
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: deployment.application.candidate_id,

    title: "Departure Recorded",

    message: "Your departure has been recorded. Have a safe journey!",

    type: "deployment",

    related_entity: "deployment",

    related_entity_id: deploymentId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (deployment.application.employer_id) {
    await supabase.from("notifications").insert({
      user_id: deployment.application.employer_id,

      title: "Candidate Departed",

      message: "The candidate has departed for the destination country.",

      type: "deployment",

      related_entity: "deployment",

      related_entity_id: deploymentId,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Candidate Departed",

    entity: "deployment",

    entity_id: deploymentId,

    metadata: {
      application_id: deployment.application.id,
    },
  });

  return updatedDeployment;
}

import { ArriveDto } from "../validators/deploymentSchema";

export async function arriveCandidate(deploymentId: string, adminId: string, payload: ArriveDto) {
  /*
  --------------------------------------------------------------------------
  Fetch Deployment
  --------------------------------------------------------------------------
  */

  const { data: deployment, error } = await supabase
    .from("deployments")
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
    .eq("id", deploymentId)
    .single();

  if (error || !deployment) {
    throw new NotFoundError("Deployment record not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (deployment.status !== "departed") {
    throw new ConflictError("Candidate has not departed yet.");
  }

  /*
  --------------------------------------------------------------------------
  Update Deployment
  --------------------------------------------------------------------------
  */

  const { data: updatedDeployment, error: updateError } = await supabase
    .from("deployments")
    .update({
      status: "arrived",

      remarks: payload.remarks ?? deployment.remarks,

      updated_at: new Date().toISOString(),
    })
    .eq("id", deploymentId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to mark arrival.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Deployment History
  --------------------------------------------------------------------------
  */

  await supabase.from("deployment_history").insert({
    deployment_id: deploymentId,

    action: "arrived",

    old_status: deployment.status,

    new_status: "arrived",

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
      internal_status: "arrived",

      last_status_change: new Date().toISOString(),
    })
    .eq("id", deployment.application.id);

  /*
  --------------------------------------------------------------------------
  Application History
  --------------------------------------------------------------------------
  */

  await supabase.from("application_status_history").insert({
    application_id: deployment.application.id,

    status: "arrived",

    changed_by: adminId,

    remarks: "Candidate arrived at destination.",
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: deployment.application.candidate_id,

    title: "Arrival Confirmed",

    message: "Welcome! Your arrival has been confirmed.",

    type: "deployment",

    related_entity: "deployment",

    related_entity_id: deploymentId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (deployment.application.employer_id) {
    await supabase.from("notifications").insert({
      user_id: deployment.application.employer_id,

      title: "Candidate Arrived",

      message: "The candidate has arrived at the destination country.",

      type: "deployment",

      related_entity: "deployment",

      related_entity_id: deploymentId,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Candidate Arrived",

    entity: "deployment",

    entity_id: deploymentId,

    metadata: {
      application_id: deployment.application.id,
    },
  });

  return updatedDeployment;
}

import { CompleteDeploymentDto } from "../validators/deploymentSchema";

export async function completeDeployment(
  deploymentId: string,
  adminId: string,
  payload: CompleteDeploymentDto,
) {
  /*
  --------------------------------------------------------------------------
  Fetch Deployment
  --------------------------------------------------------------------------
  */

  const { data: deployment, error } = await supabase
    .from("deployments")
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
    .eq("id", deploymentId)
    .single();

  if (error || !deployment) {
    throw new NotFoundError("Deployment record not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (deployment.status !== "arrived") {
    throw new ConflictError("Candidate must arrive before deployment can be completed.");
  }

  /*
  --------------------------------------------------------------------------
  Complete Deployment
  --------------------------------------------------------------------------
  */

  const { data: updatedDeployment, error: updateError } = await supabase
    .from("deployments")
    .update({
      status: "deployed",

      remarks: payload.remarks ?? deployment.remarks,

      updated_at: new Date().toISOString(),
    })
    .eq("id", deploymentId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to complete deployment.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Deployment History
  --------------------------------------------------------------------------
  */

  await supabase.from("deployment_history").insert({
    deployment_id: deploymentId,

    action: "deployment_completed",

    old_status: deployment.status,

    new_status: "deployed",

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
      internal_status: "deployed",

      last_status_change: new Date().toISOString(),
    })
    .eq("id", deployment.application.id);

  /*
  --------------------------------------------------------------------------
  Application History
  --------------------------------------------------------------------------
  */

  await supabase.from("application_status_history").insert({
    application_id: deployment.application.id,

    status: "deployed",

    changed_by: adminId,

    remarks: "Candidate successfully deployed.",
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: deployment.application.candidate_id,

    title: "Deployment Completed",

    message: "Congratulations! Your overseas deployment has been completed successfully.",

    type: "deployment",

    related_entity: "deployment",

    related_entity_id: deploymentId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (deployment.application.employer_id) {
    await supabase.from("notifications").insert({
      user_id: deployment.application.employer_id,

      title: "Candidate Deployed",

      message: "The candidate has successfully joined and deployment is complete.",

      type: "deployment",

      related_entity: "deployment",

      related_entity_id: deploymentId,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Deployment Completed",

    entity: "deployment",

    entity_id: deploymentId,

    metadata: {
      application_id: deployment.application.id,
    },
  });

  return updatedDeployment;
}

import { CancelDeploymentDto } from "../validators/deploymentSchema";

export async function cancelDeployment(
  deploymentId: string,
  adminId: string,
  payload: CancelDeploymentDto,
) {
  /*
  --------------------------------------------------------------------------
  Fetch Deployment
  --------------------------------------------------------------------------
  */

  const { data: deployment, error } = await supabase
    .from("deployments")
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
    .eq("id", deploymentId)
    .single();

  if (error || !deployment) {
    throw new NotFoundError("Deployment record not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (deployment.status === "cancelled" || deployment.status === "deployed") {
    throw new ConflictError("Deployment cannot be cancelled.");
  }

  /*
  --------------------------------------------------------------------------
  Cancel Deployment
  --------------------------------------------------------------------------
  */

  const { data: updatedDeployment, error: updateError } = await supabase
    .from("deployments")
    .update({
      status: "cancelled",

      remarks: payload.reason,

      updated_at: new Date().toISOString(),
    })
    .eq("id", deploymentId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to cancel deployment.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Deployment History
  --------------------------------------------------------------------------
  */

  await supabase.from("deployment_history").insert({
    deployment_id: deploymentId,

    action: "cancelled",

    old_status: deployment.status,

    new_status: "cancelled",

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
      internal_status: "visa_approved",

      last_status_change: new Date().toISOString(),
    })
    .eq("id", deployment.application.id);

  /*
  --------------------------------------------------------------------------
  Application History
  --------------------------------------------------------------------------
  */

  await supabase.from("application_status_history").insert({
    application_id: deployment.application.id,

    status: "visa_approved",

    changed_by: adminId,

    remarks: payload.reason,
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: deployment.application.candidate_id,

    title: "Deployment Cancelled",

    message: "Your deployment has been cancelled. Please contact your coordinator.",

    type: "deployment",

    related_entity: "deployment",

    related_entity_id: deploymentId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (deployment.application.employer_id) {
    await supabase.from("notifications").insert({
      user_id: deployment.application.employer_id,

      title: "Deployment Cancelled",

      message: "Candidate deployment has been cancelled.",

      type: "deployment",

      related_entity: "deployment",

      related_entity_id: deploymentId,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Deployment Cancelled",

    entity: "deployment",

    entity_id: deploymentId,

    metadata: {
      application_id: deployment.application.id,

      reason: payload.reason,
    },
  });

  return updatedDeployment;
}

export async function getDeployment(deploymentId: string) {
  const { data, error } = await supabase
    .from("deployments")
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

      visa:visas(
        id,
        visa_number,
        status,
        expiry_date
      ),

      ticket_document:documents(
        id,
        public_url,
        document_type
      )
    `,
    )
    .eq("id", deploymentId)
    .single();

  if (error || !data) {
    throw new NotFoundError("Deployment record not found.");
  }

  const { data: history } = await supabase
    .from("deployment_history")
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
    .eq("deployment_id", deploymentId)
    .order("created_at", {
      ascending: false,
    });

  return {
    ...data,
    history: history ?? [],
  };
}

interface ListDeploymentFilters {
  page?: number;

  limit?: number;

  applicationId?: string;

  candidateId?: string;

  employerId?: string;

  jobOrderId?: string;

  status?: string;
}

export async function listDeployments(filters: ListDeploymentFilters = {}) {
  const page = filters.page ?? 1;

  const limit = filters.limit ?? 20;

  let query = supabase.from("deployments").select(
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
      ),

      visa:visas(
        id,
        visa_number,
        status
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
