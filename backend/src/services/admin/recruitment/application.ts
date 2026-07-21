import { supabase } from "../../../config/supabase";
import { DatabaseError, NotFoundError } from "../../../utils/AppError";

interface ApplicationFilters {
  page?: number;
  limit?: number;
  status?: string;
  recruiterId?: string;
  employerId?: string;
  jobOrderId?: string;
  priority?: number;
  search?: string;
}

/*
|--------------------------------------------------------------------------
| List Applications
|--------------------------------------------------------------------------
*/

export async function getApplications(filters: ApplicationFilters) {
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 20;

  let query = supabase.from("applications").select(
    `
      *,
      candidate:candidates(
        id,
        full_name,
        email,
        phone,
        nationality
      ),
      employer:employers(
        id,
        company_name
      ),
      job_order:job_orders(
        id,
        title,
        country,
        status
      )
      `,
    {
      count: "exact",
    },
  );

  if (filters.status) {
    query = query.eq("internal_status", filters.status);
  }

  if (filters.recruiterId) {
    query = query.eq("assigned_recruiter", filters.recruiterId);
  }

  if (filters.employerId) {
    query = query.eq("employer_id", filters.employerId);
  }

  if (filters.jobOrderId) {
    query = query.eq("job_order_id", filters.jobOrderId);
  }

  if (filters.priority) {
    query = query.eq("priority", filters.priority);
  }

  if (filters.search) {
    query = query.ilike("admin_notes", `%${filters.search}%`);
  }

  query = query
    .order("applied_at", {
      ascending: false,
    })
    .range((page - 1) * limit, page * limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new DatabaseError("Unable to fetch applications.", error);
  }

  return {
    applications: data ?? [],
    pagination: {
      page,
      limit,
      total: count ?? 0,
      totalPages: Math.ceil((count ?? 0) / limit),
    },
  };
}

/*
|--------------------------------------------------------------------------
| Application Details
|--------------------------------------------------------------------------
*/

export async function getApplication(applicationId: string) {
  const { data, error } = await supabase
    .from("applications")
    .select(
      `
      *,

      candidate:candidates(*),

      employer:employers(*),

      job_order:job_orders(*)
    `,
    )
    .eq("id", applicationId)
    .single();

  if (error || !data) {
    throw new NotFoundError("Application not found.");
  }

  return data;
}
/*
|--------------------------------------------------------------------------
| Update Recruitment Stage
|--------------------------------------------------------------------------
*/

export async function updateApplicationStage(applicationId: string, stage: string, notes?: string) {
  const { data, error } = await supabase
    .from("applications")
    .update({
      internal_status: stage,

      admin_notes: notes ?? null,

      last_status_change: new Date().toISOString(),

      updated_at: new Date().toISOString(),
    })
    .eq("id", applicationId)
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to update application.", error);
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Assign Recruiter
|--------------------------------------------------------------------------
*/

export async function assignRecruiter(applicationId: string, recruiterId: string) {
  const { data, error } = await supabase
    .from("applications")
    .update({
      assigned_recruiter: recruiterId,

      updated_at: new Date().toISOString(),
    })
    .eq("id", applicationId)
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to assign recruiter.", error);
  }

  return data;
}
/*
|--------------------------------------------------------------------------
| Reject Application
|--------------------------------------------------------------------------
*/

export async function rejectApplication(applicationId: string, reason: string) {
  const { data, error } = await supabase
    .from("applications")
    .update({
      internal_status: "rejected",

      admin_notes: reason,

      closed_at: new Date().toISOString(),

      updated_at: new Date().toISOString(),
    })
    .eq("id", applicationId)
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to reject application.", error);
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Withdraw Application
|--------------------------------------------------------------------------
*/

export async function withdrawApplication(applicationId: string) {
  const { data, error } = await supabase
    .from("applications")
    .update({
      internal_status: "withdrawn",

      closed_at: new Date().toISOString(),

      updated_at: new Date().toISOString(),
    })
    .eq("id", applicationId)
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to withdraw application.", error);
  }

  return data;
}
