import { supabase } from "../../config/supabase";
import { DatabaseError } from "../../utils/AppError";

/*
|--------------------------------------------------------------------------
| Candidate Recruitment Timeline
|--------------------------------------------------------------------------
*/

export async function getCandidateTimeline(candidateId: string) {
  const timeline: any[] = [];

  /*
  |--------------------------------------------------------------------------
  | Applications
  |--------------------------------------------------------------------------
  */

  const { data: applications, error: applicationError } = await supabase
    .from("application_status_history")
    .select("*")
    .in(
      "application_id",
      (await supabase.from("applications").select("id").eq("candidate_id", candidateId)).data?.map(
        (a) => a.id,
      ) ?? [],
    );

  if (applicationError) {
    throw new DatabaseError("Unable to load application timeline.", applicationError);
  }

  applications?.forEach((item) =>
    timeline.push({
      type: "application",
      status: item.status,
      notes: item.notes,
      date: item.created_at,
    }),
  );

  /*
  |--------------------------------------------------------------------------
  | Interviews
  |--------------------------------------------------------------------------
  */

  const { data: interviews } = await supabase
    .from("interviews")
    .select("*")
    .in(
      "application_id",
      (await supabase.from("applications").select("id").eq("candidate_id", candidateId)).data?.map(
        (a) => a.id,
      ) ?? [],
    );

  interviews?.forEach((item) =>
    timeline.push({
      type: "interview",
      status: item.status,
      title: "Interview",
      date: item.interview_date,
    }),
  );

  /*
  |--------------------------------------------------------------------------
  | Offers
  |--------------------------------------------------------------------------
  */

  const { data: offers } = await supabase
    .from("offers")
    .select("*")
    .eq("candidate_id", candidateId);

  offers?.forEach((item) =>
    timeline.push({
      type: "offer",
      status: item.status,
      title: "Offer Letter",
      date: item.created_at,
    }),
  );

  /*
  |--------------------------------------------------------------------------
  | Medicals
  |--------------------------------------------------------------------------
  */

  const { data: medicals } = await supabase
    .from("medicals")
    .select("*")
    .eq("candidate_id", candidateId);

  medicals?.forEach((item) =>
    timeline.push({
      type: "medical",
      status: item.status,
      title: "Medical",
      date: item.created_at,
    }),
  );

  /*
  |--------------------------------------------------------------------------
  | Visas
  |--------------------------------------------------------------------------
  */

  const { data: visas } = await supabase.from("visas").select("*").eq("candidate_id", candidateId);

  visas?.forEach((item) =>
    timeline.push({
      type: "visa",
      status: item.status,
      title: "Visa",
      date: item.created_at,
    }),
  );

  /*
  |--------------------------------------------------------------------------
  | Deployments
  |--------------------------------------------------------------------------
  */

  const { data: deployments } = await supabase
    .from("deployments")
    .select("*")
    .eq("candidate_id", candidateId);

  deployments?.forEach((item) =>
    timeline.push({
      type: "deployment",
      status: item.status,
      title: "Deployment",
      date: item.created_at,
    }),
  );

  /*
  |--------------------------------------------------------------------------
  | Sort Timeline
  |--------------------------------------------------------------------------
  */

  timeline.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return timeline;
}
