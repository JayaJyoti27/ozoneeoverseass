import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = "admin" | "employer" | "candidate";

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string | null;
}

const ROLE_HOME: Record<UserRole, string> = {
  admin: "/Admin/dashboard",
  employer: "/Employer/dashboard",
  candidate: "/Candidates/dashboard",
};

export function roleHomePath(role: UserRole) {
  return ROLE_HOME[role];
}

/** Signs in with the given email + password, returns the user's profile/role. */
export async function loginWithPassword(email: string, password: string): Promise<Profile> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  if (!data.user) throw new Error("Login failed — no user returned.");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role, full_name")
    .eq("id", data.user.id)
    .single();

  if (profileError || !profile) {
    await supabase.auth.signOut();
    console.error("Profile lookup failed:", profileError);
    throw new Error("This account has no role assigned yet.");
  }

  return profile as Profile;
}

/** Returns the current logged-in user's profile, or null if not logged in. */
export async function getCurrentProfile(): Promise<Profile | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, full_name")
    .eq("id", session.user.id)
    .single();

  return (profile as Profile) ?? null;
}

export async function logout() {
  await supabase.auth.signOut();
}
