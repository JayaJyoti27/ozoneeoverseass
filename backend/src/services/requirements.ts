import { supabase } from "../config/supabase";

interface RequirementFilters {
  search?: string;
  status?: string;
}

export async function listRequirements({ search, status }: RequirementFilters) {
  let query = supabase.from("requirements").select("*").order("created_at", { ascending: false });

  if (search) {
    query = query.or(`company_name.ilike.%${search}%,role.ilike.%${search}%`);
  }
  if (status) {
    query = query.eq("status", status);
  }

  return await query;
}

export async function approveRequirement(id: string) {
  return await supabase
    .from("requirements")
    .update({ status: "approved" })
    .eq("id", id)
    .select()
    .single();
}

export async function rejectRequirement(id: string) {
  return await supabase
    .from("requirements")
    .update({ status: "rejected" })
    .eq("id", id)
    .select()
    .single();
}

export async function convertRequirement(id: string) {
  const { data: requirement, error: fetchError } = await supabase
    .from("requirements")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !requirement) {
    return { data: null, error: fetchError ?? new Error("Requirement not found") };
  }

  if (requirement.status !== "approved") {
    return { data: null, error: new Error("Only approved requirements can be converted") };
  }

  const { data: job, error: jobError } = await supabase
    .from("jobs")
    .insert({
      title: requirement.role,
      country: requirement.country,
      sector: requirement.sector,
      employer_type: requirement.company_name,
      status: "active",
      description: requirement.message ?? "",
    })
    .select()
    .single();

  if (jobError) {
    return { data: null, error: jobError };
  }

  const { data, error } = await supabase
    .from("requirements")
    .update({ status: "converted", converted_job_id: job.id })
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}
