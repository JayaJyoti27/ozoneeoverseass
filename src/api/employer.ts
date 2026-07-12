import api from "./client";

/*
====================================
DASHBOARD
====================================
*/

export async function getDashboard() {
  const { data } = await api.get("/employer/dashboard");
  return data.data;
}

/*
====================================
PROFILE
====================================
*/

export async function getCompanyProfile() {
  const { data } = await api.get("/employer/me");
  return data.data;
}

export async function updateCompanyProfile(body: any) {
  const { data } = await api.patch("/employer/me", body);
  return data.data;
}

/*
====================================
REQUIREMENTS
====================================
*/

export async function getRequirements() {
  const { data } = await api.get("/employer/requirements");
  return data.data;
}

export async function createRequirement(body: any) {
  const { data } = await api.post("/employer/requirements", body);
  return data.data;
}

export async function updateRequirement(id: string, body: any) {
  const { data } = await api.patch(`/employer/requirements/${id}`, body);
  return data.data;
}

/*
====================================
JOBS
====================================
*/

export async function getJobs() {
  const { data } = await api.get("/employer/jobs");
  return data.data;
}

/*
====================================
APPLICATIONS
====================================
*/

export async function getApplications() {
  const { data } = await api.get("/employer/applications");
  return data.data;
}
export async function createJob(body: any) {
  const { data } = await api.post("/employer/jobs", body);
  return data.data;
}

export async function getJobById(id: string) {
  const { data } = await api.get(`/employer/jobs/${id}`);
  return data.data;
}

export async function updateJob(id: string, body: any) {
  const { data } = await api.patch(`/employer/jobs/${id}`, body);
  return data.data;
}

export async function getRequirementById(id: string) {
  const { data } = await api.get(`/employer/requirements/${id}`);
  return data.data;
}

export async function updateApplicationStatus(id: string, status: string) {
  const { data } = await api.patch(`/employer/applications/${id}`, { status });
  return data.data;
}

export async function getCandidates() {
  const { data } = await api.get("/employer/candidates");
  return data.data;
}

export async function getCandidateById(id: string) {
  const { data } = await api.get(`/employer/candidates/${id}`);
  return data.data;
}
