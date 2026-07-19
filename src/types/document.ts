import { AuditFields, ID } from "./common";

export interface Document extends AuditFields {
  id: ID;

  jobOrderId?: ID;

  candidateId?: ID;

  companyId?: ID;

  name: string;

  fileUrl: string;

  verified: boolean;
}
