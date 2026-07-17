import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  BadgeCheck,
  MapPin,
  Check,
  ArrowRight,
  MessageCircle,
  Phone,
  Mail,
  Handshake,
  Building2,
  GraduationCap,
  Globe2,
  Award,
  Sparkles,
  Stamp,
  Target,
  Eye,
  Users,
  HeartPulse,
  Wrench,
  HardHat,
  Flame,
  UtensilsCrossed,
  Factory,
  Truck,
  Plane,
  Cpu,
  ClipboardCheck,
  FileCheck2,
  Languages,
  UserCheck,
  Stethoscope,
  FileText,
  PlaneTakeoff,
  TrendingUp,
  Quote,
  ScrollText,
  ClipboardList,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import heroTeam from "@/assets/about-hero-team.jpg";
import heroDeparture from "@/assets/about-hero-departure.jpg";
import coordinatorImg from "@/assets/about-coordinator.jpg";
import teamMeetingImg from "@/assets/about-team-meeting.jpg";
import reshmaImg from "@/assets/about-reshma.jpg";
import { Footer } from "@/components/site/footer";
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

/* ---------- Animated counter ---------- */

function Counter({
  to,
  suffix = "",
  duration = 1600,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * to));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

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

/* ---------- Achievements (counters + icons) ---------- */

const achievements = [
  {
    icon: Stamp,
    value: 1,
    suffix: "",
    display: "MEA",
    label: "Govt. of India Recruitment Licence",
    sub: "RA-PB1238/KER/2014",
  },
  { icon: Award, value: 15, suffix: "+", label: "Years of Industry Experience" },
  { icon: Globe2, value: 17, suffix: "", label: "Countries Served" },
  { icon: Users, value: 5000, suffix: "+", label: "Candidates Successfully Deployed" },
  { icon: Handshake, value: 200, suffix: "+", label: "Global Employer Network" },
  { icon: Building2, value: 9, suffix: "", label: "Industry Sectors Served" },
];

function Achievements() {
  return (
    <section className="relative px-5 md:px-8">
      <div
        className="mx-auto max-w-7xl rounded-[32px] bg-[color:var(--blue-wash)] px-6 py-12 md:px-10 md:py-14"
        style={{
          clipPath: "polygon(0 8%, 3% 0, 97% 0, 100% 8%, 100% 92%, 97% 100%, 3% 100%, 0 92%)",
        }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--blue)]">
            Our Track Record
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-[color:var(--navy)] md:text-4xl">
            Numbers That Back the Promise
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {achievements.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex flex-col items-center rounded-[20px] bg-white p-5 text-center shadow-[0_16px_32px_-24px_rgba(11,31,58,0.35)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--blue-soft)]">
                  <Icon className="h-5 w-5 text-[color:var(--blue)]" />
                </span>
                <div className="mt-3 font-display text-2xl font-bold text-[color:var(--navy)] md:text-[28px]">
                  {a.display ? a.display : <Counter to={a.value} suffix={a.suffix} />}
                </div>
                <div className="mt-1.5 text-xs leading-snug text-[color:var(--muted-foreground)]">
                  {a.label}
                </div>
                {a.sub && (
                  <div className="mt-1 text-[10px] font-semibold text-[color:var(--gold)]">
                    {a.sub}
                  </div>
                )}
              </motion.div>
            );
          })}
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

/* ---------- Mission / Vision / Leadership ---------- */

