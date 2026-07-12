import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  MapPin,
  Clock,
  Briefcase,
  ShieldCheck,
  Menu,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import qatarHero from "@/assets/qatar-hero.jpg";
import qatarAbout from "@/assets/qatar-about.jpg";
import { Header } from "@/components/site/Header";
export const Route = createFileRoute("/Countries/Qatar")({
  head: () => ({
    meta: [
      { title: "Recruitment to Qatar — Nursing & Technical Jobs | Ozone Overseas" },
      {
        name: "description",
        content:
          "QCHP-licensed recruitment into Qatar. Nurses, allied health and technical roles across Doha, Lusail and Al Rayyan — verified employers, 6–8 week process.",
      },
      { property: "og:title", content: "Recruitment to Qatar | Ozone Overseas" },
      {
        property: "og:description",
        content:
          "Placing healthcare and technical professionals from India into verified roles across Qatar since 2009. QCHP compliant.",
      },
      { property: "og:image", content: qatarHero },
      { name: "twitter:image", content: qatarHero },
    ],
  }),
  component: QatarPage,
});

/* --------------------------------- Header -------------------------------- */


/* --------------------------------- Blobs --------------------------------- */
function WaveBlob({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wb" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--brand-gold)" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <path
        fill="url(#wb)"
        d="M320,55c40,45,55,110,30,170s-95,105-160,110s-125-30-155-90S10,110,65,70S280,10,320,55Z"
      />
    </svg>
  );
}

function DotCluster({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`dot-grid opacity-40 ${className}`} />;
}

function CircleRing({
  className = "",
  color = "var(--brand)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      aria-hidden
      className={`rounded-full border ${className}`}
      style={{ borderColor: color, opacity: 0.35 }}
    />
  );
}

