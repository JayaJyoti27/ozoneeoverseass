import { api } from "./api";

export interface DashboardReport {
  summary: {
    employers: number;
    candidates: number;
    requirements: number;
    jobOrders: number;
    applications: number;
    interviews: number;
    medicals: number;
    visas: number;
    deployments: number;
  };
  pending: {
    pendingEmployers: number;
    pendingRequirements: number;
    pendingMedicals: number;
    pendingVisas: number;
    pendingDeployments: number;
  };
  funnel: Record<string, number>;
}

export interface CandidateReport {
  summary: {
    total: number;
    active: number;
    inactive: number;
    verified: number;
  };
  countries: Record<string, number>;
  professions: Record<string, number>;
  monthly: Record<string, number>;
}

export interface EmployerReport {
  summary: {
    total: number;
    active: number;
    pending: number;
    suspended: number;
  };
  countries: Record<string, number>;
  approval: Record<string, number>;
  topEmployers: {
    employerId: string;
    companyName: string;
    totalJobs: number;
  }[];
}

export interface RecruitmentReport {
  summary: {
    applications: number;
    interviews: number;
    medicals: number;
    visas: number;
    deployments: number;
  };
  funnel: Record<string, number>;
  medicals: Record<string, number>;
  visas: Record<string, number>;
  deployments: Record<string, number>;
  monthly: Record<string, number>;
}

export async function getDashboardReport() {
  const res = await api.get("/admin/reports/dashboard");
  return res.data.data as DashboardReport;
}

export async function getCandidateReport() {
  const res = await api.get("/admin/reports/candidates");
  return res.data.data as CandidateReport;
}

export async function getEmployerReport() {
  const res = await api.get("/admin/reports/employers");
  return res.data.data as EmployerReport;
}

export async function getRecruitmentReport() {
  const res = await api.get("/admin/reports/recruitment");
  return res.data.data as RecruitmentReport;
}
export async function exportCandidateReport() {
  const response = await api.get("/admin/reports/candidates/export", {
    responseType: "blob",
  });

  return response.data;
}
