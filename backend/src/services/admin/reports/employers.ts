import { supabase } from "../../../config/supabase";
import { DatabaseError } from "../../../../../src/utils/AppError";

/*
|--------------------------------------------------------------------------
| Employer Summary
|--------------------------------------------------------------------------
*/

export async function getEmployerSummary() {
  const [total, active, pending, suspended] = await Promise.all([
    supabase.from("employers").select("*", { count: "exact", head: true }),

    supabase.from("employers").select("*", { count: "exact", head: true }).eq("status", "active"),

    supabase
      .from("employers")
      .select("*", { count: "exact", head: true })
      .eq("approval_status", "pending"),

    supabase
      .from("employers")
      .select("*", { count: "exact", head: true })
      .eq("status", "suspended"),
  ]);

  if (total.error || active.error || pending.error || suspended.error) {
    throw new DatabaseError(
      "Unable to fetch employer summary.",
      total.error ?? active.error ?? pending.error ?? suspended.error,
    );
  }

  return {
    total: total.count ?? 0,
    active: active.count ?? 0,
    pending: pending.count ?? 0,
    suspended: suspended.count ?? 0,
  };
}
/*
|--------------------------------------------------------------------------
| Employers by Country
|--------------------------------------------------------------------------
*/

export async function getEmployersByCountry() {
  const { data, error } = await supabase.from("employers").select("country");

  if (error) {
    throw new DatabaseError("Unable to fetch employer countries.", error);
  }

  const countries: Record<string, number> = {};

  for (const employer of data ?? []) {
    const country = employer.country || "Unknown";

    countries[country] = (countries[country] ?? 0) + 1;
  }

  return countries;
}
/*
|--------------------------------------------------------------------------
| Employer Approval Status
|--------------------------------------------------------------------------
*/

export async function getEmployerApprovalStatus() {
  const { data, error } = await supabase.from("employers").select("approval_status");

  if (error) {
    throw new DatabaseError("Unable to fetch approval status.", error);
  }

  const approval: Record<string, number> = {};

  for (const employer of data ?? []) {
    const status = employer.approval_status || "Unknown";

    approval[status] = (approval[status] ?? 0) + 1;
  }

  return approval;
}
/*
|--------------------------------------------------------------------------
| Top Employers
|--------------------------------------------------------------------------
*/

export async function getTopEmployers() {
  const { data, error } = await supabase.from("job_orders").select(`
      employer_id,
      employers(
        company_name
      )
    `);

  if (error) {
    throw new DatabaseError("Unable to fetch top employers.", error);
  }

  const map = new Map<
    string,
    {
      employerId: string;
      companyName: string;
      totalJobs: number;
    }
  >();

  for (const row of data ?? []) {
    const employerId = row.employer_id;

    const companyName = (row as any).employers?.company_name ?? "Unknown";

    if (!map.has(employerId)) {
      map.set(employerId, {
        employerId,
        companyName,
        totalJobs: 0,
      });
    }

    map.get(employerId)!.totalJobs++;
  }

  return [...map.values()].sort((a, b) => b.totalJobs - a.totalJobs).slice(0, 10);
}
/*
|--------------------------------------------------------------------------
| Employer Report
|--------------------------------------------------------------------------
*/

export async function getEmployerReport() {
  const [summary, countries, approval, topEmployers] = await Promise.all([
    getEmployerSummary(),
    getEmployersByCountry(),
    getEmployerApprovalStatus(),
    getTopEmployers(),
  ]);

  return {
    summary,
    countries,
    approval,
    topEmployers,
  };
}
