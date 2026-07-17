import { supabase } from "../../config/supabase";
import { NotFoundError } from "../../utils/AppError";

export async function getEmployerDashboard(employerId: string) {
  /*
  |--------------------------------------------------------------------------
  | Employer Profile
  |--------------------------------------------------------------------------
  */

  const { data: employer, error: employerError } = await supabase
    .from("employers")
    .select(
      `
        id,
        company_name,
        contact_person,
        logo_url,
        country,
        industry,
        approval_status,
        status
      `,
    )
    .eq("id", employerId)
    .single();

  if (employerError || !employer) {
    throw new NotFoundError("Employer not found.");
  }

  /*
  |--------------------------------------------------------------------------
  | Job Order Statistics
  |--------------------------------------------------------------------------
  */

  const [
    activeJobs,
    underReview,
    legalization,
    recruitmentOpen,
    interviews,
    selectedCandidates,
    deployedCandidates,
  ] = await Promise.all([
    supabase
      .from("job_orders")
      .select("*", {
        head: true,
        count: "exact",
      })
      .eq("employer_id", employerId)
      .in("status", ["approved_for_recruitment", "recruitment_open"])
      .eq("is_deleted", false),

    supabase
      .from("job_orders")
      .select("*", {
        head: true,
        count: "exact",
      })
      .eq("employer_id", employerId)
      .in("status", ["under_admin_review", "clarification_required", "employer_approval_pending"])
      .eq("is_deleted", false),

    supabase
      .from("job_orders")
      .select("*", {
        head: true,
        count: "exact",
      })
      .eq("employer_id", employerId)
      .eq("status", "legalization_in_progress")
      .eq("is_deleted", false),

    supabase
      .from("job_orders")
      .select("*", {
        head: true,
        count: "exact",
      })
      .eq("employer_id", employerId)
      .eq("status", "recruitment_open")
      .eq("is_deleted", false),

    supabase
      .from("interviews")
      .select("*", {
        head: true,
        count: "exact",
      })
      .eq("employer_id", employerId)
      .gte("interview_date", new Date().toISOString()),

    supabase
      .from("applications")
      .select("*", {
        head: true,
        count: "exact",
      })
      .eq("employer_id", employerId)
      .eq("internal_status", "selected"),

    supabase
      .from("deployments")
      .select("*", {
        head: true,
        count: "exact",
      })
      .eq("employer_id", employerId)
      .eq("status", "deployed"),
  ]);

  /*
  |--------------------------------------------------------------------------
  | Recent Job Orders
  |--------------------------------------------------------------------------
  */

  const { data: recentJobs } = await supabase
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
    .eq("employer_id", employerId)
    .eq("is_deleted", false)
    .order("created_at", {
      ascending: false,
    })
    .limit(5);

  /*
  |--------------------------------------------------------------------------
  | Upcoming Interviews
  |--------------------------------------------------------------------------
  */

  const { data: upcomingInterviews } = await supabase
    .from("interviews")
    .select(
      `
        id,
        interview_date,
        mode,

        application:applications(
          id,

          candidate:candidates(
            id,
            full_name
          ),

          job:job_orders(
            title
          )
        )
      `,
    )
    .eq("employer_id", employerId)
    .order("interview_date")
    .limit(5);

  /*
  |--------------------------------------------------------------------------
  | Dashboard Response
  |--------------------------------------------------------------------------
  */

  return {
    employer,

    dashboard: {
      activeJobOrders: activeJobs.count ?? 0,

      jobOrdersUnderReview: underReview.count ?? 0,

      legalizationInProgress: legalization.count ?? 0,

      jobsOpenForRecruitment: recruitmentOpen.count ?? 0,

      interviewsScheduled: interviews.count ?? 0,

      candidatesSelected: selectedCandidates.count ?? 0,

      candidatesDeployed: deployedCandidates.count ?? 0,
    },

    recentJobOrders: recentJobs ?? [],

    upcomingInterviews: upcomingInterviews ?? [],
  };
}
