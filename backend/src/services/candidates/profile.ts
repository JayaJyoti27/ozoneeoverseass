import { supabase } from "../../config/supabase";
import { DatabaseError, NotFoundError } from "../../utils/AppError";

/*
|--------------------------------------------------------------------------
| Get Candidate Profile
|--------------------------------------------------------------------------
*/

export async function getCandidateProfile(candidateId: string) {
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .eq("id", candidateId)
    .single();

  if (error || !data) {
    throw new NotFoundError("Candidate profile not found.");
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Update Candidate Profile
|--------------------------------------------------------------------------
*/

export async function updateCandidateProfile(candidateId: string, payload: any) {
  const { data, error } = await supabase
    .from("candidates")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", candidateId)
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to update profile.", error);
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Profile Completion
|--------------------------------------------------------------------------
*/

export async function getProfileCompletion(candidateId: string) {
  const profile = await getCandidateProfile(candidateId);

  const fields = [
    profile.full_name,
    profile.email,
    profile.phone,
    profile.gender,
    profile.dob,
    profile.passport_number,
    profile.current_location,
    profile.nationality,
    profile.education,
    profile.experience,
    profile.skills,
    profile.languages,
  ];

  // education/experience/skills/languages are jsonb arrays — an empty
  // array is still "truthy" in JS, so don't count them as filled unless
  // they actually have entries.
  const completed = fields.filter((f) => (Array.isArray(f) ? f.length > 0 : Boolean(f))).length;

  return {
    completion: Math.round((completed / fields.length) * 100),
  };
}
