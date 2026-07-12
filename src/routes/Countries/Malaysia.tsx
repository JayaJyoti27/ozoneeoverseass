import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronDown,
  MapPin,
  Plane,
  FileText,
  Stamp,
  Building2,
  ArrowRight,
  Check,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/footer";
import { Blob, DotGrid } from "@/components/site/decor";
import heroMain from "@/assets/malaysia-hero-main.jpg";
import heroTop from "@/assets/malaysia-hero-top.jpg";
import heroBottom from "@/assets/malaysia-hero-bottom.jpg";
import whyMain from "@/assets/malaysia-why-main.jpg";
import whyOverlap from "@/assets/malaysia-why-overlap.jpg";
import jobHospitalKl from "@/assets/job-hospital-kl.jpg";
import jobPenang from "@/assets/job-penang.jpg";
import jobJohor from "@/assets/job-johor.jpg";
import jobIcuKl from "@/assets/job-icu-kl.jpg";

export const Route = createFileRoute("/Countries/Malaysia")({
  head: () => ({
    meta: [
      { title: "Work in Malaysia — Healthcare & Technical Roles | Ozone Overseas" },
      {
        name: "description",
        content:
          "Nursing, allied health and technical roles in Kuala Lumpur, Penang and Johor Bahru. MMC registration, employment pass and pre-departure support handled by Ozone Overseas.",
      },
      { property: "og:title", content: "Work in Malaysia — Ozone Overseas" },
      {
        property: "og:description",
        content:
          "Modern, multicultural, English-friendly. 34 open roles across Malaysia's private healthcare and technical sectors.",
      },
      { property: "og:image", content: heroMain },
      { name: "twitter:image", content: heroMain },
    ],
  }),
  component: MalaysiaPage,
});

/* ----------------------------- data ----------------------------- */

const usps = [
  { icon: "🌆", text: "English-Friendly Work Environment" },
  { icon: "✈️", text: "4hr Flight from India" },
  { icon: "🏥", text: "Growing Private Healthcare Sector" },
];

const stats = [
  { n: "34", l: "Open Roles Today" },
  { n: "20+", l: "Employer Partners" },
  { n: "4 hrs", l: "Flight from India" },
  { n: "2009", l: "Active Since" },
];

const whyFeatures = [
  { icon: "🌍", text: "Multicultural, English-Speaking Work Environment" },
  { icon: "🏥", text: "Rapidly Expanding Private Hospital Networks" },
  { icon: "💰", text: "Competitive Packages — Often Including Accommodation" },
  { icon: "✈️", text: "4-Hour Flight — Easy Family Visits" },
];

const glance: [string, string][] = [
  ["Capital", "Kuala Lumpur"],
  ["Primary Hiring Cities", "KL · Penang · Johor Bahru"],
  ["Key License", "MMC / Allied Health"],
  ["Avg. Process", "8–10 weeks"],
  ["Currency", "Malaysian Ringgit (MYR)"],
  ["Working Hours", "45 hrs/week typical"],
];

const eligibility = [
  {
    n: "01",
    icon: "🎓",
    title: "Recognized Healthcare or Technical Qualification",
    body: "An internationally recognized nursing degree, allied health diploma, or technical certification.",
    tone: "navy",
  },
  {
    n: "02",
    icon: "📜",
    title: "MMC or Allied Health Registration Eligibility",
    body: "Ozone guides candidates through Malaysian Medical Council or Allied Health Professions Act registration — the process is streamlined for Indian-qualified professionals.",
    tone: "sky",
  },
  {
    n: "03",
    icon: "🗣️",
    title: "English Proficiency",
    body: "Malaysia is an English-working environment; strong English is an advantage and often assessed at interview stage.",
    tone: "white",
  },
  {
    n: "04",
    icon: "⏱️",
    title: "Relevant Experience",
    body: "Minimum 1–2 years post-qualification; some entry-level positions available with structured orientation programs.",
    tone: "grey",
  },
] as const;

const steps = [
  {
    n: "01",
    Icon: Plane,
    title: "Apply",
    body: "Browse Malaysia openings and submit your CV — takes under 2 minutes.",
    meta: "Free · Instant confirmation",
  },
  {
    n: "02",
    Icon: FileText,
    title: "Screening & Match",
    body: "Coordinator call, qualification check, employer introduction within 10 days.",
    meta: "48hr response · Pre-screened",
  },
  {
    n: "03",
    Icon: Stamp,
    title: "Registration & Visa",
    body: "MMC/Allied Health registration, employment pass application, attestation — all handled.",
    meta: "Weeks 2–7 · Fully managed",
  },
  {
    n: "04",
    Icon: Building2,
    title: "Arrive & Settle",
    body: "Pre-departure briefing, airport pickup arranged, first-week check-in from your coordinator.",
    meta: "Week 8–10 · Full support",
  },
];

