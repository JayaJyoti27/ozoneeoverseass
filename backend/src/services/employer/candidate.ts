import { supabase } from "../../config/supabase";
import { DatabaseError, NotFoundError } from "../../utils/AppError";

const DEMO_EMPLOYER_ID = "3d730a29-057f-4588-9c03-0df22e724c3a"; // match your existing employer.ts constant exactly

export async function getEmployerCandidate(candidateId: string) {
  // Scope check: candidate must have an application tied to one of this employer's job orders
  const { data: applications, error: appError } = await supabase
    .from("applications")
    .select(
      `
        id,
        status,
        internal_status,
        created_at,
        job:job_orders!inner(
          id,
          title,
          country,
          employer_id
        )
      `,
    )
    .eq("candidate_id", candidateId)
    .eq("job.employer_id", DEMO_EMPLOYER_ID)
    .order("created_at", { ascending: false });

  if (appError) throw new DatabaseError("Unable to fetch candidate applications.", appError);
  if (!applications || applications.length === 0) {
    throw new NotFoundError("Candidate not found."); // also covers "not this employer's candidate"
  }

  const { data: candidate, error: candError } = await supabase
    .from("candidates")
    .select("*")
    .eq("id", candidateId)
    .single();

  if (candError || !candidate) throw new NotFoundError("Candidate not found.");

  const { data: documents } = await supabase
    .from("documents")
    .select(
      `
        id,
        document_type,
        file_name,
        original_file_name,
        public_url,
        status,
        verified_at,
        expires_at
      `,
    )
    .eq("candidate_id", candidateId)
    .order("created_at", { ascending: false });

  return {
    candidate,
    applications,
    documents: documents ?? [],
    resume: documents?.find((d) => d.document_type === "resume") ?? null,
  };
}
