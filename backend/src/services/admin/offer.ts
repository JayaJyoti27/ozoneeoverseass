import { supabase } from "../../config/supabase";
import { DatabaseError, NotFoundError } from "../../utils/AppError";

interface OfferFilters {
  page?: number;
  limit?: number;
  status?: string;
  employerId?: string;
  candidateId?: string;
  search?: string;
}

/*
|--------------------------------------------------------------------------
| Get Offers
|--------------------------------------------------------------------------
*/

export async function getOffers(filters: OfferFilters) {
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 20;

  let query = supabase.from("offers").select("*", { count: "exact" });

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  if (filters.employerId) {
    query = query.eq("employer_id", filters.employerId);
  }

  if (filters.candidateId) {
    query = query.eq("candidate_id", filters.candidateId);
  }

  query = query
    .order("created_at", {
      ascending: false,
    })
    .range((page - 1) * limit, page * limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new DatabaseError("Unable to fetch offers.", error);
  }

  return {
    offers: data ?? [],
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
| Get Offer
|--------------------------------------------------------------------------
*/

export async function getOffer(id: string) {
  const { data, error } = await supabase.from("offers").select("*").eq("id", id).single();

  if (error || !data) {
    throw new NotFoundError("Offer not found.");
  }

  return data;
}
/*
|--------------------------------------------------------------------------
| Create Offer
|--------------------------------------------------------------------------
*/

export async function createOffer(payload: any) {
  const { data, error } = await supabase
    .from("offers")
    .insert({
      ...payload,
      sent_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to create offer.", error);
  }

  return data;
}
/*
|--------------------------------------------------------------------------
| Send Offer
|--------------------------------------------------------------------------
*/

export async function sendOffer(id: string) {
  const { data, error } = await supabase
    .from("offers")
    .update({
      status: "sent",
      sent_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to send offer.", error);
  }

  return data;
}
/*
|--------------------------------------------------------------------------
| Accept Offer
|--------------------------------------------------------------------------
*/

export async function acceptOffer(id: string) {
  const { data, error } = await supabase
    .from("offers")
    .update({
      status: "accepted",
      responded_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to accept offer.", error);
  }

  return data;
}
/*
|--------------------------------------------------------------------------
| Reject Offer
|--------------------------------------------------------------------------
*/

export async function rejectOffer(id: string) {
  const { data, error } = await supabase
    .from("offers")
    .update({
      status: "rejected",
      responded_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to reject offer.", error);
  }

  return data;
}
/*
|--------------------------------------------------------------------------
| Expire Offer
|--------------------------------------------------------------------------
*/

export async function expireOffer(id: string) {
  const { data, error } = await supabase
    .from("offers")
    .update({
      status: "expired",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to expire offer.", error);
  }

  return data;
}
