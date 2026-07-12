import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ShieldCheck,
  Plus,
  Minus,
  Users,
  Wallet,
  BadgeCheck,
  Plane,
  MessageCircle,
  GraduationCap,
  FileCheck2,
  Headphones,
  Mail,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import about1 from "@/assets/about-1.jpg";
import about2 from "@/assets/about-2.jpg";
import grid1 from "@/assets/grid-1.jpg";
import vertical1 from "@/assets/vertical-1.jpg";
import vertical2 from "@/assets/vertical-2.jpg";
import vertical3 from "@/assets/vertical-3.jpg";

export const Route = createFileRoute("/Home")({
  head: () => ({
    meta: [
      { title: "For Candidates — Ozone Overseas | Free Applications, MEA-Licensed" },
      {
        name: "description",
        content:
          "Your career abroad starts here. Free candidate applications, licensed visa & documentation handling, one coordinator from apply to landing across 10 GCC countries.",
      },
      { property: "og:title", content: "For Candidates — Ozone Overseas" },
      { name: "twitter:title", content: "For Candidates — Ozone Overseas" },
      {
        property: "og:description",
        content:
          "Free applications. Visa & licensing handled. One coordinator, ten countries. MEA-licensed since 2009.",
      },
      {
        name: "twitter:description",
        content:
          "Free applications. Visa & licensing handled. One coordinator, ten countries. MEA-licensed since 2009.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

/* shared decor */
const Blob = ({
  className = "",
  color = "var(--blue-soft)",
}: {
  className?: string;
  color?: string;
}) => (
  <svg viewBox="0 0 600 600" className={className} aria-hidden>
    <path
      fill={color}
      d="M421,318Q406,386,343,418Q280,450,213,420Q146,390,116,325Q86,260,121,196Q156,132,222,108Q288,84,353,113Q418,142,431,201Q444,250,421,318Z"
    />
  </svg>
);
const DotGrid = ({ className = "" }: { className?: string }) => (
  <div className={`dot-grid ${className}`} aria-hidden />
);
const WaveBand = ({ className = "", flip = false }: { className?: string; flip?: boolean }) => (
  <svg
    viewBox="0 0 1440 80"
    className={className}
    preserveAspectRatio="none"
    aria-hidden
    style={{ transform: flip ? "scaleY(-1)" : undefined }}
  >
    <path
      d="M0,40 C240,90 480,0 720,30 C960,60 1200,80 1440,30 L1440,80 L0,80 Z"
      fill="currentColor"
    />
  </svg>
);

function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header />
      <Hero />
      <TrustStats />
      <WhyCandidates />
      <Services />
      <Journey />
      <Stories />
      <Destinations />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* header */

/* ---------- TRACKER CARD (signature) ---------- */
function TrackerCard({ compact = false }: { compact?: boolean }) {
  const steps = [
    { n: 1, t: "Applied", when: "Day 1", state: "done" as const },
    { n: 2, t: "Verified", when: "Week 1", state: "done" as const },
    { n: 3, t: "Visa & Licensing", when: "Week 6", state: "active" as const },
    { n: 4, t: "Placed Abroad", when: "Week 10", state: "upcoming" as const },
  ];
  return (
    <div
      className={`relative rounded-[24px] bg-white shadow-[0_30px_70px_-25px_rgba(11,31,58,0.35)] ring-1 ring-border ${compact ? "w-full max-w-[380px]" : "w-full max-w-[440px]"}`}
    >
      {/* navy top strip */}
      <div className="flex items-center justify-between rounded-t-[24px] bg-navy px-5 py-3 text-white">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-soft">
            Candidate Tracker
          </span>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-soft">
          Live
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-blue">
              Application #OZ-4821
            </div>
            <div className="mt-1 font-display text-base font-bold text-navy leading-tight">
              ICU Nurse · Riyadh, KSA
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
            On Track
          </span>
        </div>

        <ol className="mt-5 space-y-4">
          {steps.map((s, i) => {
            const done = s.state === "done";
            const active = s.state === "active";
            return (
              <li key={s.n} className="relative flex gap-3">
                {/* connector */}
                {i < steps.length - 1 && (
                  <span
                    className={`absolute left-[15px] top-8 h-9 w-px ${done ? "bg-gold" : active ? "bg-gradient-to-b from-blue to-blue-soft" : "bg-blue-soft"}`}
                  />
                )}
                {/* node */}
                <span
                  className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                    done
                      ? "bg-gold text-navy"
                      : active
                        ? "bg-white text-blue ring-2 ring-blue"
                        : "bg-blue-wash text-blue/60"
                  }`}
                >
                  {active && (
                    <span
                      className="absolute inset-[-4px] rounded-full border-2 border-blue/40 border-t-blue animate-spin"
                      style={{ animationDuration: "2.4s" }}
                    />
                  )}
                  {done ? <Check className="h-4 w-4" /> : s.n}
                </span>
                <div className="flex-1 pt-0.5">
                  <div
                    className={`text-sm font-semibold ${done || active ? "text-navy" : "text-navy/50"}`}
                  >
                    {s.t}
                  </div>
                  <div className="text-[11px] text-ink">
                    {s.when}
                    {active && " · in progress"}
                  </div>
                </div>
                {done && (
                  <span className="pt-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                    Done
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-5 flex items-center justify-between rounded-xl bg-blue-wash px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-blue">
              <Headphones className="h-3.5 w-3.5" />
            </span>
            <div className="text-[11px] text-navy">
              <span className="font-semibold">Coordinator</span> · Priya M.
            </div>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-blue">
            WhatsApp
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- 2. HERO ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <svg
        aria-hidden
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMaxYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="candHero" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-blue-wash)" />
            <stop offset="100%" stopColor="var(--color-blue-soft)" />
          </linearGradient>
        </defs>
        <path
          d="M1440,0 L1440,900 L560,900 C660,720 460,620 560,440 C660,260 1000,240 900,100 C840,30 1200,0 1440,0 Z"
          fill="url(#candHero)"
        />
        <path
          d="M1440,140 C1240,200 1080,80 940,160 C780,250 720,460 900,560 C1060,650 1300,570 1440,660 L1440,140 Z"
          fill="var(--color-blue-soft)"
          opacity="0.55"
        />
      </svg>
      <DotGrid className="absolute left-6 top-32 h-24 w-24 opacity-70" />

      <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-10 px-6 py-10 lg:grid-cols-2 lg:py-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" /> For Candidates
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-navy md:text-5xl lg:text-6xl">
            Your Career Abroad
            <br />
            <span className="text-blue">Starts Here.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-ink md:text-lg">
            Applications are free. We handle licensing, visa, flight and onboarding — through one
            coordinator.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#openings"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-blue transition"
            >
              Browse Roles <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#journey"
              className="inline-flex items-center gap-2 rounded-full border-2 border-blue px-6 py-3 text-sm font-semibold text-blue hover:bg-blue hover:text-white transition"
            >
              How It Works
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-navy">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-blue" /> MEA Licensed Since 2009
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-blue" /> 10 Countries · 32 Live Roles
            </div>
          </div>
        </div>

        {/* tracker */}
        <div className="relative mx-auto w-full max-w-[520px]">
          <Blob
            className="absolute -top-16 -right-10 h-72 w-72 opacity-70"
            color="var(--blue-soft)"
          />
          <DotGrid className="absolute -bottom-4 -right-2 h-24 w-24" />
          <div className="relative mx-auto">
            <TrackerCard />
            {/* floating badges */}
            <div className="absolute -left-4 top-6 rounded-full bg-white px-3.5 py-2 shadow-lg ring-1 ring-border">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gold/15 text-gold">
                  <Wallet className="h-3.5 w-3.5" />
                </span>
                <span className="text-[11px] font-semibold text-navy">₹0 Candidate Fees</span>
              </div>
            </div>
            <div className="absolute -right-3 -bottom-4 rounded-full bg-white px-3.5 py-2 shadow-lg ring-1 ring-border">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-blue-wash text-blue">
                  <BadgeCheck className="h-3.5 w-3.5" />
                </span>
                <span className="text-[11px] font-semibold text-navy">94% Visa Success</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. TRUST STATS ---------- */
function TrustStats() {
  const stats = [
    { icon: Users, l: "Candidates Placed", n: "5,000+" },
    { icon: Wallet, l: "Candidate Fees Ever", n: "₹0" },
    { icon: BadgeCheck, l: "Visa Success Rate 2024", n: "94%" },
  ];
  return (
    <section className="px-6">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[40px] bg-blue-wash px-8 py-10">
          <Blob
            className="absolute -top-24 -right-16 h-64 w-64 opacity-70"
            color="var(--blue-soft)"
          />
          <DotGrid className="absolute top-4 left-6 h-16 w-24 opacity-80" />
          <svg
            viewBox="0 0 1200 100"
            className="absolute inset-x-0 bottom-0 text-blue-soft opacity-60"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0,60 C200,20 400,90 600,50 C800,10 1000,80 1200,40 L1200,100 L0,100 Z"
              fill="currentColor"
            />
          </svg>
          <div className="relative grid grid-cols-1 gap-8 divide-y divide-blue/10 md:grid-cols-3 md:divide-x md:divide-y-0">
            {stats.map(({ icon: Icon, l, n }) => (
              <div key={l} className="flex flex-col items-center gap-1 pt-6 md:pt-0 text-center">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-blue">
                  <Icon className="h-4 w-4" /> {l}
                </div>
                <div className="font-display text-4xl font-bold text-navy md:text-5xl">{n}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. WHY CANDIDATES ---------- */
function WhyCandidates() {
  const items = [
    "Direct employer relationships, no sub-agents",
    "Transparent fee policy in writing",
    "Same coordinator through visa & landing",
    "Free Prometric coaching included",
  ];
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <Blob
        className="absolute -bottom-40 -right-40 h-[500px] w-[500px] opacity-70"
        color="var(--blue-wash)"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div className="relative h-[560px]">
          <div className="absolute left-0 top-0 h-[380px] w-[72%] overflow-hidden rounded-[28px] shadow-xl">
            <img
              src={about1}
              alt="Candidate interview"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute bottom-0 right-2 h-[300px] w-[60%] overflow-hidden rounded-[24px] border-[10px] border-white shadow-2xl">
            <img
              src={about2}
              alt="Ozone coordinator"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-2 left-4 rounded-2xl bg-navy px-5 py-3 text-white shadow-xl">
            <div className="font-display text-sm font-bold leading-tight">MEA Licensed</div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-soft">
              Since 2009
            </div>
          </div>
          <DotGrid className="absolute right-0 top-8 h-24 w-24" />
        </div>

        <div>
          <span className="inline-block rounded-full bg-blue-wash px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue">
            Built Around You
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-navy md:text-5xl">
            Built Around the Candidate —{" "}
            <span className="italic text-blue">Not the Commission.</span>
          </h2>
          <p className="mt-5 text-ink">
            You are not a lead in a spreadsheet. You are a career we are personally accountable for
            — from the first shortlist call to your first paycheck abroad.
          </p>
          <ul className="mt-7 grid gap-3">
            {items.map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 rounded-xl border border-border bg-white p-4"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-wash text-blue">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-medium text-navy">{t}</span>
              </li>
            ))}
          </ul>
          <a
            href="#openings"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-blue transition"
          >
            See Open Roles <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. SERVICES (accordion cards) ---------- */
function Services() {
  const cards = [
    {
      n: "01",
      variant: "dark" as const,
      icon: GraduationCap,
      t: "Free Prometric Coaching",
      d: "Live cohort sessions + recorded library. Mock exams turned around in 48 hours. Dedicated WhatsApp study room with senior nurses.",
    },
    {
      n: "02",
      variant: "blue" as const,
      icon: Wallet,
      t: "Zero Candidate Fees",
      d: "Employers pay us — not you. Our zero-fee clause is written directly into your offer letter, so it is contractual, not a promise.",
    },
    {
      n: "03",
      variant: "photo" as const,
      icon: FileCheck2,
      t: "We Handle Every Document",
      d: "Dataflow verification, MOH/DHA/SCFHS portals, embassy attestation and stamping — every step processed by our in-house licensing desk.",
    },
    {
      n: "04",
      variant: "light" as const,
      icon: MessageCircle,
      t: "A Real Person on WhatsApp",
      d: "One named coordinator from application to landing. No IVR, no ticket queues — just a human replying in your language.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative overflow-hidden bg-blue-wash px-6 py-24">
      <Blob
        className="absolute -top-32 -left-40 h-[420px] w-[420px] opacity-60"
        color="oklch(0.94 0.025 250)"
      />
      <Blob
        className="absolute -bottom-32 -right-32 h-[340px] w-[340px] opacity-60"
        color="var(--blue-soft)"
      />
      <DotGrid className="absolute top-16 right-16 h-20 w-20 opacity-80" />
      <svg
        viewBox="0 0 1440 60"
        className="absolute inset-x-0 top-0 h-8 w-full text-white"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,10 1440,30 L1440,0 L0,0 Z"
          fill="currentColor"
        />
      </svg>
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight text-navy md:text-5xl">
            Everything Included. <span className="text-blue">Nothing Hidden.</span>
          </h2>
          <p className="max-w-md text-sm text-ink">
            Every candidate service is bundled by default — you do not opt in, and you do not pay
            extra.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {cards.map((c, i) => {
            const isOpen = open === i;
            const bg = {
              dark: "bg-navy text-white",
              blue: "bg-blue text-white",
              photo: "text-white",
              light: "bg-white text-navy ring-1 ring-border",
            }[c.variant];
            return (
              <article
                key={c.n}
                className={`relative flex h-[380px] flex-col justify-between overflow-hidden rounded-[28px] p-6 ${bg}`}
              >
                {c.variant === "photo" && (
                  <>
                    <img
                      src={grid1}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/20" />
                  </>
                )}
                <div className="relative flex items-start justify-between">
                  <span
                    className={`font-display text-sm font-semibold ${c.variant === "light" ? "text-blue" : "opacity-80"}`}
                  >
                    {c.n}
                  </span>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-label="Toggle"
                    className={`grid h-9 w-9 place-items-center rounded-full transition ${
                      c.variant === "light"
                        ? "bg-blue-wash text-blue hover:bg-blue hover:text-white"
                        : "bg-white/15 text-white ring-1 ring-white/30 hover:bg-white hover:text-navy"
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </button>
                </div>
                <div className="relative">
                  <span
                    className={`inline-grid h-10 w-10 place-items-center rounded-xl mb-3 ${
                      c.variant === "light"
                        ? "bg-blue-wash text-blue"
                        : "bg-white/15 text-white ring-1 ring-white/25"
                    }`}
                  >
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-bold leading-tight">{c.t}</h3>
                  <div
                    className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <p
                      className={`overflow-hidden text-sm ${c.variant === "light" ? "text-ink" : "opacity-85"}`}
                    >
                      {c.d}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. JOURNEY ---------- */
function Journey() {
  const steps = [
    { n: "01", t: "Apply", d: "Submit your CV in under 90 seconds. Free, no CV format needed." },
    {
      n: "02",
      t: "Get Verified",
      d: "Coordinator review, shortlist call, employer interview within 10–14 days.",
    },
    {
      n: "03",
      t: "License & Visa",
      d: "Dataflow + Prometric + embassy stamping — all handled for you.",
    },
    {
      n: "04",
      t: "Board & Settle",
      d: "Pre-departure briefing, airport pickup, first-week check-ins.",
    },
  ];
  return (
    <section id="journey" className="relative overflow-hidden px-6 py-24">
      <Blob
        className="absolute bottom-0 right-0 h-[500px] w-[500px] opacity-60"
        color="var(--blue-wash)"
      />
      <Blob
        className="absolute top-24 left-0 h-[280px] w-[280px] opacity-50"
        color="var(--blue-soft)"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue">
              Your Journey
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-navy md:text-5xl">
              Four Clear Stages, One <span className="text-blue">Accountable Coordinator.</span>
            </h2>
            <p className="mt-5 text-ink">
              From the day your CV lands with us to the day you clock in abroad — the same person
              owns your file.
            </p>
          </div>

          <div className="relative">
            <svg
              viewBox="0 0 800 420"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M60,80 C180,80 220,240 340,240 C460,240 500,80 620,80 C700,80 740,240 780,240"
                fill="none"
                stroke="var(--color-blue)"
                strokeWidth="2"
                strokeDasharray="6 8"
              />
            </svg>
            <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
              {steps.map((s, i) => (
                <div key={s.n} className={`relative ${i % 2 === 1 ? "md:mt-24" : ""}`}>
                  <div className="font-display text-6xl font-extrabold text-blue-soft leading-none">
                    {s.n}
                  </div>
                  <div className="mt-2 font-display text-lg font-semibold text-navy">{s.t}</div>
                  <p className="mt-1 text-sm text-ink">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. STORIES ---------- */
function Stories() {
  const cards = [
    {
      img: vertical2,
      role: "ICU Nurse → Riyadh",
      q: "Interview to boarding in 11 weeks. My coordinator texted me the day I landed.",
      n: "Reshma K.",
      meta: "11 weeks · interview to flight",
    },
    {
      img: vertical1,
      role: "Welder → Doha",
      q: "Zero fees, and every document handled. I still work with the same employer three years on.",
      n: "Anand P.",
      meta: "9 weeks · Qatar deployment",
    },
    {
      img: vertical3,
      role: "Caregiver → Manama",
      q: "Prometric coaching made the difference. I cleared on the first attempt.",
      n: "Sneha M.",
      meta: "13 weeks · Bahrain hospital",
    },
    {
      img: grid1,
      role: "Biomedical → Abu Dhabi",
      q: "The tracker kept me sane. I could see exactly where my visa was every single week.",
      n: "Rahul T.",
      meta: "10 weeks · UAE placement",
    },
  ];
  return (
    <section id="openings" className="relative overflow-hidden px-6 py-24">
      <Blob
        className="absolute -top-24 left-0 h-[360px] w-[360px] opacity-60"
        color="var(--blue-wash)"
      />
      <DotGrid className="absolute top-16 right-16 h-24 w-24 opacity-70" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue">
              Success Stories
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold text-navy md:text-5xl">
              Real Journeys, Named <span className="text-blue">Coordinators</span>, No Scripts.
            </h2>
          </div>
        </div>

        <div className="-mx-6 overflow-x-auto px-6 pb-4 snap-x snap-mandatory">
          <div className="flex gap-6">
            {cards.map((c) => (
              <article
                key={c.n}
                className="group min-w-[280px] max-w-[280px] snap-start overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_-30px_rgba(11,31,58,0.3)] ring-1 ring-border"
              >
                <div className="relative h-[220px] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.n}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-blue px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    {c.role}
                  </span>
                  <span className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white text-navy shadow-md">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="p-5">
                  <p className="font-display text-sm font-semibold text-navy leading-snug">
                    "{c.q}"
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-blue-soft pt-3">
                    <div className="text-xs font-semibold text-navy">{c.n}</div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-blue">
                      {c.meta}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 8. DESTINATIONS ---------- */
function Destinations() {
  const rowA = [
    { f: "🇸🇦", n: "Saudi Arabia" },
    { f: "🇦🇪", n: "UAE" },
    { f: "🇶🇦", n: "Qatar" },
    { f: "🇰🇼", n: "Kuwait" },
    { f: "🇧🇭", n: "Bahrain" },
    { f: "🇴🇲", n: "Oman" },
  ];
  const rowB = [
    { f: "🇸🇬", n: "Singapore" },
    { f: "🇲🇾", n: "Malaysia" },
    { f: "🇩🇪", n: "Germany" },
    { f: "🇬🇧", n: "United Kingdom" },
    { f: "🇮🇪", n: "Ireland" },
    { f: "🇦🇺", n: "Australia" },
  ];
  const Pill = ({ f, n }: { f: string; n: string }) => (
    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy shadow-sm ring-1 ring-border">
      <span className="text-lg leading-none">{f}</span>
      {n}
    </span>
  );
  return (
    <section className="relative overflow-hidden bg-blue-wash px-6 py-24">
      <Blob
        className="absolute -top-20 -right-24 h-[340px] w-[340px] opacity-60"
        color="var(--blue-soft)"
      />
      <Blob
        className="absolute -bottom-32 -left-32 h-[420px] w-[420px] opacity-60"
        color="oklch(0.94 0.025 250)"
      />
      <DotGrid className="absolute bottom-10 right-10 h-24 w-24 opacity-80" />
      <svg
        viewBox="0 0 1440 60"
        className="absolute inset-x-0 top-0 h-8 w-full text-white"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,10 1440,30 L1440,0 L0,0 Z"
          fill="currentColor"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue">
            Where You Can Go
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-navy md:text-5xl">
            Your Next Chapter, in <span className="text-blue">10 Countries.</span>
          </h2>
        </div>

        {/* marquee */}
        <div className="space-y-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="flex gap-3 animate-[marquee_28s_linear_infinite]">
            {[...rowA, ...rowA].map((p, i) => (
              <Pill key={`a${i}`} {...p} />
            ))}
          </div>
          <div className="flex gap-3 animate-[marquee_32s_linear_infinite_reverse]">
            {[...rowB, ...rowB].map((p, i) => (
              <Pill key={`b${i}`} {...p} />
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 divide-x divide-white/15 rounded-full bg-navy px-6 py-5 text-white shadow-xl">
          {[
            { n: "32", l: "Open Roles" },
            { n: "17", l: "Partner Hospitals" },
            { n: "94%", l: "Visa Approval Rate" },
          ].map((s) => (
            <div key={s.l} className="px-4 text-center">
              <div className="font-display text-2xl font-bold md:text-3xl">{s.n}</div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-widest text-blue-soft">
                {s.l}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm font-semibold text-blue hover:text-navy">
            Explore All Openings →
          </a>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            "MOH / DHA / SCFHS Approved · Direct portal access",
            "Govt. Licensed · RA-PB1238/KER/2014",
            "Ethical Recruitment · IRIS Signatory",
          ].map((t) => (
            <div
              key={t}
              className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-border"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-wash text-blue">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold text-navy">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 9. FAQ ---------- */
function FAQ() {
  const qs = [
    {
      q: "Do I really pay nothing at any point?",
      a: "Correct. Employers cover our fee, and that zero-candidate-fee clause is written into your offer letter — so if anyone in the chain asks you for money, you have contractual grounds to refuse.",
    },
    {
      q: "How long does the full process usually take?",
      a: "Most placements land between 8 and 14 weeks, depending on country and licensing exam calendars. Your tracker gives you a week-by-week ETA the day you apply.",
    },
    {
      q: "What documents do I need to start?",
      a: "Just a CV and your passport bio-page. Everything else — Dataflow, degree attestation, embassy stamping — we collect as we go.",
    },
    {
      q: "Do you help with Prometric / DHA / SCFHS exams?",
      a: "Yes. Free coaching cohorts, recorded lectures and 48-hour mock reviews are included for every nursing and allied-health candidate.",
    },
    {
      q: "What happens if my visa is rejected?",
      a: "We re-file at no cost and place you on the next matching mandate. Our 94% first-pass approval rate means it is rare — but the safety net is contractual.",
    },
    {
      q: "Can I speak to someone before applying?",
      a: "Yes — a coordinator is on WhatsApp during India business hours. Book a 15-minute call or just message us with your role and target country.",
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="relative overflow-hidden bg-[oklch(0.98_0.005_260)] px-6 py-24">
      <DotGrid className="absolute bottom-10 left-10 h-24 w-24 opacity-60" />
      <div className="relative mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue">FAQ</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-navy md:text-5xl">
            Candidate Questions, <span className="text-blue">Straight Answers.</span>
          </h2>
        </div>

        <div className="divide-y divide-border rounded-3xl bg-white ring-1 ring-border">
          {qs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-navy">{item.q}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${isOpen ? "bg-navy text-white" : "bg-blue-wash text-blue"}`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-ink">{item.a}</p>
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

/* ---------- 10. FINAL CTA ---------- */
function FinalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden bg-blue-wash px-6 pt-24 pb-32">
      <div className="absolute inset-x-0 top-0 text-blue-wash">
        <WaveBand className="w-full h-12 -translate-y-full text-blue-wash" />
      </div>
      <Blob className="absolute -bottom-40 -left-40 h-[500px] w-[500px] opacity-70" />
      <Blob
        className="absolute -top-20 -right-24 h-[320px] w-[320px] opacity-60"
        color="var(--blue-soft)"
      />
      <DotGrid className="absolute top-20 left-1/3 h-24 w-24 opacity-70" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl font-bold leading-tight text-navy md:text-5xl">
            One CV. One Coordinator. <span className="text-blue">Ten Countries Open.</span>
          </h2>
          <p className="mt-5 max-w-md text-ink">
            Free to apply. Visa & licensing handled. Your tracker goes live the day you submit.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#openings"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-blue transition"
            >
              Browse Open Roles <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-600 px-6 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-600 hover:text-white transition"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-navy">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue" /> +91 80 4567 8900
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue" /> apply@ozoneoverseas.in
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <TrackerCard compact />
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  const cols = {
    Candidates: ["Browse Jobs", "How to Apply", "Documentation", "Pre-Departure"],
    Employers: ["Post a Mandate", "Hiring Process", "Industries", "Case Studies"],
    Company: ["About Ozone", "MEA License", "Careers", "Contact"],
    Sectors: ["Healthcare", "Engineering", "Hospitality", "Construction"],
  };
  return (
    <footer className="relative bg-navy text-white">
      <div className="absolute inset-x-0 top-0 -translate-y-px text-navy">
        <WaveBand className="h-10 w-full" flip />
      </div>
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
          <div>
            <div className="font-display text-2xl font-bold">
              Ozone<span className="text-blue-soft">Overseas</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-blue-soft/80">
              India's MEA-licensed international recruitment partner. Bridging Indian talent with
              verified GCC employers since 2009.
            </p>
            <div className="mt-6 flex gap-3">
              {["in", "tw", "fb", "ig"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xs font-semibold uppercase hover:bg-blue transition"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(cols).map(([k, v]) => (
              <div key={k}>
                <div className="text-xs font-semibold uppercase tracking-widest text-blue-soft">
                  {k}
                </div>
                <ul className="mt-4 space-y-2.5 text-sm text-white/80">
                  {v.map((i) => (
                    <li key={i}>
                      <a href="#" className="hover:text-white">
                        {i}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-blue-soft/70">
          <div>MEA License No. B-0123/MUM/PER/1000+/5/8525/2009 — Government of India.</div>
          <div>© {new Date().getFullYear()} Ozone Overseas. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
