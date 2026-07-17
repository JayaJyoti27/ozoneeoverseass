import { supabase } from "../../config/supabase";

export async function getAdminDashboard() {
  const [
    totalCandidates,

    totalEmployers,

    pendingEmployers,

    totalRequirements,

    pendingRequirements,

    activeJobOrders,

    totalApplications,

    deployedCandidates,
  ] = await Promise.all([
    supabase.from("candidates").select("*", {
      head: true,
      count: "exact",
    }),

    supabase.from("employers").select("*", {
      head: true,
      count: "exact",
    }),

    supabase
      .from("employers")
      .select("*", {
        head: true,
        count: "exact",
      })
      .eq("approval_status", "pending"),

    supabase.from("requirements").select("*", {
      head: true,
      count: "exact",
    }),

    supabase
      .from("requirements")
      .select("*", {
        head: true,
        count: "exact",
      })
      .in("status", ["submitted", "under_review"]),

    supabase
      .from("job_orders")
      .select("*", {
        head: true,
        count: "exact",
      })
      .eq("status", "recruitment_open"),

    supabase.from("applications").select("*", {
      head: true,
      count: "exact",
    }),

    supabase
      .from("deployments")
      .select("*", {
        head: true,
        count: "exact",
      })
      .eq("status", "deployed"),
  ]);

  /*
  |--------------------------------------------------------------------------
  | Recent Employers
  |--------------------------------------------------------------------------
  */

  const { data: recentEmployers } = await supabase
    .from("employers")
    .select(
      `
        id,
        company_name,
        contact_person,
        country,
        approval_status,
        created_at
      `,
    )
    .order("created_at", {
      ascending: false,
    })
    .limit(5);

  /*
  |--------------------------------------------------------------------------
  | Recent Requirements
  |--------------------------------------------------------------------------
  */

  const { data: recentRequirements } = await supabase
    .from("requirements")
    .select(
      `
        id,
        company_name,
        role,
        country,
        headcount,
        status,
        created_at
      `,
    )
    .order("created_at", {
      ascending: false,
    })
    .limit(5);

  return {
    statistics: {
      candidates: totalCandidates.count ?? 0,

      employers: totalEmployers.count ?? 0,

      pendingEmployerApprovals: pendingEmployers.count ?? 0,

      requirements: totalRequirements.count ?? 0,

      pendingRequirements: pendingRequirements.count ?? 0,

      activeRecruitments: activeJobOrders.count ?? 0,

      applications: totalApplications.count ?? 0,

      deployedCandidates: deployedCandidates.count ?? 0,
    },

    recentEmployers: recentEmployers ?? [],

    recentRequirements: recentRequirements ?? [],
  };
}
