export type Job = {
  id: string;
  title: string;
  country: string;
  flag: string;
  city: string;
  sector: string;
  salary: string;
  status: "Active" | "Closed" | "In Progress";
  applicants: number;
  created: string;
};

export type Requirement = {
  id: string;
  role: string;
  country: string;
  flag: string;
  sector: string;
  headcount: number;
  timeline: string;
  status: "New" | "In Progress" | "Filled";
  received: string;
};

export type Application = {
  id: string;
  candidate: string;
  email: string;
  phone: string;
  job: string;
  appliedDate: string;
  status: "New" | "Shortlisted" | "Hired" | "Rejected";
  experience: string;
  specialty: string;
  targets: { flag: string; name: string }[];
  cv: boolean;
};

export type Candidate = {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  sector: string;
  status: "Available" | "Shortlisted";
  targets: { flag: string; name: string }[];
};

export const mockJobs: Job[] = [
  {
    id: "j1",
    title: "Site Engineer (Civil)",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    city: "Riyadh",
    sector: "Construction",
    salary: "SAR 6,500",
    status: "Active",
    applicants: 42,
    created: "12 Jul 2026",
  },
  {
    id: "j2",
    title: "MEP Foreman",
    country: "UAE",
    flag: "🇦🇪",
    city: "Dubai",
    sector: "Construction",
    salary: "AED 5,200",
    status: "Active",
    applicants: 18,
    created: "08 Jul 2026",
  },
  {
    id: "j3",
    title: "Registered Nurse (ICU)",
    country: "Qatar",
    flag: "🇶🇦",
    city: "Doha",
    sector: "Healthcare",
    salary: "QAR 8,000",
    status: "In Progress",
    applicants: 63,
    created: "01 Jul 2026",
  },
  {
    id: "j4",
    title: "F&B Supervisor",
    country: "Oman",
    flag: "🇴🇲",
    city: "Muscat",
    sector: "Hospitality",
    salary: "OMR 400",
    status: "Active",
    applicants: 11,
    created: "27 Jun 2026",
  },
  {
    id: "j5",
    title: "Pipeline Welder 6G",
    country: "Kuwait",
    flag: "🇰🇼",
    city: "Ahmadi",
    sector: "Energy",
    salary: "KWD 550",
    status: "Closed",
    applicants: 34,
    created: "14 Jun 2026",
  },
];

export const mockRequirements: Requirement[] = [
  {
    id: "r1",
    role: "Shuttering Carpenter",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    sector: "Construction",
    headcount: 80,
    timeline: "60 days",
    status: "New",
    received: "10 Jul 2026",
  },
  {
    id: "r2",
    role: "HVAC Technician",
    country: "UAE",
    flag: "🇦🇪",
    sector: "Construction",
    headcount: 25,
    timeline: "45 days",
    status: "In Progress",
    received: "02 Jul 2026",
  },
  {
    id: "r3",
    role: "Staff Nurse (ER)",
    country: "Qatar",
    flag: "🇶🇦",
    sector: "Healthcare",
    headcount: 40,
    timeline: "90 days",
    status: "In Progress",
    received: "20 Jun 2026",
  },
  {
    id: "r4",
    role: "Housekeeping Attendant",
    country: "Oman",
    flag: "🇴🇲",
    sector: "Hospitality",
    headcount: 120,
    timeline: "30 days",
    status: "Filled",
    received: "28 May 2026",
  },
];

