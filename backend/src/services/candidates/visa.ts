import { supabase } from "../../config/supabase";
import { DatabaseError, NotFoundError } from "../../utils/AppError";

/*
|--------------------------------------------------------------------------
| My Visas
|--------------------------------------------------------------------------
*/

export async function getCandidateVisas(candidateId: string) {
  const { data, error } = await supabase
    .from("visas")
    .select("*")
    .eq("candidate_id", candidateId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new DatabaseError("Unable to fetch visa records.", error);
  }

  return data ?? [];
}

/*
|--------------------------------------------------------------------------
| Visa Details
|--------------------------------------------------------------------------
*/

export async function getCandidateVisa(candidateId: string, visaId: string) {
  const { data, error } = await supabase
    .from("visas")
    .select("*")
    .eq("candidate_id", candidateId)
    .eq("id", visaId)
    .single();

  if (error || !data) {
    throw new NotFoundError("Visa record not found.");
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Latest Visa
|--------------------------------------------------------------------------
*/

export async function getLatestVisa(candidateId: string) {
  const visas = await getCandidateVisas(candidateId);

  return visas[0] ?? null;
}

/*
|--------------------------------------------------------------------------
| Visa Status
|--------------------------------------------------------------------------
*/

export async function getVisaStatus(candidateId: string) {
  const latest = await getLatestVisa(candidateId);

  return {
    status: latest?.status ?? "pending",

    visaNumber: latest?.visa_number ?? null,

    passportNumber: latest?.passport_number ?? null,

    embassy: latest?.embassy_name ?? null,

    submissionDate: latest?.submission_date ?? null,

    approvalDate: latest?.approval_date ?? null,

    issueDate: latest?.issue_date ?? null,

    expiryDate: latest?.expiry_date ?? null,

    remarks: latest?.remarks ?? null,
  };
}
