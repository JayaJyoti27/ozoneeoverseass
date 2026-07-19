import { supabase } from "../../config/supabase";
import { DatabaseError } from "../../../../src/utils/AppError";

/*
|--------------------------------------------------------------------------
| General Settings
|--------------------------------------------------------------------------
*/

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    throw new DatabaseError("Unable to fetch settings.", error);
  }

  return data;
}

export async function updateSettings(payload: any) {
  const { data, error } = await supabase
    .from("settings")
    .update(payload)
    .eq("id", payload.id)
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to update settings.", error);
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Countries
|--------------------------------------------------------------------------
*/

export async function getCountries() {
  const { data, error } = await supabase.from("countries").select("*").order("name");

  if (error) {
    throw new DatabaseError("Unable to fetch countries.", error);
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Job Categories
|--------------------------------------------------------------------------
*/

export async function getJobCategories() {
  const { data, error } = await supabase.from("job_categories").select("*").order("name");

  if (error) {
    throw new DatabaseError("Unable to fetch job categories.", error);
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Email Templates
|--------------------------------------------------------------------------
*/

export async function getEmailTemplates() {
  const { data, error } = await supabase.from("email_templates").select("*").order("name");

  if (error) {
    throw new DatabaseError("Unable to fetch email templates.", error);
  }

  return data;
}
