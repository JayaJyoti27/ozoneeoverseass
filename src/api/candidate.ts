import api from "./client";

/*
====================================
PROFILE
====================================
*/

export async function getCandidateProfile() {
  const { data } = await api.get("/candidate/me");
  return data.data;
}

export async function updateCandidateProfile(body: any) {
  const { data } = await api.patch("/candidate/me", body);
  return data.data;
}
/*
====================================
RESUME
====================================
*/

export async function updateResume(body: any) {
  const { data } = await api.patch("/candidate/resume", body);
  return data.data;
}
export async function getJobs() {
  const { data } = await api.get("/jobs");
  return data.data;
}

export async function applyForJob(jobId: string) {
  const { data } = await api.post(`/candidate/applications`, {
    job_id: jobId,
  });

  return data.data;
}
export async function getMyApplications() {
  const { data } = await api.get("/candidate/applications");
  return data.data;
}
export async function getCandidateDashboard() {
  const { data } = await api.get("/candidate/dashboard");
  return data.data;
}
export async function getSavedJobs() {
  const { data } = await api.get("/candidate/saved-jobs");
  return data.data;
}
export async function getJobById(id: string) {
  const { data } = await api.get(`/jobs/${id}`);
  return data.data;
}
export async function getApplicationById(id: string) {
  const { data } = await api.get(`/candidate/applications/${id}`);
  return data.data;
}
export async function removeSavedJob(id: string) {
  const { data } = await api.delete(`/candidate/saved-jobs/${id}`);
  return data.data;
}

export async function getNotifications() {
  const { data } = await api.get("/candidate/notifications");
  return data.data;
}
export async function saveJob(jobId: string) {
  const { data } = await api.post("/candidate/saved-jobs", { job_id: jobId });
  return data.data;
}
export async function markNotificationRead(id: string) {
  const { data } = await api.patch(`/candidate/notifications/${id}/read`);
  return data.data;
}
