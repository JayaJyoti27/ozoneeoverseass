import { supabase } from "../../config/supabase";
import { DatabaseError, NotFoundError } from "../../../../src/utils/AppError";

interface JobFilters {
  page?: number;
  limit?: number;
  country?: string;
  category?: string;
  search?: string;
}

/*
|--------------------------------------------------------------------------
| Browse Jobs
|--------------------------------------------------------------------------
*/

export async function getCandidateJobs(candidateId: string, filters: JobFilters) {
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 20;

  let query = supabase
    .from("jobs")
    .select("*", {
      count: "exact",
    })
    .eq("status", "active");

  if (filters.country) {
    query = query.eq("country", filters.country);
  }

  if (filters.category) {
    query = query.eq("category", filters.category);
  }

  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,country.ilike.%${filters.search}%`);
  }

  query = query
    .order("created_at", {
      ascending: false,
    })
    .range((page - 1) * limit, page * limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new DatabaseError("Unable to fetch jobs.", error);
  }

  const jobIds = data?.map((job) => job.id) ?? [];

  const { data: applications } = await supabase
    .from("applications")
    .select("job_id")
    .eq("candidate_id", candidateId)
    .in("job_id", jobIds);

  const { data: savedJobs } = await supabase
    .from("saved_jobs")
    .select("job_id")
    .eq("candidate_id", candidateId)
    .in("job_id", jobIds);

  return {
    jobs:
      data?.map((job) => ({
        ...job,
        applied: applications?.some((a) => a.job_id === job.id) ?? false,
        saved: savedJobs?.some((s) => s.job_id === job.id) ?? false,
      })) ?? [],
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
| Job Details
|--------------------------------------------------------------------------
*/

export async function getCandidateJob(candidateId: string, jobId: string) {
  const { data, error } = await supabase.from("jobs").select("*").eq("id", jobId).single();

  if (error || !data) {
    throw new NotFoundError("Job not found.");
  }

  const { data: application } = await supabase
    .from("applications")
    .select("id,status")
    .eq("candidate_id", candidateId)
    .eq("job_id", jobId)
    .maybeSingle();

  const { data: saved } = await supabase
    .from("saved_jobs")
    .select("id")
    .eq("candidate_id", candidateId)
    .eq("job_id", jobId)
    .maybeSingle();

  return {
    ...data,
    applied: !!application,
    application,
    saved: !!saved,
  };
}

/*
|--------------------------------------------------------------------------
| Save Job
|--------------------------------------------------------------------------
*/

export async function saveJob(candidateId: string, jobId: string) {
  const { data, error } = await supabase
    .from("saved_jobs")
    .insert({
      candidate_id: candidateId,
      job_id: jobId,
    })
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to save job.", error);
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Remove Saved Job
|--------------------------------------------------------------------------
*/

export async function removeSavedJob(candidateId: string, jobId: string) {
  const { error } = await supabase
    .from("saved_jobs")
    .delete()
    .eq("candidate_id", candidateId)
    .eq("job_id", jobId);

  if (error) {
    throw new DatabaseError("Unable to remove saved job.", error);
  }

  return {
    success: true,
  };
}
