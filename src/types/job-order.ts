import { AuditFields, ID } from "./common";

export type JobOrderStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "CLARIFICATION_REQUIRED"
  | "EMPLOYER_APPROVAL_PENDING"
  | "LEGALIZATION"
  | "RECRUITMENT_OPEN"
  | "SHORTLISTING"
  | "INTERVIEW"
  | "SELECTED"
  | "VISA_PROCESSING"
  | "DEPLOYED";

export interface JobOrder extends AuditFields {
  id: ID;

  companyId: ID;

  title: string;

  country: string;

  vacancies: number;

  salary: string;

  department: string;

  status: JobOrderStatus;
}
