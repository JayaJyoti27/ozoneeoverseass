import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://172.20.10.3:3001/api",

  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("API baseURL:", import.meta.env.VITE_API_URL);
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Dashboard
export async function getDashboard() {
  const res = await api.get("/employer/dashboard");
  return res.data.data;
}

// Candidates
export async function getCandidates(params?: Record<string, any>) {
  const res = await api.get("/employer/candidates", { params });
  return res.data.candidates;
}

export async function getCandidate(id: string) {
  const res = await api.get(`/employer/candidates/${id}`);
  const { candidate, applications, documents, resume } = res.data.data;
  return { ...candidate, applications, documents, resume };
}

export async function activateCandidate(id: string) {
  const res = await api.patch(`/employer/candidates/${id}/activate`);
  return res.data.data;
}

export async function suspendCandidate(id: string) {
  const res = await api.patch(`/employer/candidates/${id}/suspend`);
  return res.data.data;
}

// Employers
export async function getEmployers(params?: Record<string, any>) {
  const res = await api.get("/employer/employers", { params });
  return res.data.employers;
}

export async function getEmployer(id: string) {
  const res = await api.get(`/employer/employers/${id}`);
  const { employer, requirements } = res.data.data;
  return { ...employer, requirements };
}

export async function approveEmployer(id: string) {
  const res = await api.patch(`/employer/employers/${id}/approve`);
  return res.data.data;
}

export async function suspendEmployer(id: string) {
  const res = await api.patch(`/employer/employers/${id}/suspend`);
  return res.data.data;
}

export async function activateEmployer(id: string) {
  const res = await api.patch(`/employer/employers/${id}/activate`);
  return res.data.data;
}

// Job Orders
export async function getJobOrders(params?: Record<string, any>) {
  const res = await api.get("/employer/job-orders", { params });
  return res.data.jobOrders;
}

export async function getJobOrder(id: string) {
  const res = await api.get(`/employer/job-orders/${id}`);
  return res.data.data;
}

export async function updateJobOrder(id: string, payload: Record<string, any>) {
  const res = await api.patch(`/employer/job-orders/${id}`, payload);
  return res.data.data;
}

export async function openRecruitment(id: string) {
  const res = await api.patch(`/employer/job-orders/${id}/open`);
  return res.data.data;
}

export async function closeRecruitment(id: string) {
  const res = await api.patch(`/employer/job-orders/${id}/close`);
  return res.data.data;
}

// Requirements
export async function getRequirements(params?: Record<string, any>) {
  const res = await api.get("/employer/requirements", { params });
  return res.data.requirements;
}

export async function getRequirement(id: string) {
  const res = await api.get(`/employer/requirements/${id}`);
  return res.data.data;
}

export async function approveRequirement(id: string) {
  const res = await api.patch(`/employer/requirements/${id}/approve`);
  return res.data.data;
}

export async function rejectRequirement(id: string, reason?: string) {
  const res = await api.patch(`/employer/requirements/${id}/reject`, { reason });
  return res.data.data;
}

export async function requestClarification(id: string, message: string) {
  const res = await api.patch(`/employer/requirements/${id}/clarification`, {
    message,
  });
  return res.data.data;
}

export async function convertRequirement(id: string) {
  const res = await api.patch(`/employer/requirements/${id}/convert`);
  return res.data.data;
}
