import { supabase } from "../config/supabase";

interface ApplicationFilters {
  status?: string;
  candidateId?: string;
  jobId?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export async function listApplications({
  status,
  candidateId,
  jobId,
  page = 1,
  limit = 10,
  sort = "newest",
}: ApplicationFilters) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from("applications").select(
    `
      *,
      candidates(name,email,phone),
      jobs(title,country,city)
      `,
    { count: "exact" },
  );

  if (status) {
    query = query.eq("status", status);
  }

  if (candidateId) {
    query = query.eq("candidate_id", candidateId);
  }

  if (jobId) {
    query = query.eq("job_id", jobId);
  }

  if (sort === "oldest") {
    query = query.order("applied_at", { ascending: true });
  } else {
    query = query.order("applied_at", { ascending: false });
  }

  return await query.range(from, to);
}

export async function getApplication(id: string) {
  return await supabase
    .from("applications")
    .select(
      `
      *,
      candidates(name,email,phone),
      jobs(title,country,city)
      `,
    )
    .eq("id", id)
    .single();
}

export async function createApplication(data: any) {
  return await supabase.from("applications").insert(data).select().single();
}

export async function updateApplication(id: string, data: any) {
  return await supabase.from("applications").update(data).eq("id", id).select().single();
}

export async function archiveApplication(id: string) {
  return await supabase.from("applications").delete().eq("id", id);
}
export async function updateApplicationStatus(id: string, status: string) {
  return await supabase
    .from("applications")
    .update({
      status,
    })
    .eq("id", id)
    .select()
    .single();
}
