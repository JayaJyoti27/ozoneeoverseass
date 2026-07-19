import { supabase } from "../../../config/supabase";
import { DatabaseError } from "../../../../../src/utils/AppError";

/*
|--------------------------------------------------------------------------
| Candidate Summary
|--------------------------------------------------------------------------
*/

export async function getCandidateSummary() {
  const [total, active, inactive, verified] = await Promise.all([
    supabase.from("candidates").select("*", { count: "exact", head: true }),

    supabase.from("candidates").select("*", { count: "exact", head: true }).eq("status", "active"),

    supabase
      .from("candidates")
      .select("*", { count: "exact", head: true })
      .eq("status", "inactive"),

    supabase.from("candidates").select("*", { count: "exact", head: true }).eq("is_verified", true),
  ]);

  if (total.error || active.error || inactive.error || verified.error) {
    throw new DatabaseError(
      "Unable to fetch candidate summary.",
      total.error ?? active.error ?? inactive.error ?? verified.error,
    );
  }

  return {
    total: total.count ?? 0,
    active: active.count ?? 0,
    inactive: inactive.count ?? 0,
    verified: verified.count ?? 0,
  };
}
/*
|--------------------------------------------------------------------------
| Candidates by Country
|--------------------------------------------------------------------------
*/

export async function getCandidatesByCountry() {
  const { data, error } = await supabase.from("candidates").select("country");

  if (error) {
    throw new DatabaseError("Unable to fetch candidates by country.", error);
  }

  const countries: Record<string, number> = {};

  for (const row of data ?? []) {
    const country = row.country || "Unknown";

    countries[country] = (countries[country] ?? 0) + 1;
  }

  return countries;
}
/*
|--------------------------------------------------------------------------
| Candidates by Profession
|--------------------------------------------------------------------------
*/

export async function getCandidatesByProfession() {
  const { data, error } = await supabase.from("candidates").select("profession");

  if (error) {
    throw new DatabaseError("Unable to fetch professions.", error);
  }

  const professions: Record<string, number> = {};

  for (const row of data ?? []) {
    const profession = row.profession || "Unknown";

    professions[profession] = (professions[profession] ?? 0) + 1;
  }

  return professions;
}
/*
|--------------------------------------------------------------------------
| Monthly Registrations
|--------------------------------------------------------------------------
*/

export async function getMonthlyRegistrations() {
  const { data, error } = await supabase.from("candidates").select("created_at");

  if (error) {
    throw new DatabaseError("Unable to fetch registrations.", error);
  }

  const monthly: Record<string, number> = {};

  for (const row of data ?? []) {
    const month = new Date(row.created_at).toISOString().slice(0, 7);

    monthly[month] = (monthly[month] ?? 0) + 1;
  }

  return monthly;
}
/*
|--------------------------------------------------------------------------
| Candidate Report
|--------------------------------------------------------------------------
*/

export async function getCandidateReport() {
  const [summary, countries, professions, monthly] = await Promise.all([
    getCandidateSummary(),
    getCandidatesByCountry(),
    getCandidatesByProfession(),
    getMonthlyRegistrations(),
  ]);

  return {
    summary,
    countries,
    professions,
    monthly,
  };
}
