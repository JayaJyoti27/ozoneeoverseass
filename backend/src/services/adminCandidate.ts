import { supabase } from "../config/supabase";

interface CandidateFilters {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export async function listCandidates({
  search,
  status,
  page = 1,
  limit = 10,
  sort = "newest",
}: CandidateFilters) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from("candidates").select("*", { count: "exact" });

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,specialty.ilike.%${search}%`);
  }

  if (status) {
    query = query.eq("status", status);
  }

  if (sort === "oldest") {
    query = query.order("created_at", { ascending: true });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  return await query.range(from, to);
}

export async function getCandidate(id: string) {
  return await supabase.from("candidates").select("*").eq("id", id).single();
}

export async function createCandidate(data: any) {
  return await supabase.from("candidates").insert(data).select().single();
}

export async function updateCandidate(id: string, data: any) {
  return await supabase.from("candidates").update(data).eq("id", id).select().single();
}

export async function archiveCandidate(id: string) {
  return await supabase
    .from("candidates")
    .update({
      status: "archived",
    })
    .eq("id", id)
    .select()
    .single();
}
export async function deleteCandidate(id: string) {
  return await supabase.from("candidates").delete().eq("id", id);
}
