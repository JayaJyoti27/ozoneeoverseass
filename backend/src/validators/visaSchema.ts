import { z } from "zod";

export const VISA_STATUS = [
  "pending",
  "submitted",
  "under_review",
  "approved",
  "rejected",
  "issued",
  "expired",
] as const;

export const CreateVisaSchema = z.object({
  application_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  employer_id: z.string().uuid().optional(),
  job_order_id: z.string().uuid().optional(),
});

export const SubmitVisaSchema = z.object({
  embassy_name: z.string().min(2),
  passport_number: z.string().min(3),
  submission_date: z.coerce.date(),
  remarks: z.string().optional(),
});

export const ApproveVisaSchema = z.object({
  visa_number: z.string().min(2),
  approval_date: z.coerce.date(),
  expiry_date: z.coerce.date(),
  remarks: z.string().optional(),
});

export const RejectVisaSchema = z.object({
  reason: z.string().min(5),
});

export const IssueVisaSchema = z.object({
  issue_date: z.coerce.date(),
});

export type CreateVisaDto = z.infer<typeof CreateVisaSchema>;
export type SubmitVisaDto = z.infer<typeof SubmitVisaSchema>;
export type ApproveVisaDto = z.infer<typeof ApproveVisaSchema>;
export type RejectVisaDto = z.infer<typeof RejectVisaSchema>;
export type IssueVisaDto = z.infer<typeof IssueVisaSchema>;
