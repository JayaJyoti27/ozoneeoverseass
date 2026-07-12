import { supabase } from "@/lib/supabase";

export type Candidate = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  nationality: string | null;
  specialty: string | null;
  experience_years: number | null;
  target_countries: string[] | null;
  cv_url: string | null;
  status: string | null;
  created_at: string | null;
};

export type CandidateInsert = Omit<Candidate, "id" | "created_at">;
export type CandidateUpdate = Partial<CandidateInsert>;

function unwrap<T>(data: T | null, error: { message: string } | null): T {
  if (error) throw new Error(error.message);
  if (data === null) throw new Error("No data returned");
  return data;
}

export const candidatesApi = {
  async list(
    filters: { status?: string; specialty?: string; search?: string } = {},
  ): Promise<Candidate[]> {
    let q = supabase.from("candidates").select("*").order("created_at", { ascending: false });
    if (filters.status) q = q.eq("status", filters.status);
    if (filters.specialty) q = q.eq("specialty", filters.specialty);
    if (filters.search) {
      const s = `%${filters.search}%`;
      q = q.or(`name.ilike.${s},email.ilike.${s}`);
    }
    const { data, error } = await q;
    return unwrap(data as Candidate[], error);
  },

  async getById(id: string): Promise<Candidate> {
    const { data, error } = await supabase.from("candidates").select("*").eq("id", id).single();
    return unwrap(data as Candidate, error);
  },

  async create(input: CandidateInsert): Promise<Candidate> {
    const { data, error } = await supabase.from("candidates").insert(input).select().single();
    return unwrap(data as Candidate, error);
  },

  async update(id: string, patch: CandidateUpdate): Promise<Candidate> {
    const { data, error } = await supabase
      .from("candidates")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    return unwrap(data as Candidate, error);
  },

  async updateStatus(id: string, status: string): Promise<Candidate> {
    return candidatesApi.update(id, { status });
  },

  async uploadCV(file: File): Promise<string> {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("cvs")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });
    if (error) throw new Error(error.message);
    const { data } = supabase.storage.from("cvs").getPublicUrl(fileName);
    return data.publicUrl;
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from("candidates").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};
