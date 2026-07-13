import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ShieldCheck,
  BadgeCheck,
  MapPin,
  Check,
  ArrowRight,
  MessageCircle,
  Phone,
  Mail,
  Menu,
  Handshake,
  Building2,
  GraduationCap,
  Globe2,
  Award,
  Sparkles,
  Stamp,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import heroTeam from "@/assets/about-hero-team.jpg";
import heroDeparture from "@/assets/about-hero-departure.jpg";
import coordinatorImg from "@/assets/about-coordinator.jpg";
import teamMeetingImg from "@/assets/about-team-meeting.jpg";
import reshmaImg from "@/assets/about-reshma.jpg";
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ozone Overseas — 15 Years of Ethical Recruitment" },
      {
        name: "description",
        content:
          "MEA-licensed since 2009. 5,000+ placements across 17 countries. Zero sub-agents, direct employer relationships, and coordinators who put candidates first.",
      },
      { property: "og:title", content: "About Ozone Overseas" },
      {
        property: "og:description",
        content:
          "Founded in Kochi in 2009. 15 years of building careers that last — MEA licensed, IRIS-signatory, ethical recruitment.",
      },
    ],
  }),
  component: AboutPage,
});

/* ---------- Reusable shapes ---------- */

function WaveBlob({
  className = "",
  color = "var(--blue-soft)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={"pointer-events-none absolute " + className}
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill={color}
        d="M421.5,314Q392,378,331,411.5Q270,445,205.5,412Q141,379,113,309.5Q85,240,133,187Q181,134,242.5,113Q304,92,364.5,120Q425,148,447,194Q469,240,421.5,314Z"
      />
    </svg>
  );
}

function DotCluster({ className = "" }: { className?: string }) {
  return (
    <div className={"dot-grid pointer-events-none absolute opacity-70 " + className} aria-hidden />
  );
}

function Pill({ children, icon: Icon }: { children: React.ReactNode; icon?: React.ElementType }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border)] bg-white px-3 py-1.5 text-xs font-medium text-[color:var(--navy)] shadow-[0_1px_2px_rgba(11,31,58,0.04)]">
      {Icon ? <Icon className="h-3.5 w-3.5 text-[color:var(--blue)]" /> : null}
      {children}
    </span>
  );
}

