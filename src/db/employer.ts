import { supabase } from "@/lib/supabase";

export type EmployerRequirement = {
  id: string;
  company_name: string | null;
  contact_name: string | null;
  email: string | null;
  country: string | null;
  sector: string | null;
  role: string | null;
  headcount: number | null;
  timeline: string | null;
  message: string | null;
  status: string | null;
  created_at: string | null;
};

export type EmployerRequirementInsert = Omit<EmployerRequirement, "id" | "created_at">;
export type EmployerRequirementUpdate = Partial<EmployerRequirementInsert>;

function unwrap<T>(data: T | null, error: { message: string } | null): T {
  if (error) throw new Error(error.message);
  if (data === null) throw new Error("No data returned");
  return data;
}

export const employerRequirementsApi = {
  async list(
    filters: { status?: string; country?: string; sector?: string } = {},
  ): Promise<EmployerRequirement[]> {
    let q = supabase
      .from("employer_requirements")
      .select("*")
      .order("created_at", { ascending: false });
    if (filters.status) q = q.eq("status", filters.status);
    if (filters.country) q = q.eq("country", filters.country);
    if (filters.sector) q = q.eq("sector", filters.sector);
    const { data, error } = await q;
    return unwrap(data as EmployerRequirement[], error);
  },

  async getById(id: string): Promise<EmployerRequirement> {
    const { data, error } = await supabase
      .from("employer_requirements")
      .select("*")
      .eq("id", id)
      .single();
    return unwrap(data as EmployerRequirement, error);
  },

  async create(input: EmployerRequirementInsert): Promise<EmployerRequirement> {
    const { data, error } = await supabase
      .from("employer_requirements")
      .insert(input)
      .select()
      .single();
    return unwrap(data as EmployerRequirement, error);
  },

  async update(id: string, patch: EmployerRequirementUpdate): Promise<EmployerRequirement> {
    const { data, error } = await supabase
      .from("employer_requirements")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    return unwrap(data as EmployerRequirement, error);
  },

  async updateStatus(id: string, status: string): Promise<EmployerRequirement> {
    return employerRequirementsApi.update(id, { status });
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from("employer_requirements").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};
