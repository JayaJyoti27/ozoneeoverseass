import { supabase } from "../config/supabase";
import { TEST_CANDIDATE_ID } from "../config/testCandidate";

/*
========================================
PROFILE
========================================
*/

export async function getProfile() {
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .eq("id", TEST_CANDIDATE_ID)
    .single();

  return { data, error };
}

export async function updateProfile(body: Record<string, any>) {
  const { data, error } = await supabase
    .from("candidates")
    .update(body)
    .eq("id", TEST_CANDIDATE_ID)
    .select()
    .single();

  return { data, error };
}

/*
========================================
RESUME
========================================
*/

export async function updateResume(cv_url: string) {
  const { data, error } = await supabase
    .from("candidates")
    .update({ cv_url })
    .eq("id", TEST_CANDIDATE_ID)
    .select()
    .single();

  return { data, error };
}

/*
========================================
APPLICATIONS
========================================
*/

export async function getApplications() {
  const { data, error } = await supabase
    .from("applications")
    .select(
      `
      id,
      status,
      applied_at,
      job:jobs (
        id,
        title,
        country
      )
    `,
    )
    .eq("candidate_id", TEST_CANDIDATE_ID)
    .order("applied_at", { ascending: false });

  if (error) return { data: null, error };

  // flatten job fields onto the application object, since the frontend
  // expects application.job_title / application.country directly
  const flattened = (data ?? []).map((app: any) => ({
    id: app.id,
    status: app.status,
    applied_at: app.applied_at,
    job_title: app.job?.title ?? null,
    country: app.job?.country ?? null,
  }));

  return { data: flattened, error: null };
}

export async function getApplication(id: string) {
  const { data, error } = await supabase
    .from("applications")
    .select(
      `
      id,
      status,
      applied_at,
      notes,
      job:jobs (
        id,
        title,
        country
      )
    `,
    )
    .eq("id", id)
    .eq("candidate_id", TEST_CANDIDATE_ID)
    .single();

  if (error) return { data: null, error };

  const flattened = {
    id: data.id,
    status: data.status,
    applied_at: data.applied_at,
    notes: data.notes,
    job_title: data.job?.title ?? null,
    country: data.job?.country ?? null,
    company_name: data.job?.title ?? null, // adjust if you have a real employer/company join
  };

  return { data: flattened, error: null };
}

/*
========================================
DASHBOARD
========================================
*/

export async function getDashboard() {
  const { data: profile } = await supabase
    .from("candidates")
    .select("name, email, phone, nationality, current_country, specialty, experience_years, cv_url")
    .eq("id", TEST_CANDIDATE_ID)
    .single();

  const requiredFields = [
    "name",
    "email",
    "phone",
    "nationality",
    "current_country",
    "specialty",
    "experience_years",
  ];
  const filledCount = profile
    ? requiredFields.filter((f) => profile[f] !== null && profile[f] !== "").length
    : 0;
  const profileCompletion = Math.round((filledCount / requiredFields.length) * 100);

  const { data: applications } = await supabase
    .from("applications")
    .select("id, status, applied_at, job:jobs(title, country)")
    .eq("candidate_id", TEST_CANDIDATE_ID)
    .order("applied_at", { ascending: false });

  const apps = applications ?? [];
  const totalApplications = apps.length;
  const interviews = apps.filter((a: any) => a.status?.toLowerCase() === "interview").length;
  const placed = apps.filter((a: any) => a.status?.toLowerCase() === "placed").length;

  const recentApplications = apps.slice(0, 5).map((a: any) => ({
    id: a.id,
    job_title: a.job?.title ?? null,
    country: a.job?.country ?? null,
    status: a.status,
  }));

  const { data: recommendedJobsRaw } = await supabase
    .from("jobs")
    .select("id, title, country, currency, salary_min, salary_max")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(4);

  return {
    profileCompletion,
    totalApplications,
    interviews,
    placed,
    recentApplications,
    recommendedJobs: recommendedJobsRaw ?? [],
  };
}

/*
========================================
STATS
========================================
*/

export async function getStats() {
  const { data: applications } = await supabase
    .from("applications")
    .select("status")
    .eq("candidate_id", TEST_CANDIDATE_ID);

  const apps = applications ?? [];

  return {
    total: apps.length,
    interviews: apps.filter((a: any) => a.status?.toLowerCase() === "interview").length,
    placed: apps.filter((a: any) => a.status?.toLowerCase() === "placed").length,
    rejected: apps.filter((a: any) => a.status?.toLowerCase() === "rejected").length,
  };
}
