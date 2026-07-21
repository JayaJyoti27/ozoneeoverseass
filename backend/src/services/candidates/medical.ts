import { supabase } from "../../config/supabase";
import { DatabaseError, NotFoundError } from "../../utils/AppError";

/*
|--------------------------------------------------------------------------
| My Medicals
|--------------------------------------------------------------------------
*/

export async function getCandidateMedicals(candidateId: string) {
  const { data, error } = await supabase
    .from("medicals")
    .select("*")
    .eq("candidate_id", candidateId)
    .order("appointment_date", {
      ascending: false,
    });

  if (error) {
    throw new DatabaseError("Unable to fetch medical records.", error);
  }

  return data ?? [];
}

/*
|--------------------------------------------------------------------------
| Medical Details
|--------------------------------------------------------------------------
*/

export async function getCandidateMedical(candidateId: string, medicalId: string) {
  const { data, error } = await supabase
    .from("medicals")
    .select("*")
    .eq("candidate_id", candidateId)
    .eq("id", medicalId)
    .single();

  if (error || !data) {
    throw new NotFoundError("Medical record not found.");
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Latest Medical
|--------------------------------------------------------------------------
*/

export async function getLatestMedical(candidateId: string) {
  const medicals = await getCandidateMedicals(candidateId);

  return medicals[0] ?? null;
}

/*
|--------------------------------------------------------------------------
| Medical Status
|--------------------------------------------------------------------------
*/

export async function getMedicalStatus(candidateId: string) {
  const latest = await getLatestMedical(candidateId);

  return {
    status: latest?.status ?? "pending",
    appointmentDate: latest?.appointment_date ?? null,
    hospital: latest?.hospital_name ?? null,
    doctor: latest?.doctor_name ?? null,
    expiryDate: latest?.expiry_date ?? null,
    remarks: latest?.remarks ?? null,
  };
}
