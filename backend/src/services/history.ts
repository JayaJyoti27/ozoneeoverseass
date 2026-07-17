import { supabase } from "../config/supabase";
import { DatabaseError } from "../utils/AppError";

export async function insertHistory(table: string, payload: Record<string, any>) {
  const { error } = await supabase.from(table).insert(payload);

  if (error) {
    throw new DatabaseError(`Unable to insert into ${table}.`, error);
  }
}
