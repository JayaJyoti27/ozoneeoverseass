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
    profile.first_name,
    profile.last_name,
    profile.email,
    profile.phone,
    profile.gender,
    profile.date_of_birth,
    profile.passport_number,
    profile.current_location,
    profile.nationality,
    profile.education,
    profile.experience,
    profile.skills,
  ];

  const completed = fields.filter(Boolean).length;

  return {
    completion: Math.round((completed / fields.length) * 100),
  };
}
