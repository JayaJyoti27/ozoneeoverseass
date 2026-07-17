import { supabase } from "../config/supabase";
import { ConflictError, DatabaseError, NotFoundError } from "../utils/AppError";

import { CreateOfferDto } from "../validators/offerSchema";

export async function createOffer(adminId: string, payload: CreateOfferDto) {
  /*
  --------------------------------------------------------------------------
  Verify Application
  --------------------------------------------------------------------------
  */

  const { data: application, error: applicationError } = await supabase
    .from("applications")
    .select(
      `
        *,
        candidate:candidates(
          id,
          name,
          email
        ),
        employer:employers(
          id,
          company_name
        ),
        job:jobs(
          id,
          title
        )
      `,
    )
    .eq("id", payload.application_id)
    .single();

  if (applicationError || !application) {
    throw new NotFoundError("Application not found.");
  }

  /*
  --------------------------------------------------------------------------
  Verify Candidate Selected
  --------------------------------------------------------------------------
  */

  if (application.internal_status !== "selected") {
    throw new ConflictError("Offer can only be created for selected candidates.");
  }

  /*
  --------------------------------------------------------------------------
  Duplicate Offer
  --------------------------------------------------------------------------
  */

  const { data: duplicateOffer } = await supabase
    .from("offers")
    .select("id,status")
    .eq("application_id", payload.application_id)
    .not("status", "in", "(withdrawn,rejected,expired)")
    .maybeSingle();

  if (duplicateOffer) {
    throw new ConflictError("An active offer already exists for this application.");
  }

  /*
  --------------------------------------------------------------------------
  Verify Interview
  --------------------------------------------------------------------------
  */

  const { data: interview } = await supabase
    .from("interviews")
    .select("id,status,result")
    .eq("application_id", payload.application_id)
    .order("completed_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (!interview) {
    throw new ConflictError("Interview must be completed before creating an offer.");
  }

  if (interview.status !== "completed" || interview.result !== "selected") {
    throw new ConflictError("Latest interview has not resulted in selection.");
  }

  /*
  --------------------------------------------------------------------------
  Create Offer
  --------------------------------------------------------------------------
  */

  const { data: offer, error } = await supabase
    .from("offers")
    .insert({
      application_id: payload.application_id,

      job_order_id: payload.job_order_id,

      employer_id: payload.employer_id,

      candidate_id: payload.candidate_id,

      salary: payload.salary,

      currency: payload.currency,

      contract_duration: payload.contract_duration,

      joining_date: payload.joining_date,

      location: payload.location,

      accommodation: payload.accommodation,

      transport: payload.transport,

      food: payload.food,

      notes: payload.notes,

      expires_at: payload.expires_at,

      status: "draft",

      created_by: adminId,
    })
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to create offer.", error);
  }

  /*
  --------------------------------------------------------------------------
  Update Application
  --------------------------------------------------------------------------
  */

  await supabase
    .from("applications")
    .update({
      internal_status: "offer_letter_issued",

      last_status_change: new Date().toISOString(),
    })
    .eq("id", payload.application_id);

  /*
  --------------------------------------------------------------------------
  Status History
  --------------------------------------------------------------------------
  */

  await supabase.from("application_status_history").insert({
    application_id: payload.application_id,

    status: "offer_letter_issued",

    changed_by: adminId,

    remarks: "Offer created.",
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: payload.candidate_id,

    title: "Offer Created",

    message: "An employment offer has been prepared for you.",

    type: "offer",

    related_entity: "offer",

    related_entity_id: offer.id,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: payload.employer_id,

    title: "Offer Draft Created",

    message: `Offer draft created for ${application.candidate.name}.`,

    type: "offer",

    related_entity: "offer",

    related_entity_id: offer.id,
  });

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Offer Created",

    entity: "offer",

    entity_id: offer.id,

    metadata: {
      application_id: payload.application_id,

      salary: payload.salary,

      joining_date: payload.joining_date,
    },
  });

  return offer;
}

import { SendOfferDto } from "../validators/offerSchema";

