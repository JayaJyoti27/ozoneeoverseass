export const APPLICATION_STATUSES = [
  "applied",
  "application_received",
  "cv_under_review",
  "employer_shortlisted",
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

export const APPLICATION_STATUS_FLOW: Record<ApplicationStatus, ApplicationStatus[]> = {
  applied: ["application_received", "withdrawn", "rejected"],

  application_received: ["cv_under_review", "withdrawn", "rejected"],

  cv_under_review: ["employer_shortlisted", "rejected"],

  employer_shortlisted: ["interview_scheduled", "rejected"],

  interview_scheduled: ["interview_completed", "rejected"],

  interview_completed: ["selected", "rejected"],

  selected: ["offer_letter_issued", "rejected"],

  offer_letter_issued: ["documents_verification", "rejected"],

  documents_verification: ["medical", "rejected"],

  medical: ["visa_processing", "rejected"],

  visa_processing: ["visa_approved", "rejected"],

  visa_approved: ["ticket_confirmed", "rejected"],

  ticket_confirmed: ["deployed", "rejected"],

  deployed: [],

  rejected: [],

  withdrawn: [],
};
