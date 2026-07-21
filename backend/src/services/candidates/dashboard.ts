import { supabase } from "../../config/supabase";
import { DatabaseError } from "../../utils/AppError";

export async function getCandidateDashboard(candidateId: string) {
  const applicationIds =
    (await supabase.from("applications").select("id").eq("candidate_id", candidateId)).data?.map(
      (x) => x.id,
    ) ?? [];

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
      .select("*, job:jobs(*)")
      .eq("candidate_id", candidateId)
      .order("created_at", { ascending: false }),

    supabase.from("interviews").select("*").in("application_id", applicationIds),

    supabase
      .from("offers")
      .select("*")
      .eq("candidate_id", candidateId)
      .order("created_at", { ascending: false }),

    supabase
      .from("medicals")
      .select("*")
      .eq("candidate_id", candidateId)
      .order("created_at", { ascending: false }),

    supabase
      .from("visas")
      .select("*")
      .eq("candidate_id", candidateId)
      .order("created_at", { ascending: false }),

    supabase
      .from("deployments")
      .select("*")
      .eq("candidate_id", candidateId)
      .order("created_at", { ascending: false }),

    supabase
      .from("notifications")
      .select("*")
      .eq("user_id", candidateId)
      .order("created_at", { ascending: false }),
  ]);

  if (profileResult.error) {
    throw new DatabaseError("Unable to load dashboard.", profileResult.error);
  }

  const candidate = profileResult.data;

  const completionFields = [
    candidate?.first_name,
    candidate?.last_name,
    candidate?.email,
    candidate?.phone,
    candidate?.passport_number,
    candidate?.experience,
    candidate?.current_location,
    candidate?.nationality,
  ];

  const completed = completionFields.filter(Boolean).length;

  const interviews = interviewsResult.data ?? [];
  const offers = offersResult.data ?? [];
  const medicals = medicalResult.data ?? [];
  const visas = visaResult.data ?? [];
  const deployments = deploymentResult.data ?? [];
  const applications = applicationsResult.data ?? [];
  const notifications = notificationsResult.data ?? [];

  const recentActivity = notifications.map((n) => ({
    id: n.id,
    title: n.title,
    description: n.message,
    created_at: n.created_at,
  }));

  const upcomingInterview =
    interviews
      .filter((i) => i.status !== "completed")
      .sort(
        (a, b) => new Date(a.interview_date).getTime() - new Date(b.interview_date).getTime(),
      )[0] ?? null;

  return {
    profileCompletion: Math.round((completed / completionFields.length) * 100),

    activeApplications: applications.length,

    interviews: interviews.length,

    offers: offers.length,

    medicalStatus: medicals[0]?.status ?? "Pending",

    visaStatus: visas[0]?.status ?? "Pending",

    deploymentStatus: deployments[0]?.status ?? "Pending",

    recentActivity,

    recentApplications: applications.slice(0, 5),

    upcomingInterview,

    latestOffer: offers[0] ?? null,

    latestMedical: medicals[0] ?? null,

    latestVisa: visas[0] ?? null,

    latestDeployment: deployments[0] ?? null,

    profile: candidate,
  };
}
