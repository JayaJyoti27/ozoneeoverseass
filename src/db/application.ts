import { supabase } from "@/lib/supabase";

export type Application = {
  id: string;
  candidate_id: string | null;
  job_id: string | null;
  status: string | null;
  notes: string | null;
  applied_at: string | null;
};

export type ApplicationInsert = Omit<Application, "id" | "applied_at">;
export type ApplicationUpdate = Partial<ApplicationInsert>;

function unwrap<T>(data: T | null, error: { message: string } | null): T {
  if (error) throw new Error(error.message);
  if (data === null) throw new Error("No data returned");
  return data;
}

export const applicationsApi = {
  async list(
    filters: { status?: string; candidate_id?: string; job_id?: string } = {},
  ): Promise<Application[]> {
    let q = supabase.from("applications").select("*").order("applied_at", { ascending: false });
    if (filters.status) q = q.eq("status", filters.status);
    if (filters.candidate_id) q = q.eq("candidate_id", filters.candidate_id);
    if (filters.job_id) q = q.eq("job_id", filters.job_id);
    const { data, error } = await q;
    return unwrap(data as Application[], error);
  },

  async listByCandidate(candidateId: string): Promise<Application[]> {
    return applicationsApi.list({ candidate_id: candidateId });
  },

  async listByJob(jobId: string): Promise<Application[]> {
    return applicationsApi.list({ job_id: jobId });
  },

  async getById(id: string): Promise<Application> {
    const { data, error } = await supabase.from("applications").select("*").eq("id", id).single();
    return unwrap(data as Application, error);
  },

  async create(input: ApplicationInsert): Promise<Application> {
    const { data, error } = await supabase.from("applications").insert(input).select().single();
    return unwrap(data as Application, error);
  },

  async update(id: string, patch: ApplicationUpdate): Promise<Application> {
    const { data, error } = await supabase
      .from("applications")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    return unwrap(data as Application, error);
  },

  async updateStatus(id: string, status: string, notes?: string): Promise<Application> {
    return applicationsApi.update(id, {
      status,
      ...(notes !== undefined ? { notes } : {}),
    });
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from("applications").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};