export async function sendOffer(offerId: string, adminId: string, payload: SendOfferDto) {
  /*
  --------------------------------------------------------------------------
  Fetch Offer
  --------------------------------------------------------------------------
  */

  const { data: offer, error } = await supabase
    .from("offers")
    .select(
      `
        *,
        application:applications(
          id
        ),
        candidate:candidates(
          id,
          name
        ),
        employer:employers(
          id,
          company_name
        )
      `,
    )
    .eq("id", offerId)
    .single();

  if (error || !offer) {
    throw new NotFoundError("Offer not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validate Status
  --------------------------------------------------------------------------
  */

  if (offer.status !== "draft") {
    throw new ConflictError("Only draft offers can be sent.");
  }

  /*
  --------------------------------------------------------------------------
  Send Offer
  --------------------------------------------------------------------------
  */

  const { data: updated, error: updateError } = await supabase
    .from("offers")
    .update({
      status: "sent",

      offer_letter_url: payload.offer_letter_url,

      sent_at: new Date().toISOString(),

      updated_at: new Date().toISOString(),
    })
    .eq("id", offerId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to send offer.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Update Application
  --------------------------------------------------------------------------
  */

  await supabase
    .from("applications")
    .update({
      internal_status: "offer_letter_issued",

      last_status_change: new Date().toISOString(),
    })
    .eq("id", offer.application.id);

  /*
  --------------------------------------------------------------------------
  Status History
  --------------------------------------------------------------------------
  */

  await supabase.from("application_status_history").insert({
    application_id: offer.application.id,

    status: "offer_letter_issued",

    changed_by: adminId,

    remarks: "Offer sent to candidate.",
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: offer.candidate.id,

    title: "Offer Letter Received",

    message: "Your employment offer is ready for review.",

    type: "offer",

    related_entity: "offer",

    related_entity_id: offerId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: offer.employer.id,

    title: "Offer Sent",

    message: `Offer sent to ${offer.candidate.name}.`,

    type: "offer",

    related_entity: "offer",

    related_entity_id: offerId,
  });

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Offer Sent",

    entity: "offer",

    entity_id: offerId,

    metadata: {
      offer_letter_url: payload.offer_letter_url,
    },
  });

  return updated;
}

import { AcceptOfferDto } from "../validators/offerSchema";

export async function acceptOffer(offerId: string, candidateId: string, payload: AcceptOfferDto) {
  /*
  --------------------------------------------------------------------------
  Fetch Offer
  --------------------------------------------------------------------------
  */

  const { data: offer, error } = await supabase
    .from("offers")
    .select(
      `
      *,
      application:applications(
        id
      ),
      employer:employers(
        id,
        company_name
      )
    `,
    )
    .eq("id", offerId)
    .single();

  if (error || !offer) {
    throw new NotFoundError("Offer not found.");
  }

  /*
  --------------------------------------------------------------------------
  Ownership
  --------------------------------------------------------------------------
  */

  if (offer.candidate_id !== candidateId) {
    throw new ConflictError("You cannot accept this offer.");
  }

  /*
  --------------------------------------------------------------------------
  Validate Status
  --------------------------------------------------------------------------
  */

  if (offer.status !== "sent") {
    throw new ConflictError("Only sent offers can be accepted.");
  }

  /*
  --------------------------------------------------------------------------
  Offer Expired
  --------------------------------------------------------------------------
  */

  if (offer.expires_at && new Date(offer.expires_at) < new Date()) {
    throw new ConflictError("Offer has expired.");
  }

  /*
  --------------------------------------------------------------------------
  Update Offer
  --------------------------------------------------------------------------
  */

  const { data: updatedOffer, error: updateError } = await supabase
    .from("offers")
    .update({
      status: "accepted",

      responded_at: new Date().toISOString(),

      updated_at: new Date().toISOString(),
    })
    .eq("id", offerId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to accept offer.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Update Application
  --------------------------------------------------------------------------
  */

  await supabase
    .from("applications")
    .update({
      internal_status: "documents_verification",

      last_status_change: new Date().toISOString(),
    })
    .eq("id", offer.application.id);

  /*
  --------------------------------------------------------------------------
  Status History
  --------------------------------------------------------------------------
  */

  await supabase.from("application_status_history").insert({
    application_id: offer.application.id,

    status: "documents_verification",

    changed_by: candidateId,

    remarks: payload.remarks ?? "Candidate accepted the offer.",
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: candidateId,

    title: "Offer Accepted",

    message: "You accepted the employment offer.",

    type: "offer",

    related_entity: "offer",

    related_entity_id: offerId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: offer.employer.id,

    title: "Offer Accepted",

    message: "Candidate accepted the employment offer.",

    type: "offer",

    related_entity: "offer",

    related_entity_id: offerId,
  });

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: candidateId,

    action: "Offer Accepted",

    entity: "offer",

    entity_id: offerId,

    metadata: {
      application_id: offer.application.id,
    },
  });

  return updatedOffer;
}

