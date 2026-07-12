// Mock data for the candidate portal (backend comes later).
export const candidate = {
  id: "cand_001",
  fullName: "Reshma Kumari",
  initials: "RK",
  email: "reshma.k@example.com",
  phone: "+91 98765 43210",
  nationality: "Indian",
  currentCountry: "India",
  specialty: "ICU Nurse",
  yearsExperience: 6,
  qualification: "B.Sc Nursing",
  license: "INC Registered — Kerala Nursing Council",
  targetCountries: ["Saudi Arabia", "UAE", "Qatar"],
  profileCompletion: 78,
  missing: ["Add secondary phone", "Upload police clearance"],
};

export const ALL_COUNTRIES = [
  "Saudi Arabia",
  "UAE",
  "Qatar",
  "Oman",
  "Kuwait",
  "Bahrain",
  "Germany",
  "United Kingdom",
  "Ireland",
  "Malta",
  "Finland",
  "Singapore",
  "Australia",
  "New Zealand",
  "Canada",
  "Poland",
  "Romania",
];

export const COUNTRY_FLAG: Record<string, string> = {
  "Saudi Arabia": "🇸🇦",
  UAE: "🇦🇪",
  Qatar: "🇶🇦",
  Oman: "🇴🇲",
  Kuwait: "🇰🇼",
  Bahrain: "🇧🇭",
  Germany: "🇩🇪",
  "United Kingdom": "🇬🇧",
  Ireland: "🇮🇪",
  Malta: "🇲🇹",
  Finland: "🇫🇮",
  Singapore: "🇸🇬",
  Australia: "🇦🇺",
  "New Zealand": "🇳🇿",
  Canada: "🇨🇦",
  Poland: "🇵🇱",
  Romania: "🇷🇴",
  India: "🇮🇳",
};

export type Stage =
  "Applied" | "Screening" | "Interview" | "Documentation" | "Visa" | "Travel" | "Placed";

export const STAGES: Stage[] = [
  "Applied",
  "Screening",
  "Interview",
  "Documentation",
  "Visa",
  "Travel",
  "Placed",
];

export const STAGE_COLOR: Record<Stage | "Rejected", string> = {
  Applied: "bg-slate-100 text-slate-700 border-slate-200",
  Screening: "bg-blue-50 text-blue-700 border-blue-200",
  Interview: "bg-amber-50 text-amber-800 border-amber-200",
  Documentation: "bg-purple-50 text-purple-700 border-purple-200",
  Visa: "bg-orange-50 text-orange-700 border-orange-200",
  Travel: "bg-teal-50 text-teal-700 border-teal-200",
  Placed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-rose-50 text-rose-700 border-rose-200",
};

export type Application = {
  id: string;
  jobTitle: string;
  employer: string;
  employerType: string;
  country: string;
  city: string;
  sector: string;
  salary: string;
  appliedDate: string;
  updatedDate: string;
  status: Stage | "Rejected";
  notes: string;
};

export const applications: Application[] = [
  {
    id: "app_101",
    jobTitle: "ICU Nurse",
    employer: "King Faisal Specialist Hospital",
    employerType: "Government hospital",
    country: "Saudi Arabia",
    city: "Riyadh",
    sector: "Healthcare",
    salary: "SAR 9,500 / month",
    appliedDate: "2026-06-18",
    updatedDate: "2026-07-08",
    status: "Interview",
    notes:
      "Interview scheduled for 15 July at 2pm GST. Please review the job description and prepare examples from your ICU experience.",
  },
  {
    id: "app_102",
    jobTitle: "OT Nurse",
    employer: "Mediclinic Middle East",
    employerType: "Private group",
    country: "UAE",
    city: "Dubai",
    sector: "Healthcare",
    salary: "AED 8,200 / month",
    appliedDate: "2026-06-25",
    updatedDate: "2026-07-05",
    status: "Screening",
    notes: "Screening call planned this week — keep phone available between 10am–2pm IST.",
  },
  {
    id: "app_103",
    jobTitle: "Staff Nurse — General Ward",
    employer: "Hamad Medical Corporation",
    employerType: "Government hospital",
    country: "Qatar",
    city: "Doha",
    sector: "Healthcare",
    salary: "QAR 8,800 / month",
    appliedDate: "2026-05-30",
    updatedDate: "2026-07-01",
    status: "Documentation",
    notes:
      "Please submit police clearance and medical report by 20 July to keep the visa timeline on track.",
  },
  {
    id: "app_104",
    jobTitle: "ICU Nurse — Cardiac",
    employer: "Cleveland Clinic Abu Dhabi",
    employerType: "Private hospital",
    country: "UAE",
    city: "Abu Dhabi",
    sector: "Healthcare",
    salary: "AED 10,500 / month",
    appliedDate: "2026-05-10",
    updatedDate: "2026-06-28",
    status: "Visa",
    notes: "Visa in progress with employer sponsor. Estimated 3–4 weeks.",
  },
  {
    id: "app_105",
    jobTitle: "Biomedical Technician",
    employer: "Sultan Qaboos University Hospital",
    employerType: "Government hospital",
    country: "Oman",
    city: "Muscat",
    sector: "Biomedical",
    salary: "OMR 780 / month",
    appliedDate: "2026-04-14",
    updatedDate: "2026-06-20",
    status: "Applied",
    notes: "",
  },
  {
    id: "app_106",
    jobTitle: "Staff Nurse",
    employer: "Al Zahra Hospital",
    employerType: "Private hospital",
    country: "UAE",
    city: "Sharjah",
    sector: "Healthcare",
    salary: "AED 7,500 / month",
    appliedDate: "2026-03-02",
    updatedDate: "2026-05-11",
    status: "Rejected",
    notes:
      "Role filled internally. Coordinator has flagged you for two similar upcoming positions.",
  },
];

