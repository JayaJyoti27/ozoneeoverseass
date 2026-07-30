import { supabase } from "../../config/supabase";
import { DatabaseError, NotFoundError } from "../../utils/AppError";

/*
|--------------------------------------------------------------------------
| Get Candidate Profile
|--------------------------------------------------------------------------
*/

// The `candidates` table's real column names (name, current_country,
// passport_expiry) don't match what the frontend/admin/employer code
// expects (full_name, current_location, passport_expiry_date). Translate
// at this boundary so only this file needs to know the real schema.
function toApiShape(row: any) {
  if (!row) return row;
  const { name, current_country, passport_expiry, ...rest } = row;
  return {
    ...rest,
    full_name: name,
    current_location: current_country,
    passport_expiry_date: passport_expiry,
  };
}

export async function getCandidateProfile(candidateId: string) {
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .eq("id", candidateId)
    .single();

  if (error || !data) {
    throw new NotFoundError("Candidate profile not found.");
  }

  return toApiShape(data);
}

/*
|--------------------------------------------------------------------------
| Update Candidate Profile
|--------------------------------------------------------------------------
*/

// Maps API-facing field names (what the frontend sends) to real column
// names in `candidates`. Anything not listed here is assumed to already
// match the real column name.
const FIELD_TO_COLUMN: Record<string, string> = {
  full_name: "name",
  current_location: "current_country",
  passport_expiry_date: "passport_expiry",
};

// No `passport_issue_date` (or any issue-date) column exists in the real
// schema — drop it silently rather than erroring, in case older frontend
// builds still send it.
// `updated_at` also doesn't exist as a column — do NOT write it.
const UNSUPPORTED_FIELDS = ["passport_issue_date", "updated_at"];

const DATE_COLUMNS = ["dob", "passport_expiry"];

export async function updateCandidateProfile(candidateId: string, payload: any) {
  const columnPayload: Record<string, any> = {};

  for (const [key, value] of Object.entries(payload ?? {})) {
    if (UNSUPPORTED_FIELDS.includes(key)) continue;

    const column = FIELD_TO_COLUMN[key] ?? key;

    // Postgres `date` columns reject an empty string — blank form fields
    // send "" rather than omitting the key, so normalize those to null.
    columnPayload[column] = DATE_COLUMNS.includes(column) && value === "" ? null : value;
  }

  const { data, error } = await supabase
    .from("candidates")
    .update(columnPayload)
    .eq("id", candidateId)
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to update profile.", error);
  }

  return toApiShape(data);
}

/*
|--------------------------------------------------------------------------
| Profile Completion
|--------------------------------------------------------------------------
*/

export async function getProfileCompletion(candidateId: string) {
  const { data: profile, error } = await supabase
    .from("candidates")
    .select("*")
    .eq("id", candidateId)
    .single();

  if (error || !profile) {
    throw new NotFoundError("Candidate profile not found.");
  }

  const fields = [
    profile.name,
    profile.email,
    profile.phone,
    profile.gender,
    profile.dob,
    profile.passport_number,
    profile.current_country,
    profile.nationality,
    profile.education,
    profile.experience,
    profile.skills,
    profile.languages,
  ];

  const completed = fields.filter((f) => (Array.isArray(f) ? f.length > 0 : Boolean(f))).length;
  const completion = Math.round((completed / fields.length) * 100);

  // Keep the stored `profile_completion` column in sync too, best-effort.
  await supabase
    .from("candidates")
    .update({ profile_completion: completion })
    .eq("id", candidateId);

  return { completion };
}
