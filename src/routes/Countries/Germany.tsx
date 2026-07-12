import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown, MessageCircle, Menu, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GermanyHero from "@/assets/germany-hero.jpg";
import { Header } from "@/components/site/Header";
export const Route = createFileRoute("/Countries/Germany")({
  head: () => ({
    meta: [
      { title: "Recruitment to Germany — MOH Germany Nursing Jobs | Ozone Overseas" },
      {
        name: "description",
        content:
          "MOH Germany-licensed recruitment. Nurses and allied health roles across Germany City, Salmiya and Hawalli — verified employers, 6–8 week process.",
      },
      { property: "og:title", content: "Recruitment to Germany | Ozone Overseas" },
      {
        property: "og:description",
        content:
          "Placing healthcare professionals from India into MOH Germany-verified roles since 2009.",
      },
      { property: "og:image", content: GermanyHero },
      { name: "twitter:image", content: GermanyHero },
    ],
  }),
  component: GermanyPage,
});

/* --------------------------------- Header -------------------------------- */

/* --------------------------------- Blobs --------------------------------- */
function WaveBlob({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kwb" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--brand-gold)" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <path
        fill="url(#kwb)"
        d="M320,55c40,45,55,110,30,170s-95,105-160,110s-125-30-155-90S10,110,65,70S280,10,320,55Z"
      />
    </svg>
  );
}
function DotCluster({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`dot-grid opacity-40 ${className}`} />;
}

