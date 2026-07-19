import { AuditFields, ID } from "./common";

export interface Interview extends AuditFields {
  id: ID;

  candidateId: ID;

  jobOrderId: ID;

  date: string;

  mode: "Online" | "Offline";

  status: "Scheduled" | "Completed" | "Cancelled";
}