export const mockApplications: Application[] = [
  {
    id: "a1",
    candidate: "Rahul Verma",
    email: "rahul.v@mail.com",
    phone: "+91 98200 12345",
    job: "Site Engineer (Civil)",
    appliedDate: "11 Jul 2026",
    status: "New",
    experience: "7 years",
    specialty: "Civil Engineering",
    targets: [
      { flag: "🇸🇦", name: "Saudi Arabia" },
      { flag: "🇦🇪", name: "UAE" },
    ],
    cv: true,
  },
  {
    id: "a2",
    candidate: "Priya Nair",
    email: "priya.n@mail.com",
    phone: "+91 96500 88221",
    job: "Registered Nurse (ICU)",
    appliedDate: "10 Jul 2026",
    status: "Shortlisted",
    experience: "5 years",
    specialty: "ICU Nursing",
    targets: [{ flag: "🇶🇦", name: "Qatar" }],
    cv: true,
  },
  {
    id: "a3",
    candidate: "Mohammed Iqbal",
    email: "iqbal@mail.com",
    phone: "+91 90230 45566",
    job: "MEP Foreman",
    appliedDate: "09 Jul 2026",
    status: "New",
    experience: "12 years",
    specialty: "MEP Supervision",
    targets: [
      { flag: "🇦🇪", name: "UAE" },
      { flag: "🇴🇲", name: "Oman" },
    ],
    cv: false,
  },
  {
    id: "a4",
    candidate: "Anjali Sharma",
    email: "anjali.s@mail.com",
    phone: "+91 99870 33212",
    job: "F&B Supervisor",
    appliedDate: "07 Jul 2026",
    status: "Hired",
    experience: "6 years",
    specialty: "F&B Operations",
    targets: [{ flag: "🇴🇲", name: "Oman" }],
    cv: true,
  },
  {
    id: "a5",
    candidate: "Suresh Menon",
    email: "suresh@mail.com",
    phone: "+91 91000 22110",
    job: "Pipeline Welder 6G",
    appliedDate: "05 Jul 2026",
    status: "Rejected",
    experience: "9 years",
    specialty: "6G Welding",
    targets: [
      { flag: "🇰🇼", name: "Kuwait" },
      { flag: "🇸🇦", name: "Saudi Arabia" },
    ],
    cv: true,
  },
];

export const mockCandidates: Candidate[] = [
  {
    id: "c1",
    name: "Vikram Singh",
    specialty: "Site Engineer",
    experience: "8 years",
    sector: "Construction",
    status: "Available",
    targets: [
      { flag: "🇸🇦", name: "KSA" },
      { flag: "🇦🇪", name: "UAE" },
    ],
  },
  {
    id: "c2",
    name: "Fatima Khan",
    specialty: "ICU Nurse",
    experience: "6 years",
    sector: "Healthcare",
    status: "Available",
    targets: [{ flag: "🇶🇦", name: "Qatar" }],
  },
  {
    id: "c3",
    name: "Deepak Rao",
    specialty: "MEP Technician",
    experience: "10 years",
    sector: "Construction",
    status: "Shortlisted",
    targets: [{ flag: "🇦🇪", name: "UAE" }],
  },
  {
    id: "c4",
    name: "Nisha Pillai",
    specialty: "Chef de Partie",
    experience: "5 years",
    sector: "Hospitality",
    status: "Available",
    targets: [
      { flag: "🇴🇲", name: "Oman" },
      { flag: "🇧🇭", name: "Bahrain" },
    ],
  },
  {
    id: "c5",
    name: "Arjun Reddy",
    specialty: "6G Welder",
    experience: "12 years",
    sector: "Energy",
    status: "Available",
    targets: [{ flag: "🇰🇼", name: "Kuwait" }],
  },
  {
    id: "c6",
    name: "Meera Iyer",
    specialty: "Radiographer",
    experience: "4 years",
    sector: "Healthcare",
    status: "Available",
    targets: [{ flag: "🇸🇦", name: "KSA" }],
  },
];

export const mockCompany = {
  name: "Delta Constructions LLC",
  email: "hr@delta-constructions.ae",
  phone: "+971 4 512 3388",
  website: "delta-constructions.ae",
  location: "Dubai, UAE",
  country: "United Arab Emirates",
  industry: "Construction & Infrastructure",
  about:
    "Delta Constructions is a Tier-1 civil and MEP contractor operating across the GCC, delivering large-scale infrastructure, hospitality and healthcare projects since 1998.",
};
