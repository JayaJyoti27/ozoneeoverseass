import { supabase } from "../config/supabase";
import { ConflictError, DatabaseError, NotFoundError } from "../../../src/utils/AppError";

interface CreateInterviewDto {
  application_id: string;
  job_order_id: string;
  interview_date: Date;
  mode: "online" | "offline" | "phone";
  meeting_link?: string;
  location?: string;
  interviewer_name: string;
  interviewer_email: string;
  interviewer_phone?: string;
  notes?: string;
}

export async function createInterview(adminId: string, payload: CreateInterviewDto) {
  /*
  --------------------------------------------------------------------------
  Validate Application
  --------------------------------------------------------------------------
  */

  const { data: application, error: appError } = await supabase
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
      ),
      job:jobs(
        id,
        title
      )
    `,
    )
    .eq("id", payload.application_id)
    .single();

  if (appError || !application) {
    throw new NotFoundError("Application not found.");
  }

  /*
  --------------------------------------------------------------------------
  Prevent Duplicate Interview
  --------------------------------------------------------------------------
  */

  const { data: existingInterview } = await supabase
    .from("interviews")
    .select("id,status")
    .eq("application_id", payload.application_id)
    .in("status", ["scheduled", "rescheduled"])
    .maybeSingle();

  if (existingInterview) {
    throw new ConflictError("An active interview already exists for this application.");
  }

  /*
  --------------------------------------------------------------------------
  Create Interview
  --------------------------------------------------------------------------
  */

  const { data: interview, error } = await supabase
    .from("interviews")
    .insert({
      application_id: payload.application_id,
      job_order_id: payload.job_order_id,
      scheduled_by: adminId,
      interview_date: payload.interview_date,
      mode: payload.mode,
      meeting_link: payload.meeting_link ?? null,
      location: payload.location ?? null,
      interviewer_name: payload.interviewer_name,
      interviewer_email: payload.interviewer_email,
      interviewer_phone: payload.interviewer_phone ?? null,
      notes: payload.notes ?? null,
      status: "scheduled",
    })
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to create interview.", error);
  }

  /*
  --------------------------------------------------------------------------
  Update Application Status
  --------------------------------------------------------------------------
  */

  await supabase
    .from("applications")
    .update({
      internal_status: "interview_scheduled",
      last_status_change: new Date().toISOString(),
    })
    .eq("id", payload.application_id);

  /*
  --------------------------------------------------------------------------
  Status History
  --------------------------------------------------------------------------
  */

  await supabase.from("application_status_history").insert({
    application_id: payload.application_id,
    status: "interview_scheduled",
    changed_by: adminId,
    remarks: "Interview scheduled.",
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: application.candidate.id,
    title: "Interview Scheduled",
    message: `Your interview for "${application.job.title}" has been scheduled.`,
    type: "interview",
    related_entity: "interview",
    related_entity_id: interview.id,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: application.employer.id,
    title: "Interview Scheduled",
    message: `Interview scheduled for ${application.candidate.name}.`,
    type: "interview",
    related_entity: "interview",
    related_entity_id: interview.id,
  });

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,
    action: "Interview Scheduled",
    entity: "interview",
    entity_id: interview.id,
    metadata: {
      application_id: payload.application_id,
      interview_date: payload.interview_date,
      mode: payload.mode,
    },
  });

  /*
  --------------------------------------------------------------------------
  Return Complete Interview
  --------------------------------------------------------------------------
  */

  const { data: result } = await supabase
    .from("interviews")
    .select(
      `
      *,
      application:applications(
        id,
        internal_status
      )
    `,
    )
    .eq("id", interview.id)
    .single();

  return result;
}

interface RescheduleInterviewDto {
  interview_date: Date;
  mode?: "online" | "offline" | "phone";
  meeting_link?: string;
  location?: string;
  notes?: string;
}

export async function rescheduleInterview(
  interviewId: string,
  adminId: string,
  payload: RescheduleInterviewDto,
) {
  /*
  --------------------------------------------------------------------------
  Fetch Interview
  --------------------------------------------------------------------------
  */

  const { data: interview, error } = await supabase
    .from("interviews")
    .select(
      `
      *,
      application:applications(
        id,
        candidate_id,
        employer_id,
        job:jobs(
          title
        ),
        candidate:candidates(
          name
        )
      )
    `,
    )
    .eq("id", interviewId)
    .single();

  if (error || !interview) {
    throw new NotFoundError("Interview not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (interview.status === "completed" || interview.status === "cancelled") {
    throw new ConflictError("Completed or cancelled interviews cannot be rescheduled.");
  }

  /*
  --------------------------------------------------------------------------
  Update Interview
  --------------------------------------------------------------------------
  */

  const { data: updated, error: updateError } = await supabase
    .from("interviews")
    .update({
      interview_date: payload.interview_date,
      mode: payload.mode ?? interview.mode,
      meeting_link: payload.meeting_link ?? interview.meeting_link,
      location: payload.location ?? interview.location,
      notes: payload.notes ?? interview.notes,
      status: "rescheduled",
      updated_at: new Date().toISOString(),
    })
    .eq("id", interviewId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to reschedule interview.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: interview.application.candidate_id,
    title: "Interview Rescheduled",
    message: `Your interview for "${interview.application.job.title}" has been rescheduled.`,
    type: "interview",
    related_entity: "interview",
    related_entity_id: interviewId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: interview.application.employer_id,
    title: "Interview Rescheduled",
    message: `${interview.application.candidate.name}'s interview has been rescheduled.`,
    type: "interview",
    related_entity: "interview",
    related_entity_id: interviewId,
  });

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,
    action: "Interview Rescheduled",
    entity: "interview",
    entity_id: interviewId,
    metadata: {
      interview_date: payload.interview_date,
    },
  });

  return updated;
}

