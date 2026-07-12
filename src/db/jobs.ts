import { supabase } from "@/lib/supabase";

export type Job = {
  id: string;
  title: string | null;
  country: string | null;
  city: string | null;
  sector: string | null;
  employer_type: string | null;
  salary_min: number | null;
  salary_max: number | null;
  currency: string | null;
  experience_required: string | null;
  license_required: string | null;
  description: string | null;
  status: string | null;
  created_at: string | null;
};

export type JobInsert = Omit<Job, "id" | "created_at">;
export type JobUpdate = Partial<JobInsert>;

export interface JobFilters {
  country?: string;
  city?: string;
  sector?: string;
  status?: string;
  search?: string;
}

function unwrap<T>(data: T | null, error: { message: string } | null): T {
  if (error) throw new Error(error.message);
  if (data === null) throw new Error("No data returned");
  return data;
}

export const jobsApi = {
  async list(filters: JobFilters = {}): Promise<Job[]> {
    let q = supabase.from("jobs").select("*").order("created_at", { ascending: false });
    if (filters.country) q = q.eq("country", filters.country);
    if (filters.city) q = q.eq("city", filters.city);
    if (filters.sector) q = q.eq("sector", filters.sector);
    if (filters.status) q = q.eq("status", filters.status);
    if (filters.search) {
      const s = `%${filters.search}%`;
      q = q.or(`title.ilike.${s},description.ilike.${s}`);
    }
    const { data, error } = await q;
    return unwrap(data as Job[], error);
  },

  async listActive(): Promise<Job[]> {
    return jobsApi.list({ status: "active" });
  },

  async listByCountry(country: string): Promise<Job[]> {
    return jobsApi.list({ country, status: "active" });
  },

  async getById(id: string): Promise<Job> {
    const { data, error } = await supabase.from("jobs").select("*").eq("id", id).single();
    return unwrap(data as Job, error);
  },

  async create(input: JobInsert): Promise<Job> {
    const { data, error } = await supabase.from("jobs").insert(input).select().single();
    return unwrap(data as Job, error);
  },

  async update(id: string, patch: JobUpdate): Promise<Job> {
    const { data, error } = await supabase
      .from("jobs")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    return unwrap(data as Job, error);
  },

  async archive(id: string): Promise<Job> {
    return jobsApi.update(id, { status: "archived" });
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};
