import { supabase } from "@/lib/supabase";

export type Lead = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  type: string | null;
  message: string | null;
  source_page: string | null;
  created_at: string | null;
};

export type LeadInsert = Omit<Lead, "id" | "created_at">;
export type LeadUpdate = Partial<LeadInsert>;

function unwrap<T>(data: T | null, error: { message: string } | null): T {
  if (error) throw new Error(error.message);
  if (data === null) throw new Error("No data returned");
  return data;
}

export const leadsApi = {
  async list(filters: { type?: string; source_page?: string } = {}): Promise<Lead[]> {
    let q = supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (filters.type) q = q.eq("type", filters.type);
    if (filters.source_page) q = q.eq("source_page", filters.source_page);
    const { data, error } = await q;
    return unwrap(data as Lead[], error);
  },

  async getById(id: string): Promise<Lead> {
    const { data, error } = await supabase.from("leads").select("*").eq("id", id).single();
    return unwrap(data as Lead, error);
  },

  async create(input: LeadInsert): Promise<Lead> {
    const { data, error } = await supabase.from("leads").insert(input).select().single();
    return unwrap(data as Lead, error);
  },

  async update(id: string, patch: LeadUpdate): Promise<Lead> {
    const { data, error } = await supabase
      .from("leads")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    return unwrap(data as Lead, error);
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};
