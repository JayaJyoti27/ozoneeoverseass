import { AuditFields, ID } from "./common";

export interface Notification extends AuditFields {
  id: ID;

  title: string;

  description: string;

  read: boolean;

  type: "INFO" | "SUCCESS" | "WARNING" | "ERROR";
}
