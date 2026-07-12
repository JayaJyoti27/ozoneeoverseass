import { supabase } from "../config/supabase";
interface JobFilters {
  country?: string;
  city?: string;
  sector?: string;
  employerType?: string;
  experience?: string;
  salaryMin?: number;
  salaryMax?: number;
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}
export async function listJobs({
  country,
  city,
  sector,
  employerType,
  experience,
  salaryMin,
  salaryMax,
  search,
  page = 1,
  limit = 12,
  sort = "newest",
}: JobFilters) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("jobs")
    .select("*", { count: "exact" })
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (country && country !== "All") {
    query = query.eq("country", country);
  }
  if (experience) {
    query = query.ilike("experience_required", `%${experience}%`);
  }
  if (sector && sector !== "All") {
    query = query.eq("sector", sector.toLowerCase());
  }
  if (employerType && employerType !== "All") {
    query = query.eq("employer_type", employerType);
  }
  if (salaryMin) {
    query = query.gte("salary_min", salaryMin);
  }
  if (salaryMin) {
    query = query.gte("salary_min", salaryMin);
  }
  if (salaryMax) {
    query = query.lte("salary_max", salaryMax);
  }
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }
  if (sort === "oldest") {
    query = query.order("created_at", { ascending: true });
  } else if (sort === "salaryAsc") {
    query = query.order("salary_min", { ascending: true });
  } else if (sort === "salaryDesc") {
    query = query.order("salary_min", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }
  if (city && city !== "All") {
    query = query.eq("city", city);
  }

  return await query.range(from, to);
}

export async function getJob(id: string) {
  return await supabase.from("jobs").select("*").eq("id", id).single();
}

export async function createJob(data: any) {
  return await supabase.from("jobs").insert(data).select().single();
}

export async function updateJob(id: string, data: any) {
  return await supabase.from("jobs").update(data).eq("id", id).select().single();
}

export async function archiveJob(id: string) {
  return await supabase.from("jobs").update({ status: "archived" }).eq("id", id).select().single();
}
export async function getSimilarJobs(id: string) {
  const { data: currentJob, error } = await supabase
    .from("jobs")
    .select("country, sector")
    .eq("id", id)
    .single();

  if (error) return { data: null, error };

  return await supabase
    .from("jobs")
    .select("*")
    .eq("country", currentJob.country)
    .eq("sector", currentJob.sector)
    .eq("status", "active")
    .neq("id", id)
    .limit(4);
}
export async function getFeaturedJobs() {
  return await supabase
    .from("jobs")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(6);
}
export async function getJobStats() {
  const { count: activeJobs } = await supabase
    .from("jobs")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  const { data: countries } = await supabase.from("jobs").select("country").eq("status", "active");

  const uniqueCountries = new Set((countries ?? []).map((job) => job.country)).size;

  const { count: healthcareJobs } = await supabase
    .from("jobs")
    .select("*", { count: "exact", head: true })
    .eq("sector", "healthcare")
    .eq("status", "active");

  const { count: engineeringJobs } = await supabase
    .from("jobs")
    .select("*", { count: "exact", head: true })
    .eq("sector", "engineering")
    .eq("status", "active");

  return {
    activeJobs: activeJobs ?? 0,
    countries: uniqueCountries,
    healthcareJobs: healthcareJobs ?? 0,
    engineeringJobs: engineeringJobs ?? 0,
  };
}
