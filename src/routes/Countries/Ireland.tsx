import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/ireland-hero.jpg";
import glanceImg from "@/assets/ireland-glance.jpg";
import priyaImg from "@/assets/priya.jpg";
import { Header } from "@/components/site/Header";
export const Route = createFileRoute("/Countries/Ireland")({
  head: () => ({
    meta: [
      { title: "Nursing Jobs in Ireland (NMBI) — Ozone Overseas" },
      {
        name: "description",
        content:
          "Ireland is hiring internationally trained nurses. NMBI-licensed pathway, English-speaking, EU base. Browse 31 open roles and start in 8–10 weeks with Ozone Overseas.",
      },
      { property: "og:title", content: "Nursing Jobs in Ireland (NMBI) — Ozone Overseas" },
      {
        property: "og:description",
        content:
          "English-speaking, EU-based healthcare market. NMBI pathway fully managed by Ozone Overseas.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: IrelandPage,
});

/* ---------------- Shared bits ---------------- */



function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10">O</span>
            Ozone Overseas
          </div>
          <p className="mt-4 max-w-xs text-sm">
            International healthcare recruitment, since 2018. One coordinator. One process.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-white">Countries</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Ireland</li>
            <li>Saudi Arabia</li>
            <li>UAE</li>
            <li>Qatar</li>
            <li>Kuwait</li>
            <li>Malaysia</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-white">Company</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>About</li>
            <li>Employer Partners</li>
            <li>Track Record</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>hello@ozoneoverseas.com</li>
            <li>+91 000 000 0000</li>
            <li>WhatsApp us</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-white/50 md:flex-row">
          <p>© 2026 Ozone Overseas. All rights reserved.</p>
          <p>Registered recruitment partner · No fees from candidates.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Decorative SVGs ---------------- */

function WaveBlob({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden>
      <defs>
        <linearGradient id="wb" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="oklch(0.44 0.14 258)" stopOpacity="0.18" />
          <stop offset="1" stopColor="oklch(0.76 0.11 82)" stopOpacity="0.10" />
        </linearGradient>
      </defs>
      <path
        fill="url(#wb)"
        d="M320 60c40 40 55 105 30 160s-90 100-155 100-130-30-155-95 5-160 60-190 180-15 220 25z"
      />
    </svg>
  );
}
function DotCluster({ className = "" }: { className?: string }) {
  return <div className={`dot-grid ${className}`} aria-hidden />;
}

/* ---------------- Page ---------------- */

function IrelandPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <WhyIreland />
      <StatsBand />
      <AtAGlance />
      <Eligibility />
      <Process />
      <Openings />
      <TrackRecord />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* -------- 2. Hero -------- */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background text-navy">
      {/* Blue blobs on white bg */}
      <div
        aria-hidden
        className="absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.44 0.14 258 / 0.35), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-[-140px] left-[35%] h-[380px] w-[380px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.44 0.14 258 / 0.22), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -right-24 top-1/3 h-[300px] w-[300px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.76 0.11 82 / 0.18), transparent 60%)",
        }}
      />
      <DotCluster className="absolute left-6 bottom-10 h-24 w-56 opacity-60" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
        <nav className="text-xs text-ink-soft">
          Home <span className="mx-1">/</span> Countries <span className="mx-1">/</span>
          <span className="text-navy"> Ireland</span>
        </nav>

        <div className="mt-6 grid items-start gap-12 md:grid-cols-12">
          {/* LEFT — content */}
          <div className="md:col-span-6 lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue/30 bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-blue shadow-sm">
              🇮🇪 Healthcare Recruitment · EU Destination
            </span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-navy md:text-7xl">
              Your European Career
              <br />
              Starts in <span className="text-gold">Ireland.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">
              Ireland is one of Europe's fastest-growing healthcare markets — English-speaking,
              EU-based, and actively recruiting internationally trained nurses and allied health
              professionals from India.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#roles"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy shadow-lg shadow-gold/25 transition hover:brightness-105"
              >
                View Open Roles <span aria-hidden>↓</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-navy/70 px-6 py-3 text-sm font-semibold text-navy transition hover:bg-navy hover:text-navy-foreground"
              >
                Talk to Our Team
              </a>
            </div>

            {/* Stat row */}
            <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-y-6 border-t border-border pt-8 sm:grid-cols-4">
              {[
                ["31", "Open Roles"],
                ["NMBI", "License Body"],
                ["8–10 wk", "Avg. Process"],
                ["EU", "Based Destination"],
              ].map(([v, l], i) => (
                <div key={l} className={`px-4 ${i > 0 ? "sm:border-l sm:border-border" : ""}`}>
                  <dt className="font-display text-2xl font-bold text-navy">
                    {v === "NMBI" || v === "EU" ? <span className="text-gold">{v}</span> : v}
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-ink-soft">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* RIGHT — blue bento */}
          <div className="md:col-span-6 lg:col-span-5">
            <div className="grid grid-cols-6 gap-3 md:gap-4">
              {/* Big blue: hero photo tile */}
              <div className="relative col-span-6 overflow-hidden rounded-3xl bg-blue text-blue-foreground shadow-[0_20px_60px_-24px_rgba(30,77,140,0.55)]">
                <img
                  src={heroImg}
                  alt="Dublin cityscape"
                  width={1200}
                  height={700}
                  className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue via-blue/85 to-blue/40" />
                <div className="relative flex h-[220px] flex-col justify-between p-6">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                    Live · Ireland
                  </span>
                  <div>
                    <p className="font-display text-3xl font-extrabold leading-tight">
                      Dublin · Cork · Galway
                    </p>
                    <p className="mt-1 text-sm text-white/80">
                      HSE + private hiring across four counties.
                    </p>
                  </div>
                </div>
              </div>

              {/* NMBI verified tile — navy */}
              <div className="col-span-3 rounded-3xl bg-navy p-5 text-navy-foreground shadow-lg">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold/25 text-gold">
                  ✓
                </span>
                <p className="mt-4 font-display text-base font-bold leading-snug">
                  NMBI Licensed Pathway
                </p>
                <p className="mt-1 text-xs text-white/70">
                  English-speaking · Verified employer partners
                </p>
              </div>

              {/* Gold accent stat tile */}
              <div className="col-span-3 rounded-3xl bg-gold p-5 text-navy shadow-lg">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-navy/70">
                  Avg. process
                </p>
                <p className="mt-3 font-display text-4xl font-extrabold leading-none">
                  8–10 <span className="text-lg font-bold">wk</span>
                </p>
                <p className="mt-2 text-xs text-navy/80">Application → Arrival</p>
              </div>

              {/* Live Roles wide tile */}
              <div className="col-span-6 rounded-3xl border border-blue/15 bg-white p-5 shadow-[0_10px_40px_-20px_rgba(11,31,58,0.25)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                      Live Roles Today
                    </p>
                  </div>
                  <p className="font-display text-lg font-bold text-navy">31 Open</p>
                </div>
                <ul className="mt-3 divide-y divide-border text-sm">
                  {[
                    ["Staff Nurse", "Dublin", "€35–42k/yr"],
                    ["ICU Nurse", "Cork", "€38–46k/yr"],
                    ["Theatre Nurse", "Galway", "€36–44k/yr"],
                  ].map(([role, city, pay]) => (
                    <li key={role} className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-navy">{role}</p>
                        <p className="text-xs text-ink-soft">{city}</p>
                      </div>
                      <span className="text-xs font-semibold text-blue">{pay}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-ink-soft">
                  Updated today ·{" "}
                  <a href="#roles" className="font-semibold text-blue hover:underline">
                    View all →
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- 3. Why Ireland -------- */
function WhyIreland() {
  const cards = [
    ["🗣️", "English Only", "No language exam beyond IELTS/OET."],
    ["🇪🇺", "EU Base", "Work permit opens wider European mobility."],
    ["👨‍👩‍👧", "Family Friendly", "Spouse work permit available."],
    ["✈️", "9hr Flight", "Direct from major Indian cities."],
  ] as const;

  return (
    <section className="relative curve-top -mt-8 bg-lightblue py-24">
      <DotCluster className="absolute left-8 top-16 h-24 w-40 opacity-70" />
      <WaveBlob className="absolute -bottom-10 right-0 h-72 w-72" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">Why Ireland</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-navy md:text-5xl">
            The EU's Most <span className="text-gold">Candidate-Friendly</span> Healthcare Market.
          </h2>
          <div className="mt-6 space-y-4 text-ink-soft">
            <p>
              Ireland's HSE (Health Service Executive) is in the middle of its largest hiring
              expansion in a decade — and it is looking outside Europe to fill the gap. For
              Indian-qualified nurses that translates into a shorter, clearer pathway than any other
              EU country.
            </p>
            <p>
              English is the working language across every hospital, ward and community setting,
              which removes the single biggest barrier candidates hit in Germany, France or the
              Nordics. Your CV, interview and day-one handover all happen in English.
            </p>
            <p>
              And once you're in, an Irish work permit opens the door to broader European mobility —
              alongside one of the oldest and most established Indian nurse communities in the EU.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:col-span-6">
          {cards.map(([emoji, title, body]) => (
            <div
              key={title}
              className="group rounded-2xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(11,31,58,0.04),0_8px_24px_-12px_rgba(11,31,58,0.15)] transition hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(11,31,58,0.04),0_16px_36px_-12px_rgba(11,31,58,0.22)]"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-lightblue text-2xl">
                {emoji}
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-navy">{title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- 4. Stats Band -------- */
function StatsBand() {
  const stats = [
    ["31", "Open Roles Today"],
    ["15+", "Employer Partners"],
    ["NMBI", "License Body"],
    ["EU", "Work Permit"],
  ] as const;
  return (
    <section className="curve-top curve-bottom bg-lightblue/60 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mx-auto max-w-3xl text-center font-display text-lg text-navy md:text-xl">
          Ireland placed more internationally trained nurses in 2023 than any other{" "}
          <span className="text-gold font-bold">EU destination.</span>
        </p>
        <dl className="mt-10 grid grid-cols-2 gap-y-8 md:grid-cols-4">
          {stats.map(([v, l], i) => (
            <div
              key={l}
              className={`px-6 text-center ${i > 0 ? "md:border-l md:border-blue/20" : ""}`}
            >
              <dt className="font-display text-4xl font-extrabold text-navy md:text-5xl">
                {v === "NMBI" || v === "EU" ? <span className="text-gold">{v}</span> : v}
              </dt>
              <dd className="mt-2 text-xs font-semibold uppercase tracking-wider text-ink-soft">
                {l}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* -------- 5. At A Glance -------- */
function AtAGlance() {
  return (
    <section className="relative bg-background py-24">
      <WaveBlob className="absolute bottom-0 right-0 h-96 w-96 -z-0" />
      <div className="relative mx-auto max-w-7xl px-6">
        <GlanceCard />
      </div>
    </section>
  );
}

function GlanceCard({ compact = false }: { compact?: boolean }) {
  const rows: [string, string][] = [
    ["Capital", "Dublin"],
    ["Primary Hiring Cities", "Dublin · Cork · Galway · Limerick"],
    ["Key License", "NMBI (Nursing and Midwifery Board of Ireland)"],
    ["Avg. Process", "8–10 weeks"],
    ["Currency", "Euro (€)"],
    ["Working Hours", "39 hrs/week"],
  ];
  return (
    <div
      className={`overflow-hidden rounded-3xl border border-blue/20 bg-white shadow-[0_10px_40px_-20px_rgba(11,31,58,0.25)] ${
        compact ? "" : ""
      }`}
    >
      <div className="grid md:grid-cols-5">
        <div className={`relative ${compact ? "md:col-span-2" : "md:col-span-2"}`}>
          <img
            src={glanceImg}
            alt="Modern hospital in Ireland"
            width={1200}
            height={1200}
            loading="lazy"
            className={`h-full w-full object-cover ${compact ? "min-h-[200px]" : "min-h-[360px]"}`}
          />
        </div>
        <div className={`p-8 md:col-span-3 ${compact ? "md:p-6" : "md:p-10"}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">Overview</p>
          <h3
            className={`mt-2 font-display font-bold text-navy ${compact ? "text-xl" : "text-3xl"}`}
          >
            Ireland at a Glance
          </h3>
          <dl className="mt-6 divide-y divide-border">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-6 py-3">
                <dt className="text-sm text-ink-soft">{k}</dt>
                <dd className={`text-right font-medium text-navy ${compact ? "text-sm" : ""}`}>
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm font-semibold text-gold">
            Ozone has placed healthcare professionals in Ireland since 2018.
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------- 6. Eligibility -------- */
function Eligibility() {
  const items = [
    [
      "Nursing Qualification",
      "BSc Nursing or equivalent recognized by NMBI; GNM candidates assessed case-by-case, adaptation program may apply.",
    ],
    [
      "NMBI Registration Eligibility",
      "English proficiency via IELTS (7.0 overall) or OET (B in all bands); Ozone guides the full NMBI application.",
    ],
    [
      "English Proficiency Test",
      "IELTS Academic 7.0 overall with no band below 6.5, or OET Grade B in all four components — this is Ireland's key requirement.",
    ],
    [
      "Relevant Experience",
      "Minimum 1 year post-qualification; most HSE and private hospital roles prefer 2+ years.",
    ],
  ] as const;
  return (
    <section className="relative bg-muted/40 py-24">
      <DotCluster className="absolute bottom-8 left-6 h-24 w-56 opacity-60" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">Eligibility</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-navy md:text-5xl">
            What It Takes to Qualify for <span className="text-gold">Ireland.</span>
          </h2>
          <p className="mt-4 text-ink-soft">
            NMBI has a clear, well-documented pathway for Indian-qualified nurses. Here's exactly
            what you need.
          </p>
        </div>

        <ul className="mt-12 divide-y divide-border rounded-3xl border border-border bg-white">
          {items.map(([title, body]) => (
            <li key={title} className="flex items-start gap-5 p-6 md:p-8">
              <span className="mt-1 grid h-9 w-9 flex-none place-items-center rounded-full bg-gold/15 text-gold text-lg font-bold">
                ✓
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-navy">{title}</h3>
                <p className="mt-1 text-sm text-ink-soft md:text-base">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------- 7. Process -------- */
function Process() {
  const steps = [
    ["01", "✈️", "Apply", "Browse Ireland openings and submit your CV.", "Free · 2 minutes"],
    [
      "02",
      "📋",
      "NMBI Eligibility Check",
      "Coordinator reviews your qualification against NMBI criteria within 48 hours.",
      "48hr · Free assessment",
    ],
    [
      "03",
      "📜",
      "Registration & Visa",
      "NMBI application, English test support, employment permit processing — all managed.",
      "Weeks 2–7 · Fully handled",
    ],
    [
      "04",
      "🏠",
      "Arrive & Settle",
      "Pre-departure briefing, accommodation guidance, coordinator check-in on arrival.",
      "Week 8–10 · Full support",
    ],
  ] as const;

  return (
    <section className="relative overflow-hidden bg-lightblue py-24">
      <WaveBlob className="absolute -right-16 top-10 h-96 w-96 opacity-80" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">Process</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-navy md:text-5xl">
            From Application to Dublin in <span className="text-gold">8–10 Weeks.</span>
          </h2>
          <p className="mt-4 text-ink-soft">One coordinator. One process. Zero gaps.</p>
        </div>

        <div className="relative mt-16">
          {/* horizontal rail */}
          <div className="pointer-events-none absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-blue/10 via-blue/50 to-blue/10 md:block" />
          <ol className="grid gap-10 md:grid-cols-4">
            {steps.map(([num, icon, title, body, meta]) => (
              <li key={num} className="relative">
                {/* faint number */}
                <span className="pointer-events-none absolute -top-6 left-0 select-none font-display text-7xl font-extrabold text-blue/10">
                  {num}
                </span>
                <div className="relative flex flex-col items-start">
                  <div className="relative z-10 grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl shadow-md ring-1 ring-blue/20">
                    {icon}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{body}</p>
                  <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue ring-1 ring-blue/15">
                    {meta}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* -------- 8. Openings -------- */
function Openings() {
  const tabs = ["HSE (Public)", "Private Hospitals", "Nursing Homes"];
  const roles = [
    {
      city: "Dublin",
      role: "Staff Nurse",
      employer: "HSE Public Hospital",
      req: "Full-time · 2+ yrs · NMBI required",
      pay: "€35,000–42,000/yr",
    },
    {
      city: "Cork",
      role: "ICU Nurse",
      employer: "University Hospital Cork",
      req: "Full-time · 2+ yrs ICU · NMBI required",
      pay: "€38,000–46,000/yr",
    },
    {
      city: "Galway",
      role: "Theatre Nurse",
      employer: "Private Hospital Group",
      req: "Full-time · OT experience · NMBI required",
      pay: "€36,000–44,000/yr",
    },
    {
      city: "Limerick",
      role: "Staff Nurse",
      employer: "Nursing Home Group",
      req: "Full-time · 1+ yr · NMBI required",
      pay: "€33,000–40,000/yr",
    },
  ];
  return (
    <section id="roles" className="relative overflow-hidden bg-background py-24">
      <WaveBlob className="absolute -left-16 bottom-0 h-72 w-72" />
      <DotCluster className="absolute right-6 top-10 h-24 w-40 opacity-70" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
              Live Openings
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-navy md:text-5xl">
              Current Openings in <span className="text-gold">Ireland.</span>
            </h2>
            <p className="mt-4 text-ink-soft">
              Roles open with our Irish employer partners across HSE and private networks.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((t, i) => (
              <button
                key={t}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  i === 0
                    ? "bg-navy text-navy-foreground"
                    : "border border-border bg-white text-ink-soft hover:text-navy"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {roles.map((r) => (
            <article
              key={r.role + r.city}
              className="group flex flex-col rounded-2xl border border-border bg-white p-7 shadow-[0_1px_2px_rgba(11,31,58,0.04),0_10px_30px_-16px_rgba(11,31,58,0.2)] transition hover:-translate-y-0.5 hover:border-blue/40"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-lightblue px-3 py-1 text-xs font-semibold text-blue">
                  Healthcare
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-soft">
                  📍 {r.city}
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-navy">{r.role}</h3>
              <p className="mt-1 text-sm text-ink-soft">{r.employer}</p>
              <p className="mt-4 text-sm text-ink-soft">{r.req}</p>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <p className="font-display text-lg font-bold text-navy">{r.pay}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue transition group-hover:gap-2"
                >
                  View Role →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-1 font-semibold text-blue hover:underline"
          >
            See All Ireland Roles →
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------- 9. Track Record -------- */
function TrackRecord() {
  return (
    <section className="relative overflow-hidden curve-top curve-bottom bg-lightblue py-24">
      <WaveBlob className="absolute -bottom-8 -right-10 h-96 w-96" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-[9rem] font-extrabold leading-none text-navy md:text-[11rem]">
            15<span className="text-gold">+</span>
          </p>
          <p className="mt-4 font-display text-2xl font-bold text-navy">
            Employer Partners Across Ireland
          </p>
          <p className="mt-4 max-w-md text-ink-soft">
            From HSE hospitals in Dublin to private networks in Cork and Galway — Ozone has built
            direct hiring relationships with Ireland's fastest-growing healthcare employers since
            2018.
          </p>
        </div>

        <div className="md:col-span-7">
          <figure className="relative rounded-[24px] bg-white p-10 shadow-[0_20px_60px_-30px_rgba(11,31,58,0.35)]">
            <span
              aria-hidden
              className="font-display absolute -top-4 left-6 text-8xl leading-none text-gold"
            >
              “
            </span>
            <blockquote className="relative font-display text-2xl leading-snug text-navy md:text-3xl">
              My NMBI application was handled completely by my Ozone coordinator. I didn't have to
              figure out a single form.
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <img
                src={priyaImg}
                alt="Priya M."
                width={512}
                height={512}
                loading="lazy"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-navy">Priya M.</p>
                <p className="text-sm text-ink-soft">Staff Nurse → Dublin · Placed 2024</p>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* -------- 10. FAQ -------- */
function FAQ() {
  const qs = [
    [
      "Do I need IELTS or OET to apply for NMBI registration?",
      "Yes. NMBI accepts either IELTS Academic (7.0 overall, no band below 6.5) or OET (Grade B in all four components). Ozone helps you pick the right test based on your timeline and strengths.",
    ],
    [
      "Can GNM-qualified nurses apply for Ireland roles?",
      "GNM candidates are assessed case-by-case by NMBI. Many are eligible via an adaptation program on arrival. We'll tell you within 48 hours whether your file is likely to clear.",
    ],
    [
      "What is the typical salary for nurses in Ireland?",
      "HSE staff nurses start around €35,000–42,000/yr, with ICU and specialist roles reaching €46,000+. Private hospitals and nursing home groups are broadly comparable.",
    ],
    [
      "Can my spouse work in Ireland on my permit?",
      "Yes. Ireland's General Employment / Critical Skills routes allow accompanying spouses to apply for a spousal work permission that grants unrestricted access to the labour market.",
    ],
    [
      "Does Ozone charge candidates any fee for Ireland placements?",
      "No. Ozone is paid by the employer. Candidates never pay a placement fee — from CV review through arrival support.",
    ],
  ];
  return (
    <section id="faq" className="bg-background py-24">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">FAQ</p>
        <h2 className="mt-3 font-display text-4xl font-bold text-navy md:text-5xl">
          Questions About Working in <span className="text-gold">Ireland.</span>
        </h2>

        <div className="mt-10 divide-y divide-border rounded-3xl border border-border bg-white">
          {qs.map(([q, a], i) => (
            <details key={q} className="group p-6 md:p-8" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                <span className="font-display text-lg font-semibold text-navy">{q}</span>
                <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-lightblue text-blue transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-ink-soft">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- 11. Final CTA -------- */
function FinalCTA() {
  return (
    <section id="contact" className="relative curve-top overflow-hidden bg-lightblue pb-24 pt-24">
      <WaveBlob className="absolute -top-10 left-0 h-96 w-96" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-12">
        <div className="md:col-span-6">
          <h2 className="font-display text-5xl font-extrabold leading-tight text-navy md:text-6xl">
            Ireland Is Hiring. <br />
            <span className="text-gold">Are You Ready?</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-ink-soft">
            Browse open roles or talk to our team — your NMBI eligibility check is free.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#roles"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-navy-foreground shadow-lg transition hover:bg-navy/90"
            >
              Browse Open Roles →
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-blue px-6 py-3 text-sm font-semibold text-blue transition hover:bg-blue/5"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="md:col-span-6">
          <GlanceCard compact />
        </div>
      </div>
    </section>
  );
}
