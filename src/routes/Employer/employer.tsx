import { createFileRoute } from "@tanstack/react-router";
import { EmployerNavbar } from "@/components/Employer/EmployerNav";
import { Footer } from "@/components/site/footer";
import hospitalCorridor from "@/assets/hospital-corridor.jpg";
import hrInterview from "@/assets/hr-interview.jpg";
import teamMeeting from "@/assets/team-meeting.jpg";
import oilGasSite from "@/assets/oil-gas-site.jpg";
import successIcu from "@/assets/success-icu.jpg";
import successUae from "@/assets/success-uae.jpg";
import successKuwait from "@/assets/success-kuwait.jpg";
import successQatar from "@/assets/success-qatar.jpg";
import { useState } from "react";

export const Route = createFileRoute("/Employer/employer")({
  head: () => ({
    meta: [
      { title: "For Employers — Ozone Overseas | Verified Talent in 48 Hours" },
      {
        name: "description",
        content:
          "200+ hospitals and companies trust Ozone Overseas for pre-screened, MEA-compliant hiring across the GCC. Post a requirement — get your first candidate in 48 hours.",
      },
      { property: "og:title", content: "Hire Verified Talent, Not Resumes — Ozone Overseas" },
      {
        property: "og:description",
        content:
          "Pre-screened candidates, zero compliance risk, first match in 48 hours. Trusted by 200+ hospitals & companies across the GCC.",
      },
    ],
  }),
  component: EmployersPage,
});

// ---------- Design primitives ----------
const NAVY = "var(--color-ozone-navy,#0B1F3A)";
const BLUE = "var(--color-ozone-blue,#1E4D8C)";
const BLUE_LIGHT = "var(--color-ozone-blue-light,#E4EDF7)";
const GOLD = "var(--color-ozone-gold,#C9A646)";

function EyebrowPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-ozone-blue,#1E4D8C)]/25 bg-white/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ozone-blue,#1E4D8C)] backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ozone-gold,#C9A646)]" />
      {children}
    </span>
  );
}

function WaveBlob({
  className,
  color = BLUE_LIGHT,
  opacity = 1,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden style={{ opacity }}>
      <path
        d="M420,80 C520,140 580,260 540,380 C500,500 360,560 240,520 C120,480 40,360 80,240 C120,120 320,20 420,80 Z"
        fill={color}
      />
    </svg>
  );
}

