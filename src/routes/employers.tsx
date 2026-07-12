import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ShieldCheck,
  Clock3,
  FileCheck2,
  UserCircle2,
  Building2,
  HardHat,
  Fuel,
  Wrench,
  Plus,
  Minus,
} from "lucide-react";
import { useState } from "react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/footer";
import { Blob, DotGrid, GoldUnderline } from "@/components/site/decor";
import { IncomingCandidatesCard } from "@/components/site/IncomingCandidatesCard";

import hospitalCorridor from "@/assets/hospital-corridor.jpg";
import hrInterview from "@/assets/hr-interview.jpg";
import teamMeeting from "@/assets/team-meeting.jpg";
import oilGas from "@/assets/oil-gas.jpg";
import icuNurses from "@/assets/icu-nurses.jpg";
import hospitalReception from "@/assets/hospital-reception.jpg";
import execPortrait from "@/assets/exec-portrait.jpg";
import corporateOffice from "@/assets/corporate-office.jpg";

export const Route = createFileRoute("/employers")({
  head: () => ({
    meta: [
      { title: "For Employers — Ozone Overseas | Hire Verified GCC Talent in 48 Hours" },
      {
        name: "description",
        content:
          "Submit a requirement and receive your first pre-screened candidate in 48 hours. 200+ hospitals and companies trust Ozone Overseas for compliant, verified hiring across the GCC.",
      },
      { property: "og:title", content: "For Employers — Ozone Overseas" },
      {
        property: "og:description",
        content:
          "Verified GCC talent — pre-screened, compliant, and ready. First candidate in 48 hours.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmployersPage,
});

function EmployersPage() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-sans)] text-[color:var(--foreground)]">
      <Header />
      <Hero />
      <TrustStats />
      <WhyEmployers />
      <Process />
      <Industries />
      <SuccessStories />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ------------------------------ HERO ------------------------------ */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pb-24 pt-14 lg:pt-20">
      <Blob className="-left-40 -top-32 h-[520px] w-[520px] opacity-90" />
      <DotGrid className="left-8 top-40 opacity-60" cols={10} rows={4} />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        {/* Left */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/20 bg-[color:var(--brand-soft)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--brand)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand)]" />
            For Employers
          </span>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.02] tracking-tight text-[color:var(--navy)] sm:text-6xl lg:text-[68px]">
            Hire Verified Talent,
            <br />
            <span className="text-[color:var(--brand)]">Not Resumes.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[color:var(--muted-foreground)]">
            Submit a requirement, get your first pre-screened candidate in{" "}
            <span className="font-semibold text-[color:var(--navy)]">48 hours</span>. 200+ hospitals
            and companies trust Ozone for compliant, verified hiring across the GCC and beyond.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#post"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(11,31,58,0.6)] transition hover:bg-[color:var(--brand)]"
            >
              Post a Requirement <ArrowRight size={16} />
            </a>
            <a
              href="#pool"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/40 bg-white px-6 py-3.5 text-sm font-semibold text-[color:var(--brand)] transition hover:border-[color:var(--brand)] hover:bg-[color:var(--brand-soft)]"
            >
              Browse Talent Pool
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2.5">
              {["#1E4D8C", "#0B1F3A", "#C9A646", "#1E4D8C", "#0B1F3A"].map((c, i) => (
                <span
                  key={i}
                  className="grid h-8 w-8 place-items-center rounded-full text-[10px] font-bold text-white ring-2 ring-white"
                  style={{ background: c }}
                >
                  {["AH", "PM", "KA", "FZ", "DS"][i]}
                </span>
              ))}
            </div>
            <p className="text-xs font-medium text-[color:var(--muted-foreground)]">
              Trusted by{" "}
              <span className="text-[color:var(--navy)]">200+ hospitals & companies</span>
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <Blob className="-right-20 -top-16 h-96 w-96 opacity-90" />
          <DotGrid className="-bottom-4 -right-2 opacity-60" cols={7} rows={5} />

          <div className="relative">
            <IncomingCandidatesCard />

            {/* Floating stat badges */}
            <div className="absolute -left-8 -top-8 z-10 hidden items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-[0_10px_28px_-10px_rgba(11,31,58,0.35)] ring-1 ring-black/[0.04] sm:flex">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                <Building2 size={13} />
              </span>
              <span className="text-xs font-semibold text-[color:var(--navy)]">
                200+ Employer Partners
              </span>
            </div>
            <div className="absolute -right-6 -bottom-2 z-10 hidden items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-[0_10px_28px_-10px_rgba(11,31,58,0.35)] ring-1 ring-black/[0.04] md:flex">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
                <ShieldCheck size={13} />
              </span>
              <span className="text-xs font-semibold text-[color:var(--navy)]">
                Zero Compliance Risk
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- TRUST STATS -------------------------- */
function TrustStats() {
  const stats = [
    { icon: Building2, value: "200+", label: "Employer Partners" },
    { icon: Clock3, value: "48h", label: "Avg. First Candidate" },
    { icon: ShieldCheck, value: "MEA", label: "Licensed & Compliant" },
  ];
  return (
    <section className="relative">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[36px] bg-[color:var(--brand-soft)] px-6 py-10 sm:px-12">
          <DotGrid className="right-8 top-6 opacity-40" cols={6} rows={3} />
          <div className="relative grid grid-cols-1 items-center gap-8 sm:grid-cols-3">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex items-center justify-center gap-4 sm:justify-start ${
                  i > 0 ? "sm:border-l sm:border-[color:var(--gold)]/40 sm:pl-8" : ""
                }`}
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-[color:var(--brand)] shadow-sm">
                  <s.icon size={19} />
                </span>
                <div>
                  <div className="font-[family-name:var(--font-display)] text-4xl font-bold leading-none text-[color:var(--navy)]">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-sm text-[color:var(--muted-foreground)]">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- WHY EMPLOYERS ------------------------- */
function WhyEmployers() {
  const features = [
    { title: "Zero Compliance Risk", desc: "MEA compliant, regulatory burden on us." },
    { title: "48-Hour First Match", desc: "Pre-screened profiles, sent fast." },
    { title: "Documentation, Fully Managed", desc: "Licensing, attestation, visa — done." },
    { title: "One Dedicated Contact", desc: "A single account owner throughout." },
  ];
  return (
    <section className="relative overflow-hidden py-28">
      <Blob className="-bottom-32 -right-40 h-[520px] w-[520px] opacity-90" />
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:items-center">
        {/* Left: photo cluster */}
        <div className="relative h-[520px]">
          <img
            src={hospitalCorridor}
            alt="Modern hospital corridor"
            loading="lazy"
            width={1024}
            height={1280}
            className="absolute left-0 top-0 h-[340px] w-[280px] rounded-3xl object-cover shadow-[0_30px_60px_-30px_rgba(11,31,58,0.4)]"
          />
          <img
            src={hrInterview}
            alt="HR interview handshake"
            loading="lazy"
            width={1024}
            height={1024}
            className="absolute right-0 top-16 h-[260px] w-[260px] rounded-3xl object-cover shadow-[0_30px_60px_-30px_rgba(11,31,58,0.4)]"
          />
          <img
            src={teamMeeting}
            alt="Team meeting"
            loading="lazy"
            width={1024}
            height={1024}
            className="absolute bottom-0 left-16 h-[220px] w-[300px] rounded-3xl object-cover shadow-[0_30px_60px_-30px_rgba(11,31,58,0.4)]"
          />
          <DotGrid className="right-2 top-2 opacity-60" cols={5} rows={4} />

          {/* Floating badge */}
          <div className="absolute bottom-6 right-2 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-[0_16px_40px_-12px_rgba(11,31,58,0.35)] ring-1 ring-black/[0.04]">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[color:var(--navy)] text-white">
              <Clock3 size={15} />
            </span>
            <div className="text-[12px] leading-tight">
              <div className="font-[family-name:var(--font-display)] font-semibold text-[color:var(--navy)]">
                48-Hour First Match
              </div>
              <div className="text-[color:var(--muted-foreground)]">Average, all sectors</div>
            </div>
          </div>
        </div>

        {/* Right: copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/20 bg-[color:var(--brand-soft)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--brand)]">
            Why Ozone
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.05] tracking-tight text-[color:var(--navy)] sm:text-5xl">
            We Screen So <span className="text-[color:var(--brand)]">You Don't Have To.</span>
          </h2>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-[color:var(--muted-foreground)]">
            Every candidate arrives pre-verified — qualifications, license eligibility, and
            relocation readiness already checked.
          </p>

          <ul className="mt-8 space-y-4">
            {features.map((f) => (
              <li key={f.title} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                  <Check size={15} strokeWidth={3} />
                </span>
                <div>
                  <div className="font-[family-name:var(--font-display)] font-semibold text-[color:var(--navy)]">
                    {f.title}
                  </div>
                  <div className="text-sm text-[color:var(--muted-foreground)]">{f.desc}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#post"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(11,31,58,0.6)] transition hover:bg-[color:var(--brand)]"
            >
              Post a Requirement <ArrowRight size={15} />
            </a>
            <a
              href="#pool"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/40 bg-white px-6 py-3 text-sm font-semibold text-[color:var(--brand)] transition hover:bg-[color:var(--brand-soft)]"
            >
              Browse Talent Pool
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- PROCESS ---------------------------- */
function Process() {
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
    <section className="relative overflow-hidden bg-[color:var(--brand-soft)]/40 py-28">
      <Blob className="-bottom-40 -left-32 h-[540px] w-[540px] opacity-90" />
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/20 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--brand)]">
              The Process
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.05] tracking-tight text-[color:var(--navy)] sm:text-5xl">
              Requirement to Onboarding, in{" "}
              <span className="text-[color:var(--brand)]">6–8 Weeks.</span>
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-[color:var(--muted-foreground)]">
              A transparent pipeline. You'll always know exactly how many candidates are in motion
              and where they stand.
            </p>
          </div>

          <div className="relative">
            {/* S-curve */}
            <svg
              aria-hidden
              viewBox="0 0 800 520"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <path
                d="M60,60 C300,60 300,220 400,220 C500,220 500,380 740,380"
                stroke="#1E4D8C"
                strokeWidth="2"
                strokeDasharray="6 8"
                fill="none"
                opacity="0.35"
              />
            </svg>

            <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2">
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  className={`relative rounded-3xl bg-white p-6 shadow-[0_20px_50px_-30px_rgba(11,31,58,0.35)] ring-1 ring-black/[0.03] ${
                    i % 2 ? "sm:mt-10" : ""
                  }`}
                >
                  <span className="absolute -top-2 right-4 font-[family-name:var(--font-display)] text-6xl font-bold text-[color:var(--brand-soft)]">
                    {s.n}
                  </span>
                  <div className="relative">
                    <span className="inline-flex h-8 items-center rounded-full bg-[color:var(--navy)] px-3 text-[11px] font-bold uppercase tracking-widest text-white">
                      Step {s.n}
                    </span>
                    <div className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold text-[color:var(--navy)]">
                      {s.title}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                      {s.desc}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-[11px] font-semibold text-[color:var(--brand)]">
                      {s.meta}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- INDUSTRIES --------------------------- */
function Industries() {
  const items = [
    {
      n: "01",
      title: "Hospitals & Healthcare Networks",
      meta: "120+ Partners · GCC-Wide",
      icon: Building2,
      style: "navy",
    },
    {
      n: "02",
      title: "Construction & Infrastructure",
      meta: "40+ Partners · Saudi & UAE",
      icon: HardHat,
      style: "brand-soft",
    },
    {
      n: "03",
      title: "Oil & Gas + Engineering",
      meta: "25+ Partners · Technical Roles",
      icon: Fuel,
      style: "photo",
    },
    {
      n: "04",
      title: "Facilities & Technical Services",
      meta: "Regional · On-Demand",
      icon: Wrench,
      style: "white",
    },
  ] as const;

  return (
    <section className="relative overflow-hidden py-28">
      <DotGrid className="right-6 top-10 opacity-60" cols={8} rows={5} />
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="max-w-3xl">
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.05] tracking-tight text-[color:var(--navy)] sm:text-5xl">
            Built for the Sectors That Can't Afford a{" "}
            <span className="text-[color:var(--brand)]">Bad Hire.</span>
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[color:var(--muted-foreground)]">
            Healthcare and technical roles carry real compliance and safety stakes. We've built our
            verification process around that.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <IndustryCard key={it.n} {...it} />
          ))}
        </div>

        <div className="mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-sm font-semibold text-[color:var(--brand)] hover:text-[color:var(--navy)]"
          >
            Talk to Our Team <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function IndustryCard({
  n,
  title,
  meta,
  icon: Icon,
  style,
}: {
  n: string;
  title: string;
  meta: string;
  icon: typeof Building2;
  style: "navy" | "brand-soft" | "photo" | "white";
}) {
  const base =
    "group relative flex h-[340px] flex-col justify-between overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1";
  if (style === "navy") {
    return (
      <div className={`${base} bg-[color:var(--navy)] text-white`}>
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            {n}
          </span>
          <Icon size={26} className="mt-6 text-[color:var(--gold)]" />
          <div className="mt-6 font-[family-name:var(--font-display)] text-xl font-bold leading-tight">
            {title}
          </div>
        </div>
        <IndustryFoot meta={meta} tone="dark" />
      </div>
    );
  }
  if (style === "brand-soft") {
    return (
      <div className={`${base} bg-[color:var(--brand-soft)] text-[color:var(--navy)]`}>
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]/70">
            {n}
          </span>
          <Icon size={26} className="mt-6 text-[color:var(--brand)]" />
          <div className="mt-6 font-[family-name:var(--font-display)] text-xl font-bold leading-tight">
            {title}
          </div>
        </div>
        <IndustryFoot meta={meta} tone="light" />
      </div>
    );
  }
  if (style === "photo") {
    return (
      <div className={`${base} text-white`}>
        <img
          src={oilGas}
          alt=""
          loading="lazy"
          width={1024}
          height={1400}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy)]/95 via-[color:var(--navy)]/40 to-transparent" />
        <div className="relative">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            {n}
          </span>
          <Icon size={26} className="mt-6 text-[color:var(--gold)]" />
          <div className="mt-6 font-[family-name:var(--font-display)] text-xl font-bold leading-tight">
            {title}
          </div>
        </div>
        <div className="relative">
          <IndustryFoot meta={meta} tone="dark" />
        </div>
      </div>
    );
  }
  return (
    <div
      className={`${base} border border-[color:var(--brand-soft)] bg-white text-[color:var(--navy)]`}
    >
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]/60">
          {n}
        </span>
        <Icon size={26} className="mt-6 text-[color:var(--brand)]" />
        <div className="mt-6 font-[family-name:var(--font-display)] text-xl font-bold leading-tight">
          {title}
        </div>
      </div>
      <IndustryFoot meta={meta} tone="light" />
    </div>
  );
}

function IndustryFoot({ meta, tone }: { meta: string; tone: "dark" | "light" }) {
  return (
    <div className="flex items-end justify-between">
      <div
        className={`text-xs font-medium ${
          tone === "dark" ? "text-white/70" : "text-[color:var(--muted-foreground)]"
        }`}
      >
        {meta}
      </div>
      <span
        className={`grid h-9 w-9 place-items-center rounded-full transition group-hover:-rotate-45 ${
          tone === "dark" ? "bg-white/10 text-white" : "bg-[color:var(--navy)] text-white"
        }`}
      >
        <ArrowUpRight size={16} />
      </span>
    </div>
  );
}

/* ------------------------- SUCCESS STORIES ------------------------ */
function SuccessStories() {
  const cards = [
    {
      quote: "12 ICU Nurses Placed in Just 8 Weeks.",
      name: "Dr. Ahmed Al-Rashidi",
      org: "Al Hammadi Hospital, KSA",
      stat: "8 Weeks · 12 Verified Nurses",
      pill: "Healthcare · Saudi Arabia",
      pillClass: "bg-[color:var(--brand)]",
      img: icuNurses,
      featured: true,
    },
    {
      quote: "3 Hires in 45 Days.",
      name: "Priya Menon",
      org: "UAE",
      stat: "45 Days · 3 Hires",
      pill: "HR Lead · UAE",
      pillClass: "bg-[color:var(--navy)]",
      img: hospitalReception,
    },
    {
      quote: "0 Compliance Issues.",
      name: "Khalid Al-Mutairi",
      org: "Kuwait",
      stat: "24 Months · Zero Flags",
      pill: "Ops Director · Kuwait",
      pillClass: "bg-[color:var(--gold)] text-[color:var(--navy)]",
      img: execPortrait,
    },
    {
      quote: "48h — First Candidate.",
      name: "Fatima Al-Zaabi",
      org: "Qatar",
      stat: "48 Hours · First Match",
      pill: "Talent · Qatar",
      pillClass: "bg-[color:var(--brand)]",
      img: corporateOffice,
    },
  ];
  return (
    <section className="relative overflow-hidden bg-[color:var(--brand-soft)]/40 py-28">
      <Blob className="-right-40 top-24 h-[520px] w-[520px] opacity-90" />
      <DotGrid className="bottom-14 left-6 opacity-60" cols={7} rows={5} />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/20 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--brand)]">
              Success Stories
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.05] tracking-tight text-[color:var(--navy)] sm:text-5xl">
              From Requirement to <span className="text-[color:var(--brand)]">Fully Staffed.</span>
            </h2>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((c, i) => (
            <article
              key={c.name}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white bg-white shadow-[0_20px_50px_-30px_rgba(11,31,58,0.35)] transition hover:-translate-y-1 ${
                c.featured ? "xl:col-span-2 xl:row-span-1" : ""
              }`}
            >
              <div className="relative overflow-hidden rounded-b-3xl rounded-t-3xl p-3">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  width={1024}
                  height={900}
                  className={`w-full rounded-2xl object-cover ${c.featured ? "h-56" : "h-44"}`}
                />
                <span
                  className={`absolute -bottom-1 left-6 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg ${c.pillClass}`}
                >
                  {c.pill}
                </span>
                <span className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-[color:var(--navy)] shadow transition group-hover:-rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between p-6 pt-4">
                <blockquote
                  className={`font-[family-name:var(--font-display)] font-bold text-[color:var(--navy)] ${
                    c.featured ? "text-2xl leading-snug" : "text-lg leading-snug"
                  }`}
                >
                  "{c.quote}"
                </blockquote>
                <div className="mt-6">
                  <div className="text-sm font-semibold text-[color:var(--navy)]">{c.name}</div>
                  <div className="text-xs text-[color:var(--muted-foreground)]">{c.org}</div>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-[11px] font-semibold text-[color:var(--brand)]">
                    {c.stat}
                  </div>
                </div>
              </div>
              {i === 0 && null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- FAQ ------------------------------ */
const faqs = [
  {
    q: "How fast will I receive my first candidate?",
    a: "Most employers receive their first pre-screened, verified profile within 48 hours of submitting a requirement. Bulk healthcare mandates begin arriving within 3–5 business days.",
  },
  {
    q: "What is your fee structure?",
    a: "Posting a requirement is free. We charge a one-time placement fee only after a candidate joins and successfully completes onboarding. No shortlist fees, no retainer.",
  },
  {
    q: "Do you handle licensing and visa processing?",
    a: "Yes. DHA, HAAD, SCFHS, MOH, Qatar Prometric, attestation, visa stamping, and travel — all managed end-to-end by our documentation team.",
  },
  {
    q: "Which countries do you recruit from?",
    a: "India, Philippines, Sri Lanka, Nepal, Kenya, and Egypt, with active pipelines expanding across South & Southeast Asia and East Africa.",
  },
  {
    q: "How do you verify candidate credentials?",
    a: "Every profile passes a 6-step verification: identity, educational, professional experience, licensing eligibility, references, and pre-employment medical clearance.",
  },
  {
    q: "What if a candidate doesn't work out?",
    a: "Free replacement within the first 90 days as standard. Extended replacement guarantees available for bulk healthcare mandates.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative overflow-hidden bg-[color:var(--muted)] py-28">
      <DotGrid className="bottom-10 right-8 opacity-40" cols={6} rows={4} />
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/20 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--brand)]">
            FAQ
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.05] tracking-tight text-[color:var(--navy)] sm:text-[44px]">
            Questions Employers Actually <span className="text-[color:var(--brand)]">Ask Us.</span>
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-[color:var(--muted-foreground)]">
            Straight answers on timing, fees, licensing, and what happens when a hire doesn't stick.
          </p>
        </div>

        <div>
          <ul className="divide-y divide-[color:var(--brand-soft)] border-y border-[color:var(--brand-soft)]">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-[family-name:var(--font-display)] text-base font-semibold text-[color:var(--navy)] sm:text-lg">
                      {f.q}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${
                        isOpen
                          ? "bg-[color:var(--navy)] text-white"
                          : "bg-[color:var(--brand-soft)] text-[color:var(--brand)]"
                      }`}
                    >
                      {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                      {f.a}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- FINAL CTA ---------------------------- */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-white pb-24 pt-20">
      {/* Curved wave band */}
      <div className="relative">
        <svg
          aria-hidden
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute -top-1 left-0 h-24 w-full"
        >
          <path d="M0,80 C300,20 900,140 1440,50 L1440,120 L0,120 Z" fill="#EAF2FC" />
        </svg>
      </div>

      <div className="relative bg-[color:var(--brand-soft)]">
        <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-24">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/20 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--brand)]">
                Get Started
              </span>
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.02] tracking-tight text-[color:var(--navy)] sm:text-5xl lg:text-6xl">
                Ready to Hire <span className="text-[color:var(--brand)]">Verified Talent?</span>
              </h2>
              <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-[color:var(--muted-foreground)]">
                Post a requirement or browse our talent pool first. Either way, your first match is
                48 hours away.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#post"
                  className="inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(11,31,58,0.6)] transition hover:bg-[color:var(--brand)]"
                >
                  Post a Requirement <ArrowRight size={16} />
                </a>
                <a
                  href="#pool"
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/40 bg-white px-6 py-3.5 text-sm font-semibold text-[color:var(--brand)] transition hover:bg-white"
                >
                  Browse Talent Pool
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-medium text-[color:var(--muted-foreground)]">
                <span className="inline-flex items-center gap-2">
                  <FileCheck2 size={14} className="text-[color:var(--brand)]" /> No fee to post
                </span>
                <span className="inline-flex items-center gap-2">
                  <UserCircle2 size={14} className="text-[color:var(--brand)]" /> Dedicated contact
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[color:var(--gold)]" /> MEA licensed
                </span>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <DotGrid className="-bottom-4 -left-4 opacity-60" cols={6} rows={4} />
              <IncomingCandidatesCard compact />
            </div>
          </div>

          <div className="mt-24 text-center">
            <h3 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-[color:var(--navy)] sm:text-5xl lg:text-6xl">
              Hire Faster, Hire{" "}
              <span className="relative inline-block">
                Smarter.
                <GoldUnderline className="absolute -bottom-2 left-0 h-3 w-full" />
              </span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
