import { supabase } from "../../config/supabase";
import { NotFoundError } from "../../utils/AppError";

/*
|--------------------------------------------------------------------------
| Employer Requirement Details
|--------------------------------------------------------------------------
*/

export async function getEmployerRequirementDetails(employerId: string, requirementId: string) {
  /*
  |--------------------------------------------------------------------------
  | Requirement
  |--------------------------------------------------------------------------
  */

  const { data: requirement, error } = await supabase
    .from("requirements")
    .select("*")
    .eq("id", requirementId)
    .eq("employer_id", employerId)
    .single();

  if (error || !requirement) {
    throw new NotFoundError("Requirement not found.");
  }

  /*
  |--------------------------------------------------------------------------
  | Converted Job Order
  |--------------------------------------------------------------------------
  */

  let jobOrder = null;

  if (requirement.converted_job_order_id) {
    const { data } = await supabase
      .from("job_orders")
      .select(
        `
        id,
        title,
        country,
        vacancies,
        status,
        created_at
      `,
      )
      .eq("id", requirement.converted_job_order_id)
      .single();

    jobOrder = data;
  }

  /*
  |--------------------------------------------------------------------------
  | Recruitment Summary
  |--------------------------------------------------------------------------
  */

  let recruitment = {
    applications: 0,
    shortlisted: 0,
    interviews: 0,
    offers: 0,
    deployed: 0,
  };

  let recentCandidates: any[] = [];

  if (jobOrder) {
    const { data: applications } = await supabase
      .from("applications")
      .select(
        `
          id,
          status,
          internal_status,

          candidate:candidates(
            id,
            full_name,
            nationality
          )
        `,
      )
      .eq("job_order_id", jobOrder.id);

    const list = applications ?? [];

    recruitment = {
      applications: list.length,

      shortlisted: list.filter((a) => a.internal_status === "shortlisted").length,

      interviews: list.filter((a) => a.internal_status === "interview").length,

      offers: list.filter((a) => a.internal_status === "offer").length,

      deployed: list.filter((a) => a.internal_status === "deployed").length,
    };

    recentCandidates = list.slice(0, 10);
  }

  /*
  |--------------------------------------------------------------------------
  | Interviews
  |--------------------------------------------------------------------------
  */

  let interviews: any[] = [];

  if (jobOrder) {
    const { data } = await supabase
      .from("interviews")
      .select(
        `
          id,
          interview_date,
          mode,
          status,

          application:applications(
            candidate:candidates(
              full_name
            )
          )
        `,
      )
      .eq("job_order_id", jobOrder.id)
      .order("interview_date");

    interviews = data ?? [];
  }

  /*
  |--------------------------------------------------------------------------
  | Deployments
  |--------------------------------------------------------------------------
  */

  let deployments: any[] = [];

  if (jobOrder) {
    const { data } = await supabase
      .from("deployments")
      .select(
        `
          id,
          status,
          departure_time,
          arrival_time,

          application:applications(
            candidate:candidates(
              full_name
            )
          )
        `,
      )
      .eq("job_order_id", jobOrder.id);

    deployments = data ?? [];
  }

  /*
  |--------------------------------------------------------------------------
  | Employer Timeline
  |--------------------------------------------------------------------------
  */

  const timeline = [
    {
      key: "submitted",

      label: "Requirement Submitted",

      completed: true,
    },

    {
      key: "under_review",

      label: "Admin Review",

      completed: ["under_review", "clarification_required", "approved", "converted"].includes(
        requirement.status,
      ),
    },

    {
      key: "clarification_required",

      label: "Clarification",

      completed: requirement.status === "clarification_required",
    },

    {
      key: "approved",

      label: "Approved",

      completed: ["approved", "converted"].includes(requirement.status),
    },

    {
      key: "converted",

      label: "Converted To Job Order",

      completed: requirement.status === "converted",
    },
  ];

  return {
    requirement,

    timeline,

    convertedJobOrder: jobOrder,

    recruitment,

    recentCandidates,

    interviews,

    deployments,
  };
}
