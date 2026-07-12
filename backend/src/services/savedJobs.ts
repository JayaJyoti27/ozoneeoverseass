import { supabase } from "../config/supabase";
import { TEST_CANDIDATE_ID } from "../config/testCandidate";

export async function getSavedJobs() {
  const { data, error } = await supabase
    .from("saved_jobs")
    .select(
      `
      id,
      job:jobs (
        id,
        title,
        country,
        currency,
        salary_min,
        salary_max
      )
    `,
    )
    .eq("candidate_id", TEST_CANDIDATE_ID);

  if (error) return { data: null, error };

  // return the job objects directly, using saved_jobs.id as a stable key isn't
  // what the frontend expects — it expects job.id, so flatten to job shape
  const flattened = (data ?? []).map((row: any) => ({
    id: row.job?.id,
    title: row.job?.title,
    country: row.job?.country,
    currency: row.job?.currency,
    salary_min: row.job?.salary_min,
    salary_max: row.job?.salary_max,
  }));

  return { data: flattened, error: null };
}

export async function saveJob(jobId: string) {
  const { data, error } = await supabase
    .from("saved_jobs")
    .insert({ candidate_id: TEST_CANDIDATE_ID, job_id: jobId })
    .select()
    .single();

  return { data, error };
}

export async function removeSavedJob(jobId: string) {
  const { data, error } = await supabase
    .from("saved_jobs")
    .delete()
    .eq("candidate_id", TEST_CANDIDATE_ID)
    .eq("job_id", jobId);

  return { data, error };
}
