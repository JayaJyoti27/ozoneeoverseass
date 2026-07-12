import { createFileRoute, Link } from "@tanstack/react-router";
import uaeHero from "@/assets/uae-hero.jpg";
import uaeAbout from "@/assets/uae-about.jpg";
import { useState } from "react";
import { Header } from "@/components/site/Header";
export const Route = createFileRoute("/Countries/UK")({
  head: () => ({
    meta: [
      { title: "UK Healthcare & Technical Recruitment — Ozone Overseas" },
      {
        name: "description",
        content:
          "Placing nurses, allied health, and technical specialists from India into NMC/GMC/HCPC-registered roles across London, Manchester, and Birmingham since 2009.",
      },
      { property: "og:title", content: "UK Recruitment — Ozone Overseas" },
      {
        property: "og:description",
        content: "NMC / GMC / HCPC registered placements across London, Manchester & Birmingham.",
      },
    ],
  }),
  component: UkPage,
});

/* -------------------- decorative primitives -------------------- */

function WaveBlob({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M320,60 C380,110 390,220 320,280 C260,335 150,340 90,290 C20,230 30,120 100,70 C170,20 260,15 320,60 Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

function DotGrid({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true">
      {Array.from({ length: 8 }).map((_, r) =>
        Array.from({ length: 8 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={10 + c * 20} cy={10 + r * 20} r={1.6} fill="currentColor" />
        )),
      )}
    </svg>
  );
}

/* -------------------- header -------------------- */

/* -------------------- hero -------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-light-blue">
      <WaveBlob className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] text-brand-blue/10" />
      <DotGrid className="pointer-events-none absolute bottom-8 right-8 h-40 w-40 text-brand-blue/20" />
      <div className="container-page relative grid min-h-[calc(100vh-4rem)] items-center gap-10 py-14 lg:grid-cols-2 lg:py-0">
        {/* LEFT */}
        <div className="flex flex-col justify-center">
          <nav className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Link to="/" className="hover:text-brand-blue">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Countries</span>
            <span className="mx-2">/</span>
            <span className="text-navy">UK</span>
          </nav>

          <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-brand-blue/30 bg-white px-4 py-1.5 text-[13px] font-medium text-brand-blue">
            <span>🇬🇧</span> Healthcare & Technical Recruitment
          </div>

          <h1 className="mt-6 font-display text-3xl font-extrabold leading-[1.1] text-navy sm:text-4xl lg:text-5xl xl:text-[56px]">
            Recruitment to the
            <br />
            <span className="text-brand-blue">United Kingdom.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-navy/70">
            Placing nurses, allied health professionals, and technical specialists from India into
            verified NHS and private-sector roles across London, Manchester, and Birmingham — NMC,
            GMC, and HCPC registered, since 2009.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#jobs"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:opacity-90"
            >
              View Open Roles <span aria-hidden>↓</span>
            </a>
            <a
              href="https://wa.me/"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue px-6 py-3 text-sm font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
            >
              Talk to Our Team
            </a>
          </div>

          <div className="mt-12 grid grid-cols-4 gap-4 border-t border-navy/10 pt-6">
            {[
              { n: "215", l: "Placed in UK" },
              { n: "52", l: "Open Roles" },
              { n: "35+", l: "NHS & Private Partners" },
              { n: "4–6 mo", l: "Avg. Process" },
            ].map((s, i) => (
              <div key={s.l} className={`px-2 ${i > 0 ? "border-l border-navy/10" : ""}`}>
                <div className="font-display text-2xl font-bold text-navy sm:text-[28px]">
                  {s.n}
                </div>
                <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full border border-gold/50" />
          <div className="pointer-events-none absolute -bottom-6 -right-4 h-32 w-32 rounded-full border border-navy/20" />

          <div className="relative overflow-hidden rounded-3xl shadow-lift">
            <img
              src={uaeHero}
              alt="London skyline at golden hour with Big Ben and the Thames"
              width={1280}
              height={1600}
              className="h-[340px] w-full object-cover sm:h-[420px] lg:h-[560px]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/85 via-navy/40 to-transparent" />
            <div className="absolute bottom-5 left-5 text-white">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
                Country
              </div>
              <div className="font-display text-lg font-bold">United Kingdom</div>
            </div>
          </div>

          {/* floating badge top-right */}
          <div className="absolute -right-3 top-6 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lift ring-1 ring-black/5">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gold/15 text-gold">
              ✓
            </span>
            <div className="text-[12px] font-semibold leading-tight text-navy">
              🇬🇧 NMC / GMC Registered
              <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                100% Compliant
              </div>
            </div>
          </div>

          {/* floating live-roles bottom-left */}
        </div>
      </div>
    </section>
  );
}

function LiveRolesCard({
  className = "",
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const rows = [
    { title: "Staff Nurse (Band 5)", city: "London", pay: "£28–35k" },
    { title: "Civil Engineer", city: "Manchester", pay: "£32–42k" },
    { title: "Radiographer", city: "Birmingham", pay: "£30–37k" },
  ];
  return (
    <div
      className={`rounded-2xl bg-white p-4 shadow-lift ring-1 ring-black/5 ${className} ${
        size === "md" ? "w-[340px] p-5" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-500/70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <div className="text-[11px] font-semibold uppercase tracking-widest text-navy/70">
          Live Roles Today
        </div>
        <div className="ml-auto text-[11px] font-bold text-navy">52 Open</div>
      </div>
      <div className="mt-3 space-y-2">
        {rows.map((r) => (
          <div
            key={r.title}
            className="flex items-center justify-between rounded-lg bg-light-blue px-3 py-2 text-[12px]"
          >
            <div>
              <div className="font-semibold text-navy">{r.title}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {r.city}
              </div>
            </div>
            <div className="font-semibold text-brand-blue">{r.pay}</div>
          </div>
        ))}
      </div>
      <a
        href="#jobs"
        className="mt-3 flex items-center justify-between text-[12px] font-semibold text-brand-blue"
      >
        <span className="text-muted-foreground">Updated today</span>
        <span>View all →</span>
      </a>
    </div>
  );
}

/* -------------------- stats band -------------------- */

function StatsBand() {
  const stats = [
    { n: "215", l: "Placed in UK" },
    { n: "52", l: "Open Roles Today" },
    { n: "35+", l: "NHS & Private Partners" },
    { n: "2009", l: "Active Since" },
  ];
  return (
    <section className="relative">
      <div className="container-page py-10">
        <div className="relative overflow-hidden rounded-[36px] bg-light-blue px-8 py-10">
          <DotGrid className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 text-brand-blue/20" />
          <div className="relative grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.l}
                className={`px-4 text-center ${i > 0 ? "md:border-l md:border-gold/40" : ""}`}
              >
                <div className="font-display text-4xl font-extrabold text-navy sm:text-5xl">
                  {s.n}
                </div>
                <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy/60">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- about -------------------- */

function About() {
  const info = [
    { k: "Capital", v: "London" },
    { k: "Primary Hiring Cities", v: "London · Manchester · Birmingham" },
    { k: "Key Registrations", v: "NMC / GMC / HCPC" },
    { k: "Avg. Process", v: "4–6 months" },
    { k: "Currency", v: "Pound Sterling (GBP)" },
    { k: "Working Hours", v: "37.5 hrs / week typical" },
  ];
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24">
      <WaveBlob className="pointer-events-none absolute -bottom-32 -right-32 h-[420px] w-[420px] text-light-blue" />
      <DotGrid className="pointer-events-none absolute left-8 top-16 h-32 w-32 text-brand-blue/15" />
      <div className="container-page relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-lift">
            <img
              src={uaeAbout}
              alt="NHS healthcare team inside a UK hospital ward"
              width={1200}
              height={1400}
              loading="lazy"
              className="h-[520px] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-6 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-soft ring-1 ring-black/5">
            <span className="h-2 w-2 rounded-full bg-gold" />
            <span className="text-[12px] font-semibold text-navy">
              Active Since 2009 · MEA Licensed
            </span>
          </div>
        </div>

        <div>
          <div className="inline-flex rounded-full bg-light-blue px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-blue">
            UK Context
          </div>
          <h2 className="mt-4 font-display text-4xl font-extrabold text-navy sm:text-[42px]">
            Recruiting Healthcare and Technical Talent for the UK Market.
          </h2>
          <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-navy/75">
            <p>
              The UK relies on internationally educated professionals to sustain its NHS trusts and
              private care providers. Nurses register with the NMC, doctors with the GMC, and allied
              health professionals with the HCPC — each with structured English-language and
              competency pathways.
            </p>
            <p>
              Ozone maintains direct partnerships with NHS trusts, private hospital groups, and UK
              engineering firms — covering adult, mental health and paediatric nursing, radiography,
              biomedical science, as well as civil and mechanical technical roles.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 rounded-2xl bg-muted/60 p-6 sm:grid-cols-2">
            {info.map((i) => (
              <div
                key={i.k}
                className="flex items-start justify-between gap-4 border-b border-navy/5 pb-3 last:border-0 last:pb-0"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {i.k}
                </div>
                <div className="text-right text-[13px] font-semibold text-navy">{i.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- eligibility -------------------- */

function Eligibility() {
  const cards = [
    {
      n: "01",
      t: "Recognized Nursing or Technical Qualification",
      icon: "🎓",
      body: "Government-recognized nursing degree/diploma or technical qualification relevant to the role applied for.",
      variant: "navy",
    },
    {
      n: "02",
      t: "NMC / GMC / HCPC Registration Pathway",
      icon: "📜",
      body: "Healthcare candidates must be eligible for NMC (nurses), GMC (doctors), or HCPC (allied health) registration. Ozone guides you through CBT, OSCE, and portfolio review.",
      variant: "lightblue",
    },
    {
      n: "03",
      t: "English Language (IELTS / OET)",
      icon: "🗣️",
      body: "IELTS Academic 7.0 overall (7.0 in speaking/listening, 6.5 in reading/writing) or OET grade B — standard NHS thresholds.",
      variant: "white",
    },
    {
      n: "04",
      t: "Relevant Experience",
      icon: "⏱️",
      body: "Minimum 1–2 years post-registration for most nursing roles; technical roles typically require 2–3 years' relevant experience.",
      variant: "grey",
    },
  ] as const;

  const variantClasses = {
    navy: "bg-navy text-white",
    lightblue: "bg-light-blue text-navy",
    white: "bg-white text-navy border border-border",
    grey: "bg-muted text-navy",
  } as const;

  return (
    <section className="relative bg-white py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-extrabold text-navy sm:text-[42px]">
            What It Takes to Qualify.
          </h2>
          <p className="mt-4 text-[16px] text-navy/70">
            General requirements for healthcare and technical roles in the UK. Exact criteria vary
            by role, trust, and employer.
          </p>
          <a href="#cta" className="mt-3 inline-block text-[14px] font-semibold text-brand-blue">
            Not sure if you qualify? Get a free eligibility check →
          </a>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.n}
              className={`relative rounded-3xl p-7 shadow-soft ${variantClasses[c.variant]}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl font-extrabold opacity-40">{c.n}</span>
                <span className="text-2xl">{c.icon}</span>
              </div>
              <div className="mt-6 font-display text-lg font-bold leading-snug">{c.t}</div>
              <p className="mt-3 text-[13.5px] leading-relaxed opacity-85">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- process -------------------- */

function Process() {
  const steps = [
    {
      n: "01",
      t: "Apply",
      body: "Submit your application or browse current UK openings with NHS and private-sector employers.",
      meta: "Free · No format needed",
    },
    {
      n: "02",
      t: "CBT, IELTS/OET & Registration Prep",
      body: "Our team supports NMC CBT / IELTS / OET preparation and verifies your registration eligibility.",
      meta: "Weeks 1–8 · Guided prep",
    },
    {
      n: "03",
      t: "Certificate of Sponsorship & Visa",
      body: "We manage the CoS, Health & Care Worker visa application, and UK entry paperwork.",
      meta: "Weeks 8–16 · Fully handled",
    },
    {
      n: "04",
      t: "OSCE, Relocation & Boarding",
      body: "Pre-departure orientation, travel, OSCE booking and induction support in the first weeks on the ward.",
      meta: "Weeks 16–24 · Full support",
    },
  ];
  return (
    <section id="process" className="relative overflow-hidden bg-light-blue py-24">
      <WaveBlob className="pointer-events-none absolute -bottom-40 -right-24 h-[500px] w-[500px] text-brand-blue/10" />
      <div className="container-page relative">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-extrabold text-navy sm:text-[42px]">
            How the Process Works, Step by Step.
          </h2>
          <p className="mt-4 text-[16px] text-navy/70">
            Most candidates complete the full process — from application to starting on the ward —
            within 4 to 6 months.
          </p>
        </div>

        <div className="relative mt-16">
          {/* curved S path */}
          <svg
            viewBox="0 0 1200 220"
            className="pointer-events-none absolute inset-x-0 top-6 hidden h-40 w-full lg:block"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M60,60 C260,60 260,180 460,180 C660,180 660,60 860,60 C1000,60 1080,120 1140,140"
              fill="none"
              stroke="var(--brand-blue)"
              strokeWidth="2"
              strokeDasharray="6 6"
              opacity="0.4"
            />
          </svg>

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`relative rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/5 ${
                  i % 2 === 0 ? "lg:mt-0" : "lg:mt-16"
                }`}
              >
                <div className="pointer-events-none absolute -right-2 -top-6 font-display text-[80px] font-extrabold leading-none text-brand-blue/10">
                  {s.n}
                </div>
                <div className="relative">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy text-[13px] font-bold text-white">
                    {s.n}
                  </div>
                  <div className="mt-4 font-display text-lg font-bold text-navy">{s.t}</div>
                  <p className="mt-2 text-[14px] text-navy/70">{s.body}</p>
                  <div className="mt-4 inline-flex rounded-full bg-light-blue px-3 py-1 text-[11px] font-semibold text-brand-blue">
                    {s.meta}
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

/* -------------------- jobs -------------------- */

type Job = {
  cat: "Healthcare" | "Technical";
  city: string;
  title: string;
  employer: string;
  meta: string;
  pay: string;
};

const JOBS: Job[] = [
  {
    cat: "Healthcare",
    city: "London",
    title: "Staff Nurse (Band 5)",
    employer: "Leading NHS Trust",
    meta: "Full-time · 1+ yr · NMC registration",
    pay: "£28,000–35,000 / year",
  },
  {
    cat: "Technical",
    city: "Manchester",
    title: "Civil Engineer",
    employer: "UK Infrastructure Contractor",
    meta: "Full-time · B.E Civil · 3+ yrs",
    pay: "£32,000–42,000 / year",
  },
  {
    cat: "Healthcare",
    city: "Birmingham",
    title: "Radiographer",
    employer: "Private Hospital Group",
    meta: "Full-time · HCPC registered · 2+ yrs",
    pay: "£30,000–37,000 / year",
  },
  {
    cat: "Healthcare",
    city: "London",
    title: "ICU Nurse (Band 5/6)",
    employer: "Tertiary NHS Foundation Trust",
    meta: "Full-time · 2+ yrs ICU · NMC required",
    pay: "£33,000–40,000 / year",
  },
];

function Jobs() {
  const [tab, setTab] = useState<"All" | "Healthcare" | "Technical">("All");
  const filtered = tab === "All" ? JOBS : JOBS.filter((j) => j.cat === tab);

  return (
    <section id="jobs" className="relative overflow-hidden bg-white py-24">
      <WaveBlob className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] text-light-blue" />
      <DotGrid className="pointer-events-none absolute right-6 top-10 h-32 w-32 text-brand-blue/15" />
      <div className="container-page relative">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-extrabold text-navy sm:text-[42px]">
              Current Openings in the UK.
            </h2>
            <p className="mt-4 text-[16px] text-navy/70">
              A sample of roles currently open with our UK NHS and private-sector partners.
            </p>
          </div>
          <div className="inline-flex rounded-full bg-light-blue p-1">
            {(["All", "Healthcare", "Technical"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-5 py-2 text-[13px] font-semibold transition ${
                  tab === t ? "bg-navy text-white shadow-soft" : "text-navy/70 hover:text-navy"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {filtered.map((j) => (
            <article
              key={j.title + j.city}
              className="group rounded-3xl border border-brand-blue/20 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${
                    j.cat === "Healthcare"
                      ? "bg-light-blue text-brand-blue"
                      : "bg-gold/15 text-gold"
                  }`}
                >
                  {j.cat}
                </span>
                <span className="text-[12px] font-medium text-muted-foreground">📍 {j.city}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-navy">{j.title}</h3>
              <div className="mt-1 text-[14px] text-navy/70">{j.employer}</div>
              <div className="mt-4 text-[13px] text-navy/60">{j.meta}</div>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <div className="font-display text-lg font-bold text-brand-blue">{j.pay}</div>
                <a
                  href="#cta"
                  className="text-[13px] font-semibold text-navy transition group-hover:text-brand-blue"
                >
                  View Role →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#cta" className="text-[14px] font-semibold text-brand-blue">
            See All UK Roles →
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------- track record -------------------- */

function TrackRecord() {
  return (
    <section className="relative bg-light-blue py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-extrabold text-navy sm:text-[42px]">
            A Track Record Built Across the United Kingdom.
          </h2>
          <p className="mt-4 text-[16px] text-navy/70">
            Since 2009, Ozone has placed 215 healthcare and technical professionals into roles
            across London, Manchester, and Birmingham.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-4 lg:grid-rows-2">
          <div className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-black/5 lg:col-span-1 lg:row-span-2">
            <div className="font-display text-6xl font-extrabold text-brand-blue">215</div>
            <div className="mt-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-navy/60">
              Placed Since 2009
            </div>
            <p className="mt-6 text-[13px] text-navy/70">
              Verified placements across nursing, allied health, and technical trades.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-navy p-10 text-white shadow-lift lg:col-span-2 lg:row-span-2">
            <DotGrid className="pointer-events-none absolute -right-6 -bottom-6 h-40 w-40 text-gold/40" />
            <div className="font-display text-7xl font-extrabold">35+</div>
            <div className="mt-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70">
              NHS & Private Partners
            </div>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/80">
              Active partnerships with NHS trusts and private hospital groups across London,
              Manchester, and Birmingham — direct client relationships, no middlemen.
            </p>
          </div>

          <div className="rounded-3xl border border-brand-blue/25 bg-white p-8 shadow-soft lg:col-span-1 lg:row-span-2">
            <div className="font-display text-6xl font-extrabold text-navy">100%</div>
            <div className="mt-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-navy/60">
              NMC / GMC-Compliant Placements
            </div>
            <p className="mt-6 text-[13px] text-navy/70">
              Every placement documented, verified, and audit-ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- faq -------------------- */

const FAQS = [
  {
    q: "Do I need NMC registration before applying?",
    a: "No. Most nursing candidates begin the process without full NMC registration. Ozone guides you through the CBT, IELTS/OET, and OSCE stages — culminating in your PIN once you're in the UK.",
  },
  {
    q: "What is the difference between NMC, GMC, and HCPC registration?",
    a: "NMC (Nursing & Midwifery Council) regulates nurses and midwives; GMC (General Medical Council) regulates doctors; HCPC (Health & Care Professions Council) regulates radiographers, physiotherapists, biomedical scientists, and other allied health roles. Each has its own eligibility rules and English requirements.",
  },
  {
    q: "What is the typical salary range for nursing roles in the UK?",
    a: "NHS Band 5 nurses typically earn £28,000–£35,000 per year, with Band 6 reaching around £35,000–£42,000 depending on specialty, location, and experience. London roles include additional High Cost Area Supplement.",
  },
  {
    q: "Is accommodation provided for placements in the UK?",
    a: "Many NHS trusts and private providers offer subsidised staff accommodation for the first 1–3 months on arrival, along with airport pickup and induction support. Long-term housing is arranged privately.",
  },
  {
    q: "Does Ozone charge candidates any fee for UK placements?",
    a: "Ozone follows ethical recruitment practice aligned with the UK Code of Practice for International Recruitment. Employer-paid roles carry no candidate service fee; any government or exam fees (IELTS, CBT, OSCE, IHS, visa) are disclosed transparently before you commit.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative overflow-hidden bg-muted/60 py-24">
      <DotGrid className="pointer-events-none absolute bottom-6 left-6 h-32 w-32 text-brand-blue/15" />
      <div className="container-page relative max-w-3xl">
        <h2 className="font-display text-4xl font-extrabold text-navy sm:text-[42px]">
          Frequently Asked Questions About Working in the UK.
        </h2>
        <div className="mt-10 divide-y divide-navy/10 border-y border-navy/10">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="py-2">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="font-display text-[17px] font-bold text-navy">{f.q}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-navy/20 text-navy transition ${
                      isOpen ? "rotate-45 border-brand-blue text-brand-blue" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-5 pr-12 text-[15px] leading-relaxed text-navy/75">{f.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------- cta -------------------- */

function Cta() {
  return (
    <section id="cta" className="relative overflow-hidden bg-light-blue">
      <svg
        viewBox="0 0 1440 80"
        className="block h-16 w-full text-white"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,60 C240,0 480,80 720,40 C960,0 1200,60 1440,20 L1440,0 L0,0 Z"
          fill="currentColor"
        />
      </svg>
      <div className="container-page grid gap-10 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-4xl font-extrabold text-navy sm:text-5xl">
            Ready to Start Your UK Journey?
          </h2>
          <p className="mt-4 max-w-lg text-[16px] text-navy/70">
            Browse open roles or talk to our team about what's currently available.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#jobs"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:opacity-90"
            >
              Browse Open Roles →
            </a>
            <a
              href="https://wa.me/"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue px-6 py-3 text-sm font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <LiveRolesCard size="md" />
        </div>
      </div>
    </section>
  );
}

/* -------------------- footer -------------------- */

function Footer() {
  return (
    <footer className="relative bg-navy text-white">
      <svg
        viewBox="0 0 1440 60"
        className="block h-12 w-full text-navy"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,40 C360,0 720,60 1080,20 C1260,0 1380,20 1440,30 L1440,60 L0,60 Z"
          fill="currentColor"
        />
      </svg>
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white font-display font-bold text-navy">
              O
            </div>
            <div className="font-display text-lg font-bold">Ozone Overseas</div>
          </div>
          <p className="mt-4 max-w-xs text-[13px] text-white/70">
            Healthcare and technical recruitment into the UK and Gulf, done properly. Licensed &
            active since 2009.
          </p>
        </div>

        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
            Countries
          </div>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li className="font-semibold text-gold">United Kingdom</li>
            <li>Saudi Arabia</li>
            <li>United Arab Emirates</li>
            <li>Qatar</li>
          </ul>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
            Company
          </div>
          <ul className="mt-4 space-y-2 text-[14px] text-white/80">
            <li>About</li>
            <li>Process</li>
            <li>Jobs</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
            Compliance
          </div>
          <ul className="mt-4 space-y-2 text-[14px] text-white/80">
            <li>MEA License · Govt. of India</li>
            <li>UK Code of Practice · Ethical Recruitment</li>
            <li>Privacy · Terms</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-6 text-[12px] text-white/60 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Ozone Overseas. All rights reserved.</div>
          <div>MEA Registered · Since 2009</div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------- page -------------------- */

function UkPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <StatsBand />
      <About />
      <Eligibility />
      <Process />
      <Jobs />
      <TrackRecord />
      <Faq />
      <Cta />
      <Footer />
    </div>
  );
}
