export interface DocumentCatalogItem {
  type: string;
  label: string;
  required: boolean;
  accept: string;
}

export const DOCUMENT_CATALOG: DocumentCatalogItem[] = [
  { type: "passport", label: "Passport", required: true, accept: ".pdf,.png,.jpg,.jpeg" },
  { type: "resume", label: "CV", required: true, accept: ".pdf,.doc,.docx" },
  {
    type: "degree_certificate",
    label: "Educational Certificates",
    required: true,
    accept: ".pdf,.png,.jpg,.jpeg",
  },
  {
    type: "experience_certificate",
    label: "Experience Certificates",
    required: false,
    accept: ".pdf,.png,.jpg,.jpeg",
  },
  { type: "license", label: "License", required: false, accept: ".pdf,.png,.jpg,.jpeg" },
  {
    type: "police_clearance_certificate",
    label: "Police Clearance",
    required: true,
    accept: ".pdf,.png,.jpg,.jpeg",
  },
  {
    type: "medical_certificate",
    label: "Medical Reports",
    required: true,
    accept: ".pdf,.png,.jpg,.jpeg",
  },
  {
    type: "vaccination_certificate",
    label: "Vaccination Certificates",
    required: false,
    accept: ".pdf,.png,.jpg,.jpeg",
  },
  { type: "visa", label: "Visa Copy", required: false, accept: ".pdf,.png,.jpg,.jpeg" },
  {
    type: "other",
    label: "Other Documents",
    required: false,
    accept: ".pdf,.png,.jpg,.jpeg,.doc,.docx",
  },
];
