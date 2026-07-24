import { supabase } from "../../config/supabase";
import { DatabaseError, NotFoundError } from "../../utils/AppError";

interface CandidateNotificationFilters {
  candidateId: string;

  page?: number;

  limit?: number;

  unreadOnly?: boolean;
}

/*
|--------------------------------------------------------------------------
| Candidate Notifications
|--------------------------------------------------------------------------
*/

export async function getCandidateNotifications(filters: CandidateNotificationFilters) {
  const page = filters.page ?? 1;

  const limit = filters.limit ?? 20;

  let query = supabase
    .from("notifications")
    .select("*", {
      count: "exact",
    })
    .eq("user_id", filters.candidateId)
    .eq("user_type", "candidate")
    .order("created_at", {
      ascending: false,
    });

  if (filters.unreadOnly) {
    query = query.eq("is_read", false);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new DatabaseError("Unable to fetch notifications.", error);
  }

  return {
    notifications: data ?? [],

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
| Mark Notification Read
|--------------------------------------------------------------------------
*/

export async function markNotificationRead(candidateId: string, notificationId: string) {
  const { data, error } = await supabase
    .from("notifications")
    .update({
      is_read: true,

      read_at: new Date().toISOString(),
    })
    .eq("id", notificationId)
    .eq("user_id", candidateId)
    .eq("user_type", "candidate")
    .select()
    .single();

  if (error || !data) {
    throw new NotFoundError("Notification not found.");
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Mark All Notifications Read
|--------------------------------------------------------------------------
*/

export async function markAllNotificationsRead(candidateId: string) {
  const { error } = await supabase
    .from("notifications")
    .update({
      is_read: true,

      read_at: new Date().toISOString(),
    })
    .eq("user_id", candidateId)
    .eq("user_type", "candidate")
    .eq("is_read", false);

  if (error) {
    throw new DatabaseError("Unable to update notifications.", error);
  }

  return {
    success: true,
  };
}

/*
|--------------------------------------------------------------------------
| Notification Count
|--------------------------------------------------------------------------
*/

export async function getUnreadNotificationCount(candidateId: string) {
  const { count, error } = await supabase
    .from("notifications")
    .select("*", {
      head: true,
      count: "exact",
    })
    .eq("user_id", candidateId)
    .eq("user_type", "candidate")
    .eq("is_read", false);

  if (error) {
    throw new DatabaseError("Unable to fetch notification count.", error);
  }

  return {
    unread: count ?? 0,
  };
}
