export const TEMP_EMPLOYER_ID = "temp-123";

export type Country = {
  name: string;
  flag: string;
  currency: string;
};

export const COUNTRIES: Country[] = [
  { name: "United Arab Emirates", flag: "🇦🇪", currency: "AED" },
  { name: "Saudi Arabia", flag: "🇸🇦", currency: "SAR" },
  { name: "Qatar", flag: "🇶🇦", currency: "QAR" },
  { name: "Kuwait", flag: "🇰🇼", currency: "KWD" },
  { name: "Oman", flag: "🇴🇲", currency: "OMR" },
  { name: "Bahrain", flag: "🇧🇭", currency: "BHD" },
  { name: "Germany", flag: "🇩🇪", currency: "EUR" },
  { name: "United Kingdom", flag: "🇬🇧", currency: "GBP" },
  { name: "Ireland", flag: "🇮🇪", currency: "EUR" },
  { name: "Malta", flag: "🇲🇹", currency: "EUR" },
  { name: "Malaysia", flag: "🇲🇾", currency: "MYR" },
  { name: "Singapore", flag: "🇸🇬", currency: "SGD" },
  { name: "Canada", flag: "🇨🇦", currency: "CAD" },
  { name: "Australia", flag: "🇦🇺", currency: "AUD" },
  { name: "New Zealand", flag: "🇳🇿", currency: "NZD" },
  { name: "Maldives", flag: "🇲🇻", currency: "MVR" },
  { name: "United States", flag: "🇺🇸", currency: "USD" },
];

export const COUNTRY_MAP: Record<string, Country> = COUNTRIES.reduce(
  (acc, c) => {
    acc[c.name] = c;
    return acc;
  },
  {} as Record<string, Country>,
);

export function flagFor(country: string): string {
  return COUNTRY_MAP[country]?.flag ?? "🏳️";
}

export const INDUSTRIES = [
  "Healthcare",
  "Construction",
  "Oil & Gas",
  "Engineering",
  "Hospitality",
  "IT",
  "Other",
] as const;

export const SECTORS = ["Healthcare", "Technical", "Allied Health"] as const;
export type Sector = (typeof SECTORS)[number];

export const TIMELINES = ["ASAP", "Within 1 month", "Within 3 months", "Flexible"] as const;

export const SPECIALTIES = [
  "ICU Nurse",
  "Staff Nurse",
  "OT Nurse",
  "Biomedical",
  "Radiology",
  "Civil Engineer",
  "Mechanical",
  "Electrical",
  "Other",
] as const;

export const NATIONALITIES = ["Indian", "Filipino", "Other"] as const;

export const EXPERIENCE_OPTIONS = [
  { label: "1+ yr", value: 1 },
  { label: "2+ yrs", value: 2 },
  { label: "3+ yrs", value: 3 },
  { label: "5+ yrs", value: 5 },
] as const;

export const SUPPORT_EMAIL = "hello@ozoneoverseas.com";
