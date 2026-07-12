import { supabase } from "../config/supabase";

interface EmployerFilters {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export async function listEmployers({
  search,
  status,
  page = 1,
  limit = 10,
  sort = "newest",
}: EmployerFilters) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from("employers").select("*", { count: "exact" });

  if (search) {
    query = query.or(
      `company_name.ilike.%${search}%,contact_person.ilike.%${search}%,email.ilike.%${search}%`,
    );
  }

  if (status) {
    query = query.eq("status", status);
  }

  query =
    sort === "oldest"
      ? query.order("created_at", { ascending: true })
      : query.order("created_at", { ascending: false });

  return await query.range(from, to);
}

export async function getEmployer(id: string) {
  return await supabase.from("employers").select("*").eq("id", id).single();
}

export async function createEmployer(data: any) {
  return await supabase.from("employers").insert(data).select().single();
}

export async function updateEmployer(id: string, data: any) {
  return await supabase.from("employers").update(data).eq("id", id).select().single();
}

export async function archiveEmployer(id: string) {
  return await supabase
    .from("employers")
    .update({
      status: "archived",
    })
    .eq("id", id)
    .select()
    .single();
}
export async function getEmployerDashboard(id: string) {
  // Employer
  const { data: employer, error: employerError } = await supabase
    .from("employers")
    .select("*")
    .eq("id", id)
    .single();

  if (employerError) {
    return {
      success: false,
      status: 404,
      message: employerError.message,
    };
  }

  // Jobs
  const { data: jobs } = await supabase.from("jobs").select("*").eq("employer_id", id);

  // Requirements
  const { data: requirements } = await supabase
    .from("employer_requirements")
    .select("*")
    .eq("employer_id", id);

  const jobIds = (jobs ?? []).map((job) => job.id);

  // Applications
  let applications: any[] = [];

  if (jobIds.length > 0) {
    const { data } = await supabase.from("applications").select("*").in("job_id", jobIds);

    applications = data ?? [];
  }

  return {
    success: true,
    status: 200,
    data: {
      employer,

      stats: {
        jobs: jobs?.length ?? 0,

        activeJobs: jobs?.filter((x) => x.status === "active").length ?? 0,

        requirements: requirements?.length ?? 0,

        applications: applications.length,
      },

      recentJobs: (jobs ?? []).slice(0, 5),

      recentApplications: (applications ?? []).slice(0, 5),
    },
  };
}
