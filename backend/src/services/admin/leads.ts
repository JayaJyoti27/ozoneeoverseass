import { supabase } from "../../config/supabase";
import { DatabaseError, NotFoundError } from "../../../../src/utils/AppError";

interface LeadFilters {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
}

/*
|--------------------------------------------------------------------------
| Get Leads
|--------------------------------------------------------------------------
*/

export async function getLeads(filters: LeadFilters) {
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 20;

  let query = supabase.from("leads").select("*", { count: "exact" });

  if (filters.type) {
    query = query.eq("type", filters.type);
  }

  if (filters.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`,
    );
  }

  query = query
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new DatabaseError("Unable to fetch leads.", error);
  }

  return {
    leads: data ?? [],
    pagination: {
      page,
      limit,
      total: count ?? 0,
      totalPages: Math.ceil((count ?? 0) / limit),
    },
  };
}

/*
|--------------------------------------------------------------------------
| Get Lead
|--------------------------------------------------------------------------
*/

export async function getLead(id: string) {
  const { data, error } = await supabase.from("leads").select("*").eq("id", id).single();

  if (error || !data) {
    throw new NotFoundError("Lead not found.");
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Create Lead
|--------------------------------------------------------------------------
*/

export async function createLead(payload: any) {
  const { data, error } = await supabase.from("leads").insert(payload).select().single();

  if (error) {
    throw new DatabaseError("Unable to create lead.", error);
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Delete Lead
|--------------------------------------------------------------------------
*/

export async function deleteLead(id: string) {
  const { error } = await supabase.from("leads").delete().eq("id", id);

  if (error) {
    throw new DatabaseError("Unable to delete lead.", error);
  }

  return { success: true };
}
