export type RequirementStatus = "New" | "In Progress" | "Filled";
export type JobStatus = "Active" | "Draft" | "Archived";
export type ApplicationStatus = "Applied" | "Reviewing" | "Shortlisted" | "Rejected";
export type CandidateStatus = "Verified" | "Shortlisted" | "Available";

export interface Company {
  id: string;
  name: string;
  logoUrl: string | null;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  country: string;
  industry: string;
}

export interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  requirements: number;
  applications: number;
}

export interface Requirement {
  id: string;
  role: string;
  companyName: string;
  contactPerson: string;
  email: string;
  country: string;
  sector: string;
  headcount: number;
  timeline: string;
  status: RequirementStatus;
  notes?: string;
  receivedAt: string;
}

export interface Job {
  id: string;
  title: string;
  country: string;
  city: string;
  sector: string;
  currency: string;
  salaryMin: number;
  salaryMax: number;
  status: JobStatus;
  applicants: number;
  createdAt: string;
  description?: string;
}

export interface Application {
  id: string;
  candidateId: string;
  candidateName: string;
  email: string;
  phone: string;
  jobId: string;
  jobTitle: string;
  status: ApplicationStatus;
  appliedAt: string;
}

export interface Candidate {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  nationality: string;
  email: string;
  phone: string;
  targetCountries: string[];
  status: CandidateStatus;
  cvUrl: string | null;
  appliedJobs: { jobTitle: string; date: string }[];
}
