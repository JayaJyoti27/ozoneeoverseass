import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import type { Job } from "@/db/jobs";

const COUNTRY_FLAGS: Record<string, string> = {
  "Saudi Arabia": "🇸🇦",
  UAE: "🇦🇪",
  Qatar: "🇶🇦",
  Oman: "🇴🇲",
  Kuwait: "🇰🇼",
  Malaysia: "🇲🇾",
  Ireland: "🇮🇪",
  Singapore: "🇸🇬",
  Denmark: "🇩🇰",
  Malta: "🇲🇹",
  Russia: "🇷🇺",
  "New Zealand": "🇳🇿",
  UK: "🇬🇧",
  "United Kingdom": "🇬🇧",
};

function countryFlag(country: string | null): string {
  if (!country) return "🌍";
  return COUNTRY_FLAGS[country] ?? "🌍";
}

export function formatSalary(job: Job): string {
  const { salary_min, salary_max, currency } = job;
  const cur = currency ?? "";
  if (salary_min && salary_max) {
    return `${cur} ${salary_min.toLocaleString()} - ${salary_max.toLocaleString()}`;
  }
  if (salary_min) return `${cur} ${salary_min.toLocaleString()}+`;
  if (salary_max) return `Up to ${cur} ${salary_max.toLocaleString()}`;
  return "Salary on request";
}

export function daysAgo(dateStr: string | null): number {
  if (!dateStr) return 0;
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

interface JobCardProps {
  job: Job;
  compact?: boolean;
}

export function JobCard({ job, compact = false }: JobCardProps) {
  const flag = countryFlag(job.country);
  const salary = formatSalary(job);
  const posted = daysAgo(job.created_at);

  return (
    <Link
      to="/Candidates/jobs/$id"
      params={{ id: job.id }}
      className="group flex flex-col rounded-3xl border border-blue/20 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
    >
      <div className="flex items-start justify-between gap-3">
        {job.sector && (
          <span className="rounded-full bg-lightblue px-3 py-1 text-xs font-semibold text-blue">
            {job.sector}
          </span>
        )}
        {!compact && posted > 0 && (
          <span className="text-xs text-muted-foreground">{posted}d ago</span>
        )}
      </div>

      <h3 className="mt-4 font-display text-lg font-bold leading-snug text-navy group-hover:text-blue">
        {job.title ?? "Untitled Role"}
      </h3>

      <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        <span className="text-base">{flag}</span>
        <MapPin className="h-3.5 w-3.5" />
        <span>{[job.city, job.country].filter(Boolean).join(", ") || "Location TBC"}</span>
      </div>

      {job.employer_type && (
        <p className="mt-1 text-sm italic text-muted-foreground">{job.employer_type}</p>
      )}

      {!compact && job.description && (
        <p className="mt-3 line-clamp-2 text-sm text-navy/70">{job.description}</p>
      )}

      <div className="mt-4 h-px bg-border" />

      <div className="mt-4 flex items-center justify-between">
        <span className="font-display text-base font-bold text-gold">{salary}</span>
        <span className="flex items-center gap-1 text-sm font-semibold text-blue">
          View <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
