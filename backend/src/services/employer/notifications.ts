import { supabase } from "../../config/supabase";
import { DatabaseError, NotFoundError } from "../../utils/AppError";

interface EmployerNotificationFilters {
  employerId: string;

  page?: number;

  limit?: number;

  unreadOnly?: boolean;
}

/*
|--------------------------------------------------------------------------
| Employer Notifications
|--------------------------------------------------------------------------
*/

export async function getEmployerNotifications(filters: EmployerNotificationFilters) {
  const page = filters.page ?? 1;

  const limit = filters.limit ?? 20;

  let query = supabase
    .from("notifications")
    .select("*", {
      count: "exact",
    })
    .eq("user_id", filters.employerId)
    .eq("user_type", "employer")
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

export async function markNotificationRead(employerId: string, notificationId: string) {
  const { data, error } = await supabase
    .from("notifications")
    .update({
      is_read: true,

      read_at: new Date().toISOString(),
    })
    .eq("id", notificationId)
    .eq("user_id", employerId)
    .eq("user_type", "employer")
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

export async function markAllNotificationsRead(employerId: string) {
  const { error } = await supabase
    .from("notifications")
    .update({
      is_read: true,

      read_at: new Date().toISOString(),
    })
    .eq("user_id", employerId)
    .eq("user_type", "employer")
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

export async function getUnreadNotificationCount(employerId: string) {
  const { count, error } = await supabase
    .from("notifications")
    .select("*", {
      head: true,
      count: "exact",
    })
    .eq("user_id", employerId)
    .eq("user_type", "employer")
    .eq("is_read", false);

  if (error) {
    throw new DatabaseError("Unable to fetch notification count.", error);
  }

  return {
    unread: count ?? 0,
  };
}