interface CompleteInterviewDto {
  result: "selected" | "rejected" | "hold" | "next_round";
  feedback?: string;
}

export async function completeInterview(
  interviewId: string,
  adminId: string,
  payload: CompleteInterviewDto,
) {
  /*
  --------------------------------------------------------------------------
  Fetch Interview
  --------------------------------------------------------------------------
  */

  const { data: interview, error } = await supabase
    .from("interviews")
    .select(
      `
      *,
      application:applications(
        id,
        candidate_id,
        employer_id,
        internal_status,
        job:jobs(
          title
        ),
        candidate:candidates(
          name
        )
      )
    `,
    )
    .eq("id", interviewId)
    .single();

  if (error || !interview) {
    throw new NotFoundError("Interview not found.");
  }

  /*
  --------------------------------------------------------------------------
  Already Completed
  --------------------------------------------------------------------------
  */

  if (interview.status === "completed") {
    throw new ConflictError("Interview has already been completed.");
  }

  /*
  --------------------------------------------------------------------------
  Complete Interview
  --------------------------------------------------------------------------
  */

  const { data: updatedInterview, error: updateError } = await supabase
    .from("interviews")
    .update({
      status: "completed",
      result: payload.result,
      feedback: payload.feedback ?? null,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", interviewId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to complete interview.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Decide Application Status
  --------------------------------------------------------------------------
  */

  let applicationStatus = "interview_completed";

  switch (payload.result) {
    case "selected":
      applicationStatus = "selected";
      break;

    case "rejected":
      applicationStatus = "rejected";
      break;

    case "hold":
      applicationStatus = "interview_completed";
      break;

    case "next_round":
      applicationStatus = "interview_scheduled";
      break;
  }

  /*
  --------------------------------------------------------------------------
  Update Application
  --------------------------------------------------------------------------
  */

  await supabase
    .from("applications")
    .update({
      internal_status: applicationStatus,
      last_status_change: new Date().toISOString(),
    })
    .eq("id", interview.application.id);

  /*
  --------------------------------------------------------------------------
  Application History
  --------------------------------------------------------------------------
  */

  await supabase.from("application_status_history").insert({
    application_id: interview.application.id,
    status: applicationStatus,
    changed_by: adminId,
    remarks: payload.feedback,
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: interview.application.candidate_id,
    title: "Interview Completed",
    message: `Your interview for "${interview.application.job.title}" has been completed.`,
    type: "interview",
    related_entity: "interview",
    related_entity_id: interviewId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: interview.application.employer_id,
    title: "Interview Completed",
    message: `${interview.application.candidate.name}'s interview has been completed.`,
    type: "interview",
    related_entity: "interview",
    related_entity_id: interviewId,
  });

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,
    action: "Interview Completed",
    entity: "interview",
    entity_id: interviewId,
    metadata: {
      result: payload.result,
      application_status: applicationStatus,
    },
  });

  /*
  --------------------------------------------------------------------------
  Return Updated Interview
  --------------------------------------------------------------------------
  */

  return updatedInterview;
}

