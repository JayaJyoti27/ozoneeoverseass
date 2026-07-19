import { supabase } from "../../config/supabase";
import { DatabaseError, NotFoundError } from "../../../../src/utils/AppError";

/*
|--------------------------------------------------------------------------
| My Documents
|--------------------------------------------------------------------------
*/

export async function getCandidateDocuments(candidateId: string) {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("candidate_id", candidateId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new DatabaseError("Unable to fetch documents.", error);
  }

  return data ?? [];
}

/*
|--------------------------------------------------------------------------
| Document Details
|--------------------------------------------------------------------------
*/

export async function getCandidateDocument(candidateId: string, documentId: string) {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("candidate_id", candidateId)
    .eq("id", documentId)
    .single();

  if (error || !data) {
    throw new NotFoundError("Document not found.");
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Upload Document
|--------------------------------------------------------------------------
*/

export async function uploadCandidateDocument(candidateId: string, payload: any) {
  const { data, error } = await supabase
    .from("documents")
    .insert({
      ...payload,
      candidate_id: candidateId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to upload document.", error);
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Replace Document
|--------------------------------------------------------------------------
*/

export async function replaceCandidateDocument(
  candidateId: string,
  documentId: string,
  payload: any,
) {
  const { data, error } = await supabase
    .from("documents")
    .update({
      ...payload,
      version: payload.version ?? 2,
      status: "pending",
      verified_by: null,
      verified_at: null,
      rejection_reason: null,
      updated_at: new Date().toISOString(),
    })
    .eq("candidate_id", candidateId)
    .eq("id", documentId)
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to replace document.", error);
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Delete Document
|--------------------------------------------------------------------------
*/

export async function deleteCandidateDocument(candidateId: string, documentId: string) {
  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("candidate_id", candidateId)
    .eq("id", documentId);

  if (error) {
    throw new DatabaseError("Unable to delete document.", error);
  }

  return {
    success: true,
  };
}
