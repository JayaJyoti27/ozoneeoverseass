import { supabase } from "../config/supabase";

export async function listCountries() {
  return await supabase.from("countries").select("*").order("name", { ascending: true });
}

export async function createCountry(data: { name: string; code: string; status: string }) {
  return await supabase.from("countries").insert(data).select().single();
}

export async function updateCountry(
  id: string,
  data: Partial<{ name: string; code: string; status: string }>,
) {
  return await supabase.from("countries").update(data).eq("id", id).select().single();
}

export async function deleteCountry(id: string) {
  return await supabase.from("countries").delete().eq("id", id);
}
