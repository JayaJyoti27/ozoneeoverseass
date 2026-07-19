import { supabase } from "../../config/supabase";
import { DatabaseError, NotFoundError } from "../../../../src/utils/AppError";

/*
|--------------------------------------------------------------------------
| My Offers
|--------------------------------------------------------------------------
*/

export async function getCandidateOffers(candidateId: string) {
  const { data, error } = await supabase
    .from("offers")
    .select("*")
    .eq("candidate_id", candidateId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new DatabaseError("Unable to fetch offers.", error);
  }

  return data ?? [];
}

/*
|--------------------------------------------------------------------------
| Offer Details
|--------------------------------------------------------------------------
*/

export async function getCandidateOffer(candidateId: string, offerId: string) {
  const { data, error } = await supabase
    .from("offers")
    .select("*")
    .eq("candidate_id", candidateId)
    .eq("id", offerId)
    .single();

  if (error || !data) {
    throw new NotFoundError("Offer not found.");
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Accept Offer
|--------------------------------------------------------------------------
*/

export async function acceptOffer(candidateId: string, offerId: string) {
  const { data, error } = await supabase
    .from("offers")
    .update({
      status: "accepted",
      responded_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("candidate_id", candidateId)
    .eq("id", offerId)
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

export async function rejectOffer(candidateId: string, offerId: string, reason?: string) {
  const { data, error } = await supabase
    .from("offers")
    .update({
      status: "rejected",
      notes: reason,
      responded_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("candidate_id", candidateId)
    .eq("id", offerId)
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to reject offer.", error);
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Latest Active Offer
|--------------------------------------------------------------------------
*/

export async function getLatestOffer(candidateId: string) {
  const offers = await getCandidateOffers(candidateId);

  return (
    offers.find(
      (offer) =>
        offer.status !== "accepted" && offer.status !== "rejected" && offer.status !== "expired",
    ) ?? null
  );
}