/* ---------------------------------- Hero --------------------------------- */
function Hero() {
  const stats = [
    { n: "76", l: "Placed in Qatar" },
    { n: "24", l: "Open Roles" },
    { n: "18+", l: "Employer Partners" },
    { n: "6–8 wk", l: "Avg. Process" },
  ];
  return (
    <section className="relative overflow-hidden bg-[var(--brand-light)]">
      <DotCluster className="absolute -left-10 top-24 h-40 w-40" />
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl grid-cols-1 items-center gap-12 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-0">
        {/* Left */}
        <div className="relative z-10">
          <nav className="mb-6 text-xs font-medium text-muted-foreground">
            <Link to="/" className="hover:text-[var(--brand)]">
              Home
            </Link>{" "}
            / <span className="hover:text-[var(--brand)]">Countries</span> /{" "}
            <span className="text-[var(--brand-navy)]">Qatar</span>
          </nav>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/25 bg-white px-4 py-1.5 text-xs font-semibold text-[var(--brand)] shadow-sm">
            🇶🇦 Healthcare & Technical Recruitment
          </span>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] text-[var(--brand-navy)] sm:text-6xl lg:text-7xl">
            Recruitment to
            <br />
            <span className="text-[var(--brand)]">Qatar.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            Placing nurses, allied health professionals, and technical specialists from India into
            verified roles across Doha and Qatar's expanding healthcare and construction sectors —
            QCHP licensed, since 2009.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#roles"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-navy)] px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-card)] transition hover:translate-y-[-1px] hover:bg-[var(--brand)]"
            >
              View Open Roles <ChevronDown className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--brand)] px-6 py-3.5 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
            >
              <MessageCircle className="h-4 w-4" /> Talk to Our Team
            </a>
          </div>
          {/* Stat row */}
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.l}
                className={`${i > 0 ? "sm:border-l sm:border-[var(--brand-gold)]/40 sm:pl-6" : ""}`}
              >
                <div className="font-display text-3xl font-extrabold text-[var(--brand-navy)]">
                  {s.n}
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <WaveBlob className="absolute -right-12 -top-10 h-72 w-72" />
          <DotCluster className="absolute -bottom-6 -right-6 h-28 w-28" />
          <CircleRing className="absolute -top-6 right-16 h-24 w-24" color="var(--brand-gold)" />
          <CircleRing className="absolute -bottom-10 left-4 h-32 w-32" color="var(--brand-navy)" />

          <div className="relative overflow-hidden rounded-3xl shadow-[var(--shadow-soft)]">
            <img
              src={qatarHero}
              alt="Doha, Qatar skyline at golden hour"
              width={1200}
              height={1400}
              className="h-[560px] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--brand-navy)]/85 via-[var(--brand-navy)]/40 to-transparent" />
            <div className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
              Qatar
            </div>
          </div>

          {/* Compliance badge */}
          <div className="absolute -top-4 right-4 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-[var(--shadow-card)] ring-1 ring-black/5">
            <CheckCircle2 className="h-4 w-4 text-[var(--brand-gold)]" />
            <span className="text-xs font-semibold text-[var(--brand-navy)]">
              🇶🇦 QCHP Licensed · 100% Compliant
            </span>
          </div>

          {/* Live roles card */}
          <div className="absolute -bottom-8 -left-4 w-[300px] rounded-2xl bg-white p-4 shadow-[var(--shadow-soft)] ring-1 ring-black/5 sm:-left-8">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Live Roles Today
              </span>
            </div>
            <div className="mt-1 font-display text-lg font-bold text-[var(--brand-navy)]">
              24 Open Positions
            </div>
            <ul className="mt-3 space-y-2 text-xs">
              {[
                ["ICU Nurse", "Doha", "QAR 5.5–7.5k"],
                ["Electrical Engineer", "Doha", "QAR 4.5–6k"],
                ["OT Nurse", "Doha", "QAR 5.5–7k"],
              ].map(([role, city, pay]) => (
                <li
                  key={role}
                  className="flex items-center justify-between rounded-lg bg-[var(--brand-light)] px-3 py-1.5"
                >
                  <span className="font-semibold text-[var(--brand-navy)]">{role}</span>
                  <span className="text-muted-foreground">
                    {city} · {pay}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="#roles"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand)]"
            >
              Updated today · View all <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Stats Band ------------------------------ */
function StatsBand() {
  const stats = [
    ["76", "Placed in Qatar"],
    ["24", "Open Roles Today"],
    ["18+", "Employer Partners"],
    ["2009", "Active Since"],
  ];
  return (
    <section className="relative bg-background py-2">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="relative -mt-8 grid grid-cols-2 gap-y-8 rounded-[36px] bg-[var(--brand-light)] px-6 py-10 shadow-[var(--shadow-card)] sm:grid-cols-4 sm:px-10">
          {stats.map(([n, l], i) => (
            <div
              key={l}
              className={`text-center ${i > 0 ? "sm:border-l sm:border-[var(--brand-gold)]/50" : ""}`}
            >
              <div className="font-display text-4xl font-extrabold text-[var(--brand-navy)]">
                {n}
              </div>
              <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- About --------------------------------- */
function About() {
  const facts = [
    ["Capital", "Doha"],
    ["Primary Hiring Cities", "Doha · Lusail · Al Rayyan"],
    ["Key License", "QCHP (Qatar Council for Healthcare Practitioners)"],
    ["Avg. Process", "6–8 weeks"],
    ["Currency", "Qatari Riyal (QAR)"],
    ["Working Hours", "48 hrs/week typical"],
  ];
  return (
    <section className="relative overflow-hidden py-24">
      <DotCluster className="absolute left-4 top-10 h-28 w-28" />
      <WaveBlob className="absolute -bottom-16 -right-16 h-80 w-80" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="mb-14 max-w-3xl font-display text-4xl font-extrabold leading-[1.1] text-[var(--brand-navy)] sm:text-5xl">
          Recruiting Healthcare and Technical Talent for the Qatar Market.
        </h2>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="relative">
            <img
              src={qatarAbout}
              alt="Hospital corridor in Doha with nurse walking"
              loading="lazy"
              width={1200}
              height={900}
              className="rounded-3xl object-cover shadow-[var(--shadow-soft)]"
            />
            <div className="absolute -bottom-5 left-6 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-[var(--shadow-card)] ring-1 ring-black/5">
              <ShieldCheck className="h-4 w-4 text-[var(--brand-gold)]" />
              <span className="text-xs font-semibold text-[var(--brand-navy)]">
                Active Since 2009 · MEA Licensed
              </span>
            </div>
          </div>
          <div>
            <span className="inline-flex rounded-full bg-[var(--brand-light)] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--brand)]">
              Qatar Context
            </span>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-foreground/75">
              <p>
                Qatar's National Health Strategy continues to drive sustained demand for
                internationally sourced healthcare professionals, with hospital groups expanding
                specialist capacity in ICU, operating theatres, and diagnostics.
              </p>
              <p>
                Every healthcare role in Qatar is regulated by the{" "}
                <strong className="text-[var(--brand-navy)]">
                  QCHP — Qatar Council for Healthcare Practitioners
                </strong>{" "}
                — the single licensing body governing eligibility and Prometric examinations. Our
                team walks candidates through the full application end-to-end.
              </p>
              <p>
                Post–World Cup infrastructure investment continues to sustain hiring across
                electrical, mechanical, and biomedical technical roles. Ozone maintains direct
                relationships with Qatari hospital groups and engineering firms — covering ICU
                nursing, OT, biomedical, radiology, and electrical/mechanical technical roles.
              </p>
            </div>
            <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 rounded-2xl bg-muted p-6 sm:grid-cols-2">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-[var(--brand-navy)]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Eligibility ------------------------------ */
function Eligibility() {
  const cards = [
    {
      n: "01",
      title: "🎓 Recognized Nursing or Technical Qualification",
      body: "A government-recognized nursing degree or diploma, or a relevant technical certification from a recognized institution.",
      bg: "bg-[var(--brand-navy)] text-white",
      accent: "text-[var(--brand-gold)]",
    },
    {
      n: "02",
      title: "📜 QCHP License Eligibility",
      body: "All healthcare candidates must be eligible for Qatar Council for Healthcare Practitioners licensing. Ozone supports the full application and Prometric exam process.",
      bg: "bg-[var(--brand-light)] text-[var(--brand-navy)]",
      accent: "text-[var(--brand)]",
    },
    {
      n: "03",
      title: "🗣️ English Proficiency",
      body: "Functional spoken and written English is required for clinical, technical, and workplace communication.",
      bg: "bg-white text-[var(--brand-navy)] border border-border",
      accent: "text-[var(--brand)]",
    },
    {
      n: "04",
      title: "⏱️ Relevant Experience",
      body: "A minimum of 1–2 years of experience is typical for most roles; some structured entry-level positions are available for the right candidates.",
      bg: "bg-muted text-[var(--brand-navy)]",
      accent: "text-[var(--brand)]",
    },
  ];
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-display text-4xl font-extrabold leading-[1.1] text-[var(--brand-navy)] sm:text-5xl">
            What It Takes to Qualify.
          </h2>
          <p className="mt-4 text-base text-foreground/70">
            General requirements for healthcare and technical roles in Qatar. Exact criteria vary by
            role and employer.
          </p>
          <a
            href="#contact"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)]"
          >
            Not sure if you qualify? Get a free eligibility check <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((c) => (
            <article
              key={c.n}
              className={`flex h-full flex-col rounded-3xl p-8 shadow-[var(--shadow-card)] ${c.bg}`}
            >
              <div className={`font-display text-3xl font-extrabold ${c.accent}`}>{c.n}</div>
              <h3 className="mt-6 font-display text-xl font-bold leading-snug">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-85">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Process -------------------------------- */
function Process() {
  const steps = [
    {
      n: "01",
      title: "Apply",
      body: "Submit your application or browse current Qatar openings.",
      meta: "Free · No format needed",
    },
    {
      n: "02",
      title: "Document & License Verification",
      body: "Our team verifies qualifications and QCHP eligibility.",
      meta: "48hr · Pre-screened",
    },
    {
      n: "03",
      title: "Visa & Documentation",
      body: "We manage the employment visa, attestation, and embassy paperwork.",
      meta: "Weeks 2–5 · Fully handled",
    },
    {
      n: "04",
      title: "Relocation & Boarding",
      body: "Pre-departure briefing, travel coordination, and first-week check-in.",
      meta: "Week 6–8 · Full support",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-[var(--brand-light)] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <h2 className="font-display text-4xl font-extrabold leading-[1.1] text-[var(--brand-navy)] sm:text-5xl">
            How the Process Works, Step by Step.
          </h2>
          <p className="mt-4 text-base text-foreground/70">
            Most candidates complete the full process — from application to boarding — within 6 to 8
            weeks.
          </p>
        </div>
        {/* S-curve path */}
        <div className="relative">
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-24 w-full -translate-y-1/2 lg:block"
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 40 60 C 250 -30, 450 130, 620 40 S 990 -20, 1160 60"
              fill="none"
              stroke="var(--brand-gold)"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
          </svg>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`relative rounded-3xl bg-white p-7 shadow-[var(--shadow-card)] ring-1 ring-black/5 ${
                  i % 2 === 0 ? "lg:mt-0" : "lg:mt-16"
                }`}
              >
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[var(--brand-navy)] font-display text-sm font-bold text-white">
                  {s.n}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-[var(--brand-navy)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/70">{s.body}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-light)] px-3 py-1 text-[11px] font-semibold text-[var(--brand)]">
                  <Clock className="h-3 w-3" />
                  {s.meta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Jobs ---------------------------------- */
function Jobs() {
  const [tab, setTab] = useState<"healthcare" | "technical">("healthcare");
  const jobs = [
    {
      cat: "Healthcare",
      city: "Doha",
      title: "ICU Nurse",
      emp: "Leading Tertiary Hospital",
      meta: "Full-time · 2+ yrs · QCHP required",
      pay: "QAR 5,500–7,500/month",
    },
    {
      cat: "Technical",
      city: "Doha",
      title: "Electrical Engineer",
      emp: "Infrastructure Group",
      meta: "Full-time · B.E Electrical · 3+ yrs",
      pay: "QAR 4,500–6,000/month",
    },
    {
      cat: "Healthcare",
      city: "Doha",
      title: "OT Nurse",
      emp: "Multi-specialty Hospital",
      meta: "Full-time · 2+ yrs OT · QCHP eligible",
      pay: "QAR 5,500–7,000/month",
    },
    {
      cat: "Healthcare",
      city: "Lusail",
      title: "Staff Nurse",
      emp: "Private Hospital Network",
      meta: "Full-time · BSc Nursing · QCHP required",
      pay: "QAR 5,000–6,500/month",
    },
  ];
  const filtered = jobs.filter((j) => j.cat.toLowerCase() === tab);
  return (
    <section id="roles" className="relative overflow-hidden bg-background py-24">
      <WaveBlob className="absolute -bottom-24 -left-16 h-80 w-80" />
      <DotCluster className="absolute right-6 top-16 h-24 w-24" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-extrabold leading-[1.1] text-[var(--brand-navy)] sm:text-5xl">
              Current Openings in Qatar.
            </h2>
            <p className="mt-4 text-base text-foreground/70">
              A sample of roles currently open with our Qatar employer partners.
            </p>
          </div>
          <div className="inline-flex rounded-full bg-muted p-1">
            {(["healthcare", "technical"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition ${
                  tab === t
                    ? "bg-[var(--brand-navy)] text-white shadow"
                    : "text-muted-foreground hover:text-[var(--brand-navy)]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((j) => (
            <article
              key={j.title + j.city}
              className="group flex flex-col rounded-3xl border border-border bg-white p-7 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-[var(--brand)]/40"
            >
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[var(--brand)]">
                <span className="rounded-full bg-[var(--brand-light)] px-2.5 py-0.5">{j.cat}</span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {j.city}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-[var(--brand-navy)]">
                {j.title}
              </h3>
              <div className="mt-1 text-sm text-foreground/70">{j.emp}</div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Briefcase className="h-3.5 w-3.5" /> {j.meta}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Salary
                  </div>
                  <div className="mt-0.5 font-display text-base font-bold text-[var(--brand-navy)]">
                    {j.pay}
                  </div>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)] group-hover:gap-2"
                >
                  View Role <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#roles"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)]"
          >
            See All Qatar Roles <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Track Record ----------------------------- */
function TrackRecord() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <h2 className="font-display text-4xl font-extrabold leading-[1.1] text-[var(--brand-navy)] sm:text-5xl">
            A Track Record Built in Qatar.
          </h2>
          <p className="mt-4 text-base text-foreground/70">
            Since 2009, Ozone has placed 76 healthcare and technical professionals into roles across
            Doha and beyond.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="rounded-3xl bg-[var(--brand-light)] p-8 lg:col-span-3">
            <div className="font-display text-6xl font-extrabold text-[var(--brand-navy)]">76</div>
            <div className="mt-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Placed Since 2009
            </div>
          </div>
          <div className="rounded-3xl bg-[var(--brand-navy)] p-10 text-white shadow-[var(--shadow-soft)] lg:col-span-6">
            <div className="font-display text-7xl font-extrabold text-[var(--brand-gold)]">18+</div>
            <div className="mt-3 text-sm font-semibold uppercase tracking-widest text-white/70">
              Employer Partners
            </div>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/85">
              Active partnerships with hospitals and engineering firms across Doha, Lusail, and Al
              Rayyan.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-8 lg:col-span-3">
            <div className="font-display text-6xl font-extrabold text-[var(--brand-navy)]">
              100%
            </div>
            <div className="mt-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              QCHP-Compliant Placements
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- FAQ ---------------------------------- */
function FAQ() {
  const items = [
    {
      q: "Do I need a QCHP license before applying to roles in Qatar?",
      a: "No. You must be eligible for QCHP licensing, but the license itself is typically obtained during the recruitment process. Ozone guides you end-to-end through document preparation, DataFlow verification, and the Prometric exam.",
    },
    {
      q: "What is the typical salary range for nursing roles in Qatar?",
      a: "Most nursing roles fall between QAR 5,000 and QAR 7,500 per month depending on specialty and experience. Many packages include accommodation, transport, medical insurance, and annual leave allowances.",
    },
    {
      q: "How long does the visa process take for Qatar?",
      a: "Once documents are verified, the employment visa and attestation typically take 3–5 weeks. Total time from application to boarding averages 6–8 weeks.",
    },
    {
      q: "Is accommodation provided for placements in Qatar?",
      a: "Most hospital and engineering employers provide either shared accommodation or a housing allowance. This is confirmed in your offer letter before you accept the role.",
    },
    {
      q: "Does Ozone charge candidates any fee for Qatar placements?",
      a: "Ozone follows ethical recruitment standards. Placement fees for our verified employer partners are borne by the employer, not the candidate. Any government or exam-related costs are transparent and communicated upfront.",
    },
  ];
  return (
    <section className="bg-[var(--brand-light)] py-24">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <h2 className="mb-10 font-display text-4xl font-extrabold leading-[1.1] text-[var(--brand-navy)] sm:text-5xl">
          Frequently Asked Questions About Working in Qatar.
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {items.map((it, i) => (
            <AccordionItem
              key={i}
              value={`q-${i}`}
              className="rounded-2xl border border-border bg-white px-6 shadow-[var(--shadow-card)]"
            >
              <AccordionTrigger className="text-left font-display text-base font-bold text-[var(--brand-navy)] hover:no-underline">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-foreground/75">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* -------------------------------- Final CTA ------------------------------ */
function FinalCTA() {
  return (
    <section id="contact" className="relative bg-background pb-24 pt-16">
      <svg
        aria-hidden
        className="block h-16 w-full"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path d="M0 60 C 400 0, 1040 120, 1440 30 L 1440 80 L 0 80 Z" fill="var(--brand-light)" />
      </svg>
      <div className="bg-[var(--brand-light)]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-display text-4xl font-extrabold leading-[1.1] text-[var(--brand-navy)] sm:text-5xl">
              Ready to Start Your Qatar Journey?
            </h2>
            <p className="mt-4 max-w-lg text-base text-foreground/70">
              Browse verified openings or talk to our team about your profile. Most candidates hear
              back within 48 hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#roles"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-navy)] px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-card)] transition hover:bg-[var(--brand)]"
              >
                Browse Open Roles <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--brand)] px-6 py-3.5 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="justify-self-center rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] ring-1 ring-black/5 sm:w-[360px]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Live Roles Today
              </span>
            </div>
            <div className="mt-1 font-display text-lg font-bold text-[var(--brand-navy)]">
              24 Open Positions
            </div>
            <ul className="mt-3 space-y-2 text-xs">
              {[
                ["ICU Nurse", "Doha", "QAR 5.5–7.5k"],
                ["Electrical Engineer", "Doha", "QAR 4.5–6k"],
                ["OT Nurse", "Doha", "QAR 5.5–7k"],
              ].map(([role, city, pay]) => (
                <li
                  key={role}
                  className="flex items-center justify-between rounded-lg bg-[var(--brand-light)] px-3 py-1.5"
                >
                  <span className="font-semibold text-[var(--brand-navy)]">{role}</span>
                  <span className="text-muted-foreground">
                    {city} · {pay}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="#roles"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand)]"
            >
              Updated today · View all <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Footer --------------------------------- */
function Footer() {
  return (
    <footer className="bg-[var(--brand-navy)] text-white/85">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-5 py-16 md:grid-cols-4 lg:px-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 font-display font-bold text-white">
              O
            </div>
            <span className="font-display text-lg font-bold text-white">Ozone Overseas</span>
          </div>
          <p className="mt-4 text-sm text-white/60">
            Recruitment to the Gulf, since 2009. QCHP · SCFHS · MOH licensed.
          </p>
        </div>
        <FooterCol
          title="Countries"
          items={["Qatar", "Saudi Arabia", "United Arab Emirates", "Oman"]}
        />
        <FooterCol
          title="For You"
          items={["Candidates", "Employers", "Live Roles", "Eligibility Check"]}
        />
        <FooterCol title="Company" items={["About", "Compliance", "Contact", "WhatsApp"]} />
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-5 py-6 text-xs text-white/50 md:flex-row md:items-center lg:px-8">
          <div>© {new Date().getFullYear()} Ozone Overseas. All rights reserved.</div>
          <div>Privacy · Terms · Ethical Recruitment</div>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-widest text-white/50">{title}</div>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="transition hover:text-[var(--brand-gold)]">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------- Page ---------------------------------- */
function QatarPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <StatsBand />
        <About />
        <Eligibility />
        <Process />
        <Jobs />
        <TrackRecord />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
