import { supabase } from "../config/supabase";

export async function getAdminDashboard() {
  try {
    const [
      candidatesRes,
      employersRes,
      jobsRes,
      applicationsRes,
      countriesRes,
      recentCandidatesRes,
      recentEmployersRes,
      recentJobsRes,
    ] = await Promise.all([
      supabase.from("candidates").select("*", { count: "exact", head: true }),
      supabase.from("employers").select("*", { count: "exact", head: true }),
      supabase.from("jobs").select("*", { count: "exact", head: true }),
      supabase.from("applications").select("*", { count: "exact", head: true }),
      supabase.from("countries").select("*", { count: "exact", head: true }),
      supabase
        .from("candidates")
        .select("id, name, specialty, status")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("employers")
        .select("id, company_name, country, status")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("jobs")
        .select("id, title, country, status")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    return {
      success: true,
      status: 200,
      data: {
        totalCandidates: candidatesRes.count ?? 0,
        totalEmployers: employersRes.count ?? 0,
        totalJobs: jobsRes.count ?? 0,
        totalApplications: applicationsRes.count ?? 0,
        pendingRequirements: 0, // will update once requirements table exists
        totalCountries: countriesRes.count ?? 0,
        recentCandidates: recentCandidatesRes.data ?? [],
        recentEmployer: recentEmployersRes.data ?? [],
        recentJobs: recentJobsRes.data ?? [],
      },
    };
  } catch (err: any) {
    return {
      success: false,
      status: 500,
      message: err.message,
    };
  }
}
import * as CandidatePortalService from "./candidatePortal";

export async function getDashboardStats() {
  try {
    const stats = await CandidatePortalService.getStats();
    return { success: true, status: 200, data: stats };
  } catch (err: any) {
    return { success: false, status: 500, message: err.message };
  }
}

export async function getRecentApplications() {
  try {
    const dashboard = await CandidatePortalService.getDashboard();
    return { success: true, status: 200, data: dashboard.recentApplications };
  } catch (err: any) {
    return { success: false, status: 500, message: err.message };
  }
}

export async function getApplicationStatus() {
  try {
    const stats = await CandidatePortalService.getStats();
    return { success: true, status: 200, data: stats };
  } catch (err: any) {
    return { success: false, status: 500, message: err.message };
  }
}

export async function getRecentJobs() {
  try {
    const dashboard = await CandidatePortalService.getDashboard();
    return { success: true, status: 200, data: dashboard.recommendedJobs };
  } catch (err: any) {
    return { success: false, status: 500, message: err.message };
  }
}
