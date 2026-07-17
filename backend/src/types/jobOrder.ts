export const JOB_ORDER_STATUSES = [
  "requirement_submitted",
  "under_admin_review",
  "clarification_required",
  "employer_approval_pending",
  "legalization_in_progress",
  "approved_for_recruitment",
  "recruitment_open",
  "recruitment_closed",
  "candidate_selected",
  "visa_processing",
  "deployment_completed",
  "cancelled",
] as const;

export type JobOrderStatus = (typeof JOB_ORDER_STATUSES)[number];

export interface JobOrder {
  id: string;

  employer_id: string;

  requirement_id?: string | null;

  title: string;

  category?: string | null;

  country?: string | null;

  vacancies: number;

  salary_min?: number | null;

  salary_max?: number | null;

  currency?: string | null;

  contract_duration?: string | null;

  working_hours?: string | null;

  accommodation: boolean;

  transport: boolean;

  food: boolean;

  job_description?: string | null;

  requirements?: string | null;

  benefits?: string | null;

  remarks?: string | null;

  status: JobOrderStatus;

  submitted_at: string;

  approved_at?: string | null;

  created_at: string;

  updated_at: string;
}

export interface CreateJobOrderInput {
  employer_id: string;

  requirement_id?: string;

  title: string;

  category?: string;

  country?: string;

  vacancies: number;

  salary_min?: number;

  salary_max?: number;

  currency?: string;

  contract_duration?: string;

  working_hours?: string;

  accommodation?: boolean;

  transport?: boolean;

  food?: boolean;

  job_description?: string;

  requirements?: string;

  benefits?: string;

  remarks?: string;
}

export interface UpdateJobOrderInput {
  title?: string;

  category?: string;

  country?: string;

  vacancies?: number;

  salary_min?: number;

  salary_max?: number;

  currency?: string;

  contract_duration?: string;

  working_hours?: string;

  accommodation?: boolean;

  transport?: boolean;

  food?: boolean;

  job_description?: string;

  requirements?: string;

  benefits?: string;

  remarks?: string;
}
