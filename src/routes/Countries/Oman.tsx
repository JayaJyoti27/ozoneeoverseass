import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import muscatHero from "@/assets/muscat-hero.jpg";
import omanAbout from "@/assets/oman-about.jpg";
import { Header } from "@/components/site/Header";
export const Route = createFileRoute("/Countries/Oman")({
  head: () => ({
    meta: [
      { title: "Recruitment to Oman — Ozone Overseas | MOH Oman Licensed" },
      {
        name: "description",
        content:
          "Placing nurses, allied health, and technical specialists from India into verified roles across Muscat, Sohar, and Salalah. MOH Oman licensed, since 2009.",
      },
      { property: "og:title", content: "Recruitment to Oman — Ozone Overseas" },
      {
        property: "og:description",
        content:
          "Healthcare and technical recruitment for the Omani market. MOH Oman licensed placements since 2009.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OmanPage,
});

/* ---------- Decorative SVG helpers ---------- */
function WaveBlob({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        fill="currentColor"
        d="M320 60c40 40 60 100 40 160s-80 100-150 110-150-20-180-80-20-140 30-180 100-60 160-50 60 10 100 40z"
      />
    </svg>
  );
}

function DotGrid({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 6 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={10 + c * 20} cy={10 + r * 20} r={2} fill="currentColor" />
        )),
      )}
    </svg>
  );
}

/* ---------- Nav ---------- */


