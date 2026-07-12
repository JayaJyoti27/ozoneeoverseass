import api from "./client";

/*
====================================
DASHBOARD
====================================
*/

export async function getDashboard() {
  const { data } = await api.get("/admin/dashboard");
  return data.data;
}

/*
====================================
CANDIDATES
====================================
*/

export async function getCandidates(params?: {
  search?: string;
  status?: string;
  specialty?: string;
  page?: number;
  limit?: number;
  sort?: string;
}) {
  const { data } = await api.get("/admin/candidates", { params });
  return data;
}

export async function getCandidate(id: string) {
  const { data } = await api.get(`/admin/candidates/${id}`);
  return data.data;
}

export async function updateCandidate(id: string, body: any) {
  // NOTE: backend router registers this as PUT, not PATCH.
  // Either change backend to `router.patch(...)`, or change this to api.put(...).
  // Keeping PATCH here since it's the more correct verb for a partial update —
  // update your backend candidatesRouter.ts to use router.patch instead of router.put.
  const { data } = await api.patch(`/admin/candidates/${id}`, body);
  return data.data;
}

export async function archiveCandidate(id: string) {
  const { data } = await api.delete(`/admin/candidates/${id}`);
  return data.data;
}

/*
====================================
EMPLOYERS
====================================
*/

// NOTE: confirm actual mount path in your server.ts / app.ts.
// Backend router file uses singular "/admin/employer" pattern based on
// your Admin/employer.tsx page route — if your app.use() mounts it as
// "/admin/employer" (singular), change every "/admin/employers" below to
// "/admin/employer" (singular). Using plural here for now — verify and fix.

export async function getEmployers(params?: any) {
  const { data } = await api.get("/admin/employers", { params });
  return data;
}

export async function getEmployer(id: string) {
  const { data } = await api.get(`/admin/employers/${id}`);
  return data.data;
}

export async function updateEmployer(id: string, body: any) {
  // Same PATCH vs PUT note as candidates — backend currently registers PUT.
  // Update backend adminEmployer router to router.patch instead of router.put.
  const { data } = await api.patch(`/admin/employers/${id}`, body);
  return data.data;
}

export async function archiveEmployer(id: string) {
  const { data } = await api.delete(`/admin/employers/${id}`);
  return data.data;
}

/*
====================================
JOBS
====================================
*/

export async function getJobs(params?: any) {
  const { data } = await api.get("/admin/jobs", { params });
  return data;
}

export async function getJob(id: string) {
  const { data } = await api.get(`/admin/jobs/${id}`);
  return data.data;
}

export async function updateJob(id: string, body: any) {
  const { data } = await api.patch(`/admin/jobs/${id}`, body);
  return data.data;
}

export async function archiveJob(id: string) {
  const { data } = await api.delete(`/admin/jobs/${id}`);
  return data.data;
}

/*
====================================
APPLICATIONS
====================================
*/

export async function getApplications(params?: any) {
  const { data } = await api.get("/admin/applications", { params });
  return data;
}

export async function getApplication(id: string) {
  const { data } = await api.get(`/admin/applications/${id}`);
  return data.data;
}

export async function updateApplication(id: string, body: any) {
  const { data } = await api.patch(`/admin/applications/${id}`, body);
  return data.data;
}

/*
====================================
REQUIREMENTS
====================================
*/

export async function getRequirements(params?: any) {
  const { data } = await api.get("/admin/requirements", { params });
  return data;
}

export async function approveRequirement(id: string) {
  const { data } = await api.patch(`/admin/requirements/${id}/approve`);
  return data.data;
}

export async function rejectRequirement(id: string) {
  const { data } = await api.patch(`/admin/requirements/${id}/reject`);
  return data.data;
}

export async function convertRequirement(id: string) {
  const { data } = await api.post(`/admin/requirements/${id}/convert`);
  return data.data;
}

/*
====================================
COUNTRIES
====================================
*/

export async function getCountries() {
  const { data } = await api.get("/admin/countries");
  return data.data;
}

export async function createCountry(body: any) {
  const { data } = await api.post("/admin/countries", body);
  return data.data;
}

export async function updateCountry(id: string, body: any) {
  const { data } = await api.patch(`/admin/countries/${id}`, body);
  return data.data;
}

export async function deleteCountry(id: string) {
  const { data } = await api.delete(`/admin/countries/${id}`);
  return data.data;
}
export async function createCandidate(body: any) {
  const { data } = await api.post("/admin/candidates", body);
  return data.data;
}

export async function deleteCandidate(id: string) {
  const { data } = await api.delete(`/admin/candidates/${id}/hard`);
  return data;
}
