import { supabase } from "../../config/supabase";
import { DatabaseError } from "../../utils/AppError";

/*
|--------------------------------------------------------------------------
| Candidate Dashboard
|--------------------------------------------------------------------------
*/

export async function getCandidateDashboard(candidateId: string) {
  const [
    profileResult,
    applicationsResult,
    interviewsResult,
    offersResult,
    medicalResult,
    visaResult,
    deploymentResult,
    notificationsResult,
  ] = await Promise.all([
    supabase.from("candidates").select("*").eq("id", candidateId).single(),

    supabase
      .from("applications")
      .select("id,status", { count: "exact" })
      .eq("candidate_id", candidateId),

    supabase
      .from("interviews")
      .select("id,status,interview_date")
      .in(
        "application_id",
        (
          await supabase.from("applications").select("id").eq("candidate_id", candidateId)
        ).data?.map((x) => x.id) ?? [],
      ),

    supabase.from("offers").select("id,status").eq("candidate_id", candidateId),

    supabase.from("medicals").select("id,status").eq("candidate_id", candidateId),

    supabase.from("visas").select("id,status").eq("candidate_id", candidateId),

    supabase.from("deployments").select("id,status").eq("candidate_id", candidateId),

    supabase
      .from("notifications")
      .select("id", { count: "exact" })
      .eq("user_id", candidateId)
      .eq("is_read", false),
  ]);

  if (profileResult.error) {
    throw new DatabaseError("Unable to load dashboard.", profileResult.error);
  }

  const candidate = profileResult.data;

  const completion = [
    candidate?.first_name,
    candidate?.last_name,
    candidate?.email,
    candidate?.phone,
    candidate?.passport_number,
    candidate?.experience,
    candidate?.current_location,
    candidate?.nationality,
  ];

  const completed = completion.filter(Boolean).length;

  return {
    profileCompletion: Math.round((completed / completion.length) * 100),

    profile: candidate,

    stats: {
      applications: applicationsResult.count ?? 0,

      interviews: interviewsResult.data?.length ?? 0,

      offers: offersResult.data?.length ?? 0,

      unreadNotifications: notificationsResult.count ?? 0,
    },

    latestMedical: medicalResult.data?.[0] ?? null,

    latestVisa: visaResult.data?.[0] ?? null,

    latestDeployment: deploymentResult.data?.[0] ?? null,

    upcomingInterview:
      interviewsResult.data
        ?.filter((x) => x.status !== "completed")
        ?.sort(
          (a, b) => new Date(a.interview_date).getTime() - new Date(b.interview_date).getTime(),
        )[0] ?? null,
  };
}
