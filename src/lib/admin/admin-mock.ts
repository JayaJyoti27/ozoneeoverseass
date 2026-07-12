// Mock data for Ozone Overseas admin portal
export type Status =
  | "New"
  | "Verified"
  | "Shortlisted"
  | "Placed"
  | "Active"
  | "Draft"
  | "Archived"
  | "Applied"
  | "Reviewing"
  | "Interview"
  | "Documentation"
  | "Visa"
  | "Rejected"
  | "Contacted"
  | "Qualified"
  | "Converted"
  | "Inactive";

export const COUNTRIES = [
  { code: "AE", name: "UAE", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "QA", name: "Qatar", flag: "🇶🇦" },
  { code: "KW", name: "Kuwait", flag: "🇰🇼" },
  { code: "OM", name: "Oman", flag: "🇴🇲" },
  { code: "BH", name: "Bahrain", flag: "🇧🇭" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "MT", name: "Malta", flag: "🇲🇹" },
];

export const SECTORS = [
  "Healthcare",
  "Construction",
  "Hospitality",
  "IT",
  "Engineering",
  "Education",
  "Retail",
];
export const SPECIALTIES = [
  "Nurse",
  "Doctor",
  "Engineer",
  "Chef",
  "Developer",
  "Teacher",
  "Electrician",
  "Plumber",
];

const firstNames = [
  "Aarav",
  "Priya",
  "Kwame",
  "Fatima",
  "Liam",
  "Sofia",
  "Yusuf",
  "Mei",
  "Chidi",
  "Isabella",
  "Raj",
  "Amara",
  "Diego",
  "Hana",
  "Omar",
  "Nia",
];
const lastNames = [
  "Patel",
  "Okafor",
  "Silva",
  "Khan",
  "Nguyen",
  "Kimura",
  "Adeyemi",
  "Reyes",
  "Sharma",
  "Al-Farsi",
  "Chen",
  "Kaur",
  "Mensah",
  "Lopez",
  "Ali",
];
const companies = [
  "Emirates Health",
  "Al-Futtaim Group",
  "Qatar Petroleum",
  "Saudi Aramco",
  "Marriott GCC",
  "EMAAR",
  "NEOM",
  "Doha Bank",
  "Etisalat",
  "ADNOC",
  "Bin Ghurair",
  "Landmark Group",
];

const rand = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const daysAgo = (d: number) => {
  const date = new Date();
  date.setDate(date.getDate() - d);
  return date.toISOString();
};

// seed deterministic
let seed = 1;
function seededRandom() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}
const srand = <T>(arr: T[]) => arr[Math.floor(seededRandom() * arr.length)];
const srandInt = (min: number, max: number) => Math.floor(seededRandom() * (max - min + 1)) + min;

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  specialty: string;
  experience: number;
  targetCountries: string[];
  status: Status;
  cvUrl: string | null;
  notes: string;
  createdAt: string;
}

export interface Employer {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  website: string;
  country: string;
  industry: string;
  status: Status;
  activeJobs: number;
  logo: string;
}

export interface Job {
  id: string;
  title: string;
  employerId: string;
  employer: string;
  country: string;
  city: string;
  sector: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  experience: string;
  description: string;
  status: Status;
  applicants: number;
  postedAt: string;
}

export interface Application {
  id: string;
  candidateId: string;
  candidate: string;
  jobId: string;
  job: string;
  employer: string;
  country: string;
  status: Status;
  appliedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  type: "Candidate" | "Employer" | "General";
  message: string;
  source: string;
  status: Status;
  createdAt: string;
}

seed = 42;
export const candidates: Candidate[] = Array.from({ length: 28 }, (_, i) => {
  const first = srand(firstNames);
  const last = srand(lastNames);
  const status = srand(["New", "Verified", "Shortlisted", "Placed"]) as Status;
  return {
    id: `c${i + 1}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@mail.com`,
    phone: `+91 ${srandInt(70, 99)}${srandInt(10000000, 99999999)}`,
    nationality: srand(["Indian", "Filipino", "Nepali", "Kenyan", "Egyptian", "Pakistani"]),
    specialty: srand(SPECIALTIES),
    experience: srandInt(1, 15),
    targetCountries: [srand(COUNTRIES).code, srand(COUNTRIES).code],
    status,
    cvUrl: seededRandom() > 0.3 ? `/cv/${i + 1}.pdf` : null,
    notes: "",
    createdAt: daysAgo(srandInt(1, 90)),
  };
});

seed = 7;
export const employers: Employer[] = Array.from({ length: 14 }, (_, i) => {
  const name = companies[i % companies.length];
  return {
    id: `e${i + 1}`,
    name,
    contact: `${srand(firstNames)} ${srand(lastNames)}`,
    email: `hr@${name.toLowerCase().replace(/[^a-z]/g, "")}.com`,
    phone: `+971 ${srandInt(50, 58)} ${srandInt(1000000, 9999999)}`,
    website: `www.${name.toLowerCase().replace(/[^a-z]/g, "")}.com`,
    country: srand(COUNTRIES).code,
    industry: srand(SECTORS),
    status: srand(["Active", "Active", "Active", "Inactive"]) as Status,
    activeJobs: srandInt(0, 12),
    logo: name.slice(0, 2).toUpperCase(),
  };
});

