import { supabase } from "../../config/supabase";
import { DatabaseError, NotFoundError } from "../../../../src/utils/AppError";

/*
|--------------------------------------------------------------------------
| My Interviews
|--------------------------------------------------------------------------
*/

export async function getCandidateInterviews(candidateId: string) {
  const { data: applications } = await supabase
    .from("applications")
    .select("id")
    .eq("candidate_id", candidateId);

  const applicationIds = applications?.map((a) => a.id) ?? [];

  if (!applicationIds.length) {
    return [];
  }

  const { data, error } = await supabase
    .from("interviews")
    .select("*")
    .in("application_id", applicationIds)
    .order("interview_date", {
      ascending: true,
    });

  if (error) {
    throw new DatabaseError("Unable to fetch interviews.", error);
  }

  return data ?? [];
}

/*
|--------------------------------------------------------------------------
| Interview Details
|--------------------------------------------------------------------------
*/

export async function getCandidateInterview(candidateId: string, interviewId: string) {
  const { data, error } = await supabase
    .from("interviews")
    .select("*")
    .eq("id", interviewId)
    .single();

  if (error || !data) {
    throw new NotFoundError("Interview not found.");
  }

  const { data: application } = await supabase
    .from("applications")
    .select("candidate_id")
    .eq("id", data.application_id)
    .single();

  if (!application || application.candidate_id !== candidateId) {
    throw new NotFoundError("Interview not found.");
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Upcoming Interview
|--------------------------------------------------------------------------
*/

export async function getUpcomingInterview(candidateId: string) {
  const interviews = await getCandidateInterviews(candidateId);

  return interviews.find((i) => i.status !== "completed" && i.status !== "cancelled") ?? null;
}

/*
|--------------------------------------------------------------------------
| Completed Interviews
|--------------------------------------------------------------------------
*/

export async function getCompletedInterviews(candidateId: string) {
  const interviews = await getCandidateInterviews(candidateId);

  return interviews.filter((i) => i.status === "completed");
}