/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 min-h-[calc(100vh-4rem)] py-10 grid lg:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <div className="relative z-10">
          <nav className="text-xs text-[var(--navy)]/60 mb-6">
            <Link to="/" className="hover:text-[var(--brand-blue)]">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Countries</span>
            <span className="mx-2">/</span>
            <span className="text-[var(--navy)]">Oman</span>
          </nav>
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-blue-light)] text-[var(--brand-blue)] px-4 py-1.5 text-xs font-semibold">
            🇴🇲 Healthcare & Technical Recruitment
          </span>
          <h1 className="mt-6 font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-[var(--navy)]">
            Recruitment to
            <br />
            <span className="text-[var(--brand-blue)]">Oman.</span>
          </h1>
          <p className="mt-6 text-lg text-[var(--navy)]/70 max-w-xl leading-relaxed">
            Placing nurses, allied health professionals, and technical specialists from India into
            verified roles across Muscat and Oman's growing healthcare and infrastructure sectors —
            MOH Oman licensed, since 2009.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#roles"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--navy)] text-white px-6 py-3.5 text-sm font-semibold hover:bg-[var(--brand-blue)] transition"
            >
              View Open Roles ↓
            </a>
            <a
              href="https://wa.me/"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--brand-blue)] text-[var(--brand-blue)] px-6 py-3.5 text-sm font-semibold hover:bg-[var(--brand-blue)] hover:text-white transition"
            >
              Talk to Our Team
            </a>
          </div>
          <div className="mt-10 grid grid-cols-4 gap-4">
            {[
              ["48", "Placed in Oman"],
              ["16", "Open Roles"],
              ["12+", "Employer Partners"],
              ["6–8 wk", "Avg. Process"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display font-bold text-2xl md:text-3xl text-[var(--navy)]">
                  {n}
                </div>
                <div className="text-xs text-[var(--navy)]/60 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <WaveBlob className="absolute -top-10 -right-10 w-64 h-64 text-[var(--brand-blue-light)]" />
          <DotGrid className="absolute -bottom-6 -right-4 w-28 h-28 text-[var(--gold)]/40" />
          <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full border-2 border-[var(--gold)]/40" />
          <div className="absolute bottom-10 right-2 w-16 h-16 rounded-full border-2 border-[var(--navy)]/20" />

          <div className="relative rounded-[24px] overflow-hidden shadow-2xl shadow-[var(--navy)]/20">
            <img
              src={muscatHero}
              alt="Muscat, Oman skyline at golden hour"
              width={1400}
              height={1600}
              className="w-full h-[560px] object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--navy)] to-transparent" />
            <div className="absolute bottom-4 left-5 text-white font-display font-bold text-2xl tracking-wide">
              Oman
            </div>
          </div>

          {/* Compliance badge */}
          <div className="absolute -top-3 right-6 bg-white rounded-2xl shadow-xl border border-black/5 px-4 py-3 flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-[var(--gold)] text-white grid place-items-center text-xs">
              ✓
            </span>
            <div className="text-xs font-semibold text-[var(--navy)]">
              🇴🇲 MOH Oman Licensed
              <div className="text-[10px] text-[var(--navy)]/60 font-normal">100% Compliant</div>
            </div>
          </div>

          {/* Live roles card */}
          <div className="absolute -bottom-8 -left-6 w-80 bg-white rounded-2xl shadow-2xl border border-black/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-xs font-bold text-[var(--navy)]">
                Live Roles Today — 16 Open Positions
              </span>
            </div>
            <ul className="space-y-2 text-xs">
              {[
                ["Staff Nurse", "Muscat", "OMR 450–600/mo"],
                ["Mechanical Tech.", "Sohar", "OMR 350–500/mo"],
                ["Pharmacy Tech.", "Muscat", "OMR 400–550/mo"],
              ].map(([r, c, s]) => (
                <li
                  key={r}
                  className="flex items-center justify-between border-b border-black/5 pb-1.5 last:border-0"
                >
                  <span className="font-semibold text-[var(--navy)]">{r}</span>
                  <span className="text-[var(--navy)]/60">{c}</span>
                  <span className="text-[var(--brand-blue)] font-semibold">{s}</span>
                </li>
              ))}
            </ul>
            <a href="#roles" className="mt-3 block text-xs text-[var(--brand-blue)] font-semibold">
              Updated today · View all →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats Band ---------- */
function StatsBand() {
  const stats = [
    ["48", "Placed in Oman"],
    ["16", "Open Roles Today"],
    ["12+", "Employer Partners"],
    ["2009", "Active Since"],
  ];
  return (
    <section className="relative mt-20 lg:mt-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative bg-[var(--brand-blue-light)] rounded-[28px] px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(([n, l], i) => (
            <div key={l} className="relative text-center">
              <div className="font-display font-extrabold text-4xl md:text-5xl text-[var(--navy)]">
                {n}
              </div>
              <div className="mt-2 text-sm text-[var(--navy)]/70">{l}</div>
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-[var(--gold)]/50" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      <WaveBlob className="absolute -bottom-16 -right-24 w-96 h-96 text-[var(--brand-blue-light)]" />
      <DotGrid className="absolute top-10 left-4 w-28 h-28 text-[var(--navy)]/10" />
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 items-center relative">
        <div className="relative">
          <div className="relative rounded-[24px] overflow-hidden shadow-xl">
            <img
              src={omanAbout}
              alt="Healthcare professional in Muscat hospital"
              loading="lazy"
              width={1200}
              height={1400}
              className="w-full h-[520px] object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -right-4 bg-white rounded-2xl shadow-xl border border-black/5 px-4 py-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
            <span className="text-xs font-bold text-[var(--navy)]">
              Active Since 2009 · MEA Licensed
            </span>
          </div>
        </div>

        <div>
          <span className="inline-block text-xs font-bold tracking-widest text-[var(--brand-blue)] uppercase mb-4">
            Oman Context
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--navy)] leading-tight">
            Recruiting Healthcare and Technical Talent for the Omani Market.
          </h2>
          <div className="mt-6 space-y-4 text-[var(--navy)]/75 leading-relaxed">
            <p>
              Oman's Vision 2040 is driving sustained investment in healthcare and infrastructure —
              creating durable demand for skilled international talent across Muscat, Sohar, and
              Salalah.
            </p>
            <p>
              The Ministry of Health Oman (MOH Oman) is the single licensing authority for all
              healthcare placements. Nursing, pharmacy, and allied health roles are consistently
              open across the Royal Hospital and private hospital networks in Muscat, while the
              Sohar port and industrial zone continue to drive mechanical and civil technical
              hiring.
            </p>
            <p>
              Since 2009, Ozone has maintained direct employer relationships across general nursing,
              pharmacy, lab technicians, and mechanical and civil technical roles.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-[var(--secondary)] p-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            {[
              ["Capital", "Muscat"],
              ["Primary Hiring Cities", "Muscat · Sohar · Salalah"],
              ["Key License", "MOH Oman"],
              ["Avg. Process", "6–8 weeks"],
              ["Currency", "Omani Rial (OMR)"],
              ["Working Hours", "45 hrs/week typical"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="text-[11px] uppercase tracking-wider text-[var(--navy)]/50 font-semibold">
                  {k}
                </div>
                <div className="text-[var(--navy)] font-semibold mt-0.5">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Eligibility ---------- */
function Eligibility() {
  const cards = [
    {
      n: "01",
      icon: "🎓",
      title: "Recognized Nursing or Technical Qualification",
      body: "Government-recognized nursing degree/diploma or technical certification relevant to the applied role.",
      bg: "bg-[var(--navy)] text-white",
      sub: "text-white/70",
    },
    {
      n: "02",
      icon: "📜",
      title: "MOH Oman License Eligibility",
      body: "Healthcare candidates must meet Ministry of Health Oman registration requirements. Ozone supports qualification verification and Prometric exam preparation where applicable.",
      bg: "bg-[var(--brand-blue-light)] text-[var(--navy)]",
      sub: "text-[var(--navy)]/70",
    },
    {
      n: "03",
      icon: "🗣️",
      title: "English Proficiency",
      body: "Functional spoken and written English for clinical or technical communication in a multinational environment.",
      bg: "bg-white text-[var(--navy)] border border-black/10",
      sub: "text-[var(--navy)]/70",
    },
    {
      n: "04",
      icon: "⏱️",
      title: "Relevant Experience",
      body: "Minimum 1–2 years for most roles; some structured entry-level positions with training support available.",
      bg: "bg-[var(--secondary)] text-[var(--navy)]",
      sub: "text-[var(--navy)]/70",
    },
  ];
  return (
    <section className="relative py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--navy)]">
            What It Takes to Qualify.
          </h2>
          <p className="mt-4 text-[var(--navy)]/70 text-lg">
            General requirements for healthcare and technical roles in Oman. Exact criteria vary by
            role and employer.
          </p>
          <a href="#" className="mt-3 inline-block text-[var(--brand-blue)] font-semibold">
            Not sure if you qualify? Get a free eligibility check →
          </a>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c) => (
            <div key={c.n} className={`rounded-[24px] p-7 ${c.bg}`}>
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl">{c.icon}</span>
                <span className="font-display font-bold text-lg opacity-60">{c.n}</span>
              </div>
              <h3 className="font-display font-bold text-xl leading-snug">{c.title}</h3>
              <p className={`mt-3 text-sm leading-relaxed ${c.sub}`}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
function Process() {
  const steps = [
    [
      "01",
      "Apply",
      "Submit your application or browse current Oman openings.",
      "Free · No format needed",
    ],
    [
      "02",
      "Document & License Verification",
      "Our team verifies qualifications and MOH Oman eligibility.",
      "48hr · Pre-screened",
    ],
    [
      "03",
      "Visa & Documentation",
      "We manage the employment visa, attestation, and embassy paperwork.",
      "Weeks 2–5 · Fully handled",
    ],
    [
      "04",
      "Relocation & Boarding",
      "Pre-departure briefing, travel coordination, and first-week check-in.",
      "Week 6–8 · Full support",
    ],
  ];
  return (
    <section
      id="process"
      className="relative py-24 md:py-32 bg-[var(--brand-blue-light)] overflow-hidden"
    >
      <DotGrid className="absolute top-8 right-8 w-32 h-32 text-[var(--brand-blue)]/20" />
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="max-w-3xl">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--navy)]">
            How the Process Works, Step by Step.
          </h2>
          <p className="mt-4 text-[var(--navy)]/70 text-lg">
            Most candidates complete the full process — from application to boarding — within 6 to 8
            weeks.
          </p>
        </div>

        <div className="mt-16 relative">
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 220"
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-40 text-[var(--brand-blue)]/25"
            fill="none"
          >
            <path
              d="M0 130 C 200 20, 400 220, 600 110 S 1000 20, 1200 130"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
          </svg>
          <div className="relative grid md:grid-cols-4 gap-6">
            {steps.map(([n, t, d, m], i) => (
              <div
                key={n}
                className={`bg-white rounded-2xl p-6 shadow-md border border-black/5 ${
                  i % 2 === 0 ? "md:mt-0" : "md:mt-16"
                }`}
              >
                <div className="h-10 w-10 rounded-xl bg-[var(--navy)] text-white grid place-items-center font-bold text-sm">
                  {n}
                </div>
                <h3 className="mt-4 font-display font-bold text-lg text-[var(--navy)]">{t}</h3>
                <p className="mt-2 text-sm text-[var(--navy)]/70">{d}</p>
                <div className="mt-4 text-xs font-semibold text-[var(--brand-blue)]">{m}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Roles ---------- */
function Roles() {
  const [filter, setFilter] = useState<"All" | "Healthcare" | "Technical">("All");
  const roles = [
    {
      cat: "Healthcare",
      city: "Muscat",
      title: "Staff Nurse",
      org: "Royal Hospital Network",
      tags: "Full-time / 2+ yrs / MOH Oman required",
      pay: "OMR 450–600/month",
    },
    {
      cat: "Technical",
      city: "Sohar",
      title: "Mechanical Technician",
      org: "Industrial Engineering Group",
      tags: "Full-time / ITI or Diploma / 3+ yrs",
      pay: "OMR 350–500/month",
    },
    {
      cat: "Healthcare",
      city: "Muscat",
      title: "Pharmacy Technician",
      org: "Private Hospital Group",
      tags: "Full-time / B.Pharm / MOH eligible",
      pay: "OMR 400–550/month",
    },
    {
      cat: "Healthcare",
      city: "Salalah",
      title: "General Nurse",
      org: "Government Hospital",
      tags: "Full-time / BSc Nursing / MOH required",
      pay: "OMR 430–580/month",
    },
  ];
  const shown = filter === "All" ? roles : roles.filter((r) => r.cat === filter);
  return (
    <section id="roles" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <WaveBlob className="absolute -bottom-16 -left-24 w-96 h-96 text-[var(--brand-blue-light)]" />
      <DotGrid className="absolute top-8 right-8 w-32 h-32 text-[var(--gold)]/30" />
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="max-w-3xl">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--navy)]">
            Current Openings in Oman.
          </h2>
          <p className="mt-4 text-[var(--navy)]/70 text-lg">
            A sample of roles currently open with our Oman employer partners.
          </p>
        </div>
        <div className="mt-8 inline-flex rounded-full bg-[var(--secondary)] p-1">
          {(["All", "Healthcare", "Technical"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition ${
                filter === f
                  ? "bg-[var(--navy)] text-white"
                  : "text-[var(--navy)]/70 hover:text-[var(--navy)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {shown.map((r) => (
            <article
              key={r.title + r.city}
              className="group rounded-[24px] border border-black/10 p-7 hover:border-[var(--brand-blue)] hover:shadow-xl hover:-translate-y-0.5 transition bg-white"
            >
              <div className="flex items-center justify-between text-xs">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 font-semibold ${
                    r.cat === "Healthcare"
                      ? "bg-[var(--brand-blue-light)] text-[var(--brand-blue)]"
                      : "bg-[var(--gold)]/15 text-[var(--gold)]"
                  }`}
                >
                  {r.cat}
                </span>
                <span className="text-[var(--navy)]/60">📍 {r.city}</span>
              </div>
              <h3 className="mt-4 font-display font-bold text-2xl text-[var(--navy)]">{r.title}</h3>
              <div className="mt-1 text-sm text-[var(--navy)]/70">{r.org}</div>
              <div className="mt-4 text-xs text-[var(--navy)]/60">{r.tags}</div>
              <div className="mt-5 flex items-end justify-between">
                <div className="font-display font-bold text-lg text-[var(--navy)]">{r.pay}</div>
                <a href="#" className="text-sm font-semibold text-[var(--brand-blue)]">
                  View Role →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#" className="text-[var(--brand-blue)] font-semibold">
            See All Oman Roles →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Track Record ---------- */
function TrackRecord() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--navy)]">
            A Track Record Built in Oman.
          </h2>
          <p className="mt-4 text-[var(--navy)]/70 text-lg">
            Since 2009, Ozone has placed 48 healthcare and technical professionals into roles across
            Muscat, Sohar, and Salalah.
          </p>
        </div>
        <div className="mt-14 grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1 rounded-[24px] p-8 bg-[var(--brand-blue-light)]">
            <div className="font-display font-extrabold text-6xl text-[var(--navy)]">48</div>
            <div className="mt-3 text-sm text-[var(--navy)]/70">Placed Since 2009</div>
          </div>
          <div className="md:col-span-2 rounded-[24px] p-8 bg-[var(--navy)] text-white">
            <div className="font-display font-extrabold text-7xl">12+</div>
            <div className="mt-3 font-display font-bold text-lg">Employer Partners</div>
            <p className="mt-2 text-sm text-white/70 max-w-md">
              Active partnerships with hospitals and technical firms across Muscat, Sohar, and
              Salalah.
            </p>
          </div>
          <div className="md:col-span-1 rounded-[24px] p-8 bg-white border border-black/10">
            <div className="font-display font-extrabold text-6xl text-[var(--navy)]">100%</div>
            <div className="mt-3 text-sm text-[var(--navy)]/70">MOH-Compliant Placements</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    {
      q: "Do I need an MOH Oman license before applying?",
      a: "Not before applying. For healthcare roles, MOH Oman registration is required before joining; our team guides you through document verification and Prometric exam preparation where applicable.",
    },
    {
      q: "What is the typical salary range for nursing roles in Oman?",
      a: "Staff nurse salaries typically range from OMR 430–600 per month depending on employer, experience, and specialization. Accommodation, transport, and end-of-service benefits are commonly included.",
    },
    {
      q: "How long does the visa process take for Oman?",
      a: "Most candidates complete the full process — from application to boarding — within 6 to 8 weeks, subject to document readiness and employer scheduling.",
    },
    {
      q: "Is accommodation provided for placements in Oman?",
      a: "Most employer partners in Oman provide shared or single accommodation, transport to work, and annual leave with paid return airfare. Exact terms are confirmed in your offer letter.",
    },
    {
      q: "Does Ozone charge candidates any fee for Oman placements?",
      a: "Ozone operates as an MEA-licensed recruiter with transparent, government-regulated service fees only. There are no hidden charges; all costs are disclosed upfront before you sign.",
    },
  ];
  return (
    <section id="faq" className="py-24 md:py-32 bg-[var(--brand-blue-light)]">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--navy)] text-center">
          Frequently Asked Questions About Working in Oman.
        </h2>
        <div className="mt-14 space-y-3">
          {items.map((it, i) => (
            <div key={i} className="bg-white rounded-2xl border border-black/5 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between text-left p-6 gap-4"
              >
                <span className="font-display font-bold text-[var(--navy)] text-lg">{it.q}</span>
                <span
                  className={`h-8 w-8 rounded-full bg-[var(--brand-blue-light)] text-[var(--brand-blue)] grid place-items-center font-bold transition ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-[var(--navy)]/75 leading-relaxed">{it.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <section className="relative bg-white">
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-16 text-[var(--brand-blue-light)]"
      >
        <path d="M0 120 C 360 0 1080 0 1440 120 L 1440 120 L 0 120 Z" fill="currentColor" />
      </svg>
      <div className="bg-[var(--brand-blue-light)]">
        <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--navy)] leading-tight">
              Ready to Start Your Oman Journey?
            </h2>
            <p className="mt-4 text-[var(--navy)]/70 text-lg max-w-lg">
              Browse verified live roles or speak directly with our team on WhatsApp. Most
              candidates hear back within 48 hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#roles"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--navy)] text-white px-6 py-3.5 text-sm font-semibold hover:bg-[var(--brand-blue)] transition"
              >
                Browse Open Roles →
              </a>
              <a
                href="https://wa.me/"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--brand-blue)] text-[var(--brand-blue)] px-6 py-3.5 text-sm font-semibold hover:bg-[var(--brand-blue)] hover:text-white transition"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-black/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-sm font-bold text-[var(--navy)]">
                  Live Roles Today — 16 Open Positions
                </span>
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  ["Staff Nurse", "Muscat", "OMR 450–600/mo"],
                  ["Mechanical Tech.", "Sohar", "OMR 350–500/mo"],
                  ["Pharmacy Tech.", "Muscat", "OMR 400–550/mo"],
                ].map(([r, c, s]) => (
                  <li
                    key={r}
                    className="flex items-center justify-between border-b border-black/5 pb-2 last:border-0"
                  >
                    <span className="font-semibold text-[var(--navy)]">{r}</span>
                    <span className="text-[var(--navy)]/60">{c}</span>
                    <span className="text-[var(--brand-blue)] font-semibold">{s}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#roles"
                className="mt-4 block text-sm text-[var(--brand-blue)] font-semibold"
              >
                Updated today · View all →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="bg-[var(--navy)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-white text-[var(--navy)] grid place-items-center font-bold">
              O
            </div>
            <span className="font-display font-bold">Ozone Overseas</span>
          </div>
          <p className="mt-4 text-sm text-white/60 leading-relaxed">
            MEA-licensed international recruitment. Healthcare and technical placements across the
            GCC since 2009.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 font-semibold">
            Countries
          </div>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>Saudi Arabia</li>
            <li>UAE</li>
            <li className="text-[var(--gold)]">Oman</li>
            <li>Qatar</li>
            <li>Kuwait</li>
            <li>Bahrain</li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 font-semibold">
            Company
          </div>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>About</li>
            <li>Process</li>
            <li>Live Roles</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 font-semibold">
            Contact
          </div>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>hello@ozoneoverseas.com</li>
            <li>+91 00000 00000</li>
            <li>Mumbai, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-white/50 flex flex-wrap justify-between gap-3">
          <span>© {new Date().getFullYear()} Ozone Overseas. MEA License No. XXXXX.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}

function OmanPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--navy)]">
      <Header />
      <Hero />
      <StatsBand />
      <About />
      <Eligibility />
      <Process />
      <Roles />
      <TrackRecord />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
