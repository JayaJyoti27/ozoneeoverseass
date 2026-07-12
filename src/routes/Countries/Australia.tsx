import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import sydneyHero from "@/assets/sydney-hero.jpg";
import australiaAbout from "@/assets/australia-about.jpg";
import australiaCities from "@/assets/australia-cities.jpg";
import { Header } from "@/components/site/Header";
export const Route = createFileRoute("/Countries/Australia")({
  head: () => ({
    meta: [
      { title: "Recruitment to Australia — Ozone Overseas | AHPRA Registered Pathways" },
      {
        name: "description",
        content:
          "Placing nurses, allied health, and skilled trades from India into verified roles across Sydney, Melbourne, Brisbane, and Perth. AHPRA-aligned, since 2009.",
      },
      { property: "og:title", content: "Recruitment to Australia — Ozone Overseas" },
      {
        property: "og:description",
        content:
          "Healthcare and skilled recruitment for the Australian market. AHPRA-aligned placements since 2009.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AustraliaPage,
});

/* ---------- Decorative helpers ---------- */
function DiagonalStripes({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {Array.from({ length: 10 }).map((_, i) => (
        <line
          key={i}
          x1={-40 + i * 24}
          y1={200}
          x2={160 + i * 24}
          y2={0}
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}
function SoftBlob({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        fill="currentColor"
        d="M310 70c50 40 60 120 30 180s-110 80-180 60-130-70-130-140S60 40 140 30s120 0 170 40z"
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

/* ---------- Hero (full-bleed image with overlay panel) ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[92vh] min-h-[640px] w-full">
        <img
          src={sydneyHero}
          alt="Sydney Opera House and Harbour Bridge at sunset"
          width={1400}
          height={1600}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy)]/90 via-[var(--navy)]/60 to-transparent" />
        <DiagonalStripes className="absolute top-8 right-8 w-40 h-40 text-white/15" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <nav className="text-xs text-white/70 mb-6">
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Countries</span>
              <span className="mx-2">/</span>
              <span className="text-white">Australia</span>
            </nav>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur border border-white/25 text-white px-4 py-1.5 text-xs font-semibold">
              🇦🇺 Healthcare & Skilled Migration
            </span>
            <h1 className="mt-6 font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
              Recruitment to
              <br />
              <span className="text-[var(--gold)]">Australia.</span>
            </h1>
            <p className="mt-6 text-lg text-white/85 max-w-xl leading-relaxed">
              Placing nurses, allied health professionals, and skilled trades from India into
              verified roles across Sydney, Melbourne, Brisbane, and Perth — AHPRA-aligned pathways,
              since 2009.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#roles"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] text-[var(--navy)] px-6 py-3.5 text-sm font-bold hover:bg-white transition"
              >
                View Open Roles ↓
              </a>
              <a
                href="https://wa.me/"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 text-white px-6 py-3.5 text-sm font-semibold hover:bg-white hover:text-[var(--navy)] transition"
              >
                Talk to Our Team
              </a>
            </div>
          </div>
        </div>

        {/* Floating compliance chip */}
        <div className="absolute top-24 right-8 hidden lg:flex bg-white rounded-2xl shadow-2xl border border-black/5 px-4 py-3 items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-[var(--gold)] text-white grid place-items-center text-xs">
            ✓
          </span>
          <div className="text-xs font-semibold text-[var(--navy)]">
            🇦🇺 AHPRA-Aligned
            <div className="text-[10px] text-[var(--navy)]/60 font-normal">
              Registered Nurse Pathway
            </div>
          </div>
        </div>
      </div>

      {/* Stat rail overlapping hero */}
      <div className="relative -mt-16 z-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl bg-white shadow-2xl border border-black/5 grid grid-cols-2 md:grid-cols-4 divide-x divide-black/5">
            {[
              ["124", "Placed in AU"],
              ["38", "Open Roles"],
              ["22+", "Employer Partners"],
              ["12–16 wk", "Avg. Process"],
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

/* ---------- About (image collage, text right) ---------- */
function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden">
      <SoftBlob className="absolute -top-24 -left-24 w-96 h-96 text-[var(--brand-blue-light)]" />
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-14 items-center relative">
        {/* Collage */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-[28px] overflow-hidden shadow-2xl">
            <img
              src={australiaAbout}
              alt="Nursing team at Sydney hospital"
              loading="lazy"
              width={1200}
              height={1400}
              className="w-full h-[460px] object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -right-6 w-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden md:block">
            <img
              src={australiaCities}
              alt="Melbourne skyline"
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

        {/* Text */}
        <div className="lg:col-span-6">
          <span className="inline-block text-xs font-bold tracking-widest text-[var(--brand-blue)] uppercase mb-4">
            Australia Context
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--navy)] leading-tight">
            Filling Skills Shortages Across the Australian Healthcare System.
          </h2>
          <div className="mt-6 space-y-4 text-[var(--navy)]/75 leading-relaxed">
            <p>
              Australia's Department of Home Affairs Skilled Occupation Lists continue to prioritise
              Registered Nurses, aged-care workers, allied health, and skilled trades — with
              sustained shortages across public hospitals and aged-care providers in New South
              Wales, Victoria, Queensland, and Western Australia.
            </p>
            <p>
              The Australian Health Practitioner Regulation Agency (AHPRA) and the Nursing and
              Midwifery Board of Australia (NMBA) govern registration for internationally qualified
              nurses via the Modified Outcomes-Based Assessment pathway. Ozone supports candidates
              through evidence submission, English test preparation (IELTS/OET), and NMBA
              orientation.
            </p>
            <p>
              Since 2009, we have placed talent into NHS-equivalent public health services, private
              hospital groups, and residential aged-care providers across Sydney, Melbourne,
              Brisbane, and Perth.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-[var(--secondary)] p-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            {[
              ["Capital", "Canberra"],
              ["Primary Hiring Cities", "Sydney · Melbourne · Brisbane · Perth"],
              ["Key Regulator", "AHPRA / NMBA"],
              ["Avg. Process", "12–16 weeks"],
              ["Currency", "Australian Dollar (AUD)"],
              ["Working Hours", "38 hrs/week typical"],
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

/* ---------- Eligibility (horizontal alternating list) ---------- */
function Eligibility() {
  const items = [
    {
      n: "01",
      title: "Bachelor's Degree or Equivalent Qualification",
      body: "Government-recognised BSc Nursing (or trade certification equivalent to AQF Level 4+). Assessed by ANMAC or the relevant assessing authority for your occupation.",
    },
    {
      n: "02",
      title: "AHPRA / NMBA Registration Pathway",
      body: "Internationally Qualified Nurses proceed via the Modified Outcomes-Based Assessment (MOBA). We handle portfolio, self-assessment, and objective structured clinical examination (OSCE) prep end-to-end.",
    },
    {
      n: "03",
      title: "English Language Proficiency",
      body: "IELTS Academic 7.0 in each band, or OET grade B in each sub-test. We coordinate coaching partners with pre-negotiated candidate rates.",
    },
    {
      n: "04",
      title: "Post-Registration Clinical Experience",
      body: "Typically 2+ years post-registration for RN roles; aged-care and skilled trade roles have separate experience bands. Skills assessment via ANMAC before visa lodgement.",
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
            What It Takes to Qualify for Australia.
          </h2>
          <p className="mt-4 text-[var(--navy)]/70 text-lg">
            General requirements for AHPRA-registered and skilled visa pathways. Exact criteria vary
            by occupation and visa subclass (482, 186, 189, or 190).
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

/* ---------- Process (vertical alternating timeline) ---------- */
function Process() {
  const steps = [
    [
      "01",
      "Apply & Skills Snapshot",
      "Submit your CV or browse current Australia openings. We map your qualifications to the Skilled Occupation List.",
      "Free · 24hr response",
    ],
    [
      "02",
      "AHPRA / ANMAC Assessment",
      "We prepare the MOBA portfolio for nurses or ANMAC skills assessment for allied roles, plus English test coaching.",
      "Weeks 2–8 · Fully guided",
    ],
    [
      "03",
      "Employer Sponsorship & Visa",
      "Direct introductions to sponsoring employers, plus 482 / 186 / 189 visa lodgement handled by our RMA partners.",
      "Weeks 6–12 · MARA-registered",
    ],
    [
      "04",
      "Relocation & First 90 Days",
      "Pre-departure briefing, arrival support, accommodation help, and 90-day post-arrival check-ins.",
      "Week 12–16 · Full support",
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
            From Application to Australian Arrival.
          </h2>
          <p className="mt-4 text-[var(--navy)]/70 text-lg">
            Most candidates complete the full process — from application to boarding — within 12 to
            16 weeks, subject to AHPRA and visa scheduling.
          </p>
        </div>

        <div className="mt-16 relative">
          {/* central rail */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--brand-blue)]/40 to-transparent" />
          <div className="space-y-12">
            {steps.map(([n, t, d, m], i) => (
              <div key={n} className="relative grid md:grid-cols-2 gap-8 items-center">
                {/* node dot */}
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

/* ---------- Roles (table-style with left accent stripe) ---------- */
function Roles() {
  const [filter, setFilter] = useState<"All" | "Healthcare" | "Aged Care" | "Skilled Trades">(
    "All",
  );
  const roles = [
    {
      cat: "Healthcare",
      city: "Sydney, NSW",
      title: "Registered Nurse — Acute Medical",
      org: "NSW Health — Public Hospital Network",
      tags: "Full-time / 2+ yrs / AHPRA required / 482 or 186 visa",
      pay: "AUD 78,000 – 95,000 / yr",
    },
    {
      cat: "Aged Care",
      city: "Melbourne, VIC",
      title: "Registered Nurse — Residential Aged Care",
      org: "National Aged-Care Provider",
      tags: "Full-time / 1+ yr / AHPRA required / 482 visa",
      pay: "AUD 75,000 – 88,000 / yr",
    },
    {
      cat: "Healthcare",
      city: "Brisbane, QLD",
      title: "Registered Midwife",
      org: "Queensland Health",
      tags: "Full-time / 2+ yrs post-registration / AHPRA + Midwifery",
      pay: "AUD 82,000 – 98,000 / yr",
    },
    {
      cat: "Skilled Trades",
      city: "Perth, WA",
      title: "Electrical Fitter — Mining Services",
      org: "WA Resources Group",
      tags: "FIFO / AQF Cert III+ / 3+ yrs / 482 visa",
      pay: "AUD 110,000 – 140,000 / yr",
    },
    {
      cat: "Healthcare",
      city: "Sydney, NSW",
      title: "Physiotherapist",
      org: "Private Rehab Group",
      tags: "Full-time / AHPRA Physio Board / 189 or 190",
      pay: "AUD 80,000 – 100,000 / yr",
    },
    {
      cat: "Aged Care",
      city: "Adelaide, SA",
      title: "Enrolled Nurse — Community Care",
      org: "Not-for-profit Aged Care",
      tags: "Full-time / Diploma of Nursing / AHPRA EN",
      pay: "AUD 68,000 – 78,000 / yr",
    },
  ];
  const shown = filter === "All" ? roles : roles.filter((r) => r.cat === filter);
  return (
    <section id="roles" className="relative py-24 md:py-32 bg-[var(--secondary)] overflow-hidden">
      <SoftBlob className="absolute -bottom-16 -right-24 w-96 h-96 text-[var(--brand-blue-light)]" />
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="flex flex-wrap items-end justify-between gap-6 max-w-6xl">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-widest text-[var(--brand-blue)] uppercase mb-4">
              Live Roles
            </span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--navy)]">
              Current Openings in Australia.
            </h2>
            <p className="mt-4 text-[var(--navy)]/70 text-lg">
              A live sample of roles open with our Australian employer and aged-care partners.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--navy)]/70">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            38 open · updated today
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
            See All Australia Roles →
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
            A Decade of Placements Across Australia.
          </h2>
          <p className="mt-4 text-[var(--navy)]/70 text-lg">
            Since 2009, Ozone has placed 124 healthcare and skilled professionals into roles across
            Sydney, Melbourne, Brisbane, Perth, and Adelaide.
          </p>
        </div>
        <div className="mt-14 grid md:grid-cols-6 gap-6">
          <div className="md:col-span-2 rounded-[24px] p-8 bg-[var(--brand-blue-light)]">
            <div className="font-display font-extrabold text-6xl text-[var(--navy)]">124</div>
            <div className="mt-3 text-sm text-[var(--navy)]/70">Placed Since 2009</div>
          </div>
          <div className="md:col-span-3 rounded-[24px] p-8 bg-[var(--navy)] text-white relative overflow-hidden">
            <DiagonalStripes className="absolute -right-8 -bottom-8 w-48 h-48 text-white/10" />
            <div className="font-display font-extrabold text-7xl relative">22+</div>
            <div className="mt-3 font-display font-bold text-lg relative">Employer Partners</div>
            <p className="mt-2 text-sm text-white/70 max-w-md relative">
              Public hospital networks, private hospital groups, aged-care providers, and skilled
              trade employers across five states.
            </p>
          </div>
          <div className="md:col-span-1 rounded-[24px] p-8 bg-[var(--gold)] text-[var(--navy)]">
            <div className="font-display font-extrabold text-5xl">100%</div>
            <div className="mt-3 text-sm">AHPRA-Aligned</div>
          </div>
          <div className="md:col-span-6 rounded-[24px] p-8 bg-[var(--secondary)] grid md:grid-cols-3 gap-6">
            {[
              ["5", "Australian states served"],
              ["48hr", "Avg. response time"],
              ["9.4/10", "Candidate satisfaction"],
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

/* ---------- FAQ (two-column) ---------- */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    {
      q: "Do I need AHPRA registration before applying?",
      a: "Not before applying. For nursing roles, AHPRA registration via the Modified Outcomes-Based Assessment (MOBA) is required before you can practise in Australia. Ozone guides you through portfolio, self-assessment, and OSCE preparation end-to-end.",
    },
    {
      q: "What is the typical salary for Registered Nurses in Australia?",
      a: "Registered Nurse base salaries typically range from AUD 75,000–95,000 per year depending on state award, experience, and specialisation. Public health awards, penalty rates, and superannuation (11.5%) add materially on top.",
    },
    {
      q: "Which visa subclass applies to my role?",
      a: "Most placements use the Temporary Skill Shortage visa (subclass 482) with employer sponsorship, or the permanent Employer Nomination Scheme (subclass 186). Independent skilled migration uses 189 or 190 subject to points and state nomination. Our MARA-registered partners advise on best-fit.",
    },
    {
      q: "How long does the full process take?",
      a: "Most candidates complete the full process — application, AHPRA/ANMAC assessment, English testing, visa, and arrival — within 12 to 16 weeks. Timing depends on AHPRA scheduling and Home Affairs processing.",
    },
    {
      q: "Is relocation support included?",
      a: "Yes. Ozone provides pre-departure orientation, arrival airport pickup coordination with the employer, temporary accommodation guidance, and 90-day post-arrival check-ins with your placement consultant.",
    },
    {
      q: "Does Ozone charge candidates any fee for Australian placements?",
      a: "Ozone operates as an MEA-licensed recruiter with transparent, government-regulated service fees only. AHPRA, ANMAC, English test, and visa lodgement costs are third-party and disclosed upfront before you sign.",
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
            Working in Australia — Your Questions, Answered.
          </h2>
          <p className="mt-6 text-[var(--navy)]/70">
            Can't find your answer? Speak directly with our Australia desk on WhatsApp — most
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
      <DiagonalStripes className="absolute inset-y-0 right-0 w-96 h-full text-white/5" />
      <div className="mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-2 gap-12 items-center relative">
        <div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-tight">
            Ready to Start Your <span className="text-[var(--gold)]">Australian</span> Journey?
          </h2>
          <p className="mt-4 text-white/75 text-lg max-w-lg">
            Browse verified live roles or speak directly with our Australia desk on WhatsApp. Most
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
              <span className="text-sm font-bold">Live Roles Today — 38 Open Positions</span>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                ["RN — Acute Medical", "Sydney", "AUD 78–95k"],
                ["RN — Aged Care", "Melbourne", "AUD 75–88k"],
                ["Electrical Fitter", "Perth", "AUD 110–140k"],
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
            GCC, UK, and Australia since 2009.
          </p>
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

function AustraliaPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--blue)]">
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
