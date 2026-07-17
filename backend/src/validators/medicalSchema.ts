import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Medical Status
|--------------------------------------------------------------------------
*/

export const MEDICAL_STATUS = [
  "pending",
  "scheduled",
  "completed",
  "fit",
  "unfit",
  "retest_required",
  "expired",
] as const;

/*
|--------------------------------------------------------------------------
| Create Medical
|--------------------------------------------------------------------------
*/

export const CreateMedicalSchema = z.object({
  application_id: z.string().uuid(),

  candidate_id: z.string().uuid(),

  employer_id: z.string().uuid().optional(),

  job_order_id: z.string().uuid().optional(),
});

/*
|--------------------------------------------------------------------------
| Schedule Medical
|--------------------------------------------------------------------------
*/

export const ScheduleMedicalSchema = z.object({
  hospital_name: z.string().min(2),

  doctor_name: z.string().min(2),

  appointment_date: z.coerce.date(),

  remarks: z.string().max(5000).optional(),
});

/*
|--------------------------------------------------------------------------
| Upload Report
|--------------------------------------------------------------------------
*/

export const UploadMedicalReportSchema = z.object({
  report_document_id: z.string().uuid(),
});

/*
|--------------------------------------------------------------------------
| Approve Medical
|--------------------------------------------------------------------------
*/

export const ApproveMedicalSchema = z.object({
  expiry_date: z.coerce.date(),

  remarks: z.string().max(5000).optional(),
});

/*
|--------------------------------------------------------------------------
| Reject Medical
|--------------------------------------------------------------------------
*/

export const RejectMedicalSchema = z.object({
  reason: z.string().min(5).max(5000),
});

/*
|--------------------------------------------------------------------------
| Query
|--------------------------------------------------------------------------
*/

export const ListMedicalSchema = z.object({
  page: z.coerce.number().positive().optional(),

  limit: z.coerce.number().positive().optional(),

  candidateId: z.string().uuid().optional(),

  applicationId: z.string().uuid().optional(),

  employerId: z.string().uuid().optional(),

  status: z.enum(MEDICAL_STATUS).optional(),
});

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type CreateMedicalDto = z.infer<typeof CreateMedicalSchema>;

export type ScheduleMedicalDto = z.infer<typeof ScheduleMedicalSchema>;

export type UploadMedicalReportDto = z.infer<typeof UploadMedicalReportSchema>;

export type ApproveMedicalDto = z.infer<typeof ApproveMedicalSchema>;

export type RejectMedicalDto = z.infer<typeof RejectMedicalSchema>;

export type ListMedicalDto = z.infer<typeof ListMedicalSchema>;
