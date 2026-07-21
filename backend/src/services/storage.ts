import { supabase } from "../config/supabase";
import { DatabaseError } from "../utils/AppError";

export async function uploadDocument(
  bucket: string,
  path: string,
  file: Buffer,
  contentType: string,
) {
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType,
    upsert: true,
  });

  if (error) {
    throw new DatabaseError("Unable to upload document.", error);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
}
