import { supabase } from "../../../config/supabase";
import { DatabaseError, NotFoundError } from "../../../../../src/utils/AppError";

/*
|--------------------------------------------------------------------------
| Complete Recruitment Timeline
|--------------------------------------------------------------------------
*/

export async function getRecruitmentTimeline(applicationId: string) {
  /*
  |--------------------------------------------------------------------------
  | Application
  |--------------------------------------------------------------------------
  */

  const { data: application, error: applicationError } = await supabase
    .from("applications")
    .select(
      `
      *,
      candidate:candidates(*),
      employer:employers(*),
      job_order:job_orders(*)
    `,
    )
    .eq("id", applicationId)
    .single();

  if (applicationError || !application) {
    throw new NotFoundError("Application not found.");
  }

  /*
  |--------------------------------------------------------------------------
  | Interview
  |--------------------------------------------------------------------------
  */

  const { data: interview } = await supabase
    .from("interviews")
    .select("*")
    .eq("application_id", applicationId)
    .maybeSingle();

  /*
  |--------------------------------------------------------------------------
  | Documents
  |--------------------------------------------------------------------------
  */

  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("application_id", applicationId)
    .order("created_at");

  /*
  |--------------------------------------------------------------------------
  | Medical
  |--------------------------------------------------------------------------
  */

  const { data: medical } = await supabase
    .from("medicals")
    .select("*")
    .eq("application_id", applicationId)
    .maybeSingle();

  /*
  |--------------------------------------------------------------------------
  | Visa
  |--------------------------------------------------------------------------
  */

  const { data: visa } = await supabase
    .from("visas")
    .select("*")
    .eq("application_id", applicationId)
    .maybeSingle();

  /*
  |--------------------------------------------------------------------------
  | Deployment
  |--------------------------------------------------------------------------
  */

  const { data: deployment } = await supabase
    .from("deployments")
    .select("*")
    .eq("application_id", applicationId)
    .maybeSingle();

  return {
    application,

    interview,

    documents: documents ?? [],

    medical,

    visa,

    deployment,
  };
}
/*
|--------------------------------------------------------------------------
| Recruitment Progress
|--------------------------------------------------------------------------
*/

export function getRecruitmentProgress(timeline: any) {
  return {
    application: !!timeline.application,

    interview: !!timeline.interview,

    documents: timeline.documents.length,

    medical: timeline.medical?.status,

    visa: timeline.visa?.status,

    deployment: timeline.deployment?.status,

    completed: timeline.application?.internal_status === "deployed",
  };
}
/*
|--------------------------------------------------------------------------
| Timeline Endpoint
|--------------------------------------------------------------------------
*/

export async function getTimeline(applicationId: string) {
  const timeline = await getRecruitmentTimeline(applicationId);

  return {
    ...timeline,

    progress: getRecruitmentProgress(timeline),
  };
}
