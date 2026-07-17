import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Application Statuses
|--------------------------------------------------------------------------
*/

export const APPLICATION_STATUSES = [
  "applied",
  "received",
  "cv_review",
  "shortlisted",
  "interview_scheduled",
  "interview_completed",
  "selected",
  "offer_letter_issued",
  "documents_verification",
  "medical",
  "visa_processing",
  "visa_approved",
  "ticket_confirmed",
  "deployed",
  "rejected",
  "withdrawn",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

/*
|--------------------------------------------------------------------------
| Status Flow
|--------------------------------------------------------------------------
*/

export const APPLICATION_STATUS_FLOW: Record<ApplicationStatus, ApplicationStatus[]> = {
  applied: ["received", "rejected", "withdrawn"],
  received: ["cv_review", "rejected", "withdrawn"],
  cv_review: ["shortlisted", "rejected", "withdrawn"],
  shortlisted: ["interview_scheduled", "rejected", "withdrawn"],
  interview_scheduled: ["interview_completed", "rejected", "withdrawn"],
  interview_completed: ["selected", "rejected", "withdrawn"],
  selected: ["offer_letter_issued", "rejected", "withdrawn"],
  offer_letter_issued: ["documents_verification", "rejected", "withdrawn"],
  documents_verification: ["medical", "rejected", "withdrawn"],
  medical: ["visa_processing", "rejected", "withdrawn"],
  visa_processing: ["visa_approved", "rejected", "withdrawn"],
  visa_approved: ["ticket_confirmed", "rejected", "withdrawn"],
  ticket_confirmed: ["deployed", "withdrawn"],
  deployed: [],
  rejected: [],
  withdrawn: [],
};

/*
|--------------------------------------------------------------------------
| Create Application
|--------------------------------------------------------------------------
*/

export const CreateApplicationSchema = z.object({
  employer_id: z.string().uuid(),

  job_id: z.string().uuid(),

  job_order_id: z.string().uuid(),
});

/*
|--------------------------------------------------------------------------
| Update Status
|--------------------------------------------------------------------------
*/

export const UpdateApplicationStatusSchema = z.object({
  status: z.enum(APPLICATION_STATUSES),

  remarks: z.string().trim().max(2000).optional(),
});

/*
|--------------------------------------------------------------------------
| Withdraw
|--------------------------------------------------------------------------
*/

export const WithdrawApplicationSchema = z.object({
  reason: z.string().trim().max(1000).optional(),
});

/*
|--------------------------------------------------------------------------
| Query Filters
|--------------------------------------------------------------------------
*/

export const ListApplicationSchema = z.object({
  page: z.coerce.number().int().positive().optional(),

  limit: z.coerce.number().int().positive().optional(),

  candidateId: z.string().uuid().optional(),

  employerId: z.string().uuid().optional(),

  jobId: z.string().uuid().optional(),

  jobOrderId: z.string().uuid().optional(),

  status: z.enum(APPLICATION_STATUSES).optional(),
});

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type CreateApplicationDto = z.infer<typeof CreateApplicationSchema>;

export type UpdateApplicationStatusDto = z.infer<typeof UpdateApplicationStatusSchema>;

export type WithdrawApplicationDto = z.infer<typeof WithdrawApplicationSchema>;

export type ListApplicationDto = z.infer<typeof ListApplicationSchema>;
