import { supabase } from "../../../config/supabase";
import { DatabaseError } from "../../../utils/AppError";

/*
|--------------------------------------------------------------------------
| Recruitment Summary
|--------------------------------------------------------------------------
*/

export async function getRecruitmentSummary() {
  const [applications, interviews, medicals, visas, deployments] = await Promise.all([
    supabase.from("applications").select("*", {
      count: "exact",
      head: true,
    }),

    supabase.from("interviews").select("*", {
      count: "exact",
      head: true,
    }),

    supabase.from("medicals").select("*", {
      count: "exact",
      head: true,
    }),

    supabase.from("visas").select("*", {
      count: "exact",
      head: true,
    }),

    supabase.from("deployments").select("*", {
      count: "exact",
      head: true,
    }),
  ]);

  if (
    applications.error ||
    interviews.error ||
    medicals.error ||
    visas.error ||
    deployments.error
  ) {
    throw new DatabaseError(
      "Unable to fetch recruitment summary.",
      applications.error ?? interviews.error ?? medicals.error ?? visas.error ?? deployments.error,
    );
  }

  return {
    applications: applications.count ?? 0,
    interviews: interviews.count ?? 0,
    medicals: medicals.count ?? 0,
    visas: visas.count ?? 0,
    deployments: deployments.count ?? 0,
  };
}
/*
|--------------------------------------------------------------------------
| Recruitment Funnel
|--------------------------------------------------------------------------
*/

export async function getRecruitmentFunnel() {
  const { data, error } = await supabase.from("applications").select("internal_status");

  if (error) {
    throw new DatabaseError("Unable to fetch recruitment funnel.", error);
  }

  const funnel: Record<string, number> = {};

  for (const row of data ?? []) {
    const status = row.internal_status ?? "unknown";

    funnel[status] = (funnel[status] ?? 0) + 1;
  }

  return funnel;
}
/*
|--------------------------------------------------------------------------
| Medical Statistics
|--------------------------------------------------------------------------
*/

export async function getMedicalStatistics() {
  const { data, error } = await supabase.from("medicals").select("status");

  if (error) {
    throw new DatabaseError("Unable to fetch medical statistics.", error);
  }

  const stats: Record<string, number> = {};

  for (const row of data ?? []) {
    const status = row.status ?? "unknown";

    stats[status] = (stats[status] ?? 0) + 1;
  }

  return stats;
}
/*
|--------------------------------------------------------------------------
| Visa Statistics
|--------------------------------------------------------------------------
*/

export async function getVisaStatistics() {
  const { data, error } = await supabase.from("visas").select("status");

  if (error) {
    throw new DatabaseError("Unable to fetch visa statistics.", error);
  }

  const stats: Record<string, number> = {};

  for (const row of data ?? []) {
    const status = row.status ?? "unknown";

    stats[status] = (stats[status] ?? 0) + 1;
  }

  return stats;
}
/*
|--------------------------------------------------------------------------
| Deployment Statistics
|--------------------------------------------------------------------------
*/

export async function getDeploymentStatistics() {
  const { data, error } = await supabase.from("deployments").select("status");

  if (error) {
    throw new DatabaseError("Unable to fetch deployment statistics.", error);
  }

  const stats: Record<string, number> = {};

  for (const row of data ?? []) {
    const status = row.status ?? "unknown";

    stats[status] = (stats[status] ?? 0) + 1;
  }

  return stats;
}
/*
|--------------------------------------------------------------------------
| Monthly Recruitment
|--------------------------------------------------------------------------
*/

export async function getMonthlyRecruitment() {
  const { data, error } = await supabase.from("applications").select("applied_at");

  if (error) {
    throw new DatabaseError("Unable to fetch monthly recruitment.", error);
  }

  const monthly: Record<string, number> = {};

  for (const row of data ?? []) {
    if (!row.applied_at) continue;

    const month = new Date(row.applied_at).toISOString().slice(0, 7);

    monthly[month] = (monthly[month] ?? 0) + 1;
  }

  return monthly;
}
/*
|--------------------------------------------------------------------------
| Recruitment Report
|--------------------------------------------------------------------------
*/

export async function getRecruitmentReport() {
  const [summary, funnel, medicals, visas, deployments, monthly] = await Promise.all([
    getRecruitmentSummary(),
    getRecruitmentFunnel(),
    getMedicalStatistics(),
    getVisaStatistics(),
    getDeploymentStatistics(),
    getMonthlyRecruitment(),
  ]);

  return {
    summary,
    funnel,
    medicals,
    visas,
    deployments,
    monthly,
  };
}