type Role = {
  cat: "Healthcare" | "Technical" | "Allied Health";
  icon: string;
  city: string;
  title: string;
  employer: string;
  salary: string;
  reqs: string;
  img: string;
};

const roles: Role[] = [
  {
    cat: "Healthcare",
    icon: "🏥",
    city: "Kuala Lumpur",
    title: "Staff Nurse",
    employer: "Private Hospital Group",
    salary: "MYR 3,500–4,800/month",
    reqs: "BSc Nursing · 2+ yrs experience · MMC eligibility",
    img: jobHospitalKl,
  },
  {
    cat: "Allied Health",
    icon: "🏥",
    city: "Penang",
    title: "Allied Health Technician",
    employer: "Specialist Centre",
    salary: "MYR 3,000–4,200/month",
    reqs: "Diploma · 1+ yrs experience · Allied Health registration",
    img: jobPenang,
  },
  {
    cat: "Technical",
    icon: "🔧",
    city: "Johor Bahru",
    title: "Mechanical Engineer",
    employer: "Manufacturing Plant",
    salary: "MYR 4,000–5,500/month",
    reqs: "B.E. Mechanical · 3+ yrs experience · Employment pass",
    img: jobJohor,
  },
  {
    cat: "Healthcare",
    icon: "🏥",
    city: "Kuala Lumpur",
    title: "ICU Nurse",
    employer: "Tertiary Care Hospital",
    salary: "MYR 4,000–5,500/month",
    reqs: "BSc Nursing · 3+ yrs ICU · MMC eligibility",
    img: jobIcuKl,
  },
];

const faqs = [
  {
    q: "Is English widely used in Malaysian healthcare workplaces?",
    a: "Yes. English is a working language across Malaysia's private hospitals, specialist centres, and technical employers. Patient documentation, team communication, and training are almost always in English.",
  },
  {
    q: "What is the MMC registration process for Indian nurses?",
    a: "Indian-qualified nurses register with the Nursing Board Malaysia (under the MMC framework). Ozone prepares the credential file, verification, and application — typical timeline is 6–10 weeks in parallel with visa processing.",
  },
  {
    q: "What is the typical salary for nurses in Malaysia?",
    a: "Staff nurses at private hospitals typically earn MYR 3,500–4,800/month, with ICU and specialist roles up to MYR 5,500/month. Most packages include accommodation or an accommodation allowance.",
  },
  {
    q: "Is accommodation included in Malaysia packages?",
    a: "Most healthcare employers include either shared accommodation or an accommodation allowance. Technical roles vary — we confirm every package in writing before you sign.",
  },
  {
    q: "Does Ozone charge candidates any fee for Malaysia placements?",
    a: "No. Ozone is paid by employers. Candidates never pay Ozone a placement fee. Government charges (visa, attestation) are disclosed transparently upfront.",
  },
];

/* ----------------------------- page ----------------------------- */

function MalaysiaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <StatsBand />
        <WhyMalaysia />
        <Eligibility />
        <Process />
        <Openings />
        <TrackRecord />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ----------------------------- hero ----------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden md:h-[calc(100svh-4rem)]">
      <Blob className="right-[-140px] top-[-120px] h-[520px] w-[520px] opacity-80" />
      <DotGrid className="bottom-8 left-6 h-40 w-56 opacity-70" />

      <div className="mx-auto flex h-full max-w-7xl flex-col px-5 pt-4 pb-8 sm:px-6 md:pt-6 md:pb-8">
        <nav className="text-xs text-[var(--ink-soft)]">
          <Link to="/" className="hover:text-[var(--brand)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="hover:text-[var(--brand)]">Countries</span>
          <span className="mx-2">/</span>
          <span className="text-[var(--navy)] font-medium">Malaysia</span>
        </nav>

        <div className="mt-4 grid flex-1 grid-cols-1 items-center gap-8 md:mt-6 md:grid-cols-12 md:gap-6 min-h-0">
          {/* LEFT */}
          <div className="md:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--sky)] px-3 py-1 text-[11px] font-semibold text-[var(--brand)]">
              🇲🇾 Healthcare & Technical Recruitment
            </span>
            <h1 className="mt-3 font-display font-bold leading-[1.1] text-[var(--navy)] text-3xl sm:text-4xl md:text-4xl lg:text-5xl">
              Work in
              <br />
              <span className="text-[var(--brand)]">Malaysia.</span>
            </h1>
            <p className="mt-3 max-w-lg text-sm text-[var(--ink-soft)] md:text-base">
              A modern, multicultural destination for Indian healthcare professionals and technical
              specialists. MMC and Allied Health registration, competitive packages, and an
              English-friendly work environment.
            </p>

            <div className="mt-4 flex flex-wrap gap-2.5">
              <a
                href="#roles"
                className="inline-flex items-center gap-2 rounded-full
                bg-[var(--navy)] px-5 py-2.5 text-sm font-semibold text-white shadow-soft
                hover:bg-[var(--brand)] transition-colors"
              >
                {" "}
                View Open Roles <ChevronDown className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--sky)] transition-colors"
              >
                Talk to Our Team
              </a>
            </div>

            <ul className="mt-4 space-y-1.5 md:mt-5 md:space-y-2">
              {usps.map((u) => (
                <li key={u.text} className="flex items-center gap-3 text-sm text-[var(--navy)]">
                  <span className="text-base">{u.icon}</span>
                  <span className="font-medium">{u.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CENTER — main photo with gold offset */}
          <div className="grid grid-cols-8 gap-3 md:col-span-7 md:grid-cols-7 md:h-full md:items-center">
            <div className="col-span-5 md:col-span-4 md:h-[85%]">
              <div className="relative h-full w-full">
                <div
                  aria-hidden
                  className="absolute inset-0 translate-x-2 translate-y-2 rounded-3xl border-2 border-[var(--gold)]"
                />
                <img
                  src={heroMain}
                  alt="Kuala Lumpur skyline at golden hour"
                  width={900}
                  height={1200}
                  className="relative aspect-[3/4] w-full rounded-3xl object-cover shadow-lift sm:h-[320px] sm:aspect-auto md:h-full"
                />
              </div>
            </div>

            {/* RIGHT — stack + badge */}
            <div className="relative col-span-3 md:col-span-3 md:h-[85%]">
              <div className="flex h-full w-full flex-col gap-3">
                <img
                  src={heroTop}
                  alt="Healthcare professionals in a Malaysian hospital"
                  width={600}
                  height={700}
                  className="aspect-[4/5] w-full rounded-[20px] object-cover shadow-soft sm:h-[150px] sm:aspect-auto md:aspect-auto md:h-1/2"
                  loading="lazy"
                />
                <div className="relative sm:h-[150px] md:h-1/2">
                  <img
                    src={heroBottom}
                    alt="Kuala Lumpur street lifestyle"
                    width={600}
                    height={700}
                    className="aspect-[4/5] w-full rounded-[20px] object-cover shadow-soft sm:h-full sm:aspect-auto md:aspect-auto md:h-full"
                    loading="lazy"
                  />
                  <span className="absolute -left-2 -top-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1 text-[10px] font-semibold text-[var(--navy)] shadow-soft sm:-left-4 sm:px-3 sm:py-1.5 sm:text-xs">
                    🇲🇾 34 Open Roles
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
/* ----------------------------- stats band ----------------------------- */

function StatsBand() {
  return (
    <section className="mx-auto max-w-7xl px-6">
      <div className="curved-band bg-[var(--sky)] px-6 py-10 md:px-14 md:py-12">
        <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-4xl font-bold text-[var(--navy)] md:text-5xl">
                {s.n}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-[var(--ink-soft)]">
                {s.l}
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-[var(--ink-soft)]">
          Malaysia is one of Southeast Asia's fastest-growing destinations for internationally
          trained healthcare professionals.
        </p>
      </div>
    </section>
  );
}

/* ----------------------------- why ----------------------------- */

function WhyMalaysia() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <Blob className="bottom-[-120px] right-[-140px] h-[480px] w-[480px] opacity-70" />
      <DotGrid className="left-6 top-16 h-32 w-48 opacity-70" />

      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-2 md:items-center">
        <div className="relative">
          <img
            src={whyMain}
            alt="Modern hospital in Kuala Lumpur at dusk"
            width={900}
            height={1000}
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-lift"
            loading="lazy"
          />
          <img
            src={whyOverlap}
            alt="Expat professional in a Kuala Lumpur café"
            width={600}
            height={600}
            className="absolute -bottom-8 -right-4 w-2/5 rounded-2xl border-4 border-white object-cover shadow-lift md:-right-8"
            loading="lazy"
          />
        </div>

        <div>
          <span className="inline-flex rounded-full bg-[var(--sky)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
            Why Malaysia
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-[var(--navy)] md:text-5xl">
            More Than a Job. <br />
            <span className="text-[var(--brand)]">A Life Worth Moving For.</span>
          </h2>
          <p className="mt-5 text-[var(--ink-soft)]">
            Multicultural society. English as a working language. A rapidly growing private
            healthcare sector. Four hours from India and competitive packages that often include
            accommodation — Malaysia is an unusually easy first international move.
          </p>

          <ul className="mt-6 space-y-3">
            {whyFeatures.map((f) => (
              <li key={f.text} className="flex items-start gap-3">
                <span className="text-lg">{f.icon}</span>
                <span className="font-medium text-[var(--navy)]">{f.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-border bg-white p-6 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
              Malaysia at a Glance
            </div>
            <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
              {glance.map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-4 border-b border-dashed border-border pb-2 sm:border-none sm:pb-0"
                >
                  <dt className="text-[var(--ink-soft)]">{k}</dt>
                  <dd className="text-right font-semibold text-[var(--navy)]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- eligibility ----------------------------- */

function Eligibility() {
  const toneClass = (t: string) =>
    t === "navy"
      ? "bg-[var(--navy)] text-white"
      : t === "sky"
        ? "bg-[var(--sky)] text-[var(--navy)]"
        : t === "grey"
          ? "bg-[#F3F5FA] text-[var(--navy)]"
          : "bg-white text-[var(--navy)] border border-border";
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-2xl">
        <h2 className="font-display text-4xl font-bold text-[var(--navy)] md:text-5xl">
          What It Takes to Qualify.
        </h2>
        <p className="mt-4 text-[var(--ink-soft)]">
          Malaysia's registration process is straightforward for internationally qualified
          candidates. Here's what you need.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {eligibility.map((e) => (
          <div
            key={e.n}
            className={`rounded-3xl p-7 shadow-soft transition-transform hover:-translate-y-1 ${toneClass(e.tone)}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-bold opacity-90">{e.n}</span>
              <span className="text-2xl">{e.icon}</span>
            </div>
            <h3 className="mt-8 font-display text-lg font-semibold leading-snug">{e.title}</h3>
            <p
              className={`mt-3 text-sm ${e.tone === "navy" ? "text-white/80" : "text-[var(--ink-soft)]"}`}
            >
              {e.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- process ----------------------------- */

function Process() {
  return (
    <section className="relative overflow-hidden bg-[#FAFBFE] py-20 md:py-28">
      <Blob className="right-[-160px] top-8 h-[480px] w-[480px] opacity-60" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-bold text-[var(--navy)] md:text-5xl">
            From Application to KL in <span className="text-[var(--brand)]">8–10 Weeks.</span>
          </h2>
          <p className="mt-4 text-[var(--ink-soft)]">
            A clear process, one coordinator, zero surprises.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Timeline line */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-14 hidden h-0.5 bg-gradient-to-r from-transparent via-[var(--brand)]/40 to-transparent md:block"
          />
          <div className="grid gap-10 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <div className="relative mx-auto grid h-14 w-14 place-items-center rounded-full bg-white shadow-lift ring-4 ring-[var(--sky)]">
                  <s.Icon className="h-6 w-6 text-[var(--brand)]" />
                </div>
                <div className="mt-4 text-center">
                  <div className="pointer-events-none absolute inset-x-0 top-16 font-display text-6xl font-bold text-[var(--brand)]/10">
                    {s.n}
                  </div>
                  <div className="relative">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
                      Step {s.n}
                    </div>
                    <h3 className="mt-1 font-display text-xl font-semibold text-[var(--navy)]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--ink-soft)]">{s.body}</p>
                    <div className="mt-3 text-xs font-medium text-[var(--gold)]">{s.meta}</div>
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

/* ----------------------------- openings ----------------------------- */

function Openings() {
  const cats = ["Healthcare", "Technical", "Allied Health"] as const;
  const [active, setActive] = useState<(typeof cats)[number] | "All">("All");
  const filtered = active === "All" ? roles : roles.filter((r) => r.cat === active);

  return (
    <section id="roles" className="relative overflow-hidden py-20 md:py-28">
      <Blob className="bottom-[-140px] left-[-140px] h-[460px] w-[460px] opacity-60" />
      <DotGrid className="right-8 top-16 h-32 w-48 opacity-70" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-bold text-[var(--navy)] md:text-5xl">
              Current Openings in Malaysia.
            </h2>
            <p className="mt-4 text-[var(--ink-soft)]">
              Roles open with our Malaysia employer partners — updated weekly.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["All", ...cats] as const).map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active === c
                    ? "bg-[var(--navy)] text-white"
                    : "bg-[var(--sky)] text-[var(--brand)] hover:bg-[var(--brand)] hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {filtered.map((r) => (
            <article
              key={r.title + r.city}
              className="group flex gap-5 rounded-3xl border border-border bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <img
                src={r.img}
                alt={r.employer}
                width={512}
                height={512}
                loading="lazy"
                className="h-28 w-28 flex-shrink-0 rounded-2xl object-cover"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold text-[var(--navy)]">
                      <span className="mr-1.5">{r.icon}</span>
                      {r.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-[var(--ink-soft)]">{r.employer}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--sky)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">
                    <MapPin className="h-3 w-3" /> {r.city}
                  </span>
                  <span className="inline-flex rounded-full bg-[#FBF6E7] px-3 py-1 text-xs font-semibold text-[var(--gold)]">
                    {r.salary}
                  </span>
                </div>
                <p className="mt-3 text-xs text-[var(--ink-soft)]">{r.reqs}</p>
                <div className="mt-auto flex justify-end pt-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[var(--gold)] px-4 py-2 text-xs font-semibold text-[var(--navy)] shadow-soft hover:brightness-95"
                  >
                    Apply Now <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#" className="text-sm font-semibold text-[var(--brand)] hover:underline">
            See All Malaysia Roles →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- track record ----------------------------- */

function TrackRecord() {
  return (
    <section className="mx-auto max-w-7xl px-6">
      <div className="relative overflow-hidden curved-band bg-[var(--sky)] px-6 py-14 md:px-16 md:py-20">
        <Blob
          className="bottom-[-120px] right-[-120px] h-[380px] w-[380px] opacity-70"
          color="white"
        />
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="font-display text-[7rem] font-extrabold leading-none text-[var(--navy)] md:text-[9rem]">
              20+
            </div>
            <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--navy)]">
              Employer Partners Across Malaysia
            </h3>
            <p className="mt-4 max-w-lg text-[var(--ink-soft)]">
              From private hospital networks in KL to specialist centres in Penang and manufacturing
              groups in Johor Bahru — Ozone has built direct hiring relationships across Malaysia's
              fastest-growing sectors.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:pl-8">
            {[
              "34 Open Roles Today",
              "100% Compliant Registrations",
              "4-Hour Flight from India",
            ].map((p) => (
              <div
                key={p}
                className="flex items-center gap-3 rounded-xl border border-[var(--brand)]/30 bg-white px-5 py-4 shadow-soft"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--sky)] text-[var(--brand)]">
                  <Check className="h-4 w-4" />
                </span>
                <span className="font-semibold text-[var(--navy)]">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- faq ----------------------------- */

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <h2 className="text-center font-display text-4xl font-bold text-[var(--navy)] md:text-5xl">
        Questions About Working in Malaysia.
      </h2>
      <div className="mt-12 space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display text-base font-semibold text-[var(--navy)] md:text-lg">
                  {f.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-[var(--brand)] transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-border px-6 py-5 text-sm text-[var(--ink-soft)]">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ----------------------------- final cta ----------------------------- */

function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[var(--sky)] curved-band-top pt-16 pb-24 md:pt-24"
    >
      <Blob className="right-[-160px] top-[-120px] h-[420px] w-[420px] opacity-60" color="white" />
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-display text-4xl font-bold text-[var(--navy)] md:text-5xl">
            Malaysia Is <span className="text-[var(--brand)]">Closer Than You Think.</span>
          </h2>
          <p className="mt-5 max-w-lg text-[var(--ink-soft)]">
            Browse open roles or talk to our team — your coordinator responds within 24 hours.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#roles"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-[var(--brand)] transition-colors"
            >
              Browse Open Roles <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-full border border-[var(--brand)] bg-white px-6 py-3 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--sky)] transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Visual callback: mini three-column composition */}
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-8">
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl border-2 border-[var(--gold)]"
              />
              <img
                src={heroMain}
                alt="KL skyline"
                loading="lazy"
                className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-lift"
              />
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-3">
            <img
              src={heroTop}
              alt=""
              loading="lazy"
              className="aspect-[3/4] w-full rounded-xl object-cover shadow-soft"
            />
            <img
              src={heroBottom}
              alt=""
              loading="lazy"
              className="aspect-[3/4] w-full rounded-xl object-cover shadow-soft"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