export const recommendedJobs = [
  {
    id: "job_r1",
    title: "ICU Nurse",
    country: "Saudi Arabia",
    city: "Jeddah",
    employer: "International Medical Center",
    employerType: "Private hospital",
    sector: "Healthcare",
    salary: "SAR 10,200 / month",
  },
  {
    id: "job_r2",
    title: "ICU Nurse — Neuro",
    country: "UAE",
    city: "Dubai",
    employer: "NMC Royal Hospital",
    employerType: "Private group",
    sector: "Healthcare",
    salary: "AED 9,800 / month",
  },
  {
    id: "job_r3",
    title: "Critical Care Nurse",
    country: "Qatar",
    city: "Doha",
    employer: "Sidra Medicine",
    employerType: "Government hospital",
    sector: "Healthcare",
    salary: "QAR 9,400 / month",
  },
];

export type DocStatus = "submitted" | "pending" | "rejected" | "missing";
export type Doc = { id: string; name: string; description: string; status: DocStatus };

export const documents: Doc[] = [
  {
    id: "d1",
    name: "Passport",
    description: "Valid for 6+ months from travel date",
    status: "submitted",
  },
  {
    id: "d2",
    name: "Resume / CV",
    description: "Latest version with references",
    status: "submitted",
  },
  { id: "d3", name: "Nursing Degree", description: "Notarized copy required", status: "submitted" },
  {
    id: "d4",
    name: "Nursing License",
    description: "State/national council registration",
    status: "pending",
  },
  {
    id: "d5",
    name: "Police Clearance Certificate",
    description: "Issued within last 6 months",
    status: "missing",
  },
  {
    id: "d6",
    name: "Medical Report",
    description: "GAMCA / employer-approved medical",
    status: "missing",
  },
  {
    id: "d7",
    name: "Passport Photos (x4)",
    description: "White background, 45×35mm",
    status: "rejected",
  },
  {
    id: "d8",
    name: "Experience Certificates",
    description: "From all previous employers",
    status: "submitted",
  },
];

export type Notification = {
  id: string;
  kind: "application" | "interview" | "document" | "visa" | "placement";
  text: string;
  time: string;
  read: boolean;
};

export const notifications: Notification[] = [
  {
    id: "n1",
    kind: "interview",
    text: "Interview scheduled for OT Nurse role in Dubai — 15 July at 2pm",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "n2",
    kind: "document",
    text: "Documents required for your Doha placement — submit by 20 July",
    time: "Yesterday",
    read: false,
  },
  {
    id: "n3",
    kind: "application",
    text: "Your application for ICU Nurse in Riyadh was received",
    time: "3 days ago",
    read: true,
  },
  {
    id: "n4",
    kind: "visa",
    text: "Visa processing started for your Abu Dhabi role",
    time: "5 days ago",
    read: true,
  },
  {
    id: "n5",
    kind: "placement",
    text: "Congratulations! You've been shortlisted for ICU Nurse — Cardiac",
    time: "1 week ago",
    read: true,
  },
];

export const resume = {
  fileName: "Reshma_K_ICU_Nurse_CV.pdf",
  uploadedAt: "2026-07-08",
  sizeKb: 412,
};
