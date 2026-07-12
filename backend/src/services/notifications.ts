import { supabase } from "../config/supabase";
import { TEST_CANDIDATE_ID } from "../config/testCandidate";

export async function getNotifications() {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("candidate_id", TEST_CANDIDATE_ID)
    .order("created_at", { ascending: false });

  return { data, error };
}

export async function markNotificationRead(id: string) {
  const { data, error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", id)
    .eq("candidate_id", TEST_CANDIDATE_ID)
    .select()
    .single();

  return { data, error };
}