seed = 15;
export const jobs: Job[] = Array.from({ length: 32 }, (_, i) => {
  const emp = employers[i % employers.length];
  const sector = srand(SECTORS);
  const smin = srandInt(2, 15) * 1000;
  return {
    id: `j${i + 1}`,
    title: `${srand(SPECIALTIES)} — ${sector}`,
    employerId: emp.id,
    employer: emp.name,
    country: emp.country,
    city: srand([
      "Dubai",
      "Abu Dhabi",
      "Doha",
      "Riyadh",
      "Muscat",
      "London",
      "Berlin",
      "Toronto",
      "Sydney",
    ]),
    sector,
    salaryMin: smin,
    salaryMax: smin + srandInt(2, 8) * 1000,
    currency: "AED",
    experience: `${srandInt(1, 10)}+ years`,
    description:
      "We are seeking a qualified professional for this role in a fast-paced environment.",
    status: srand(["Active", "Active", "Active", "Draft", "Archived"]) as Status,
    applicants: srandInt(0, 45),
    postedAt: daysAgo(srandInt(1, 60)),
  };
});

seed = 23;
const APP_STATUSES: Status[] = [
  "Applied",
  "Reviewing",
  "Shortlisted",
  "Interview",
  "Documentation",
  "Visa",
  "Placed",
  "Rejected",
];
export const applications: Application[] = Array.from({ length: 40 }, (_, i) => {
  const cand = candidates[i % candidates.length];
  const job = jobs[i % jobs.length];
  return {
    id: `a${i + 1}`,
    candidateId: cand.id,
    candidate: cand.name,
    jobId: job.id,
    job: job.title,
    employer: job.employer,
    country: job.country,
    status: srand(APP_STATUSES) as Status,
    appliedAt: daysAgo(srandInt(0, 45)),
  };
});

seed = 31;
export const leads: Lead[] = Array.from({ length: 22 }, (_, i) => ({
  id: `l${i + 1}`,
  name: `${srand(firstNames)} ${srand(lastNames)}`,
  company: srand(companies),
  email: `lead${i}@example.com`,
  phone: `+${srandInt(1, 99)} ${srandInt(1000000000, 9999999999)}`,
  type: srand(["Candidate", "Employer", "General"]) as "Candidate" | "Employer" | "General",
  message:
    "Hello, I am interested in learning more about your services and how you can help me achieve my career goals overseas.",
  source: srand(["/contact", "/candidates", "/employers", "/direct"]),
  status: srand(["New", "Contacted", "Qualified", "Converted", "Archived"]) as Status,
  createdAt: daysAgo(srandInt(0, 30)),
}));

export const countryStats = COUNTRIES.map((c) => ({
  ...c,
  activeJobs: jobs.filter((j) => j.country === c.code && j.status === "Active").length,
  candidates: candidates.filter((cand) => cand.targetCountries.includes(c.code)).length,
  employers: employers.filter((e) => e.country === c.code).length,
  status: "Active" as Status,
  featured: seededRandom() > 0.5,
}));

export const applicationsByMonth = Array.from({ length: 6 }, (_, i) => {
  const d = new Date();
  d.setMonth(d.getMonth() - (5 - i));
  return {
    month: d.toLocaleString("en", { month: "short" }),
    applications: randInt(20, 80),
    hires: randInt(3, 15),
    shortlisted: randInt(8, 30),
  };
});

export const jobsByCountry = COUNTRIES.slice(0, 8).map((c) => ({
  country: c.name,
  jobs: jobs.filter((j) => j.country === c.code).length + randInt(2, 8),
}));

export const specialtyDist = SPECIALTIES.slice(0, 6).map((s) => ({
  name: s,
  value: candidates.filter((c) => c.specialty === s).length + randInt(1, 5),
}));

export const leadsBySource = [
  { source: "Contact Page", value: 34 },
  { source: "Candidates", value: 28 },
  { source: "Employers", value: 19 },
  { source: "Direct", value: 12 },
];

export function statusChipClasses(status: string): string {
  const s = status.toLowerCase();
  if (["new", "applied", "draft"].includes(s)) return "bg-neutral-200 text-neutral-800";
  if (["active", "verified", "reviewing", "contacted"].includes(s))
    return "bg-brand-blue text-white";
  if (["shortlisted", "interview", "in progress", "qualified"].includes(s))
    return "bg-brand-gold text-brand-navy";
  if (["placed", "filled", "hired", "converted"].includes(s)) return "bg-emerald-500 text-white";
  if (["archived", "rejected", "inactive"].includes(s)) return "bg-rose-500/80 text-white";
  if (["documentation"].includes(s)) return "bg-indigo-500 text-white";
  if (["visa"].includes(s)) return "bg-orange-500 text-white";
  return "bg-neutral-200 text-neutral-800";
}

export function countryByCode(code: string) {
  return COUNTRIES.find((c) => c.code === code) ?? { code, name: code, flag: "🏳️" };
}

export function toCSV<T extends Record<string, unknown>>(rows: T[], filename: string) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [
    keys.join(","),
    ...rows.map((r) => keys.map((k) => JSON.stringify(r[k] ?? "")).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
