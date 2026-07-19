export interface Candidate {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  nationality: string;
}

export interface Employer {
  id: string;
  company_name: string;
}

export interface JobOrder {
  id: string;
  title: string;
  country: string;
  status: string;
}

export interface Application {
  id: string;
  internal_status: string;
  priority: number;
  applied_at: string;
  assigned_recruiter?: string;
  admin_notes?: string;

  candidate: Candidate;
  employer: Employer;
  job_order: JobOrder;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  created_at: string;
  type: string;
}
