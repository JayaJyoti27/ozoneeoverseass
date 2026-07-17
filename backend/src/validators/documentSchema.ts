import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Document Types
|--------------------------------------------------------------------------
*/

export const DOCUMENT_TYPES = [
  "passport",
  "resume",
  "aadhaar",
  "pan",
  "degree_certificate",
  "experience_certificate",
  "medical_certificate",
  "police_clearance_certificate",
  "offer_letter",
  "employment_contract",
  "visa_application",
  "visa",
  "photo",
  "other",
] as const;

/*
|--------------------------------------------------------------------------
| Document Status
|--------------------------------------------------------------------------
*/

export const DOCUMENT_STATUS = [
  "pending",
  "under_review",
  "approved",
  "rejected",
  "reupload_required",
] as const;

/*
|--------------------------------------------------------------------------
| Upload Document
|--------------------------------------------------------------------------
*/

export const UploadDocumentSchema = z.object({
  application_id: z.string().uuid(),

  candidate_id: z.string().uuid(),

  employer_id: z.string().uuid().optional(),

  job_order_id: z.string().uuid().optional(),

  document_type: z.enum(DOCUMENT_TYPES),

  file_name: z.string().min(1),

  original_file_name: z.string().optional(),

  mime_type: z.string().optional(),

  file_size: z.number().positive(),

  storage_path: z.string().min(1),

  public_url: z.string().url(),

  expires_at: z.coerce.date().optional(),

  metadata: z.record(z.string(), z.any()).optional(),
});

/*
|--------------------------------------------------------------------------
| Replace Document
|--------------------------------------------------------------------------
*/

export const ReplaceDocumentSchema = z.object({
  file_name: z.string().min(1),

  original_file_name: z.string().optional(),

  mime_type: z.string().optional(),

  file_size: z.number().positive(),

  storage_path: z.string().min(1),

  public_url: z.string().url(),

  expires_at: z.coerce.date().optional(),

  metadata: z.record(z.string(), z.any()).optional(),
});

/*
|--------------------------------------------------------------------------
| Approve
|--------------------------------------------------------------------------
*/

export const ApproveDocumentSchema = z.object({
  remarks: z.string().max(5000).optional(),
});

/*
|--------------------------------------------------------------------------
| Reject
|--------------------------------------------------------------------------
*/

export const RejectDocumentSchema = z.object({
  reason: z.string().min(5).max(5000),
});

/*
|--------------------------------------------------------------------------
| Query
|--------------------------------------------------------------------------
*/

export const ListDocumentSchema = z.object({
  page: z.coerce.number().positive().optional(),

  limit: z.coerce.number().positive().optional(),

  candidateId: z.string().uuid().optional(),

  applicationId: z.string().uuid().optional(),

  jobOrderId: z.string().uuid().optional(),

  employerId: z.string().uuid().optional(),

  type: z.enum(DOCUMENT_TYPES).optional(),

  status: z.enum(DOCUMENT_STATUS).optional(),
});

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type UploadDocumentDto = z.infer<typeof UploadDocumentSchema>;

export type ReplaceDocumentDto = z.infer<typeof ReplaceDocumentSchema>;

export type ApproveDocumentDto = z.infer<typeof ApproveDocumentSchema>;

export type RejectDocumentDto = z.infer<typeof RejectDocumentSchema>;

export type ListDocumentDto = z.infer<typeof ListDocumentSchema>;
