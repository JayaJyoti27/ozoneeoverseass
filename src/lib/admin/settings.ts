import { api } from "./api";

export async function getSettings() {
  const res = await api.get("/settings");

  return res.data.data;
}

export async function updateSettings(payload: any) {
  const res = await api.put("/settings", payload);

  return res.data.data;
}

export async function getCountries() {
  const res = await api.get("/settings/countries");

  return res.data.data;
}

export async function getJobCategories() {
  const res = await api.get("/settings/job-categories");

  return res.data.data;
}

export async function getEmailTemplates() {
  const res = await api.get("/settings/email-templates");

  return res.data.data;
}
