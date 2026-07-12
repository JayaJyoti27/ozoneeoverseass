export type Country = {
  name: string;
  flag: string;
  code: string;
  lat: number;
  lng: number;
  roles: number;
  region: "Middle East" | "Europe" | "Asia Pacific" | "North America" | "Oceania";
};

export const COUNTRIES: Country[] = [
  {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    code: "SA",
    lat: 24.77,
    lng: 46.72,
    roles: 142,
    region: "Middle East",
  },
  {
    name: "UAE",
    flag: "🇦🇪",
    code: "AE",
    lat: 24.47,
    lng: 54.37,
    roles: 118,
    region: "Middle East",
  },
  {
    name: "Qatar",
    flag: "🇶🇦",
    code: "QA",
    lat: 25.28,
    lng: 51.53,
    roles: 74,
    region: "Middle East",
  },
  { name: "Oman", flag: "🇴🇲", code: "OM", lat: 23.58, lng: 58.4, roles: 41, region: "Middle East" },
  {
    name: "Kuwait",
    flag: "🇰🇼",
    code: "KW",
    lat: 29.37,
    lng: 47.98,
    roles: 36,
    region: "Middle East",
  },
  {
    name: "Malaysia",
    flag: "🇲🇾",
    code: "MY",
    lat: 3.14,
    lng: 101.69,
    roles: 52,
    region: "Asia Pacific",
  },
  {
    name: "Singapore",
    flag: "🇸🇬",
    code: "SG",
    lat: 1.35,
    lng: 103.82,
    roles: 61,
    region: "Asia Pacific",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    code: "CA",
    lat: 45.42,
    lng: -75.7,
    roles: 88,
    region: "North America",
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    code: "GB",
    lat: 51.5,
    lng: -0.13,
    roles: 104,
    region: "Europe",
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    code: "AU",
    lat: -33.87,
    lng: 151.21,
    roles: 67,
    region: "Oceania",
  },
  { name: "Germany", flag: "🇩🇪", code: "DE", lat: 52.52, lng: 13.4, roles: 79, region: "Europe" },
  {
    name: "USA",
    flag: "🇺🇸",
    code: "US",
    lat: 38.9,
    lng: -77.04,
    roles: 93,
    region: "North America",
  },
  { name: "Ireland", flag: "🇮🇪", code: "IE", lat: 53.35, lng: -6.26, roles: 44, region: "Europe" },
  { name: "Denmark", flag: "🇩🇰", code: "DK", lat: 55.68, lng: 12.57, roles: 29, region: "Europe" },
  { name: "Malta", flag: "🇲🇹", code: "MT", lat: 35.9, lng: 14.51, roles: 18, region: "Europe" },
  { name: "Russia", flag: "🇷🇺", code: "RU", lat: 55.75, lng: 37.62, roles: 22, region: "Europe" },
  {
    name: "New Zealand",
    flag: "🇳🇿",
    code: "NZ",
    lat: -36.85,
    lng: 174.76,
    roles: 31,
    region: "Oceania",
  },
];
