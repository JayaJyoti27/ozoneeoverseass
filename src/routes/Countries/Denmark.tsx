import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import denmarkSkyline from "@/assets/denmark-skyline.jpg";
import denmarkHospital from "@/assets/denmark-hospital.jpg";
import { Header } from "@/components/site/Header";
export const Route = createFileRoute("/Countries/Denmark")({
  head: () => ({
    meta: [
      { title: "Recruitment to Denmark — Ozone Overseas" },
      {
        name: "description",
        content:
          "Placing nurses, allied health, and skilled technical professionals from India into verified roles across Denmark — Danish Patient Safety Authority and SIRI compliant, since 2009.",
      },
      { property: "og:title", content: "Recruitment to Denmark — Ozone Overseas" },
      {
        property: "og:description",
        content:
          "312 professionals placed. 26 live roles today. Authorisation-compliant recruitment for Denmark's hospitals, elder care, and green-tech sectors.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DenmarkPage,
});

/* ---------- shared decorative bits ---------- */

const WaveBlob = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden
    viewBox="0 0 600 600"
    className={`pointer-events-none absolute -z-0 ${className}`}
  >
    <path
      fill="#EAF2FC"
      d="M421,313Q404,376,349,411Q294,446,229,432Q164,418,127,363Q90,308,116,246Q142,184,197,146Q252,108,316,127Q380,146,414,203Q438,250,421,313Z"
    />
  </svg>
);

const DotGrid = ({
  className = "",
  tone = "navy",
}: {
  className?: string;
  tone?: "navy" | "gold";
}) => {
  const color = tone === "gold" ? "#C9A646" : "#1E4D8C";
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 120"
      className={`pointer-events-none absolute -z-0 opacity-30 ${className}`}
    >
      {Array.from({ length: 8 }).map((_, r) =>
        Array.from({ length: 8 }).map((__, c) => (
          <circle key={`${r}-${c}`} cx={8 + c * 14} cy={8 + r * 14} r={1.6} fill={color} />
        )),
      )}
    </svg>
  );
};

/* ---------- header ---------- */



/* ---------- live roles mini card ---------- */

const LIVE_ROLES = [
  { title: "ICU Registered Nurse", city: "Copenhagen", salary: "DKK 34–42k" },
  { title: "Wind Turbine Technician", city: "Esbjerg", salary: "DKK 32–40k" },
  { title: "Elder Care Nurse (SOSU)", city: "Aarhus", salary: "DKK 28–34k" },
];

function LiveRolesCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-black/5 bg-white p-5 shadow-[0_20px_50px_-20px_rgba(11,31,58,0.35)] ${className}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <p className="text-[13px] font-semibold text-[color:var(--color-brand-navy)]">
          Live Roles Today —{" "}
          <span className="text-[color:var(--color-brand-blue)]">26 Open Positions</span>
        </p>
      </div>
      <ul className="divide-y divide-black/5">
        {LIVE_ROLES.map((r) => (
          <li key={r.title} className="flex items-center justify-between py-2.5 text-[13px]">
            <div>
              <p className="font-semibold text-[color:var(--color-brand-navy)]">{r.title}</p>
              <p className="text-[11px] text-black/50">📍 {r.city}</p>
            </div>
            <p className="font-semibold text-[color:var(--color-brand-gold)]">{r.salary}</p>
          </li>
        ))}
      </ul>
      <a
        href="#jobs"
        className="mt-3 flex items-center justify-between text-[12px] font-semibold text-[color:var(--color-brand-blue)]"
      >
        <span className="text-black/40">Updated today</span>
        <span>View all →</span>
      </a>
    </div>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <DotGrid className="right-8 top-24 h-40 w-40" />
      <WaveBlob className="right-[-8rem] top-[-6rem] h-[36rem] w-[36rem] opacity-70" />

      <div className="relative mx-auto grid min-h-[100vh] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2">
        {/* LEFT */}
        <div className="relative z-10">
          <p className="text-xs text-black/50">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            {" / "}Countries{" / "}
            <span className="text-[color:var(--color-brand-navy)]">Denmark</span>
          </p>

          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-brand-blue)]/20 bg-[color:var(--color-brand-lightblue)] px-3.5 py-1.5 text-xs font-semibold text-[color:var(--color-brand-blue)]">
            🇩🇰 Healthcare, Elder Care & Green Tech
          </span>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-[color:var(--color-brand-navy)] md:text-6xl">
            Recruitment to
            <br />
            <span className="text-[color:var(--color-brand-blue)]">Denmark.</span>
          </h1>

          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-black/60">
            Placing nurses, elder-care professionals, and skilled technical specialists from India
            into verified roles across Denmark's hospitals, kommune care systems, and green-energy
            sector — since 2009.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#jobs"
              className="rounded-full bg-[color:var(--color-brand-navy)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[color:var(--color-brand-navy)]/20 transition hover:bg-[color:var(--color-brand-blue)]"
            >
              View Open Roles ↓
            </a>
            <a
              href="https://wa.me/"
              className="rounded-full border border-[color:var(--color-brand-blue)] px-6 py-3 text-sm font-semibold text-[color:var(--color-brand-blue)] transition hover:bg-[color:var(--color-brand-lightblue)]"
            >
              Talk to Our Team
            </a>
          </div>

          {/* stat row */}
          <div className="mt-10 grid max-w-xl grid-cols-4 divide-x divide-black/10">
            {[
              ["312", "Placed in DK"],
              ["26", "Open Roles"],
              ["22+", "Employer Partners"],
              ["14–20 wk", "Avg. Process"],
            ].map(([n, l]) => (
              <div key={l} className="px-4 first:pl-0">
                <p className="font-display text-2xl font-bold text-[color:var(--color-brand-navy)]">
                  {n}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-black/50">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <span className="absolute -left-6 top-10 h-24 w-24 rounded-full border border-[color:var(--color-brand-gold)]/40" />
          <span className="absolute -right-4 bottom-24 h-32 w-32 rounded-full border border-[color:var(--color-brand-navy)]/20" />

          <div className="relative overflow-hidden rounded-[24px] shadow-[0_30px_80px_-30px_rgba(11,31,58,0.45)]">
            <img
              src={denmarkSkyline}
              alt="Copenhagen Nyhavn harbor at golden hour"
              width={1200}
              height={1400}
              className="h-[560px] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[color:var(--color-brand-navy)] to-transparent" />
            <p className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-widest text-white/90">
              Denmark
            </p>
          </div>

          {/* floating badge */}
          <div className="absolute -top-4 right-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[color:var(--color-brand-navy)] shadow-lg">
            <span className="text-[color:var(--color-brand-gold)]">✓</span>
            🇩🇰 STPS & SIRI Compliant
          </div>

          {/* live roles floating */}
          <LiveRolesCard className="absolute -bottom-8 -left-6 w-[320px]" />
        </div>
      </div>
    </section>
  );
}

/* ---------- stats band ---------- */

function StatsBand() {
  const items = [
    ["312", "Placed in Denmark"],
    ["26", "Open Roles Today"],
    ["22+", "Employer Partners"],
    ["2009", "Active Since"],
  ];
  return (
    <section className="relative mt-32 py-16">
      <div className="absolute inset-x-0 top-0 h-full rounded-t-[80px] bg-[color:var(--color-brand-lightblue)]" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-6 md:grid-cols-4">
        {items.map(([n, l], i) => (
          <div
            key={l}
            className={`px-6 text-center ${i > 0 ? "md:border-l md:border-[color:var(--color-brand-gold)]/40" : ""}`}
          >
            <p className="font-display text-4xl font-bold text-[color:var(--color-brand-navy)]">
              {n}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand-blue)]">
              {l}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- about ---------- */

function About() {
  const glance: [string, string][] = [
    ["Capital", "Copenhagen"],
    ["Primary Hiring Regions", "Copenhagen · Aarhus · Esbjerg"],
    ["Key Authorities", "STPS · SIRI · Kommune"],
    ["Avg. Process", "14–20 weeks"],
    ["Currency", "DKK"],
    ["Working Hours", "37 hrs/week"],
  ];
  return (
    <section id="about" className="relative overflow-hidden bg-white py-28">
      <WaveBlob className="-right-40 bottom-0 h-[32rem] w-[32rem] opacity-70" />
      <DotGrid className="left-6 top-16 h-32 w-32" tone="gold" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
        <div className="relative">
          <div className="overflow-hidden rounded-[24px] shadow-[0_25px_60px_-30px_rgba(11,31,58,0.4)]">
            <img
              src={denmarkHospital}
              alt="Nurse walking through a modern Danish hospital corridor"
              width={1000}
              height={1200}
              loading="lazy"
              className="h-[540px] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-6 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[color:var(--color-brand-navy)] shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Active Since 2009 · MEA Licensed
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand-blue)]">
            Denmark Context
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-[color:var(--color-brand-navy)] md:text-[42px]">
            Recruiting Healthcare, Elder Care, and Green-Tech Talent for the Danish Market.
          </h2>
          <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-black/65">
            <p>
              Denmark's aging population and ambitious green-transition targets have driven steady
              demand for qualified nurses, social- and health-assistants (SOSU), and skilled
              technicians across the public healthcare system, kommune elder-care, and the wind and
              renewable-energy cluster.
            </p>
            <p>
              Since 2009, Ozone Overseas has partnered with Danish employers — from regional
              hospitals and municipal care providers to wind-turbine manufacturers in Esbjerg — to
              place healthcare and technical professionals from India into verified, long-term
              roles.
            </p>
            <p>
              We cover ICU, medical–surgical, elder and dementia care, physiotherapy, wind-turbine
              service, and electro-mechanical trades — all screened to employer specification and
              supported through STPS authorisation, Danish language training, and SIRI residence and
              work permits from application to arrival.
            </p>
            <p>
              Every healthcare placement requires authorisation from the Danish Patient Safety
              Authority (STPS). Our team handles the file, credential verification, and Danish
              language pathway alongside the residence-permit process.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-[color:var(--color-brand-lightblue)]/60 p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand-navy)]">
              Denmark at a Glance
            </p>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {glance.map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-4 border-b border-black/10 pb-2 text-sm"
                >
                  <dt className="text-black/55">{k}</dt>
                  <dd className="text-right font-semibold text-[color:var(--color-brand-navy)]">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- eligibility ---------- */

function Eligibility() {
  const cards = [
    {
      num: "01",
      icon: "🎓",
      title: "Recognized Nursing or Technical Qualification",
      body: "A government-recognized nursing degree/diploma or accredited technical certification relevant to the role and evaluable by Danish authorities.",
      variant: "navy",
    },
    {
      num: "02",
      icon: "📜",
      title: "STPS Authorisation Pathway",
      body: "Healthcare candidates must qualify for the Danish Patient Safety Authority (STPS) authorisation pathway. Ozone supports the file and any adaptation requirements end-to-end.",
      variant: "lightblue",
    },
    {
      num: "03",
      icon: "🗣️",
      title: "Danish Language (PD3 / Danish 3)",
      body: "Most healthcare roles require Danish at PD3 level before start. Green-tech and technical roles typically accept strong English initially, with Danish training on the job.",
      variant: "white",
    },
    {
      num: "04",
      icon: "⏱️",
      title: "Relevant Experience",
      body: "Minimum 2 years for RN roles. SOSU-assistant and technical roles accept 1+ year with structured onboarding and mentoring support.",
      variant: "grey",
    },
  ];

  const style: Record<string, string> = {
    navy: "bg-[color:var(--color-brand-navy)] text-white",
    lightblue: "bg-[color:var(--color-brand-lightblue)] text-[color:var(--color-brand-navy)]",
    white: "bg-white border border-black/10 text-[color:var(--color-brand-navy)]",
    grey: "bg-neutral-100 text-[color:var(--color-brand-navy)]",
  };

  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl font-bold text-[color:var(--color-brand-navy)] md:text-[42px]">
            What It Takes to Qualify.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-black/60">
            General requirements for healthcare and technical roles in Denmark. Exact criteria vary
            by role and employer — confirmed during screening.
          </p>
          <a
            href="#"
            className="mt-3 inline-block text-sm font-semibold text-[color:var(--color-brand-blue)] hover:underline"
          >
            Not sure if you qualify? Get a free eligibility check →
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.num}
              className={`group relative flex min-h-[280px] flex-col justify-between rounded-3xl p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${style[c.variant]}`}
            >
              <div>
                <p className="font-display text-sm font-bold opacity-60">{c.num}</p>
                <p className="mt-3 text-2xl">{c.icon}</p>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-80">{c.body}</p>
              </div>
              <span className="mt-6 self-end text-lg opacity-70 transition group-hover:translate-x-1">
                ↗
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- process ---------- */

function Process() {
  const steps = [
    {
      num: "01",
      title: "Apply",
      body: "Submit your application or browse current Denmark openings.",
      meta: "Free · No format needed",
    },
    {
      num: "02",
      title: "Credential & Language Screening",
      body: "Our team verifies qualifications, evaluates STPS authorisation route, and maps a Danish language plan (PD3) where needed.",
      meta: "2–4 wks · Pre-screened",
    },
    {
      num: "03",
      title: "Employer Interview & Authorisation",
      body: "Employer interviews (often virtual), STPS file submission, contract, and Danish language training in parallel.",
      meta: "Weeks 5–14 · Fully coordinated",
    },
    {
      num: "04",
      title: "SIRI Residence Permit & Relocation",
      body: "Positive-list / Pay-limit residence permit via SIRI, CPR registration, flights, and pre-departure orientation to your first day.",
      meta: "Weeks 15–20 · Full support",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-brand-lightblue)]/40 py-28">
      <WaveBlob className="-left-32 bottom-10 h-[30rem] w-[30rem] opacity-80" />
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line x1="0" y1="100" x2="100" y2="0" stroke="#0B1F3A" strokeWidth="0.2" />
        <line x1="0" y1="80" x2="100" y2="-20" stroke="#0B1F3A" strokeWidth="0.2" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl font-bold text-[color:var(--color-brand-navy)] md:text-[42px]">
            How the Process Works, Step by Step.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-black/60">
            Most candidates complete the full process — from application to boarding — within 14 to
            20 weeks, depending on STPS turnaround and Danish language milestones.
          </p>
        </div>

        <div className="relative mt-16">
          <svg
            aria-hidden
            viewBox="0 0 1200 260"
            className="absolute inset-x-0 top-16 hidden h-40 w-full lg:block"
            preserveAspectRatio="none"
          >
            <path
              d="M 60 180 C 300 40, 450 40, 600 130 S 900 240, 1140 80"
              fill="none"
              stroke="#1E4D8C"
              strokeWidth="2"
              strokeDasharray="6 8"
              opacity="0.4"
            />
          </svg>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className={`relative rounded-3xl bg-white p-7 shadow-[0_20px_50px_-30px_rgba(11,31,58,0.35)] ${
                  i % 2 === 1 ? "lg:mt-20" : ""
                }`}
              >
                <span className="absolute -top-6 right-4 font-display text-7xl font-bold text-[color:var(--color-brand-blue)]/10">
                  {s.num}
                </span>
                <div className="relative">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-brand-navy)] font-display text-sm font-bold text-white">
                    {s.num}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-[color:var(--color-brand-navy)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/60">{s.body}</p>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-[color:var(--color-brand-gold)]">
                    {s.meta}
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

/* ---------- jobs ---------- */

type Job = {
  category: "Healthcare" | "Technical";
  city: string;
  title: string;
  employer: string;
  tags: string[];
  salary: string;
};

const JOBS: Job[] = [
  {
    category: "Healthcare",
    city: "Copenhagen",
    title: "ICU Registered Nurse",
    employer: "Regional University Hospital",
    tags: ["Full-time", "2+ yrs experience", "STPS authorisation"],
    salary: "DKK 34,000–42,000 / month",
  },
  {
    category: "Technical",
    city: "Esbjerg",
    title: "Wind Turbine Service Technician",
    employer: "Offshore Wind Manufacturer",
    tags: ["Full-time", "3+ yrs experience", "GWO / Diploma"],
    salary: "DKK 32,000–40,000 / month",
  },
  {
    category: "Healthcare",
    city: "Aarhus",
    title: "SOSU Elder Care Assistant",
    employer: "Municipal Kommune Care",
    tags: ["Full-time", "1+ yr experience", "PD3 pathway"],
    salary: "DKK 28,000–34,000 / month",
  },
  {
    category: "Healthcare",
    city: "Odense",
    title: "Physiotherapist",
    employer: "Rehabilitation Centre",
    tags: ["Full-time", "2+ yrs experience", "STPS authorisation"],
    salary: "DKK 31,000–38,000 / month",
  },
];

function Jobs() {
  const [tab, setTab] = useState<"Healthcare" | "Technical">("Healthcare");
  const visible = JOBS.filter((j) => j.category === tab);

  return (
    <section id="jobs" className="relative overflow-hidden bg-white py-28">
      <WaveBlob className="-left-40 bottom-0 h-[30rem] w-[30rem] opacity-70" />
      <DotGrid className="right-8 top-16 h-32 w-32" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl font-bold text-[color:var(--color-brand-navy)] md:text-[42px]">
            Current Openings in Denmark.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-black/60">
            A sample of roles currently open with our Danish employer partners.
          </p>
        </div>

        <div className="mt-10 flex items-center gap-8 border-b border-black/10">
          {(["Healthcare", "Technical"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative pb-3 text-sm font-semibold transition ${
                tab === t
                  ? "text-[color:var(--color-brand-navy)]"
                  : "text-black/40 hover:text-black/70"
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[color:var(--color-brand-blue)]" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {visible.map((j) => (
            <div
              key={j.title}
              className="group rounded-[20px] border border-[color:var(--color-brand-blue)]/15 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-[color:var(--color-brand-blue)]/50 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                    j.category === "Healthcare"
                      ? "bg-[color:var(--color-brand-lightblue)] text-[color:var(--color-brand-blue)]"
                      : "bg-[color:var(--color-brand-gold)]/15 text-[color:var(--color-brand-gold)]"
                  }`}
                >
                  {j.category}
                </span>
                <span className="text-xs text-black/50">📍 {j.city}</span>
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold text-[color:var(--color-brand-navy)]">
                {j.title}
              </h3>
              <p className="mt-1 text-sm italic text-black/50">{j.employer}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {j.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-black/15 px-3 py-1 text-[11px] font-medium text-black/70"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <p className="font-display text-lg font-bold text-[color:var(--color-brand-gold)]">
                  {j.salary}
                </p>
                <a
                  href="#"
                  className="text-sm font-semibold text-[color:var(--color-brand-blue)] group-hover:underline"
                >
                  View Role →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#"
            className="text-sm font-semibold text-[color:var(--color-brand-navy)] hover:underline"
          >
            See All Denmark Roles →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- track record ---------- */

function TrackRecord() {
  return (
    <section className="relative overflow-hidden bg-white py-28">
      <WaveBlob className="-right-40 bottom-0 h-[30rem] w-[30rem] opacity-80" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl font-bold text-[color:var(--color-brand-navy)] md:text-[42px]">
            A Track Record Built Across Denmark.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-black/60">
            Since 2009, Ozone has placed 312 healthcare and technical professionals into roles
            across Denmark.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-5 md:grid-cols-4">
          <div className="rounded-3xl bg-[color:var(--color-brand-lightblue)] p-8 md:col-span-1">
            <p className="font-display text-5xl font-bold text-[color:var(--color-brand-navy)]">
              312
            </p>
            <p className="mt-3 text-sm font-semibold text-[color:var(--color-brand-blue)]">
              Placed Since 2009
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-[color:var(--color-brand-navy)] p-10 text-white md:col-span-2">
            <DotGrid className="right-4 top-4 h-32 w-32 opacity-40" tone="gold" />
            <p className="relative font-display text-6xl font-bold">22+</p>
            <p className="relative mt-3 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-brand-gold)]">
              Employer Partners
            </p>
            <p className="relative mt-4 max-w-md text-sm leading-relaxed text-white/70">
              Active partnerships with regional hospitals, kommune elder-care providers, and wind
              and renewable-energy firms across Denmark.
            </p>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-8 md:col-span-1">
            <p className="font-display text-5xl font-bold text-[color:var(--color-brand-navy)]">
              100%
            </p>
            <p className="mt-3 text-sm font-semibold text-[color:var(--color-brand-blue)]">
              STPS / SIRI-Compliant Placements
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

const FAQS = [
  {
    q: "Do I need STPS authorisation before I apply to roles in Denmark?",
    a: "No. You can apply first — STPS authorisation is handled during our screening and pre-departure process. Ozone supports the application, credential verification, and any adaptation or supervised-practice requirements end-to-end.",
  },
  {
    q: "What is the typical salary range for nursing roles?",
    a: "Registered Nurse roles in Denmark typically pay between DKK 31,000 and DKK 42,000 per month depending on specialty, experience, and region. ICU, ER, and OT roles sit at the higher end. SOSU elder-care assistants typically earn DKK 26,000–34,000.",
  },
  {
    q: "How long does the full process take?",
    a: "For most healthcare and technical placements, the full process from application to arrival takes 14 to 20 weeks. Timing depends primarily on STPS authorisation turnaround, Danish language milestones (PD3), and SIRI residence-permit approval.",
  },
  {
    q: "Do I need Danish language to work in Denmark?",
    a: "Yes, most healthcare roles require Danish at PD3 (Danish 3) level before start. Green-tech and technical roles typically accept strong English at entry, with employer-supported Danish training on the job. We advise on the exact requirement per role.",
  },
  {
    q: "Is accommodation provided for placements?",
    a: "Accommodation varies by employer. Many kommune and hospital employers help arrange first-year housing or provide a relocation allowance; larger green-tech employers often offer temporary company accommodation on arrival. Details are confirmed on the offer letter before you accept a role.",
  },
  {
    q: "Does Ozone charge candidates any fee?",
    a: "Ozone follows MEA guidelines for candidate fees. Costs are transparent, disclosed in writing before contract signing, and never charged before your offer is confirmed.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative overflow-hidden bg-neutral-50 py-28">
      <DotGrid className="bottom-8 left-8 h-32 w-32" />
      <div className="relative mx-auto max-w-4xl px-6">
        <h2 className="font-display text-4xl font-bold text-[color:var(--color-brand-navy)] md:text-[42px]">
          Frequently Asked Questions About Working in Denmark.
        </h2>

        <div className="mt-12 divide-y divide-black/10">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-lg font-semibold text-[color:var(--color-brand-navy)]">
                    {f.q}
                  </span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[color:var(--color-brand-blue)]/30 text-[color:var(--color-brand-blue)]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="max-w-3xl text-[15px] leading-relaxed text-black/65">{f.a}</p>
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

/* ---------- final CTA ---------- */

function FinalCTA() {
  return (
    <section className="relative">
      <div className="relative overflow-hidden rounded-t-[80px] bg-[color:var(--color-brand-lightblue)] pb-24 pt-24">
        <WaveBlob className="-right-32 -top-24 h-[26rem] w-[26rem] opacity-80" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight text-[color:var(--color-brand-navy)] md:text-5xl">
              Ready to Start Your Denmark Journey?
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-black/60">
              Browse open roles or talk to our team about what's currently available.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#jobs"
                className="rounded-full bg-[color:var(--color-brand-navy)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[color:var(--color-brand-blue)]"
              >
                Browse Open Roles →
              </a>
              <a
                href="https://wa.me/"
                className="rounded-full border border-[color:var(--color-brand-blue)] bg-white/60 px-6 py-3 text-sm font-semibold text-[color:var(--color-brand-blue)] transition hover:bg-white"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <LiveRolesCard />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer className="relative bg-[color:var(--color-brand-navy)] text-white">
      <svg
        aria-hidden
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="absolute -top-px left-0 h-8 w-full text-[color:var(--color-brand-lightblue)]"
      >
        <path d="M0,60 C300,0 900,120 1200,20 L1200,0 L0,0 Z" fill="currentColor" />
      </svg>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-[color:var(--color-brand-gold)] font-display font-bold text-[color:var(--color-brand-navy)]">
              O
            </div>
            <span className="font-display text-lg font-bold">Ozone Overseas</span>
          </div>
          <p className="mt-4 text-sm text-white/60">
            International recruitment for healthcare and technical talent, since 2009.
          </p>
        </div>
        {[
          { h: "Countries", l: ["Denmark", "Singapore", "Saudi Arabia", "United Kingdom"] },
          { h: "For You", l: ["Candidates", "Employers", "Open Roles", "Contact"] },
          { h: "Company", l: ["About", "Track Record", "MEA License", "Privacy"] },
        ].map((c) => (
          <div key={c.h}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand-gold)]">
              {c.h}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {c.l.map((x) => (
                <li key={x}>
                  <a href="#" className="hover:text-white">
                    {x}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-xs text-white/50">
          <p>MEA Registration No. B-0123/DEL/PER/1000+/5/1234/2009</p>
          <p>© {new Date().getFullYear()} Ozone Overseas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- page ---------- */

function DenmarkPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[color:var(--color-brand-navy)]">
      <Header />
      <Hero />
      <StatsBand />
      <About />
      <Eligibility />
      <Process />
      <Jobs />
      <TrackRecord />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
