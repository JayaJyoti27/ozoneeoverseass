import { supabase } from "../config/supabase";

export async function uploadResume(file: Express.Multer.File) {
  const filename = `${Date.now()}-${file.originalname}`;

  const { error } = await supabase.storage.from("Resumes").upload(filename, file.buffer, {
    contentType: file.mimetype,
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from("Resumes").getPublicUrl(filename);

  return data.publicUrl;
}
