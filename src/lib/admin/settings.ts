import { api } from "./api";

export async function getSettings() {
  const res = await api.get("/admin/settings");

  return res.data.data;
}

export async function updateSettings(payload: any) {
  const res = await api.put("/admin/settings", payload);

  return res.data.data;
}

export async function getCountries() {
  const res = await api.get("/admin/settings/countries");

  return res.data.data;
}

export async function getJobCategories() {
  const res = await api.get("/admin/settings/job-categories");

  return res.data.data;
}

export async function getEmailTemplates() {
  const res = await api.get("/admin/settings/email-templates");

  return res.data.data;
}