function DotGrid({ className }: { className?: string }) {
  return <div className={`dot-grid ${className ?? ""}`} aria-hidden />;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden>
      <circle cx="10" cy="10" r="10" fill={BLUE} />
      <path
        d="M6 10.5l2.5 2.5L14 7.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

// ---------- Sections ----------

function Hero() {
  const candidates = [
    { initials: "RK", role: "ICU Nurse · 6 yrs exp", tag: "DHA Eligible", pct: 95, tagColor: BLUE },
    {
      initials: "PS",
      role: "Site Engineer · 8 yrs exp",
      tag: "GCC Experience",
      pct: 92,
      tagColor: BLUE,
    },
    {
      initials: "MV",
      role: "Anesthesia Tech · 5 yrs",
      tag: "BLS Certified",
      pct: 97,
      tagColor: GOLD,
    },
    {
      initials: "AN",
      role: "Staff Nurse · 4 yrs exp",
      tag: "SCFHS Licensed",
      pct: 98,
      tagColor: GOLD,
    },
  ];

  return (
    <section className="relative overflow-hidden pb-24 pt-10 lg:pb-32">
      {/* asymmetric wave blobs */}
      <WaveBlob className="pointer-events-none absolute -left-40 -top-24 h-[520px] w-[520px]" />
      <WaveBlob
        className="pointer-events-none absolute -right-20 top-40 h-[420px] w-[420px]"
        opacity={0.7}
      />
      <DotGrid className="pointer-events-none absolute bottom-24 left-16 h-40 w-40" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        {/* Left */}
        <div>
          <EyebrowPill>For Employers</EyebrowPill>
          <h1 className="mt-6 font-[var(--font-display)] text-5xl font-extrabold leading-[1.02] tracking-tight text-[var(--color-ozone-navy,#0B1F3A)] md:text-[64px]">
            Hire Verified Talent,
            <br />
            <span className="text-[var(--color-ozone-blue,#1E4D8C)]">Not Resumes.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-ozone-muted,#5B6B82)]">
            Submit a requirement, get your first pre-screened candidate in 48 hours. 200+ hospitals
            and companies trust Ozone for compliant, verified hiring across the GCC and beyond.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/Employer/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ozone-navy,#0B1F3A)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(11,31,58,0.6)] transition hover:bg-[var(--color-ozone-blue,#1E4D8C)]"
            >
              View Dashboard <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#talent-pool"
              className="inline-flex items-center rounded-full border-2 border-[var(--color-ozone-blue,#1E4D8C)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-ozone-blue,#1E4D8C)] transition hover:bg-[var(--color-ozone-blue-light,#E4EDF7)]"
            >
              Browse Talent Pool
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2.5">
              {["#1E4D8C", "#C9A646", "#0B1F3A", "#3E7DBF", "#7A8BA6"].map((c, i) => (
                <span
                  key={i}
                  className="grid h-9 w-9 place-items-center rounded-full border-[2.5px] border-white text-[11px] font-semibold text-white shadow-sm"
                  style={{ backgroundColor: c }}
                >
                  {["A", "R", "M", "S", "K"][i]}
                </span>
              ))}
            </div>
            <p className="text-sm text-[var(--color-ozone-muted,#5B6B82)]">
              Trusted by{" "}
              <span className="font-semibold text-[var(--color-ozone-navy,#0B1F3A)]">
                200+ hospitals & companies
              </span>
            </p>
          </div>
        </div>

        {/* Right — Incoming Candidates card */}
        <div className="relative">
          <DotGrid className="absolute -bottom-6 -right-6 h-32 w-32" />

          {/* floating stat badge top-left */}
          <div className="absolute -left-4 -top-4 z-20 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-[0_18px_40px_-14px_rgba(11,31,58,0.25)]">
            <span className="h-2 w-2 rounded-full bg-[var(--color-ozone-blue,#1E4D8C)]" />
            <span className="text-xs font-semibold text-[var(--color-ozone-navy,#0B1F3A)]">
              200+ Employer Partners
            </span>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-30px_rgba(11,31,58,0.35)] ring-1 ring-black/[0.04]">
            {/* header strip */}
            <div className="flex items-center justify-between bg-[var(--color-ozone-navy,#0B1F3A)] px-6 py-4 text-white">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <span className="font-[var(--font-heading)] text-sm font-semibold tracking-wide">
                  Incoming Candidates
                </span>
              </div>
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/60">
                Live · Today
              </span>
            </div>

            <ul className="divide-y divide-slate-100">
              {candidates.map((c) => (
                <li key={c.initials} className="flex items-center gap-4 px-5 py-4">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[13px] font-bold text-white"
                    style={{ backgroundColor: NAVY }}
                  >
                    {c.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold text-[var(--color-ozone-navy,#0B1F3A)]">
                      {c.role}
                    </p>
                    <span className="mt-1 inline-flex rounded-md bg-[var(--color-ozone-blue-light,#E4EDF7)] px-2 py-0.5 text-[11px] font-semibold text-[var(--color-ozone-blue,#1E4D8C)]">
                      {c.tag}
                    </span>
                  </div>
                  <span
                    className="rounded-full px-3 py-1.5 text-xs font-bold text-white"
                    style={{ backgroundColor: c.tagColor }}
                  >
                    {c.pct}%
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-5 py-3.5 text-xs">
              <span className="font-medium text-[var(--color-ozone-muted,#5B6B82)]">
                <span className="font-bold text-[var(--color-ozone-navy,#0B1F3A)]">48h</span> avg.
                first candidate
              </span>
              <a
                href="#talent-pool"
                className="inline-flex items-center gap-1 font-semibold text-[var(--color-ozone-blue,#1E4D8C)]"
              >
                View Talent Pool <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* toast overlap */}
          <div className="absolute -bottom-5 left-8 z-20 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-[0_20px_40px_-18px_rgba(11,31,58,0.3)] ring-1 ring-emerald-100">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500 text-white">
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M5 10.5l3 3 7-7" />
              </svg>
            </span>
            <div className="text-xs">
              <p className="font-semibold text-[var(--color-ozone-navy,#0B1F3A)]">Just Verified</p>
              <p className="text-[var(--color-ozone-muted,#5B6B82)]">12 ICU Nurses · SCFHS Pass</p>
            </div>
          </div>

          {/* floating stat badge bottom-right */}
          <div className="absolute -right-3 bottom-16 z-20 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-[0_18px_40px_-14px_rgba(11,31,58,0.25)]">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
              <circle cx="10" cy="10" r="10" fill={GOLD} />
              <path
                d="M6 10.5l2.5 2.5L14 7.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs font-semibold text-[var(--color-ozone-navy,#0B1F3A)]">
              Zero Compliance Risk
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBand() {
  const stats = [
    { value: "200+", label: "Employer Partners", icon: "🏥" },
    { value: "48h", label: "Avg. First Candidate", icon: "⏱" },
    { value: "MEA", label: "Licensed & Compliant", icon: "✓" },
  ];

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[36px] bg-[var(--color-ozone-blue-light,#E4EDF7)] px-8 py-10 md:px-14">
          <WaveBlob
            className="pointer-events-none absolute -right-24 -top-32 h-72 w-72"
            color="#D5E4F5"
          />
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:divide-x md:divide-[var(--color-ozone-gold,#C9A646)]/40">
            {stats.map((s, i) => (
              <div key={s.label} className={`flex items-center gap-5 ${i > 0 ? "md:pl-10" : ""}`}>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl shadow-sm">
                  {s.icon}
                </span>
                <div>
                  <p className="font-[var(--font-display)] text-4xl font-extrabold text-[var(--color-ozone-navy,#0B1F3A)]">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--color-ozone-muted,#5B6B82)]">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const features = [
    { title: "Zero Compliance Risk", desc: "MEA compliant, regulatory burden on us" },
    { title: "48-Hour First Match", desc: "Your first pre-screened candidate in two days" },
    { title: "Documentation, Fully Managed", desc: "Licensing, attestation, visa — end to end" },
    { title: "One Dedicated Contact", desc: "A single account manager for your account" },
  ];

  return (
    <section className="relative py-24 lg:py-32">
      <WaveBlob
        className="pointer-events-none absolute -bottom-40 -right-32 h-[520px] w-[520px]"
        opacity={0.8}
      />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
        {/* Left photo cluster */}
        <div className="relative min-h-[520px]">
          <DotGrid className="absolute -left-6 top-10 h-32 w-32" />
          <img
            src={hospitalCorridor}
            alt="Hospital corridor"
            width={520}
            height={620}
            loading="lazy"
            className="absolute left-0 top-0 h-[380px] w-[62%] rounded-3xl object-cover shadow-[0_30px_60px_-30px_rgba(11,31,58,0.4)]"
          />
          <img
            src={hrInterview}
            alt="HR interview"
            width={340}
            height={380}
            loading="lazy"
            className="absolute right-0 top-24 h-[280px] w-[52%] rounded-3xl border-[6px] border-white object-cover shadow-[0_30px_60px_-30px_rgba(11,31,58,0.35)]"
          />
          <img
            src={teamMeeting}
            alt="Team meeting"
            width={360}
            height={280}
            loading="lazy"
            className="absolute bottom-0 left-8 h-[220px] w-[58%] rounded-3xl border-[6px] border-white object-cover shadow-[0_30px_60px_-30px_rgba(11,31,58,0.35)]"
          />
          {/* floating badge */}
          <div className="absolute -bottom-2 right-4 z-10 rounded-2xl bg-white px-4 py-3 shadow-[0_20px_40px_-14px_rgba(11,31,58,0.3)]">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ozone-blue,#1E4D8C)]">
              Guarantee
            </p>
            <p className="mt-0.5 text-sm font-bold text-[var(--color-ozone-navy,#0B1F3A)]">
              48-Hour First Match
            </p>
          </div>
        </div>

        {/* Right content */}
        <div>
          <EyebrowPill>Why Ozone</EyebrowPill>
          <h2 className="mt-5 font-[var(--font-display)] text-4xl font-extrabold leading-tight tracking-tight text-[var(--color-ozone-navy,#0B1F3A)] md:text-5xl">
            We Screen So{" "}
            <span className="text-[var(--color-ozone-blue,#1E4D8C)]">You Don't Have To.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--color-ozone-muted,#5B6B82)]">
            Every candidate arrives pre-verified — qualifications, license eligibility, and
            relocation readiness already checked.
          </p>

          <ul className="mt-8 space-y-4">
            {features.map((f) => (
              <li key={f.title} className="flex items-start gap-4">
                <CheckIcon className="mt-0.5 h-6 w-6 shrink-0" />
                <div>
                  <p className="font-[var(--font-heading)] text-base font-semibold text-[var(--color-ozone-navy,#0B1F3A)]">
                    {f.title}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--color-ozone-muted,#5B6B82)]">
                    {f.desc}{" "}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#post-requirement"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ozone-navy,#0B1F3A)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(11,31,58,0.6)] transition hover:bg-[var(--color-ozone-blue,#1E4D8C)]"
            >
              Post a Requirement <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#talent-pool"
              className="inline-flex items-center rounded-full border-2 border-[var(--color-ozone-blue,#1E4D8C)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-ozone-blue,#1E4D8C)] transition hover:bg-[var(--color-ozone-blue-light,#E4EDF7)]"
            >
              Browse Talent Pool
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      n: "01",
      title: "Submit Requirement",
      desc: "Tell us the role, location, and headcount. Takes under 5 minutes, no fee to post.",
      meta: "Same day · No fee",
    },
    {
      n: "02",
      title: "Receive Shortlist",
      desc: "We manually verify candidates and send your first match within 48 hours.",
      meta: "48 hours · Pre-screened",
    },
    {
      n: "03",
      title: "Interview & Select",
      desc: "Review profiles, interview shortlisted candidates, confirm your hires.",
      meta: "Weeks 1–3 · Your call",
    },
    {
      n: "04",
      title: "Docs, Visa & Boarding",
      desc: "We manage licensing, attestation, and visa processing through to first day.",
      meta: "Weeks 3–8 · Fully managed",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[var(--color-ozone-blue-light,#E4EDF7)]/50 py-24 lg:py-32">
      <WaveBlob
        className="pointer-events-none absolute -bottom-40 left-1/3 h-[600px] w-[600px]"
        color="#DDE9F7"
        opacity={0.9}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:items-end">
          <div>
            <EyebrowPill>The Process</EyebrowPill>
            <h2 className="mt-5 font-[var(--font-display)] text-4xl font-extrabold leading-tight tracking-tight text-[var(--color-ozone-navy,#0B1F3A)] md:text-5xl">
              Requirement to Onboarding, in{" "}
              <span className="text-[var(--color-ozone-blue,#1E4D8C)]">6–8 Weeks.</span>
            </h2>
          </div>
          <p className="max-w-lg text-lg text-[var(--color-ozone-muted,#5B6B82)]">
            A transparent pipeline. You'll always know exactly how many candidates are in motion and
            where they stand.
          </p>
        </div>

        {/* S-path desktop */}
        <div className="relative mt-20 hidden lg:block">
          <svg
            className="absolute inset-x-0 top-16 h-40 w-full"
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M60,60 C240,180 400,180 600,80 C800,-20 960,-20 1140,140"
              fill="none"
              stroke={BLUE}
              strokeWidth="2"
              strokeDasharray="6 8"
              opacity="0.55"
            />
          </svg>

          <div className="relative grid grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.n} className={`relative ${i % 2 === 0 ? "" : "translate-y-24"}`}>
                <span className="pointer-events-none absolute -top-6 -left-2 font-[var(--font-display)] text-[86px] font-extrabold leading-none text-[var(--color-ozone-blue,#1E4D8C)]/10">
                  {s.n}
                </span>
                <div className="relative rounded-3xl border border-white bg-white p-6 shadow-[0_24px_50px_-30px_rgba(11,31,58,0.35)]">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-md bg-[var(--color-ozone-navy,#0B1F3A)] px-2 py-0.5 text-[11px] font-bold text-white">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="font-[var(--font-heading)] text-lg font-bold text-[var(--color-ozone-navy,#0B1F3A)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-ozone-muted,#5B6B82)]">
                    {s.desc}
                  </p>
                  <p className="mt-4 border-t border-slate-100 pt-3 text-xs font-semibold text-[var(--color-ozone-blue,#1E4D8C)]">
                    {s.meta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile stack */}
        <div className="mt-14 grid gap-5 lg:hidden">
          {steps.map((s) => (
            <div key={s.n} className="rounded-3xl bg-white p-6 shadow-md">
              <span className="rounded-md bg-[var(--color-ozone-navy,#0B1F3A)] px-2 py-0.5 text-[11px] font-bold text-white">
                {s.n}
              </span>
              <h3 className="mt-3 font-[var(--font-heading)] text-lg font-bold text-[var(--color-ozone-navy,#0B1F3A)]">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ozone-muted,#5B6B82)]">{s.desc}</p>
              <p className="mt-3 text-xs font-semibold text-[var(--color-ozone-blue,#1E4D8C)]">
                {s.meta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  const industries = [
    {
      n: "01",
      title: "Hospitals & Healthcare Networks",
      stat: "120+ Partners · GCC-Wide",
      style: "navy" as const,
    },
    {
      n: "02",
      title: "Construction & Infrastructure",
      stat: "40+ Partners · Saudi & UAE",
      style: "light" as const,
    },
    {
      n: "03",
      title: "Oil & Gas + Engineering",
      stat: "25+ Partners · Technical Roles",
      style: "photo" as const,
      photo: oilGasSite,
    },
    {
      n: "04",
      title: "Facilities & Technical Services",
      stat: "Regional · On-Demand",
      style: "white" as const,
    },
  ];

  return (
    <section className="relative py-24 lg:py-32">
      <DotGrid className="pointer-events-none absolute right-10 top-16 h-40 w-40" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <EyebrowPill>Industries</EyebrowPill>
          <h2 className="mt-5 font-[var(--font-display)] text-4xl font-extrabold leading-tight tracking-tight text-[var(--color-ozone-navy,#0B1F3A)] md:text-5xl">
            Built for the Sectors That{" "}
            <span className="text-[var(--color-ozone-blue,#1E4D8C)]">Can't Afford a Bad Hire.</span>
          </h2>
          <p className="mt-5 text-lg text-[var(--color-ozone-muted,#5B6B82)]">
            Healthcare and technical roles carry real compliance and safety stakes. We've built our
            verification process around that.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {industries.map((it) => {
            const cardStyle: React.CSSProperties =
              it.style === "photo"
                ? {
                    backgroundImage: `linear-gradient(180deg, rgba(11,31,58,0.15) 0%, rgba(11,31,58,0.85) 100%), url(${it.photo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {};
            const base =
              "relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1";
            const variant =
              it.style === "navy"
                ? "bg-[var(--color-ozone-navy,#0B1F3A)] text-white"
                : it.style === "light"
                  ? "bg-[var(--color-ozone-blue-light,#E4EDF7)] text-[var(--color-ozone-navy,#0B1F3A)]"
                  : it.style === "photo"
                    ? "text-white"
                    : "border border-slate-200 bg-white text-[var(--color-ozone-navy,#0B1F3A)]";
            const subText =
              it.style === "navy" || it.style === "photo"
                ? "text-white/70"
                : "text-[var(--color-ozone-muted,#5B6B82)]";

            return (
              <a key={it.n} href="#" className={`${base} ${variant}`} style={cardStyle}>
                <div className="flex items-start justify-between">
                  <span
                    className={`text-xs font-bold tracking-[0.14em] ${it.style === "navy" || it.style === "photo" ? "text-[var(--color-ozone-gold,#C9A646)]" : "text-[var(--color-ozone-blue,#1E4D8C)]"}`}
                  >
                    {it.n}
                  </span>
                </div>
                <div>
                  <h3 className="font-[var(--font-heading)] text-xl font-bold leading-tight">
                    {it.title}
                  </h3>
                  <div className="mt-6 flex items-end justify-between">
                    <p className={`text-xs font-medium ${subText}`}>{it.stat}</p>
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-full ${it.style === "navy" || it.style === "photo" ? "bg-white/15" : "bg-[var(--color-ozone-navy,#0B1F3A)]/8"}`}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-10">
          <a
            href="#post-requirement"
            className="inline-flex items-center gap-2 font-semibold text-[var(--color-ozone-blue,#1E4D8C)] hover:underline"
          >
            Talk to Our Team <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function SuccessStories() {
  const cards = [
    {
      quote: "12 ICU Nurses Placed in Just 8 Weeks.",
      name: "Dr. Ahmed Al-Rashidi, Al Hammadi Hospital KSA",
      stat: "8 Weeks · 12 Verified Nurses",
      pill: "Healthcare · Saudi Arabia",
      photo: successIcu,
      featured: true,
    },
    {
      quote: "3 Hires in 45 Days.",
      name: "Priya Menon, UAE",
      stat: "45 Days · 3 Hires",
      pill: "Healthcare · UAE",
      photo: successUae,
    },
    {
      quote: "0 Compliance Issues.",
      name: "Khalid Al-Mutairi, Kuwait",
      stat: "24 Months · Zero Escalations",
      pill: "Construction · Kuwait",
      photo: successKuwait,
    },
    {
      quote: "48h — First Candidate.",
      name: "Fatima Al-Zaabi, Qatar",
      stat: "48 Hours · First Match",
      pill: "Facilities · Qatar",
      photo: successQatar,
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <WaveBlob
        className="pointer-events-none absolute -left-40 top-40 h-[560px] w-[560px]"
        opacity={0.6}
      />
      <DotGrid className="pointer-events-none absolute bottom-8 left-16 h-32 w-32" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <EyebrowPill>Success Stories</EyebrowPill>
            <h2 className="mt-5 font-[var(--font-display)] text-4xl font-extrabold leading-tight tracking-tight text-[var(--color-ozone-navy,#0B1F3A)] md:text-5xl">
              From Requirement to{" "}
              <span className="text-[var(--color-ozone-blue,#1E4D8C)]">Fully Staffed.</span>
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
          {cards.map((c, i) => (
            <article
              key={c.name}
              className={`group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-4 shadow-[0_20px_50px_-30px_rgba(11,31,58,0.3)] transition hover:-translate-y-1 ${
                c.featured ? "lg:col-span-6" : "lg:col-span-2"
              } ${i === 0 ? "" : "lg:col-span-2"}`}
              style={
                c.featured ? { gridColumn: "span 6 / span 6" } : { gridColumn: "span 2 / span 2" }
              }
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={c.photo}
                  alt={c.name}
                  loading="lazy"
                  width={640}
                  height={c.featured ? 360 : 280}
                  className={`w-full object-cover ${c.featured ? "h-[300px]" : "h-[220px]"}`}
                />
                <span className="absolute -bottom-3 left-4 rounded-full bg-[var(--color-ozone-blue,#1E4D8C)] px-3 py-1.5 text-[11px] font-semibold text-white shadow">
                  {c.pill}
                </span>
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[var(--color-ozone-navy,#0B1F3A)] shadow">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
              <div className="px-3 pb-3 pt-8">
                <p
                  className={`font-[var(--font-heading)] font-bold leading-snug text-[var(--color-ozone-navy,#0B1F3A)] ${c.featured ? "text-2xl md:text-3xl" : "text-lg"}`}
                >
                  "{c.quote}"
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <p className="text-xs font-medium text-[var(--color-ozone-muted,#5B6B82)]">
                    {c.name}
                  </p>
                  <p className="text-xs font-bold text-[var(--color-ozone-blue,#1E4D8C)]">
                    {c.stat}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "How fast can I expect the first candidate?",
      a: "Our average time to first pre-screened candidate is 48 hours from the moment your requirement is confirmed. Complex or niche roles may take longer — we'll be honest about the timeline upfront.",
    },
    {
      q: "What does 'pre-verified' actually mean?",
      a: "We manually check qualifications, licensing eligibility (SCFHS, DHA, HAAD, MOH), work references, and relocation readiness before any candidate reaches your inbox.",
    },
    {
      q: "Is there a fee to post a requirement?",
      a: "No. Posting is free. We're only compensated when you successfully hire a candidate through us, on transparent terms agreed in advance.",
    },
    {
      q: "Who handles licensing, attestation, and visa processing?",
      a: "We do — end to end. Our operations team manages the paperwork so your HR team doesn't have to chase attestations across three consulates.",
    },
    {
      q: "What happens if a candidate doesn't work out?",
      a: "We include a replacement guarantee period on every placement. If a hire leaves within the agreed window, we replace them at no additional cost.",
    },
    {
      q: "Can we sign a framework agreement for ongoing hiring?",
      a: "Yes — most of our 200+ partners work with us on rolling requirements under a master services agreement, with dedicated account managers assigned.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <DotGrid className="pointer-events-none absolute bottom-10 right-10 h-40 w-40" />
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="text-center">
          <EyebrowPill>FAQ</EyebrowPill>
          <h2 className="mt-5 font-[var(--font-display)] text-4xl font-extrabold leading-tight tracking-tight text-[var(--color-ozone-navy,#0B1F3A)] md:text-5xl">
            Questions Employers{" "}
            <span className="text-[var(--color-ozone-blue,#1E4D8C)]">Actually Ask Us.</span>
          </h2>
        </div>

        <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="py-1">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-[var(--font-heading)] text-base font-semibold text-[var(--color-ozone-navy,#0B1F3A)] md:text-lg">
                    {f.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-300 text-lg font-medium text-[var(--color-ozone-navy,#0B1F3A)] transition-transform ${isOpen ? "rotate-45 bg-[var(--color-ozone-navy,#0B1F3A)] text-white" : ""}`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-all ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}
                >
                  <div className="min-h-0">
                    <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-ozone-muted,#5B6B82)] md:text-[15px]">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="post-requirement" className="relative overflow-hidden pt-16">
      {/* wave curved top edge band */}
      <svg
        className="absolute -top-1 left-0 h-20 w-full text-[var(--color-ozone-blue-light,#E4EDF7)]"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,40 C240,90 480,10 720,50 C960,90 1200,20 1440,60 L1440,100 L0,100 Z"
          fill="currentColor"
        />
      </svg>

      <div className="relative bg-[var(--color-ozone-blue-light,#E4EDF7)] pb-20 pt-20 lg:pt-24">
        <WaveBlob
          className="pointer-events-none absolute -right-32 top-20 h-[500px] w-[500px]"
          color="#D5E4F5"
          opacity={0.7}
        />
        <DotGrid className="pointer-events-none absolute left-10 bottom-40 h-32 w-32" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <EyebrowPill>Get Started</EyebrowPill>
            <h2 className="mt-5 font-[var(--font-display)] text-5xl font-extrabold leading-[1.05] tracking-tight text-[var(--color-ozone-navy,#0B1F3A)] md:text-[56px]">
              Ready to Hire{" "}
              <span className="text-[var(--color-ozone-blue,#1E4D8C)]">Verified Talent?</span>
            </h2>
            <p className="mt-5 max-w-lg text-lg text-[var(--color-ozone-muted,#5B6B82)]">
              Post a requirement or browse our talent pool first. Either way, your first match is 48
              hours away.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ozone-navy,#0B1F3A)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(11,31,58,0.6)] transition hover:bg-[var(--color-ozone-blue,#1E4D8C)]"
              >
                Post a Requirement <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center rounded-full border-2 border-[var(--color-ozone-blue,#1E4D8C)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-ozone-blue,#1E4D8C)] transition hover:bg-white/70"
              >
                Browse Talent Pool
              </a>
            </div>
          </div>

          {/* Smaller Incoming Candidates card echo */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-30px_rgba(11,31,58,0.35)] ring-1 ring-black/[0.04]">
              <div className="flex items-center justify-between bg-[var(--color-ozone-navy,#0B1F3A)] px-5 py-3.5 text-white">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="font-[var(--font-heading)] text-[13px] font-semibold">
                    Incoming Candidates
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-white/60">Live</span>
              </div>
              <ul className="divide-y divide-slate-100">
                {[
                  { i: "RK", r: "ICU Nurse · 6 yrs", t: "DHA", p: 95, c: BLUE },
                  { i: "PS", r: "Site Engineer · 8 yrs", t: "GCC Exp", p: 92, c: BLUE },
                  { i: "MV", r: "Anesthesia Tech · 5 yrs", t: "BLS", p: 97, c: GOLD },
                ].map((c) => (
                  <li key={c.i} className="flex items-center gap-3 px-5 py-3.5">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-full text-[12px] font-bold text-white"
                      style={{ backgroundColor: NAVY }}
                    >
                      {c.i}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[var(--color-ozone-navy,#0B1F3A)]">
                        {c.r}
                      </p>
                      <span className="mt-0.5 inline-flex rounded bg-[var(--color-ozone-blue-light,#E4EDF7)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--color-ozone-blue,#1E4D8C)]">
                        {c.t}
                      </span>
                    </div>
                    <span
                      className="rounded-full px-2.5 py-1 text-[11px] font-bold text-white"
                      style={{ backgroundColor: c.c }}
                    >
                      {c.p}%
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 text-[11px] font-medium text-[var(--color-ozone-muted,#5B6B82)]">
                <span className="font-bold text-[var(--color-ozone-navy,#0B1F3A)]">48h</span> avg.
                first candidate · View Talent Pool →
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-20 max-w-4xl px-6 text-center">
          <h3 className="font-[var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--color-ozone-navy,#0B1F3A)] md:text-6xl">
            Hire Faster,{" "}
            <span className="relative inline-block">
              Hire Smarter.
              <span className="absolute -bottom-1 left-1 right-1 h-[6px] rounded-full bg-[var(--color-ozone-gold,#C9A646)]/70" />
            </span>
          </h3>
        </div>
      </div>
    </section>
  );
}

// ---------- Page ----------
function EmployersPage() {
  return (
    <div className="min-h-screen bg-white">
      <EmployerNavbar />
      <main>
        <Hero />
        <TrustBand />
        <WhyChooseUs />
        <ProcessSection />
        <IndustriesSection />
        <SuccessStories />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