import { RejectOfferDto } from "../validators/offerSchema";

export async function rejectOffer(offerId: string, candidateId: string, payload: RejectOfferDto) {
  /*
  --------------------------------------------------------------------------
  Fetch Offer
  --------------------------------------------------------------------------
  */

  const { data: offer, error } = await supabase
    .from("offers")
    .select(
      `
      *,
      application:applications(
        id
      ),
      employer:employers(
        id,
        company_name
      )
    `,
    )
    .eq("id", offerId)
    .single();

  if (error || !offer) {
    throw new NotFoundError("Offer not found.");
  }

  /*
  --------------------------------------------------------------------------
  Ownership
  --------------------------------------------------------------------------
  */

  if (offer.candidate_id !== candidateId) {
    throw new ConflictError("You cannot reject this offer.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (offer.status !== "sent") {
    throw new ConflictError("Only sent offers can be rejected.");
  }

  /*
  --------------------------------------------------------------------------
  Expired
  --------------------------------------------------------------------------
  */

  if (offer.expires_at && new Date(offer.expires_at) < new Date()) {
    throw new ConflictError("Offer has already expired.");
  }

  /*
  --------------------------------------------------------------------------
  Update Offer
  --------------------------------------------------------------------------
  */

  const { data: updatedOffer, error: updateError } = await supabase
    .from("offers")
    .update({
      status: "rejected",
      responded_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", offerId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to reject offer.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Update Application
  --------------------------------------------------------------------------
  */

  await supabase
    .from("applications")
    .update({
      internal_status: "rejected",
      last_status_change: new Date().toISOString(),
    })
    .eq("id", offer.application.id);

  /*
  --------------------------------------------------------------------------
  Status History
  --------------------------------------------------------------------------
  */

  await supabase.from("application_status_history").insert({
    application_id: offer.application.id,
    status: "rejected",
    changed_by: candidateId,
    remarks: payload.reason ?? "Candidate rejected the offer.",
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: candidateId,
    title: "Offer Rejected",
    message: "You rejected the employment offer.",
    type: "offer",
    related_entity: "offer",
    related_entity_id: offerId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: offer.employer.id,
    title: "Offer Rejected",
    message: "Candidate has rejected the employment offer.",
    type: "offer",
    related_entity: "offer",
    related_entity_id: offerId,
  });

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: candidateId,
    action: "Offer Rejected",
    entity: "offer",
    entity_id: offerId,
    metadata: {
      application_id: offer.application.id,
      reason: payload.reason,
    },
  });

  return updatedOffer;
}

import { WithdrawOfferDto } from "../validators/offerSchema";

export async function withdrawOffer(offerId: string, adminId: string, payload: WithdrawOfferDto) {
  /*
  --------------------------------------------------------------------------
  Fetch Offer
  --------------------------------------------------------------------------
  */

  const { data: offer, error } = await supabase
    .from("offers")
    .select(
      `
      *,
      application:applications(
        id
      ),
      candidate:candidates(
        id,
        name,
        email
      ),
      employer:employers(
        id,
        company_name
      )
    `,
    )
    .eq("id", offerId)
    .single();

  if (error || !offer) {
    throw new NotFoundError("Offer not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (offer.status === "accepted") {
    throw new ConflictError("Accepted offers cannot be withdrawn.");
  }

  if (offer.status === "withdrawn") {
    throw new ConflictError("Offer has already been withdrawn.");
  }

  if (offer.status === "rejected") {
    throw new ConflictError("Rejected offers cannot be withdrawn.");
  }

  if (offer.status === "expired") {
    throw new ConflictError("Expired offers cannot be withdrawn.");
  }

  /*
  --------------------------------------------------------------------------
  Withdraw Offer
  --------------------------------------------------------------------------
  */

  const { data: updatedOffer, error: updateError } = await supabase
    .from("offers")
    .update({
      status: "withdrawn",
      updated_at: new Date().toISOString(),
    })
    .eq("id", offerId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to withdraw offer.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Restore Application Status
  --------------------------------------------------------------------------
  */

  await supabase
    .from("applications")
    .update({
      internal_status: "selected",
      last_status_change: new Date().toISOString(),
    })
    .eq("id", offer.application.id);

  /*
  --------------------------------------------------------------------------
  Status History
  --------------------------------------------------------------------------
  */

  await supabase.from("application_status_history").insert({
    application_id: offer.application.id,
    status: "selected",
    changed_by: adminId,
    remarks: `Offer withdrawn: ${payload.reason}`,
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: offer.candidate.id,
    title: "Offer Withdrawn",
    message: "The employment offer has been withdrawn.",
    type: "offer",
    related_entity: "offer",
    related_entity_id: offerId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: offer.employer.id,
    title: "Offer Withdrawn",
    message: `Offer withdrawn for ${offer.candidate.name}.`,
    type: "offer",
    related_entity: "offer",
    related_entity_id: offerId,
  });

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,
    action: "Offer Withdrawn",
    entity: "offer",
    entity_id: offerId,
    metadata: {
      application_id: offer.application.id,
      reason: payload.reason,
    },
  });

  return updatedOffer;
}

export async function getOffer(offerId: string) {
  const { data, error } = await supabase
    .from("offers")
    .select(
      `
      *,

      application:applications(
        id,
        internal_status,

        candidate:candidates(
          id,
          name,
          email,
          phone,
          nationality,
          specialty,
          experience_years,
          cv_url
        ),

        employer:employers(
          id,
          company_name,
          contact_person,
          email,
          phone
        ),

        job:jobs(
          id,
          title,
          country,
          category,
          salary_min,
          salary_max,
          currency
        )
      ),

      job_order:job_orders(
        id,
        title,
        status
      )
    `,
    )
    .eq("id", offerId)
    .single();

  if (error || !data) {
    throw new NotFoundError("Offer not found.");
  }

  return data;
}

interface ListOfferFilters {
  page?: number;
  limit?: number;

  employerId?: string;

  candidateId?: string;

  applicationId?: string;

  jobOrderId?: string;

  status?: string;
}

export async function listOffers(filters: ListOfferFilters = {}) {
  const page = filters.page ?? 1;

  const limit = filters.limit ?? 20;

  let query = supabase.from("offers").select(
    `
      *,

      candidate:candidates(
        id,
        name
      ),

      employer:employers(
        id,
        company_name
      ),

      application:applications(
        id,
        internal_status
      ),

      job_order:job_orders(
        id,
        title
      )
      `,
    {
      count: "exact",
    },
  );

  if (filters.employerId) {
    query = query.eq("employer_id", filters.employerId);
  }

  if (filters.candidateId) {
    query = query.eq("candidate_id", filters.candidateId);
  }

  if (filters.applicationId) {
    query = query.eq("application_id", filters.applicationId);
  }

  if (filters.jobOrderId) {
    query = query.eq("job_order_id", filters.jobOrderId);
  }

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  query = query
    .order("created_at", {
      ascending: false,
    })
    .range((page - 1) * limit, page * limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return {
    data,

    pagination: {
      page,

      limit,

      total: count ?? 0,

      totalPages: Math.ceil((count ?? 0) / limit),
    },
  };
}