function MissionVisionLeadership() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-24 md:px-8">
      <DotCluster className="right-8 top-8 h-32 w-32" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--blue-soft)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--blue)]">
            What Drives Us
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-[color:var(--navy)] md:text-5xl">
            Mission, Vision &amp; Leadership
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-[26px] border border-[color:var(--border)] bg-white p-8 shadow-[0_20px_40px_-30px_rgba(11,31,58,0.4)]">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--blue)]/10">
              <Target className="h-6 w-6 text-[color:var(--blue)]" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-[color:var(--navy)]">
              Our Mission
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
              To connect skilled candidates with genuine overseas opportunities through a
              transparent, ethical, and fully compliant recruitment process — with no sub-agents, no
              hidden fees, and no shortcuts.
            </p>
          </div>

          <div className="rounded-[26px] bg-[color:var(--navy)] p-8 text-white shadow-[0_20px_40px_-30px_rgba(11,31,58,0.5)]">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
              <Eye className="h-6 w-6 text-[color:var(--gold)]" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold">Our Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              To be the most trusted name in international recruitment from India — recognised for
              deployment-ready candidates, long-term employer partnerships, and an unwavering
              commitment to ethical practice.
            </p>
          </div>
        </div>

        {/* Leadership */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-[26px] border border-[color:var(--border)] bg-[color:var(--blue-soft)] p-8 md:col-span-1">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white">
              <Users className="h-6 w-6 text-[color:var(--blue)]" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-[color:var(--navy)]">
              Leadership
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
              Guided by a management team with deep roots in Gulf recruitment, healthcare placement,
              and immigration compliance — every major decision runs through the same question: does
              this serve the candidate first?
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[26px] border border-[color:var(--border)] bg-white p-8 md:col-span-2">
            <Quote className="h-8 w-8 text-[color:var(--gold)]/40" />
            <blockquote className="mt-4 font-display text-xl font-semibold leading-snug text-[color:var(--navy)] md:text-2xl">
              "We built Ozone on one rule: never place a candidate we wouldn't be comfortable
              sending a family member to."
            </blockquote>
            <div className="mt-5 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--navy)] font-display text-sm font-bold text-white">
                MD
              </span>
              <div>
                <div className="font-display text-sm font-bold text-[color:var(--navy)]">
                  Managing Director
                </div>
                <div className="text-xs text-[color:var(--muted-foreground)]">
                  Ozone Overseas Consultants Pvt. Ltd.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why We Exist (Ethical practice, transparency, compliance) ---------- */

function WhyWeExist() {
  const points = [
    {
      title: "Ethical Recruitment",
      body: "Direct employer relationships — zero sub-agents, zero candidate fees.",
      icon: Handshake,
    },
    {
      title: "Full Transparency",
      body: "Every fee, timeline, and step of the process is put in writing upfront.",
      icon: ScrollText,
    },
    {
      title: "Regulatory Compliance",
      body: "MEA-licensed and IRIS-signatory, operating strictly within Govt. of India norms.",
      icon: ShieldCheck,
    },
    {
      title: "Commitment to Quality",
      body: "Every candidate is screened, verified, and deployment-ready before travel.",
      icon: BadgeCheck,
    },
    {
      title: "Long-Term Relationships",
      body: "94% of employer partners renew — coordinators stay engaged well past placement.",
      icon: TrendingUp,
    },
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
          <ul className="mt-8 space-y-4">
            {points.map((p) => {
              const Icon = p.icon;
              return (
                <li key={p.title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[color:var(--blue)]/10">
                    <Icon className="h-4.5 w-4.5 text-[color:var(--blue)]" />
                  </span>
                  <div>
                    <div className="font-display text-sm font-bold text-[color:var(--navy)]">
                      {p.title}
                    </div>
                    <div className="mt-0.5 text-sm text-[color:var(--muted-foreground)]">
                      {p.body}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Quality Assurance & Compliance ---------- */

const qaPoints = [
  { icon: ClipboardCheck, label: "Rigorous Candidate Pre-Screening" },
  { icon: FileCheck2, label: "Qualification & Experience Verification" },
  { icon: BadgeCheck, label: "Skill Assessment" },
  { icon: Users, label: "Interview Preparation" },
  { icon: UserCheck, label: "Candidate Grooming" },
  { icon: Languages, label: "Language Training Support" },
  { icon: GraduationCap, label: "Prometric Coaching (Healthcare)" },
  { icon: FileText, label: "Documentation Verification" },
  { icon: Stethoscope, label: "Medical Fitness Coordination" },
  { icon: ClipboardList, label: "Visa Documentation Support" },
  { icon: ShieldCheck, label: "Government Compliance" },
  { icon: Handshake, label: "Ethical Recruitment Practices" },
  { icon: PlaneTakeoff, label: "Pre-Departure Orientation" },
  { icon: MessageCircle, label: "Continuous Employer & Candidate Coordination" },
  { icon: Check, label: "Quality Checks Before Deployment" },
];

function QualityAssurance() {
  return (
    <section className="relative overflow-hidden px-5 py-24 md:px-8">
      <WaveBlob className="-left-24 -top-10 h-[380px] w-[380px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--blue-soft)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--blue)]">
            Our Differentiator
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-[color:var(--navy)] md:text-5xl">
            Quality Assurance &amp; Compliance
          </h2>
          <p className="mt-4 text-[color:var(--muted-foreground)]">
            Every candidate who travels through Ozone is qualified, compliant, and deployment-ready
            — vetted through a 15-point process before the file ever reaches an employer.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {qaPoints.map((q, i) => {
            const Icon = q.icon;
            return (
              <motion.div
                key={q.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: (i % 6) * 0.05 }}
                className="flex items-center gap-3.5 rounded-2xl border border-[color:var(--border)] bg-white p-4 shadow-[0_10px_24px_-20px_rgba(11,31,58,0.4)]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[color:var(--blue-soft)]">
                  <Icon className="h-4.5 w-4.5 text-[color:var(--blue)]" />
                </span>
                <span className="text-sm font-medium leading-snug text-[color:var(--navy)]">
                  {q.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 rounded-[24px] bg-[color:var(--navy)] px-6 py-6 text-center md:px-10">
          <p className="text-sm font-medium leading-relaxed text-white/85 md:text-base">
            This is how Ozone Overseas delivers qualified, compliant, deployment-ready candidates —
            while holding the highest standards of ethical recruitment and client service.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Industry Coverage ---------- */

const industries = [
  { icon: HeartPulse, label: "Healthcare" },
  { icon: Wrench, label: "Engineering" },
  { icon: HardHat, label: "Construction" },
  { icon: Flame, label: "Oil & Gas" },
  { icon: UtensilsCrossed, label: "Hospitality" },
  { icon: Factory, label: "Manufacturing" },
  { icon: Truck, label: "Logistics" },
  { icon: Plane, label: "Aviation" },
  { icon: Cpu, label: "IT & Technology" },
];

function IndustryCoverage() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-24 md:px-8">
      <DotCluster className="right-10 bottom-10 h-32 w-32" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--blue-soft)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--blue)]">
            Where We Place
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-[color:var(--navy)] md:text-5xl">
            Industry Coverage
          </h2>
          <p className="mt-4 text-[color:var(--muted-foreground)]">
            Nine sectors, one consistent process — from pre-screening to pre-departure.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group flex flex-col items-center gap-3 rounded-[22px] border border-[color:var(--border)] bg-white p-6 text-center shadow-[0_16px_32px_-26px_rgba(11,31,58,0.35)] transition hover:-translate-y-1 hover:border-[color:var(--blue)]/40 hover:shadow-[0_24px_44px_-24px_rgba(11,31,58,0.4)]"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[color:var(--blue-soft)] transition group-hover:bg-[color:var(--blue)]">
                  <Icon className="h-6 w-6 text-[color:var(--blue)] transition group-hover:text-white" />
                </span>
                <span className="font-display text-sm font-bold text-[color:var(--navy)]">
                  {ind.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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

/* ---------- Page ---------- */

function AboutPage() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <Hero />
        <Achievements />
        <StoryTimeline />
        <MissionVisionLeadership />
        <WhyWeExist />
        <QualityAssurance />
        <IndustryCoverage />
        <Credentials />
        <FeaturedTestimonial />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