/* ---------- Header ---------- */

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <WaveBlob className="-right-24 -top-32 h-[520px] w-[520px]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-16 md:grid-cols-2 md:gap-10 md:px-8 md:py-24">
        {/* Left */}
        <div className="relative flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--blue-soft)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--blue)]">
            <Sparkles className="h-3.5 w-3.5" /> About Ozone Overseas
          </span>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] text-[color:var(--navy)] md:text-[64px]">
            15 Years of Placing
            <br />
            <span className="text-[color:var(--blue)]">Careers That Last.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[color:var(--muted-foreground)]">
            Founded in 2009 and MEA-licensed since day one — we've spent 15 years building direct
            employer relationships, zero sub-agent networks, and a process that puts the candidate
            first.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#story"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[color:var(--navy)]/15 transition hover:bg-[color:var(--blue)]"
            >
              Our Story <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <Pill icon={ShieldCheck}>MEA License Verified</Pill>
            <Pill icon={BadgeCheck}>Est. 2009</Pill>
            <Pill icon={MapPin}>Kochi, Kerala</Pill>
          </div>
        </div>

        {/* Right — photo collage */}
        <div className="relative min-h-[520px]">
          <DotCluster className="bottom-0 right-0 h-40 w-40" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute right-0 top-2 h-[440px] w-[78%] overflow-hidden rounded-[28px] shadow-[0_30px_60px_-25px_rgba(11,31,58,0.35)] ring-1 ring-black/5"
          >
            <img
              src={heroTeam}
              alt="Ozone Overseas team at work in the Kochi office"
              className="h-full w-full object-cover"
              width={1024}
              height={1024}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="absolute -bottom-2 left-0 h-52 w-56 overflow-hidden rounded-[22px] border-[6px] border-white shadow-[0_20px_45px_-20px_rgba(11,31,58,0.35)]"
          >
            <img
              src={heroDeparture}
              alt="Placed nurse at the airport, ready to depart for her new role"
              className="h-full w-full object-cover"
              width={1024}
              height={1024}
            />
          </motion.div>

          {/* Floating MEA badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute right-4 top-4 flex w-[240px] items-start gap-3 rounded-2xl bg-white/95 p-3.5 shadow-[0_20px_40px_-15px_rgba(11,31,58,0.3)] backdrop-blur"
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[color:var(--gold)]/15">
              <Check className="h-4.5 w-4.5 text-[color:var(--gold)]" strokeWidth={3} />
            </div>
            <div>
              <div className="font-display text-[13px] font-bold leading-tight text-[color:var(--navy)]">
                MEA Licensed Since 2009
              </div>
              <div className="mt-0.5 text-[10.5px] text-[color:var(--muted-foreground)]">
                RA-PB1238/KER/2014
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats band ---------- */

function StatsBand() {
  const stats = [
    { n: "15+", l: "Years in Recruitment" },
    { n: "5,000+", l: "Careers Placed" },
    { n: "17", l: "Countries Active" },
  ];
  return (
    <section className="px-5 md:px-8">
      <div
        className="mx-auto max-w-7xl rounded-[32px] bg-[color:var(--blue-wash)] px-8 py-10 md:py-12"
        style={{
          clipPath: "polygon(0 12%, 4% 0, 96% 0, 100% 12%, 100% 88%, 96% 100%, 4% 100%, 0 88%)",
        }}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((s, i) => (
            <div key={s.l} className="relative flex flex-col items-center text-center">
              <div className="font-display text-5xl font-bold text-[color:var(--navy)] md:text-[56px]">
                {s.n}
              </div>
              <div className="mt-2 text-sm font-medium tracking-wide text-[color:var(--muted-foreground)]">
                {s.l}
              </div>
              {i < stats.length - 1 && (
                <span className="absolute right-0 top-1/2 hidden h-14 w-px -translate-y-1/2 bg-[color:var(--gold)]/60 md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Story / Timeline ---------- */

const milestones = [
  {
    year: "2009",
    icon: Award,
    title: "Founded in Kochi",
    body: "MEA license obtained. First 12 placements in Saudi Arabia lay the foundation for a candidate-first model.",
  },
  {
    year: "2012",
    icon: Building2,
    title: "GCC Expansion",
    body: "Expanded operations to the UAE and Qatar. Signed our first multi-year hospital network partnership.",
  },
  {
    year: "2015",
    icon: BadgeCheck,
    title: "500th Placement",
    body: "Reached the 500-placement milestone and opened a dedicated in-house documentation processing centre.",
  },
  {
    year: "2018",
    icon: GraduationCap,
    title: "Free Prometric Coaching",
    body: "Launched free Prometric coaching for healthcare candidates. Over 1,000 candidates coached to date.",
  },
  {
    year: "2021",
    icon: Globe2,
    title: "Into Europe & Canada",
    body: "Extended reach to Canada, the UK, and Germany. Crossed 3,000 total placements across all destinations.",
  },
  {
    year: "2024",
    icon: Sparkles,
    title: "5,000+ Careers Placed",
    body: "200+ active employer partners. 17 countries. Same office, same license, same coordinators-first ethos.",
  },
];

function StoryTimeline() {
  return (
    <section id="story" className="relative overflow-hidden px-5 py-24 md:px-8">
      <WaveBlob className="-left-32 top-24 h-[420px] w-[420px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--blue-soft)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--blue)]">
            Our Story
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-[color:var(--navy)] md:text-5xl">
            From Kochi to the GCC — and Beyond.
          </h2>
          <p className="mt-4 text-[color:var(--muted-foreground)]">
            One office. One license. 15 years of showing up for candidates and employers the same
            way.
          </p>
        </div>

        {/* Diagonal texture backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-40 h-[80%] opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-24deg, var(--navy) 0 1px, transparent 1px 22px)",
          }}
        />

        <div className="relative mt-20">
          {/* Center connector */}
          <div className="pointer-events-none absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[color:var(--blue)]/70 via-[color:var(--blue)]/70 to-[color:var(--blue)]/70 md:left-1/2 md:-translate-x-1/2" />

          <ul className="space-y-14 md:space-y-24">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              const isLeft = i % 2 === 0;
              return (
                <li key={m.year} className="relative md:grid md:grid-cols-2 md:gap-16">
                  {/* Marker */}
                  <span className="absolute left-6 top-6 z-10 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full bg-white ring-2 ring-[color:var(--gold)] md:left-1/2">
                    <span className="h-2 w-2 rounded-full bg-[color:var(--gold)]" />
                  </span>

                  {/* Faint big year — sits behind card */}
                  <span
                    className={
                      "pointer-events-none absolute top-0 hidden select-none font-display text-[140px] font-bold leading-none text-[color:var(--blue)]/10 md:block " +
                      (isLeft ? "right-[52%] mr-4" : "left-[52%] ml-4")
                    }
                  >
                    {m.year}
                  </span>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className={
                      "ml-16 rounded-[22px] border border-[color:var(--border)] bg-white p-6 shadow-[0_20px_40px_-30px_rgba(11,31,58,0.4)] md:ml-0 " +
                      (isLeft ? "md:col-start-1 md:mr-8 md:text-right" : "md:col-start-2 md:ml-8")
                    }
                  >
                    <div
                      className={"flex items-center gap-3 " + (isLeft ? "md:flex-row-reverse" : "")}
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--blue-soft)]">
                        <Icon className="h-5 w-5 text-[color:var(--blue)]" />
                      </span>
                      <span className="font-display text-2xl font-bold text-[color:var(--gold)] md:hidden">
                        {m.year}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold text-[color:var(--navy)]">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                      {m.body}
                    </p>
                    <div
                      className={
                        "mt-4 hidden font-display text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--blue)]/70 md:block"
                      }
                    >
                      {m.year}
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why We Exist ---------- */

function WhyWeExist() {
  const points = [
    "Direct employer relationships — no middlemen",
    "One coordinator per candidate, start to landing",
    "Fee policy in writing before any engagement",
    "Post-placement support through first 90 days",
  ];
  return (
    <section className="relative overflow-hidden bg-white px-5 py-24 md:px-8">
      <WaveBlob className="-right-28 bottom-0 h-[420px] w-[420px]" />
      <DotCluster className="left-6 top-10 h-32 w-40" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2">
        {/* Left photos */}
        <div className="relative min-h-[480px]">
          <div className="absolute left-0 top-0 h-[380px] w-[75%] overflow-hidden rounded-[26px] shadow-[0_30px_60px_-30px_rgba(11,31,58,0.35)]">
            <img
              src={coordinatorImg}
              alt="Coordinator reviewing documents with a candidate"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1024}
              height={1024}
            />
          </div>
          <div className="absolute -bottom-2 right-2 h-56 w-56 overflow-hidden rounded-[22px] border-[6px] border-white shadow-[0_20px_45px_-20px_rgba(11,31,58,0.35)]">
            <img
              src={teamMeetingImg}
              alt="Ozone team meeting in the Kochi office"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1024}
              height={1024}
            />
          </div>
          <div className="absolute left-4 bottom-6 flex items-center gap-2.5 rounded-full bg-white px-4 py-2 shadow-lg">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[color:var(--gold)]/15">
              <Check className="h-3.5 w-3.5 text-[color:var(--gold)]" strokeWidth={3} />
            </span>
            <span className="font-display text-[12px] font-bold text-[color:var(--navy)]">
              Zero Sub-Agents
            </span>
          </div>
        </div>

        {/* Right copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--blue-soft)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--blue)]">
            Our Philosophy
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[color:var(--navy)] md:text-[46px]">
            Built Around People —{" "}
            <span className="text-[color:var(--blue)]">Not Pipeline Numbers.</span>
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[color:var(--muted-foreground)]">
            Most recruitment agencies optimize for volume. We optimize for fit — which is why 94% of
            our placements renew their contracts, and why candidates refer their colleagues to us.
          </p>
          <ul className="mt-8 space-y-3.5">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[color:var(--blue)]/10">
                  <Check className="h-3.5 w-3.5 text-[color:var(--blue)]" strokeWidth={3} />
                </span>
                <span className="text-[15px] text-[color:var(--navy)]">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Team ---------- */

/* ---------- Credentials ---------- */

function Credentials() {
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto mb-4 block h-px w-24 bg-[color:var(--gold)]/60" />
          <h2 className="font-display text-4xl font-bold text-[color:var(--navy)] md:text-5xl">
            Licensed. Ethical. Accountable.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {/* 01 Navy */}
          <article className="relative overflow-hidden rounded-[26px] bg-[color:var(--navy)] p-8 text-white shadow-[0_30px_60px_-30px_rgba(11,31,58,0.5)]">
            <div className="font-display text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--gold)]">
              01
            </div>
            <BadgeCheck className="mt-6 h-10 w-10 text-[color:var(--gold)]" />
            <h3 className="mt-6 font-display text-xl font-bold">
              Government of India — MEA Licensed
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              License No. RA-PB1238/KER/2014, first issued 2009, renewed annually. Direct access to
              the eMigrate portal.
            </p>
          </article>

          {/* 02 Light blue */}
          <article className="relative overflow-hidden rounded-[26px] bg-[color:var(--blue-soft)] p-8 text-[color:var(--navy)]">
            <div className="font-display text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--blue)]">
              02
            </div>
            <ShieldCheck className="mt-6 h-10 w-10 text-[color:var(--blue)]" />
            <h3 className="mt-6 font-display text-xl font-bold">
              IRIS Ethical Recruitment Signatory
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
              Committed to zero candidate fees, transparent policy in writing, and no sub-agent
              networks — verified by the IRIS framework.
            </p>
          </article>

          {/* 03 White */}
          <article className="relative overflow-hidden rounded-[26px] border border-[color:var(--border)] bg-white p-8 text-[color:var(--navy)]">
            <div className="font-display text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--blue)]">
              03
            </div>
            <Stamp className="mt-6 h-10 w-10 text-[color:var(--navy)]" />
            <h3 className="mt-6 font-display text-xl font-bold">
              MOH · DHA · SCFHS · QCHP Approved
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
              Direct portal access across all major GCC licensing bodies. Documentation is processed
              entirely in-house.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ---------- Featured testimonial ---------- */

function FeaturedTestimonial() {
  const steps = [
    { label: "Applied", date: "Apr 3" },
    { label: "Verified", date: "Apr 21" },
    { label: "Visa", date: "Jun 12" },
    { label: "Placed", date: "Jun 24" },
  ];
  return (
    <section className="relative px-5 md:px-8">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-[color:var(--blue-soft)] px-6 py-16 md:px-14 md:py-20"
        style={{
          clipPath: "polygon(0 6%, 6% 0, 94% 0, 100% 6%, 100% 100%, 0 100%)",
        }}
      >
        <WaveBlob className="-bottom-24 -left-20 h-[360px] w-[360px]" color="#ffffff" />
        <span
          aria-hidden
          className="absolute left-6 top-4 font-display text-[220px] font-bold leading-none text-[color:var(--navy)]/8 select-none"
          style={{ color: "rgba(11,31,58,0.07)" }}
        >
          "
        </span>

        <div className="relative grid gap-10 md:grid-cols-5 md:gap-14">
          <div className="md:col-span-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--blue)]">
              A Placement Story
            </span>
            <blockquote className="mt-6 font-display text-3xl font-bold leading-[1.2] text-[color:var(--navy)] md:text-[40px]">
              "My Ozone coordinator messaged me every Tuesday with the exact stage I was at — I
              never had to chase anyone."
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <img
                src={reshmaImg}
                alt="Reshma K."
                className="h-14 w-14 rounded-full border-2 border-white object-cover shadow"
                loading="lazy"
                width={112}
                height={112}
              />
              <div>
                <div className="font-display text-[15px] font-bold text-[color:var(--navy)]">
                  Reshma K.
                </div>
                <div className="text-xs text-[color:var(--muted-foreground)]">
                  ICU Nurse → Riyadh, KSA · 11 weeks, interview to flight
                </div>
              </div>
            </div>
          </div>

          {/* Tracker card */}
          <div className="md:col-span-2">
            <div className="rounded-[24px] border border-[color:var(--border)] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(11,31,58,0.35)]">
              <div className="flex items-center justify-between">
                <div className="font-display text-sm font-bold text-[color:var(--navy)]">
                  Candidate Tracker
                </div>
                <span className="rounded-full bg-[color:var(--gold)]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[color:var(--gold)]">
                  Complete
                </span>
              </div>
              <div className="mt-1 text-xs text-[color:var(--muted-foreground)]">
                Reshma K. · #OZ-4821
              </div>
              <ol className="mt-5 space-y-3.5">
                {steps.map((s, i) => (
                  <li key={s.label} className="relative flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[color:var(--gold)]/15 ring-1 ring-[color:var(--gold)]/40">
                      <Check className="h-3.5 w-3.5 text-[color:var(--gold)]" strokeWidth={3} />
                    </span>
                    {i < steps.length - 1 && (
                      <span className="absolute left-[13.5px] top-7 h-3.5 w-px bg-[color:var(--gold)]/40" />
                    )}
                    <div className="flex flex-1 items-center justify-between">
                      <div className="font-display text-sm font-bold text-[color:var(--navy)]">
                        {s.label}
                      </div>
                      <div className="text-[11px] text-[color:var(--muted-foreground)]">
                        {s.date}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact CTA ---------- */

function ContactCTA() {
  return (
    <section className="relative px-5 pt-24 md:px-8">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-[color:var(--blue-soft)] px-6 py-14 md:px-14 md:py-20"
        style={{
          clipPath: "polygon(0 6%, 6% 0, 94% 0, 100% 6%, 100% 100%, 0 100%)",
        }}
      >
        <WaveBlob className="-right-16 -top-16 h-[300px] w-[300px]" color="#ffffff" />
        <div className="relative grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight text-[color:var(--navy)] md:text-[46px]">
              Questions About Ozone?
            </h2>
            <p className="mt-4 max-w-md text-[color:var(--muted-foreground)]">
              Whether you're a candidate exploring options or an employer looking to hire — we
              respond within one business day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[color:var(--navy)]/20 transition hover:bg-[color:var(--blue)]"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--blue)] px-5 py-3 text-sm font-semibold text-[color:var(--blue)] transition hover:bg-white"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-[24px] border border-white bg-white/70 p-6 backdrop-blur">
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[color:var(--blue)]/10">
                  <MapPin className="h-4 w-4 text-[color:var(--blue)]" />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--blue)]">
                    Office
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--navy)]">
                    Ozone Overseas Consultants Pvt. Ltd.
                    <br />
                    123 Recruitment House, MG Road, Kochi, Kerala 682016
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[color:var(--blue)]/10">
                  <Phone className="h-4 w-4 text-[color:var(--blue)]" />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--blue)]">
                    Hotline
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--navy)]">+91 484 000 0000</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[color:var(--blue)]/10">
                  <Mail className="h-4 w-4 text-[color:var(--blue)]" />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--blue)]">
                    Email
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--navy)]">
                    careers@ozoneoverseas.in
                  </div>
                </div>
              </div>
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
    <footer className="relative mt-24 bg-[color:var(--navy)] text-white">
      {/* Soft light-blue wave divider at top */}
      <svg
        aria-hidden
        className="absolute -top-1 left-0 h-10 w-full"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
      >
        <path
          fill="var(--blue-soft)"
          d="M0,60 C240,0 480,60 720,30 C960,0 1200,60 1440,20 L1440,0 L0,0 Z"
        />
      </svg>
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white font-display text-sm font-bold text-[color:var(--navy)]">
                OO
              </div>
              <div className="font-display text-lg font-bold">Ozone Overseas</div>
            </div>
            <p className="mt-4 text-sm text-white/70">
              MEA Licensed International Recruitment Since 2009.
            </p>
          </div>
          {[
            {
              h: "Services",
              l: ["Candidates", "Employers", "Prometric Coaching", "Documentation"],
            },
            {
              h: "Destinations",
              l: ["Saudi Arabia", "UAE", "Qatar", "United Kingdom"],
            },
            {
              h: "Company",
              l: ["About", "Careers", "Press", "Contact"],
            },
          ].map((c) => (
            <div key={c.h}>
              <div className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--gold)]">
                {c.h}
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-white/75">
                {c.l.map((x) => (
                  <li key={x}>
                    <a href="#" className="transition hover:text-white">
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <div>
            MEA License No. B-0123/KER/PER/1000+/5/8888/2009 · © 2025 Ozone Overseas Consultants
            Pvt. Ltd.
          </div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */

function AboutPage() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <Hero />
        <StatsBand />
        <StoryTimeline />
        <WhyWeExist />

        <Credentials />
        <FeaturedTestimonial />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
