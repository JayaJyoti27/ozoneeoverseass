import { supabase } from "../../config/supabase";
import { DatabaseError } from "../../utils/AppError";

/*
|--------------------------------------------------------------------------
| Get Company Documents
|--------------------------------------------------------------------------
*/

export async function getEmployerDocuments(employerId: string) {
  const { data, error } = await supabase
    .from("employer_documents")
    .select(
      `
      id,
      document_type,
      file_name,
      file_url,
      status,
      expiry_date,
      uploaded_at,
      updated_at
    `,
    )
    .eq("employer_id", employerId)
    .order("uploaded_at", { ascending: false });

  if (error) {
    throw new DatabaseError("Unable to fetch company documents.", error);
  }

  return data;
}
