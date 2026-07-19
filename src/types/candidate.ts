import { AuditFields, ID } from "./common";

export type CandidateStatus = "SHORTLISTED" | "INTERVIEW" | "SELECTED" | "REJECTED" | "DEPLOYED";

export interface Candidate extends AuditFields {
  id: ID;

  jobOrderId: ID;

  firstName: string;

  lastName: string;

  nationality: string;

  gender: "Male" | "Female";

  experience: number;

  passportValid: boolean;

  status: CandidateStatus;
}