interface CancelInterviewDto {
  reason: string;
}

export async function cancelInterview(
  interviewId: string,
  adminId: string,
  payload: CancelInterviewDto,
) {
  /*
  --------------------------------------------------------------------------
  Fetch Interview
  --------------------------------------------------------------------------
  */

  const { data: interview, error } = await supabase
    .from("interviews")
    .select(
      `
      *,
      application:applications(
        id,
        candidate_id,
        employer_id,
        internal_status,
        job:jobs(
          id,
          title
        ),
        candidate:candidates(
          id,
          name
        )
      )
    `,
    )
    .eq("id", interviewId)
    .single();

  if (error || !interview) {
    throw new NotFoundError("Interview not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (interview.status === "completed") {
    throw new ConflictError("Completed interviews cannot be cancelled.");
  }

  if (interview.status === "cancelled") {
    throw new ConflictError("Interview has already been cancelled.");
  }

  /*
  --------------------------------------------------------------------------
  Cancel Interview
  --------------------------------------------------------------------------
  */

  const { data: updatedInterview, error: updateError } = await supabase
    .from("interviews")
    .update({
      status: "cancelled",
      cancelled_reason: payload.reason,
      updated_at: new Date().toISOString(),
    })
    .eq("id", interviewId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to cancel interview.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Restore Application Status
  --------------------------------------------------------------------------
  */

  await supabase
    .from("applications")
    .update({
      internal_status: "shortlisted",
      last_status_change: new Date().toISOString(),
    })
    .eq("id", interview.application.id);

  /*
  --------------------------------------------------------------------------
  Application Status History
  --------------------------------------------------------------------------
  */

  await supabase.from("application_status_history").insert({
    application_id: interview.application.id,
    status: "shortlisted",
    changed_by: adminId,
    remarks: `Interview cancelled: ${payload.reason}`,
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: interview.application.candidate_id,
    title: "Interview Cancelled",
    message: `Your interview for "${interview.application.job.title}" has been cancelled.`,
    type: "interview",
    related_entity: "interview",
    related_entity_id: interviewId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: interview.application.employer_id,
    title: "Interview Cancelled",
    message: `${interview.application.candidate.name}'s interview has been cancelled.`,
    type: "interview",
    related_entity: "interview",
    related_entity_id: interviewId,
  });

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,
    action: "Interview Cancelled",
    entity: "interview",
    entity_id: interviewId,
    metadata: {
      reason: payload.reason,
    },
  });

  return updatedInterview;
}

export async function getInterview(interviewId: string) {
  const { data, error } = await supabase
    .from("interviews")
    .select(
      `
      *,

      application:applications(
        id,
        internal_status,

        candidate:candidates(
          id,
          name,
          email,
          phone,
          nationality,
          specialty,
          experience_years,
          cv_url
        ),

        employer:employers(
          id,
          company_name,
          contact_person,
          email,
          phone
        ),

        job:jobs(
          id,
          title,
          country,
          category,
          salary_min,
          salary_max,
          currency
        )
      )
    `,
    )
    .eq("id", interviewId)
    .single();

  if (error || !data) {
    throw new NotFoundError("Interview not found.");
  }

  return data;
}
interface ListInterviewFilters {
  page?: number;
  limit?: number;
  applicationId?: string;
  jobOrderId?: string;
  interviewerEmail?: string;
  status?: string;
}

export async function listInterviews(filters: ListInterviewFilters = {}) {
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 20;

  let query = supabase.from("interviews").select(
    `
      *,

      application:applications(
        id,
        internal_status,

        candidate:candidates(
          id,
          name
        ),

        employer:employers(
          id,
          company_name
        ),

        job:jobs(
          id,
          title
        )
      )
    `,
    {
      count: "exact",
    },
  );

  if (filters.applicationId) {
    query = query.eq("application_id", filters.applicationId);
  }

  if (filters.jobOrderId) {
    query = query.eq("job_order_id", filters.jobOrderId);
  }

  if (filters.interviewerEmail) {
    query = query.eq("interviewer_email", filters.interviewerEmail);
  }

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  query = query
    .order("interview_date", {
      ascending: true,
    })
    .range((page - 1) * limit, page * limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new DatabaseError("Unable to fetch interviews.", error);
  }

  return {
    data: data ?? [],

    pagination: {
      page,
      limit,
      total: count ?? 0,
      totalPages: Math.ceil((count ?? 0) / limit),
    },
  };
}
