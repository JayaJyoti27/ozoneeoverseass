import { supabase } from "../config/supabase";

// Temporary until authentication is implemented
const TEST_EMPLOYER_ID = "3d730a29-057f-4588-9c03-0df22e724c3a";

/*
==========================================
PROFILE
==========================================
*/

export async function getProfile() {
  return await supabase.from("employers").select("*").eq("id", TEST_EMPLOYER_ID).single();
}

export async function updateProfile(body: any) {
  return await supabase.from("employers").update(body).eq("id", TEST_EMPLOYER_ID).select().single();
}

/*
==========================================
JOBS
==========================================
*/

export async function getJobs() {
  return await supabase
    .from("jobs")
    .select("*")
    .eq("employer_id", TEST_EMPLOYER_ID)
    .order("created_at", { ascending: false });
}

/*
==========================================
REQUIREMENTS
==========================================
*/

export async function getRequirements() {
  return await supabase
    .from("employer_requirements")
    .select("*")
    .eq("employer_id", TEST_EMPLOYER_ID)
    .order("created_at", { ascending: false });
}

export async function createRequirement(body: any) {
  return await supabase
    .from("employer_requirements")
    .insert({
      ...body,
      employer_id: TEST_EMPLOYER_ID,
    })
    .select()
    .single();
}

export async function updateRequirement(id: string, body: any) {
  return await supabase
    .from("employer_requirements")
    .update(body)
    .eq("id", id)
    .eq("employer_id", TEST_EMPLOYER_ID)
    .select()
    .single();
}

/*
==========================================
APPLICATIONS
==========================================
*/

export async function getApplications() {
  const { data: jobs } = await supabase
    .from("jobs")
    .select("id")
    .eq("employer_id", TEST_EMPLOYER_ID);

  const jobIds = (jobs ?? []).map((x) => x.id);

  if (jobIds.length === 0) {
    return {
      data: [],
      error: null,
    };
  }

  return await supabase
    .from("applications")
    .select(
      `
      *,
      candidates(
        id,
        name,
        email,
        phone,
        specialty
      ),
      jobs(
        id,
        title,
        country
      )
    `,
    )
    .in("job_id", jobIds)
    .order("applied_at", {
      ascending: false,
    });
}

/*
==========================================
DASHBOARD
==========================================
*/

export async function getDashboard() {
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("employer_id", TEST_EMPLOYER_ID);

  const { data: requirements } = await supabase
    .from("employer_requirements")
    .select("*")
    .eq("employer_id", TEST_EMPLOYER_ID);

  const jobIds = (jobs ?? []).map((x) => x.id);

  let applications = [];

  if (jobIds.length) {
    const { data } = await supabase.from("applications").select("*").in("job_id", jobIds);

    applications = data ?? [];
  }

  return {
    jobs: jobs?.length ?? 0,
    activeJobs: jobs?.filter((x) => x.status === "active").length ?? 0,
    requirements: requirements?.length ?? 0,
    applications: applications.length,
  };
}
/*
==========================================
JOBS (additions)
==========================================
*/

export async function createJob(body: any) {
  return await supabase
    .from("jobs")
    .insert({
      ...body,
      employer_id: TEST_EMPLOYER_ID,
    })
    .select()
    .single();
}

export async function getJobById(id: string) {
  return await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .eq("employer_id", TEST_EMPLOYER_ID)
    .single();
}

export async function updateJob(id: string, body: any) {
  return await supabase
    .from("jobs")
    .update(body)
    .eq("id", id)
    .eq("employer_id", TEST_EMPLOYER_ID)
    .select()
    .single();
}

/*
==========================================
REQUIREMENTS (addition)
==========================================
*/

export async function getRequirementById(id: string) {
  return await supabase
    .from("employer_requirements")
    .select("*")
    .eq("id", id)
    .eq("employer_id", TEST_EMPLOYER_ID)
    .single();
}

/*
==========================================
APPLICATIONS (addition)
==========================================
*/

export async function updateApplicationStatus(id: string, status: string) {
  // ownership check: only update if the application's job belongs to this employer
  const { data: jobs } = await supabase
    .from("jobs")
    .select("id")
    .eq("employer_id", TEST_EMPLOYER_ID);

  const jobIds = (jobs ?? []).map((x) => x.id);

  return await supabase
    .from("applications")
    .update({ status })
    .eq("id", id)
    .in("job_id", jobIds)
    .select()
    .single();
}

/*
==========================================
CANDIDATE SEARCH (addition)
==========================================
*/

export async function getCandidates() {
  return await supabase.from("candidates").select("*").order("created_at", { ascending: false });
}

export async function getCandidateById(id: string) {
  return await supabase.from("candidates").select("*").eq("id", id).single();
}
