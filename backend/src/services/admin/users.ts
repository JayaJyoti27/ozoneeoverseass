import { supabase } from "../../config/supabase";
import { DatabaseError, NotFoundError } from "../../../../src/utils/AppError";

interface UserFilters {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
  search?: string;
}

/*
|--------------------------------------------------------------------------
| Get Users
|--------------------------------------------------------------------------
*/

export async function getUsers(filters: UserFilters) {
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 20;

  let query = supabase.from("users").select("*", {
    count: "exact",
  });

  if (filters.role) {
    query = query.eq("role", filters.role);
  }

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  if (filters.search) {
    query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
  }

  query = query
    .order("created_at", {
      ascending: false,
    })
    .range((page - 1) * limit, page * limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new DatabaseError("Unable to fetch users.", error);
  }

  return {
    users: data ?? [],
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
| Get User
|--------------------------------------------------------------------------
*/

export async function getUser(id: string) {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single();

  if (error || !data) {
    throw new NotFoundError("User not found.");
  }

  return data;
}
/*
|--------------------------------------------------------------------------
| Create User
|--------------------------------------------------------------------------
*/

export async function createUser(payload: any) {
  const { data, error } = await supabase.from("users").insert(payload).select().single();

  if (error) {
    throw new DatabaseError("Unable to create user.", error);
  }

  return data;
}
/*
|--------------------------------------------------------------------------
| Update User
|--------------------------------------------------------------------------
*/

export async function updateUser(id: string, payload: any) {
  const { data, error } = await supabase
    .from("users")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to update user.", error);
  }

  return data;
}
/*
|--------------------------------------------------------------------------
| Activate User
|--------------------------------------------------------------------------
*/

export async function activateUser(id: string) {
  return updateUser(id, {
    status: "active",
  });
}

/*
|--------------------------------------------------------------------------
| Suspend User
|--------------------------------------------------------------------------
*/

export async function suspendUser(id: string) {
  return updateUser(id, {
    status: "inactive",
  });
}
