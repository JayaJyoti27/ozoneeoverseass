import { supabase } from "../../../config/supabase";
import { DatabaseError } from "../../../../../src/utils/AppError";
import { getRecruitmentFunnel } from "./recruitment";
/*
|--------------------------------------------------------------------------
| Admin Dashboard Report
|--------------------------------------------------------------------------
*/

export async function getDashboardReport() {
  const [
    employers,
    candidates,
    requirements,
    jobOrders,
    applications,
    interviews,
    medicals,
    visas,
    deployments,
  ] = await Promise.all([
    supabase.from("employers").select("*", { count: "exact", head: true }),

    supabase.from("candidates").select("*", { count: "exact", head: true }),

    supabase.from("requirements").select("*", { count: "exact", head: true }),

    supabase.from("job_orders").select("*", { count: "exact", head: true }),

    supabase.from("applications").select("*", { count: "exact", head: true }),

    supabase.from("interviews").select("*", { count: "exact", head: true }),

    supabase.from("medicals").select("*", { count: "exact", head: true }),

    supabase.from("visas").select("*", { count: "exact", head: true }),

    supabase.from("deployments").select("*", { count: "exact", head: true }),
  ]);

  const errors = [
    employers.error,
    candidates.error,
    requirements.error,
    jobOrders.error,
    applications.error,
    interviews.error,
    medicals.error,
    visas.error,
    deployments.error,
  ].filter(Boolean);

  if (errors.length) {
    throw new DatabaseError("Unable to generate dashboard report.", errors[0]);
  }

  return {
    employers: employers.count ?? 0,
    candidates: candidates.count ?? 0,
    requirements: requirements.count ?? 0,
    jobOrders: jobOrders.count ?? 0,
    applications: applications.count ?? 0,
    interviews: interviews.count ?? 0,
    medicals: medicals.count ?? 0,
    visas: visas.count ?? 0,
    deployments: deployments.count ?? 0,
  };
}
/*
|--------------------------------------------------------------------------
| Pending Overview
|--------------------------------------------------------------------------
*/

export async function getPendingOverview() {
  const [employers, requirements, medicals, visas, deployments] = await Promise.all([
    supabase
      .from("employers")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("approval_status", "pending"),

    supabase
      .from("requirements")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "requirement_submitted"),

    supabase
      .from("medicals")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "pending"),

    supabase
      .from("visas")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "pending"),

    supabase
      .from("deployments")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "pending"),
  ]);

  return {
    pendingEmployers: employers.count ?? 0,
    pendingRequirements: requirements.count ?? 0,
    pendingMedicals: medicals.count ?? 0,
    pendingVisas: visas.count ?? 0,
    pendingDeployments: deployments.count ?? 0,
  };
}
/*
|--------------------------------------------------------------------------
| Recruitment Funnel
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Dashboard Report
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Dashboard Analytics
|--------------------------------------------------------------------------
*/

export async function getDashboardAnalytics() {
  const [summary, pending, funnel] = await Promise.all([
    getDashboardReport(),
    getPendingOverview(),
    getRecruitmentFunnel(),
  ]);

  return {
    summary,
    pending,
    funnel,
  };
}
