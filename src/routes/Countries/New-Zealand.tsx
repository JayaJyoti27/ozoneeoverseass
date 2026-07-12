import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import nzAbout from "@/assets/nz-about.jpg";
import nzCities from "@/assets/nz-cities.jpg";
import { Header } from "@/components/site/Header";
export const Route = createFileRoute("/Countries/New-Zealand")({
  head: () => ({
    meta: [
      { title: "Recruitment to New Zealand — Ozone Overseas | NZNC Registered Pathways" },
      {
        name: "description",
        content:
          "Placing nurses, allied health, and skilled trades from India into verified roles across Auckland, Wellington, Christchurch, and Hamilton. Nursing Council of New Zealand aligned, since 2009.",
      },
      { property: "og:title", content: "Recruitment to New Zealand — Ozone Overseas" },
      {
        property: "og:description",
        content:
          "Healthcare and skilled recruitment for the New Zealand market. NCNZ-aligned placements since 2009.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewZealandPage,
});

/* ---------- Decorative helpers ---------- */
function WavyLines({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <path
          key={i}
          d={`M0 ${30 + i * 25} Q 50 ${10 + i * 25} 100 ${30 + i * 25} T 200 ${30 + i * 25}`}
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
        />
      ))}
    </svg>
  );
}
function KoruBlob({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        fill="currentColor"
        d="M320 60c60 50 60 140 10 210s-150 90-220 40S30 150 80 80s180-70 240-20z"
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

/* ---------- Hero (split: image left, content panel right) ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-blue-light)]">
      <WavyLines className="absolute top-10 right-10 w-56 h-56 text-[var(--brand-blue)]/15" />
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-24 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <nav className="text-xs text-[var(--navy)]/60 mb-6">
            <Link to="/" className="hover:text-[var(--navy)]">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Countries</span>
            <span className="mx-2">/</span>
            <span className="text-[var(--navy)]">New Zealand</span>
          </nav>
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-black/10 text-[var(--navy)] px-4 py-1.5 text-xs font-semibold shadow-sm">
            🇳🇿 Healthcare & Skilled Migration
          </span>
          <h1 className="mt-6 font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-[var(--navy)]">
            Recruitment to
            <br />
            <span className="text-[var(--brand-blue)]">Aotearoa</span>{" "}
            <span className="text-[var(--gold)]">New Zealand.</span>
          </h1>
          <p className="mt-6 text-lg text-[var(--navy)]/75 max-w-xl leading-relaxed">
            Placing nurses, allied health professionals, and skilled trades from India into verified
            roles across Auckland, Wellington, Christchurch, and Hamilton — Nursing Council of New
            Zealand aligned pathways, since 2009.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#roles"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--navy)] text-white px-6 py-3.5 text-sm font-bold hover:bg-[var(--brand-blue)] transition"
            >
              View Open Roles ↓
            </a>
            <a
              href="https://wa.me/"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--navy)]/20 text-[var(--navy)] px-6 py-3.5 text-sm font-semibold hover:bg-[var(--navy)] hover:text-white transition"
            >
              Talk to Our Team
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2 relative">
          <div className="relative rounded-[32px] overflow-hidden shadow-2xl">
            <img
              src={nzCities}
              alt="Auckland harbour and Sky Tower at sunset"
              width={1400}
              height={1600}
              className="w-full h-[520px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--navy)]/40 via-transparent to-transparent" />
          </div>
          {/* Floating compliance chip */}
          <div className="absolute -bottom-6 -left-4 md:left-8 bg-white rounded-2xl shadow-2xl border border-black/5 px-4 py-3 flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-[var(--gold)] text-white grid place-items-center text-xs">
              ✓
            </span>
            <div className="text-xs font-semibold text-[var(--navy)]">
              🇳🇿 NCNZ-Aligned
              <div className="text-[10px] text-[var(--navy)]/60 font-normal">
                Registered Nurse Pathway
              </div>
            </div>
          </div>
          <div className="absolute -top-4 right-6 bg-[var(--gold)] rounded-2xl shadow-xl px-4 py-3 hidden md:flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--navy)]" />
            <span className="text-xs font-bold text-[var(--navy)]">Since 2009 · MEA Licensed</span>
          </div>
        </div>
      </div>

      {/* Stat rail */}
      <div className="relative -mt-10 pb-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl bg-white shadow-2xl border border-black/5 grid grid-cols-2 md:grid-cols-4 divide-x divide-black/5">
            {[
              ["96", "Placed in NZ"],
              ["29", "Open Roles"],
              ["18+", "Employer Partners"],
              ["10–14 wk", "Avg. Process"],
            ].map(([n, l]) => (
              <div key={l} className="p-6 text-center">
                <div className="font-display font-extrabold text-3xl md:text-4xl text-[var(--navy)]">
                  {n}
                </div>
                <div className="text-xs text-[var(--navy)]/60 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden">
      <KoruBlob className="absolute -top-24 -left-24 w-96 h-96 text-[var(--brand-blue-light)]" />
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-14 items-center relative">
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-[28px] overflow-hidden shadow-2xl">
            <img
              src={nzAbout}
              alt="Nursing team at an Auckland hospital ward"
              loading="lazy"
              width={1200}
              height={1400}
              className="w-full h-[460px] object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -right-6 w-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden md:block">
            <img
              src={nzCities}
              alt="Wellington harbour"
              loading="lazy"
              width={1400}
              height={900}
              className="w-full h-40 object-cover"
            />
          </div>
          <div className="absolute -top-5 left-6 bg-[var(--gold)] rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--navy)]" />
            <span className="text-xs font-bold text-[var(--navy)]">
              Active Since 2009 · MEA Licensed
            </span>
          </div>
        </div>

        <div className="lg:col-span-6">
          <span className="inline-block text-xs font-bold tracking-widest text-[var(--brand-blue)] uppercase mb-4">
            New Zealand Context
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--navy)] leading-tight">
            Filling Critical Skills Gaps Across Te Whatu Ora and Aged Residential Care.
          </h2>
          <div className="mt-6 space-y-4 text-[var(--navy)]/75 leading-relaxed">
            <p>
              New Zealand's Green List and Straight to Residence pathways continue to prioritise
              Registered Nurses, midwives, allied health, and skilled trades — with sustained
              shortages across Te Whatu Ora (Health New Zealand) districts, private hospitals, and
              aged residential care providers.
            </p>
            <p>
              The Nursing Council of New Zealand (NCNZ) governs registration for internationally
              qualified nurses through the Competence Assessment Programme (CAP). Ozone supports
              candidates through documentation, English testing (IELTS/OET), CAP placement, and
              Immigration New Zealand visa lodgement.
            </p>
            <p>
              Since 2009, we have placed talent into public DHB successor services, private hospital
              groups, and aged residential care providers across Auckland, Wellington, Christchurch,
              and Hamilton.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-[var(--secondary)] p-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            {[
              ["Capital", "Wellington"],
              ["Primary Hiring Cities", "Auckland · Wellington · Christchurch · Hamilton"],
              ["Key Regulator", "NCNZ / Te Whatu Ora"],
              ["Avg. Process", "10–14 weeks"],
              ["Currency", "New Zealand Dollar (NZD)"],
              ["Working Hours", "40 hrs/week typical"],
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
  const items = [
    {
      n: "01",
      title: "Bachelor's Degree or Equivalent Qualification",
      body: "Government-recognised BSc Nursing (or trade certification equivalent to NZQF Level 4+). Assessed by NCNZ or the relevant assessing authority for your occupation.",
    },
    {
      n: "02",
      title: "NCNZ Registration via CAP",
      body: "Internationally Qualified Nurses proceed via the Competence Assessment Programme (CAP) at an approved NZ provider. We handle documentation, verification, and CAP placement end-to-end.",
    },
    {
      n: "03",
      title: "English Language Proficiency",
      body: "IELTS Academic 7.0 in each band, or OET grade B in each sub-test. We coordinate coaching partners with pre-negotiated candidate rates.",
    },
    {
      n: "04",
      title: "Post-Registration Clinical Experience",
      body: "Typically 2+ years post-registration for RN roles under the Green List; aged-care and skilled trade roles have separate experience bands. Skills assessment before Accredited Employer Work Visa lodgement.",
    },
  ];
  return (
    <section className="relative py-24 md:py-32 bg-[var(--brand-blue-light)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-bold tracking-widest text-[var(--brand-blue)] uppercase mb-4">
            Eligibility
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--navy)]">
            What It Takes to Qualify for New Zealand.
          </h2>
          <p className="mt-4 text-[var(--navy)]/70 text-lg">
            General requirements for NCNZ-registered and Green List skilled pathways. Exact criteria
            vary by occupation and visa category (AEWV, Straight to Residence, or SMC).
          </p>
          <a href="#" className="mt-3 inline-block text-[var(--brand-blue)] font-semibold">
            Not sure if you qualify? Get a free eligibility check →
          </a>
        </div>

        <div className="mt-14 space-y-4">
          {items.map((it, i) => (
            <div
              key={it.n}
              className={`group relative rounded-[24px] bg-white border border-black/5 p-8 md:p-10 grid md:grid-cols-12 gap-6 items-start hover:shadow-xl transition ${
                i % 2 === 1 ? "md:pl-24" : "md:pr-24"
              }`}
            >
              <div className="md:col-span-2 flex items-center gap-3">
                <div className="h-14 w-14 rounded-2xl bg-[var(--navy)] text-white grid place-items-center font-display font-bold text-lg">
                  {it.n}
                </div>
                <div className="h-px flex-1 bg-[var(--gold)]/40 md:hidden" />
              </div>
              <div className="md:col-span-10">
                <h3 className="font-display font-bold text-2xl text-[var(--navy)] leading-tight">
                  {it.title}
                </h3>
                <p className="mt-3 text-[var(--navy)]/70 leading-relaxed max-w-3xl">{it.body}</p>
              </div>
              <div className="absolute right-6 top-6 text-[var(--gold)] opacity-0 group-hover:opacity-100 transition font-bold">
                →
              </div>
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
      "Apply & Skills Snapshot",
      "Submit your CV or browse current NZ openings. We map your qualifications to the Green List and Immigration NZ Occupation lists.",
      "Free · 24hr response",
    ],
    [
      "02",
      "NCNZ / CAP Assessment",
      "We prepare the NCNZ documentation, book a CAP place at an approved provider, and coordinate IELTS/OET coaching.",
      "Weeks 2–8 · Fully guided",
    ],
    [
      "03",
      "Employer Accreditation & AEWV",
      "Direct introductions to Accredited Employers, Job Check verification, and AEWV or Straight to Residence lodgement with our licensed adviser partners.",
      "Weeks 6–12 · LIA-registered",
    ],
    [
      "04",
      "Relocation & First 90 Days",
      "Pre-departure briefing, arrival support, accommodation help, IRD & bank setup guidance, and 90-day post-arrival check-ins.",
      "Week 10–14 · Full support",
    ],
  ];
  return (
    <section id="process" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <DotGrid className="absolute top-8 right-8 w-32 h-32 text-[var(--brand-blue)]/20" />
      <div className="mx-auto max-w-6xl px-6 relative">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-bold tracking-widest text-[var(--brand-blue)] uppercase mb-4">
            Process
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--navy)]">
            From Application to Aotearoa Arrival.
          </h2>
          <p className="mt-4 text-[var(--navy)]/70 text-lg">
            Most candidates complete the full process — from application to boarding — within 10 to
            14 weeks, subject to NCNZ CAP scheduling and Immigration NZ processing.
          </p>
        </div>

        <div className="mt-16 relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--brand-blue)]/40 to-transparent" />
          <div className="space-y-12">
            {steps.map(([n, t, d, m], i) => (
              <div key={n} className="relative grid md:grid-cols-2 gap-8 items-center">
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-[var(--gold)] ring-4 ring-white z-10" />
                <div className={i % 2 === 0 ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"}>
                  <div className="pl-12 md:pl-0">
                    <div
                      className={`inline-flex items-center gap-3 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                    >
                      <span className="font-display font-extrabold text-4xl text-[var(--brand-blue)]">
                        {n}
                      </span>
                      <div className="h-px w-10 bg-[var(--gold)]" />
                    </div>
                    <h3 className="mt-3 font-display font-bold text-2xl text-[var(--navy)]">{t}</h3>
                    <p className="mt-2 text-[var(--navy)]/70 leading-relaxed">{d}</p>
                    <div className="mt-3 text-xs font-semibold text-[var(--brand-blue)]">{m}</div>
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

/* ---------- Roles ---------- */
function Roles() {
  const [filter, setFilter] = useState<"All" | "Healthcare" | "Aged Care" | "Skilled Trades">(
    "All",
  );
  const roles = [
    {
      cat: "Healthcare",
      city: "Auckland",
      title: "Registered Nurse — Acute Medical",
      org: "Te Whatu Ora — Auckland Metro",
      tags: "Full-time / 2+ yrs / NCNZ required / AEWV or SRV",
      pay: "NZD 75,000 – 92,000 / yr",
    },
    {
      cat: "Aged Care",
      city: "Wellington",
      title: "Registered Nurse — Aged Residential Care",
      org: "National Aged-Care Provider",
      tags: "Full-time / 1+ yr / NCNZ required / AEWV (Green List)",
      pay: "NZD 72,000 – 85,000 / yr",
    },
    {
      cat: "Healthcare",
      city: "Christchurch",
      title: "Registered Midwife",
      org: "Te Whatu Ora — Waitaha Canterbury",
      tags: "Full-time / 2+ yrs post-registration / NCNZ + Midwifery",
      pay: "NZD 80,000 – 95,000 / yr",
    },
    {
      cat: "Skilled Trades",
      city: "Hamilton",
      title: "Diesel Mechanic — Heavy Vehicle",
      org: "Waikato Transport Group",
      tags: "Full-time / NZQF L4+ / 3+ yrs / AEWV",
      pay: "NZD 78,000 – 95,000 / yr",
    },
    {
      cat: "Healthcare",
      city: "Auckland",
      title: "Physiotherapist",
      org: "Private Rehab Group",
      tags: "Full-time / Physiotherapy Board of NZ / Green List",
      pay: "NZD 78,000 – 96,000 / yr",
    },
    {
      cat: "Aged Care",
      city: "Tauranga",
      title: "Enrolled Nurse — Community Care",
      org: "Not-for-profit Aged Care",
      tags: "Full-time / Diploma of Enrolled Nursing / NCNZ EN",
      pay: "NZD 62,000 – 72,000 / yr",
    },
  ];
  const shown = filter === "All" ? roles : roles.filter((r) => r.cat === filter);
  return (
    <section id="roles" className="relative py-24 md:py-32 bg-[var(--secondary)] overflow-hidden">
      <KoruBlob className="absolute -bottom-16 -right-24 w-96 h-96 text-[var(--brand-blue-light)]" />
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="flex flex-wrap items-end justify-between gap-6 max-w-6xl">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-widest text-[var(--brand-blue)] uppercase mb-4">
              Live Roles
            </span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--navy)]">
              Current Openings in New Zealand.
            </h2>
            <p className="mt-4 text-[var(--navy)]/70 text-lg">
              A live sample of roles open with our NZ employer and aged residential care partners.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--navy)]/70">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            29 open · updated today
          </div>
        </div>

        <div className="mt-8 inline-flex rounded-full bg-white p-1 border border-black/5 shadow-sm flex-wrap">
          {(["All", "Healthcare", "Aged Care", "Skilled Trades"] as const).map((f) => (
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

        <div className="mt-10 space-y-4">
          {shown.map((r) => (
            <article
              key={r.title + r.city}
              className="group relative rounded-2xl bg-white border border-black/5 pl-6 pr-6 py-6 md:grid md:grid-cols-12 md:items-center gap-6 hover:shadow-xl hover:-translate-y-0.5 transition overflow-hidden"
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  r.cat === "Healthcare"
                    ? "bg-[var(--brand-blue)]"
                    : r.cat === "Aged Care"
                      ? "bg-[var(--gold)]"
                      : "bg-[var(--navy)]"
                }`}
              />
              <div className="md:col-span-6">
                <div className="flex items-center gap-3 text-xs">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 font-semibold ${
                      r.cat === "Healthcare"
                        ? "bg-[var(--brand-blue-light)] text-[var(--brand-blue)]"
                        : r.cat === "Aged Care"
                          ? "bg-[var(--gold)]/15 text-[var(--gold)]"
                          : "bg-[var(--navy)]/10 text-[var(--navy)]"
                    }`}
                  >
                    {r.cat}
                  </span>
                  <span className="text-[var(--navy)]/60">📍 {r.city}</span>
                </div>
                <h3 className="mt-3 font-display font-bold text-xl md:text-2xl text-[var(--navy)]">
                  {r.title}
                </h3>
                <div className="mt-1 text-sm text-[var(--navy)]/70">{r.org}</div>
              </div>
              <div className="md:col-span-4 mt-4 md:mt-0 text-sm text-[var(--navy)]/70">
                {r.tags}
              </div>
              <div className="md:col-span-2 mt-4 md:mt-0 md:text-right">
                <div className="font-display font-bold text-[var(--navy)]">{r.pay}</div>
                <a
                  href="#"
                  className="mt-2 inline-block text-sm font-semibold text-[var(--brand-blue)]"
                >
                  View Role →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#" className="text-[var(--brand-blue)] font-semibold">
            See All New Zealand Roles →
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
          <span className="inline-block text-xs font-bold tracking-widest text-[var(--brand-blue)] uppercase mb-4">
            Track Record
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--navy)]">
            Over a Decade of Placements Across Aotearoa.
          </h2>
          <p className="mt-4 text-[var(--navy)]/70 text-lg">
            Since 2009, Ozone has placed 96 healthcare and skilled professionals into roles across
            Auckland, Wellington, Christchurch, Hamilton, and Tauranga.
          </p>
        </div>
        <div className="mt-14 grid md:grid-cols-6 gap-6">
          <div className="md:col-span-2 rounded-[24px] p-8 bg-[var(--brand-blue-light)]">
            <div className="font-display font-extrabold text-6xl text-[var(--navy)]">96</div>
            <div className="mt-3 text-sm text-[var(--navy)]/70">Placed Since 2009</div>
          </div>
          <div className="md:col-span-3 rounded-[24px] p-8 bg-[var(--navy)] text-white relative overflow-hidden">
            <WavyLines className="absolute -right-8 -bottom-8 w-48 h-48 text-white/10" />
            <div className="font-display font-extrabold text-7xl relative">18+</div>
            <div className="mt-3 font-display font-bold text-lg relative">Employer Partners</div>
            <p className="mt-2 text-sm text-white/70 max-w-md relative">
              Te Whatu Ora districts, private hospital groups, aged residential care providers, and
              skilled trade employers across both islands.
            </p>
          </div>
          <div className="md:col-span-1 rounded-[24px] p-8 bg-[var(--gold)] text-[var(--navy)]">
            <div className="font-display font-extrabold text-5xl">100%</div>
            <div className="mt-3 text-sm">NCNZ-Aligned</div>
          </div>
          <div className="md:col-span-6 rounded-[24px] p-8 bg-[var(--secondary)] grid md:grid-cols-3 gap-6">
            {[
              ["5", "NZ regions served"],
              ["48hr", "Avg. response time"],
              ["9.5/10", "Candidate satisfaction"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display font-extrabold text-3xl text-[var(--navy)]">{n}</div>
                <div className="text-sm text-[var(--navy)]/70 mt-1">{l}</div>
              </div>
            ))}
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
      q: "Do I need NCNZ registration before applying?",
      a: "Not before applying. For nursing roles, NCNZ registration via the Competence Assessment Programme (CAP) is required before you can practise in New Zealand. Ozone guides you through documentation, verification, CAP booking, and pre-arrival preparation end-to-end.",
    },
    {
      q: "What is the typical salary for Registered Nurses in New Zealand?",
      a: "Registered Nurse base salaries typically range from NZD 72,000–95,000 per year under the Te Whatu Ora MECA depending on step, experience, and specialisation. KiwiSaver employer contribution and shift penalties add on top.",
    },
    {
      q: "Which visa category applies to my role?",
      a: "Most placements use the Accredited Employer Work Visa (AEWV) with an Accredited Employer, or the Straight to Residence Visa for Green List Tier 1 occupations (including Registered Nurses and Midwives). Skilled Migrant Category (SMC) is another route based on points. Our licensed immigration adviser partners advise on best-fit.",
    },
    {
      q: "How long does the full process take?",
      a: "Most candidates complete the full process — application, NCNZ CAP, English testing, visa, and arrival — within 10 to 14 weeks. Timing depends on CAP scheduling and Immigration NZ processing.",
    },
    {
      q: "Is relocation support included?",
      a: "Yes. Ozone provides pre-departure orientation, arrival airport pickup coordination with the employer, temporary accommodation guidance, IRD number and bank account setup help, and 90-day post-arrival check-ins with your placement consultant.",
    },
    {
      q: "Does Ozone charge candidates any fee for New Zealand placements?",
      a: "Ozone operates as an MEA-licensed recruiter with transparent, government-regulated service fees only. NCNZ, CAP, English test, and Immigration NZ visa fees are third-party and disclosed upfront before you sign.",
    },
  ];
  return (
    <section id="faq" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-4">
          <span className="inline-block text-xs font-bold tracking-widest text-[var(--brand-blue)] uppercase mb-4">
            FAQ
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--navy)] leading-tight">
            Working in New Zealand — Your Questions, Answered.
          </h2>
          <p className="mt-6 text-[var(--navy)]/70">
            Can't find your answer? Speak directly with our New Zealand desk on WhatsApp — most
            candidate queries are resolved within 24 hours.
          </p>
          <a
            href="https://wa.me/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--navy)] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[var(--brand-blue)] transition"
          >
            Chat on WhatsApp →
          </a>
        </div>
        <div className="lg:col-span-8 space-y-3">
          {items.map((it, i) => (
            <div key={i} className="bg-[var(--brand-blue-light)] rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between text-left p-6 gap-4"
              >
                <span className="font-display font-bold text-[var(--navy)] text-lg">{it.q}</span>
                <span
                  className={`h-8 w-8 rounded-full bg-white text-[var(--brand-blue)] grid place-items-center font-bold transition ${
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
    <section className="relative bg-[var(--navy)] text-white overflow-hidden">
      <WavyLines className="absolute inset-y-0 right-0 w-96 h-full text-white/5" />
      <div className="mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-2 gap-12 items-center relative">
        <div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-tight">
            Ready to Start Your <span className="text-[var(--gold)]">Aotearoa</span> Journey?
          </h2>
          <p className="mt-4 text-white/75 text-lg max-w-lg">
            Browse verified live roles or speak directly with our New Zealand desk on WhatsApp. Most
            candidates hear back within 48 hours.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#roles"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] text-[var(--navy)] px-6 py-3.5 text-sm font-bold hover:bg-white transition"
            >
              Browse Open Roles →
            </a>
            <a
              href="https://wa.me/"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 text-white px-6 py-3.5 text-sm font-semibold hover:bg-white hover:text-[var(--navy)] transition"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="bg-white text-[var(--navy)] rounded-2xl shadow-2xl border border-white/10 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm font-bold">Live Roles Today — 29 Open Positions</span>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                ["RN — Acute Medical", "Auckland", "NZD 75–92k"],
                ["RN — Aged Care", "Wellington", "NZD 72–85k"],
                ["Diesel Mechanic", "Hamilton", "NZD 78–95k"],
              ].map(([r, c, s]) => (
                <li
                  key={r}
                  className="flex items-center justify-between border-b border-black/5 pb-2 last:border-0"
                >
                  <span className="font-semibold">{r}</span>
                  <span className="text-[var(--navy)]/60">{c}</span>
                  <span className="text-[var(--brand-blue)] font-semibold">{s}</span>
                </li>
              ))}
            </ul>
            <a href="#roles" className="mt-4 block text-sm text-[var(--brand-blue)] font-semibold">
              Updated today · View all →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="bg-[#08172c] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-white text-[var(--navy)] grid place-items-center font-bold">
              O
            </div>
            <span className="font-display font-bold">Ozone Overseas</span>
          </div>
          <p className="mt-4 text-sm text-white/60 leading-relaxed">
            MEA-licensed international recruitment. Healthcare and skilled placements across the
            GCC, UK, Australia, and New Zealand since 2009.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 font-semibold">
            Countries
          </div>
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
          <span>© {new Date().getFullYear()} Ozone Overseas. All rights reserved.</span>
          <span>MEA License · ISO 9001 Certified</span>
        </div>
      </div>
    </footer>
  );
}

function NewZealandPage() {
  return (
    <div className="bg-white">
      <Header />
      <Hero />
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
