import { AuditFields, ID } from "./common";

export interface Company extends AuditFields {
  id: ID;

  name: string;

  industry: string;

  country: string;

  city: string;

  website?: string;

  businessLicense: string;

  employeeCount: number;

  isVerified: boolean;
}