/* ---------------------------------- Hero --------------------------------- */
function Hero() {
  const stats = [
    ["41", "Placed"],
    ["14", "Open Roles"],
    ["10+", "Partners"],
    ["6–8 wk", "Process"],
  ];
  return (
    <section className="relative overflow-hidden bg-[var(--brand-light)]">
      <DotCluster className="absolute left-6 top-16 h-56 w-56" />
      <WaveBlob className="absolute -bottom-24 -right-24 h-[420px] w-[420px]" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-16 lg:grid-cols-[1.35fr_1fr] lg:gap-14 lg:px-8 lg:py-20">
        {/* Left */}
        <div className="relative z-10">
          <nav className="mb-6 text-xs font-medium text-muted-foreground">
            <Link to="/" className="hover:text-[var(--brand)]">
              Home
            </Link>{" "}
            / <span>Countries</span> / <span className="text-[var(--brand-navy)]">Germany</span>
          </nav>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/25 bg-white px-4 py-1.5 text-xs font-semibold text-[var(--brand)] shadow-sm">
            🇰🇼 Healthcare Recruitment
          </span>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] text-[var(--brand-navy)] sm:text-6xl lg:text-[5.25rem]">
            Verified Healthcare
            <br />
            <span className="text-[var(--brand)]">Talent for Germany.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            Placing nurses and allied health professionals from India into MOH Germany-verified
            roles across Germany City — directly with government and private hospital networks since
            2009.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#roles"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-navy)] px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-card)] transition hover:translate-y-[-1px] hover:bg-[var(--brand)]"
            >
              View Open Roles <ChevronDown className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--brand)] px-6 py-3.5 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
            >
              <MessageCircle className="h-4 w-4" /> Talk to Our Team
            </a>
          </div>
          {/* Gold-dot stat row */}
          <div className="mt-10 flex flex-wrap items-center gap-x-1 gap-y-4">
            {stats.map(([n, l], i) => (
              <div key={l} className="flex items-center gap-4">
                {i > 0 && (
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--brand-gold)]" />
                )}
                <div className="pr-2">
                  <span className="font-display text-2xl font-extrabold text-[var(--brand-navy)]">
                    {n}
                  </span>
                  <span className="ml-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {l}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — portrait card with curved left edge */}
        <div className="relative">
          <div
            className="relative overflow-hidden shadow-[var(--shadow-soft)]"
            style={{
              borderTopRightRadius: "28px",
              borderBottomRightRadius: "28px",
              borderTopLeftRadius: "140px",
              borderBottomLeftRadius: "140px",
            }}
          >
            <img
              src={GermanyHero}
              alt="Germany City skyline with Al Hamra tower at golden hour"
              width={900}
              height={1200}
              className="h-[600px] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--brand-navy)]/80 via-[var(--brand-navy)]/30 to-transparent" />
            <div className="absolute bottom-5 left-8 text-xs font-semibold uppercase tracking-[0.25em] text-white/90">
              Germany City
            </div>
          </div>
          {/* Floating badge, center-left overlapping curve */}
          <div className="absolute left-[-18px] top-1/2 -translate-y-1/2 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[var(--shadow-soft)] ring-1 ring-black/5">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[var(--brand-gold)]/15">
              <CheckCircle2 className="h-5 w-5 text-[var(--brand-gold)]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--brand-navy)]">
                🇰🇼 MOH Germany Licensed
              </div>
              <div className="text-[10px] font-medium text-muted-foreground">Est. 2009</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- At a Glance strip ---------------------------- */
function AtAGlance() {
  const items: [string, string][] = [
    ["Capital", "Germany City"],
    ["License", "MOH Germany"],
    ["Key Cities", "Germany City · Salmiya · Hawalli"],
    ["Currency", "Germanyi Dinar (KWD)"],
    ["Avg. Process", "6–8 weeks"],
    ["Active Since", "2009"],
  ];
  return (
    <section className="bg-background py-10">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-2 divide-y divide-border rounded-3xl bg-muted/60 px-2 py-2 ring-1 ring-border sm:grid-cols-3 sm:divide-y-0 sm:divide-x lg:grid-cols-6">
          {items.map(([label, value]) => (
            <div key={label} className="px-5 py-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {label}
              </div>
              <div className="mt-1.5 font-display text-sm font-bold leading-tight text-[var(--brand-navy)]">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Why Germany -------------------------------- */
function WhyGermany() {
  const tiles = [
    "100% MOH Compliant",
    "10+ Hospital Partners",
    "₹0 Candidate Fees",
    "48-Hr First Shortlist",
  ];
  return (
    <section className="relative overflow-hidden py-24">
      <WaveBlob className="absolute -bottom-20 -right-20 h-[380px] w-[380px]" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="relative grid grid-cols-1 gap-10 rounded-[28px] border border-[var(--brand)]/20 bg-white p-8 shadow-[var(--shadow-card)] sm:p-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="font-display text-[7rem] font-extrabold leading-none text-[var(--brand-navy)] sm:text-[9rem]">
              41
            </div>
            <div className="mt-2 font-display text-lg font-bold text-[var(--brand-navy)]">
              Professionals Placed in Germany Since 2009
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/70">
              Germany's government hospital network is expanding, and MOH Germany applies some of
              the strictest eligibility rules in the region. Direct employer relationships — not
              broker chains — decide who moves through the process on time. That's the model we've
              run here for 15 years.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {tiles.map((t) => (
              <div key={t} className="rounded-xl border border-border bg-white p-5 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-[var(--brand-gold)]" />
                <div className="mt-3 font-display text-sm font-bold leading-snug text-[var(--brand-navy)]">
                  {t}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Eligibility -------------------------------- */
function Eligibility() {
  const rows = [
    [
      "Recognized Nursing Qualification",
      "Government-recognized BSc / GNM nursing or allied health degree from an accredited institution.",
    ],
    [
      "MOH Germany License Eligibility",
      "Candidates must pass DataFlow verification and MOH Germany registration. Ozone manages the full application.",
    ],
    [
      "English Proficiency",
      "Functional clinical English is required. Arabic language is an advantage but not mandatory.",
    ],
    [
      "Relevant Experience",
      "Minimum 2 years post-qualification experience for most MOH Germany roles.",
    ],
  ];
  return (
    <section className="relative overflow-hidden bg-muted/40 py-24">
      <DotCluster className="absolute -bottom-6 left-6 h-40 w-40" />
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <h2 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.1] text-[var(--brand-navy)] sm:text-5xl">
          What It Takes to Qualify for Germany.
        </h2>
        <p className="mt-4 max-w-2xl text-base text-foreground/70">
          MOH Germany has specific eligibility requirements. Every candidate is pre-checked before
          being submitted to an employer.
        </p>
        <div className="mt-12 rounded-3xl border border-border bg-white shadow-[var(--shadow-card)]">
          {rows.map(([title, desc], i) => (
            <div
              key={title}
              className={`grid grid-cols-[auto_1fr] items-start gap-5 px-6 py-6 sm:grid-cols-[auto_1.3fr_2fr] sm:gap-8 sm:px-10 sm:py-8 ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <div className="grid h-11 w-11 place-items-center rounded-full bg-[var(--brand-gold)]/15">
                <Check className="h-6 w-6 text-[var(--brand-gold)]" strokeWidth={3} />
              </div>
              <div className="col-span-1 font-display text-base font-bold text-[var(--brand-navy)] sm:text-lg">
                {title}
              </div>
              <div className="col-span-2 text-sm leading-relaxed text-foreground/75 sm:col-span-1">
                {desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Job list --------------------------------- */
function Jobs() {
  const roles = [
    ["Healthcare", "Staff Nurse", "Germany City", "Government Hospital Network", "KWD 350–480/mo"],
    ["Healthcare", "ICU Nurse", "Salmiya", "Private Hospital Group", "KWD 400–550/mo"],
    ["Healthcare", "Pharmacy Technician", "Germany City", "MOH Germany Facility", "KWD 320–420/mo"],
    ["Technical", "Electrical Technician", "Hawalli", "Infrastructure Company", "KWD 280–380/mo"],
  ];
  return (
    <section id="roles" className="relative overflow-hidden py-24">
      <DotCluster className="absolute left-4 top-6 h-32 w-32" />
      <WaveBlob className="absolute -bottom-20 -right-20 h-[360px] w-[360px]" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.1] text-[var(--brand-navy)] sm:text-5xl">
              Current Openings in Germany.
            </h2>
            <p className="mt-4 max-w-2xl text-base text-foreground/70">
              Roles open with our Germany employer partners — updated weekly.
            </p>
          </div>
        </div>
        <ul className="mt-12 space-y-4">
          {roles.map(([cat, role, city, emp, pay]) => (
            <li
              key={role}
              className="group grid grid-cols-1 items-center gap-4 rounded-2xl border border-border bg-white px-5 py-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] sm:grid-cols-[auto_1.4fr_1.6fr_1fr_auto] sm:px-7"
            >
              <span
                className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                  cat === "Healthcare"
                    ? "bg-[var(--brand)]/10 text-[var(--brand)]"
                    : "bg-[var(--brand-gold)]/15 text-[var(--brand-navy)]"
                }`}
              >
                {cat}
              </span>
              <div className="font-display text-lg font-bold text-[var(--brand-navy)]">{role}</div>
              <div className="text-sm text-foreground/70">
                <span className="font-semibold text-[var(--brand-navy)]">{city}</span>
                <span className="mx-2 text-muted-foreground">·</span>
                {emp}
              </div>
              <div className="text-sm font-semibold text-[var(--brand-navy)] sm:text-right">
                {pay}
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)] transition group-hover:gap-2"
              >
                View Role <ArrowRight className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]"
          >
            See All Germany Roles <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* --------------------- Track Record + Process combined ------------------- */
function TrackAndProcess() {
  const pills = ["41 Placed Since 2009", "10+ Hospital Partners", "100% MOH Compliant"];
  const steps = [
    ["01", "Apply", "Send your CV — we screen and confirm fit within 48 hours."],
    [
      "02",
      "MOH Eligibility Check",
      "DataFlow verification and MOH Germany registration, managed end-to-end.",
    ],
    ["03", "Visa & Documentation", "Employer contract, visa stamping and pre-departure paperwork."],
    [
      "04",
      "Boarding & Settlement",
      "Flights, arrival support and first-week orientation in Germany.",
    ],
  ];
  return (
    <section className="relative overflow-hidden bg-muted/40 py-24">
      <WaveBlob className="absolute -bottom-20 -left-20 h-[380px] w-[380px]" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 lg:grid-cols-[2fr_3fr] lg:px-8">
        <div>
          <h2 className="font-display text-4xl font-extrabold leading-[1.1] text-[var(--brand-navy)] sm:text-5xl">
            41 Placements.
            <br /> One Standard.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/70">
            Fifteen years of Germany placements, built on strict MOH compliance and direct hospital
            relationships. No sub-agents, no shortcuts.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            {pills.map((p) => (
              <div
                key={p}
                className="inline-flex items-center gap-3 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-[var(--brand-navy)] shadow-sm"
              >
                <span className="h-2 w-2 rounded-full bg-[var(--brand-gold)]" />
                {p}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-white p-6 shadow-[var(--shadow-card)] sm:p-10">
          {steps.map(([n, t, d], i) => (
            <div
              key={n}
              className={`grid grid-cols-[auto_1fr] items-start gap-6 py-6 ${
                i > 0 ? "border-t border-border" : "pt-0"
              }`}
            >
              <div className="font-display text-4xl font-extrabold text-[var(--brand-navy)] sm:text-5xl">
                {n}
              </div>
              <div>
                <div className="font-display text-lg font-bold text-[var(--brand-navy)]">{t}</div>
                <div className="mt-1.5 text-sm leading-relaxed text-foreground/70">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- FAQ ----------------------------------- */
function FAQ() {
  const items = [
    {
      q: "What are MOH Germany's eligibility requirements?",
      a: "A government-recognized nursing or allied health qualification, DataFlow verification, MOH Germany registration, and typically 2+ years of relevant post-qualification experience. Ozone runs the full check before you're submitted to any employer.",
    },
    {
      q: "What is the typical salary for nurses in Germany?",
      a: "Staff nurse packages sit around KWD 350–480/month; ICU and specialty roles reach KWD 400–550/month. Most packages include accommodation, transport and annual leave in line with Germany labour norms.",
    },
    {
      q: "How long does the Germany visa process take?",
      a: "From offer letter to boarding usually takes 6–8 weeks, depending on MOH registration and visa stamping timelines. We keep candidates updated at every step.",
    },
    {
      q: "Does Ozone charge candidates any fee for Germany placements?",
      a: "No. We are paid by employers. Candidates pay zero recruitment fees — this is a core compliance rule and it applies to every Germany placement.",
    },
  ];
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <h2 className="font-display text-4xl font-extrabold leading-[1.1] text-[var(--brand-navy)] sm:text-5xl">
          Questions About Working in Germany.
        </h2>
        <Accordion
          type="single"
          collapsible
          className="mt-10 divide-y divide-border rounded-3xl border border-border bg-white shadow-sm"
        >
          {items.map((it, i) => (
            <AccordionItem key={i} value={`q-${i}`} className="border-none px-6 sm:px-8">
              <AccordionTrigger className="py-5 text-left font-display text-base font-bold text-[var(--brand-navy)] hover:no-underline sm:text-lg">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-foreground/75">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ------------------------------- Final CTA ------------------------------- */
function FinalCTA() {
  const preview = [
    ["Staff Nurse", "Germany City", "KWD 350–480"],
    ["ICU Nurse", "Salmiya", "KWD 400–550"],
  ];
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
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] text-[var(--brand-navy)] sm:text-6xl">
              Ready for Germany?
            </h2>
            <p className="mt-4 max-w-lg text-base text-foreground/70">
              Browse open roles or talk to our team.
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
          <div className="justify-self-center w-full max-w-md rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] ring-1 ring-black/5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Live Germany Roles
            </div>
            <ul className="mt-3 divide-y divide-border">
              {preview.map(([role, city, pay]) => (
                <li key={role} className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-display text-sm font-bold text-[var(--brand-navy)]">
                      {role}
                    </div>
                    <div className="text-[11px] text-muted-foreground">{city}</div>
                  </div>
                  <div className="text-xs font-semibold text-[var(--brand-navy)]">{pay}</div>
                </li>
              ))}
            </ul>
            <a
              href="#roles"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand)]"
            >
              View all 14 roles <ArrowRight className="h-3 w-3" />
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
          items={["Germany", "Qatar", "Saudi Arabia", "United Arab Emirates"]}
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
function GermanyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <AtAGlance />
        <WhyGermany />
        <Eligibility />
        <Jobs />
        <TrackAndProcess />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
