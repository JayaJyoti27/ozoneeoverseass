import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  ArrowRight,
  Check,
  Users,
  Globe2,
  Calendar,
  BadgeCheck,
  Scale,
  UserCheck,
  GraduationCap,
  Briefcase,
  ClipboardCheck,
  MessageSquare,
  Star,
  BookOpen,
  BookOpenCheck,
  FileCheck,
  Stethoscope,
  Stamp,
  Plane,
  Headphones,
  ChevronLeft,
  ChevronRight,
  Quote,
  Phone,
  Mail,
  MessageCircle,
  Building2,
  Wrench,
  HardHat,
  Fuel,
  UtensilsCrossed,
  Factory,
  Truck,
  Cpu,
  ShoppingBag,
  FileEdit,
  ClipboardList,
  ShieldQuestion,
  Video,
  Handshake,
  FileSignature,
  Languages,
  Award,
  FolderCheck,
  PlaneTakeoff,
  Ticket,
  PlaneLanding,
  HeartHandshake,
  Syringe,
} from "lucide-react";
import { useRef, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/footer";

export const Route = createFileRoute("/For-Candidates")({
  head: () => ({
    meta: [
      { title: "Work Abroad with Ozone Overseas — International Jobs for Indian Professionals" },
      {
        name: "description",
        content:
          "Government of India MEA-licensed recruitment consultancy. Healthcare, engineering, construction and technical roles across 17 countries. Zero candidate fees. Apply free.",
      },
      {
        property: "og:title",
        content: "Work Abroad with Ozone Overseas — International Jobs for Indian Professionals",
      },
      {
        property: "og:description",
        content:
          "MEA-licensed recruitment consultancy placing Indian professionals abroad. 17 countries, zero candidate fees, end-to-end support.",
      },
      { property: "og:url", content: "/for-candidates" },
    ],
    links: [{ rel: "canonical", href: "/for-candidates" }],
  }),
  component: ForCandidatesPage,
});

/* ---------- local decorative bits — mirrors homepage exactly ---------- */

const Blob = ({
  className = "",
  color = "var(--blue-soft)",
}: {
  className?: string;
  color?: string;
}) => (
  <svg viewBox="0 0 600 600" className={className} aria-hidden>
    <path
      fill={color}
      d="M421,318Q406,386,343,418Q280,450,213,420Q146,390,116,325Q86,260,121,196Q156,132,222,108Q288,84,353,113Q418,142,431,201Q444,250,421,318Z"
    />
  </svg>
);

const DotGrid = ({ className = "" }: { className?: string }) => (
  <div className={`dot-grid ${className}`} aria-hidden />
);

/* ---------- shared UI — homepage button/pill/heading system ---------- */

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue backdrop-blur">
      {children}
    </span>
  );
}

function BtnSolid({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-blue transition"
    >
      {children}
    </a>
  );
}
function BtnSolidBlue({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white hover:bg-navy transition"
    >
      {children}
    </a>
  );
}
function BtnOutline({
  href,
  children,
  dark,
}: {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <a
      href={href}
      className={
        dark
          ? "inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
          : "inline-flex items-center gap-2 rounded-full border-2 border-blue px-6 py-3 text-sm font-semibold text-blue hover:bg-blue hover:text-white transition"
      }
    >
      {children}
    </a>
  );
}

function SectionHeading({
  eyebrow,
  lines,
  sub,
  center,
  light,
}: {
  eyebrow?: string;
  lines: [string, string, string?];
  sub?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <div
          className={`mb-4 text-xs font-semibold uppercase tracking-[0.2em] ${
            light ? "text-blue-soft" : "text-blue"
          }`}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className={`font-display text-3xl font-bold leading-[1.15] sm:text-4xl md:text-5xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        <span className="block">{lines[0]}</span>
        <span className="block">{lines[1]}</span>
        {lines[2] && <span className="block text-blue">{lines[2]}</span>}
      </h2>
      {sub && <p className={`mt-4 text-base ${light ? "text-white/70" : "text-ink"}`}>{sub}</p>}
    </div>
  );
}

/* ---------- unsplash helper (curated stable IDs) ---------- */
const IMG = {
  hero: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1200&q=80",
  counsel:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  prometric:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  t1: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  t2: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  t3: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
};

/* ---------- Page ---------- */

function ForCandidatesPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header />
      <main>
        <Hero />
        <WhyOzone />
        <Journey />
        <JobsByCountry />
        <QualityAssurance />
        <Industries />

        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- 1. HERO (fits a single screen — no scroll to see it all) ---------- */
function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-background lg:h-[calc(100dvh-4rem)] lg:min-h-[640px]">
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-8 px-4 pb-4 pt-6 sm:px-6 lg:grid-cols-[48%_52%] lg:items-center lg:gap-8 lg:px-8 lg:pb-0 lg:pt-8">
        {/* Left */}
        <div className="relative z-10">
          <Pill>
            <ShieldCheck className="h-3.5 w-3.5" />
            Government of India MEA Licensed · Est. 2009
          </Pill>
          <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-5xl xl:text-[3.4rem]">
            <span className="block">Your Career Abroad</span>
            <span className="block">Starts With the Right</span>
            <span className="block text-blue">Recruitment Partner.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink sm:text-base">
            Ozone Overseas is a Government-licensed international recruitment consultancy placing
            Indian professionals into verified roles across 17 countries — with full compliance,
            ethical practices, and end-to-end support from registration to post-arrival.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <BtnSolid href="/candidate">
              Browse Open Roles <ArrowRight className="h-4 w-4" />
            </BtnSolid>
            <BtnSolidBlue href="#apply">
              Apply Now <ArrowRight className="h-4 w-4" />
            </BtnSolidBlue>
            <BtnOutline href="#contact">Contact Us</BtnOutline>
          </div>
          <div className="mt-4 text-xs text-ink/70">
            ₹0 Candidate Fees · MEA License No. RA-PB1238/KER/2014 · IRIS Ethical Recruitment
            Signatory
          </div>
        </div>

        {/* Right */}
        <div className="relative z-0 hidden lg:block lg:pl-4">
          <Blob
            className="absolute -right-24 -top-20 h-[360px] w-[360px] opacity-50"
            color="var(--blue-wash)"
          />
          <DotGrid className="absolute -bottom-6 -right-6 h-[160px] w-[160px] opacity-70" />
          <div className="relative mx-auto max-w-md">
            {/* blue offset border */}
            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl border-[6px] border-blue/60" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-[0_20px_60px_-30px_rgba(11,31,58,0.35)]">
              <img
                src={IMG.hero}
                alt="Ozone Overseas recruitment counsellor meeting with a candidate in the Kochi office"
                className="aspect-[5/4] w-full object-cover"
                loading="eager"
              />
            </div>
            {/* Rings */}
            <div className="pointer-events-none absolute -left-4 -top-4 h-16 w-16 rounded-full border-2 border-blue/40" />
            <div className="pointer-events-none absolute -bottom-5 right-8 h-20 w-20 rounded-full border-2 border-navy/30" />
            {/* Floating badge */}
            <div className="absolute -right-4 top-6 max-w-[220px] rounded-2xl border border-border bg-white p-3 shadow-[0_20px_60px_-30px_rgba(11,31,58,0.35)]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-blue" />
                <div className="font-display text-xs font-semibold text-navy">
                  Govt. of India MEA Licensed
                </div>
              </div>
              <div className="mt-1 text-[10px] text-ink/70">License No. RA-PB1238/KER/2014</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat strip */}
      <div className="relative border-t border-border bg-blue-wash">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-y-3 divide-blue/20 px-4 py-3 sm:grid-cols-6 sm:px-6 lg:divide-x lg:px-8 lg:py-4">
          {[
            { icon: BadgeCheck, big: "₹0", small: "Candidate Fees" },
            { icon: Users, big: "5,000+", small: "Deployed" },
            { icon: Globe2, big: "17", small: "Countries" },
            { icon: Calendar, big: "15+", small: "Years" },
            { icon: ShieldCheck, big: "MEA", small: "Licensed" },
            { icon: Scale, big: "IRIS", small: "Signatory" },
          ].map(({ icon: Icon, big, small }) => (
            <div key={small} className="flex items-center gap-2 px-2 text-navy lg:gap-3 lg:px-3">
              <Icon className="h-4 w-4 shrink-0 text-blue lg:h-5 lg:w-5" />
              <div>
                <div className="font-display text-sm font-bold leading-tight lg:text-lg">{big}</div>
                <div className="text-[9px] uppercase tracking-wider text-ink/70 lg:text-[11px]">
                  {small}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. WHY ---------- */
function WhyOzone() {
  const rows = [
    {
      t: "Zero Candidate Fees",
      d: "Employers pay our fees. You never pay us a placement, registration, or documentation fee — in writing.",
    },
    {
      t: "End-to-End Support",
      d: "From first application to first week on site, one coordinator handles everything.",
    },
    {
      t: "Free Prometric & License Coaching",
      d: "DHA, HAAD, SCFHS, QCHP, MOH-Oman — included, no extra cost.",
    },
    {
      t: "Government Licensed & IRIS Certified",
      d: "Every placement is MEA compliant and meets destination-country regulatory requirements.",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24">
      <Blob
        className="absolute -bottom-32 -right-32 h-[440px] w-[440px] opacity-50"
        color="var(--blue-wash)"
      />
      <DotGrid className="absolute left-6 top-10 h-[180px] w-[180px] opacity-60" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        {/* photos */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-[0_20px_60px_-30px_rgba(11,31,58,0.35)]">
            <img
              src={IMG.counsel}
              alt="Candidate counselling session with an Ozone coordinator"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 hidden w-56 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_20px_60px_-30px_rgba(11,31,58,0.35)] sm:block">
            <img
              src={IMG.prometric}
              alt="Prometric exam coaching session in progress"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -left-4 top-6 rounded-2xl border border-border bg-white px-4 py-3 shadow-[0_20px_60px_-30px_rgba(11,31,58,0.35)]">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-blue" />
              <div className="font-display text-sm font-semibold text-navy">
                ₹0 Candidate Fees · Ever
              </div>
            </div>
          </div>
        </div>

        {/* copy */}
        <div>
          <SectionHeading
            eyebrow="Why Ozone"
            lines={["We Don't Just Place You.", "We Prepare You", "for Everything."]}
            sub="A premium recruitment consultancy — not a manpower agency. Every stage is coordinator-led, compliance-first, and cost-free to you."
          />
          <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-white shadow-[0_12px_40px_-28px_rgba(11,31,58,0.3)]">
            {rows.map((r) => (
              <div key={r.t} className="flex gap-4 p-5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-wash">
                  <Check className="h-4 w-4 text-blue" />
                </div>
                <div>
                  <div className="font-display text-base font-semibold text-navy">{r.t}</div>
                  <div className="mt-1 text-sm text-ink">{r.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. JOURNEY — redesigned as a connected, phase-grouped timeline ---------- */
const JOURNEY_PHASES: {
  phase: string;
  tag: string;
  color: string;
  steps: { icon: typeof FileEdit; t: string; d: string }[];
}[] = [
  {
    phase: "Apply & Get Selected",
    tag: "Phase 01",
    color: "var(--color-blue)",
    steps: [
      {
        icon: FileEdit,
        t: "Registration",
        d: "Submit your CV in under 2 minutes — free, no format required.",
      },
      {
        icon: ClipboardList,
        t: "Profile Assessment",
        d: "Coordinator reviews qualification, experience, and target countries.",
      },
      {
        icon: ShieldQuestion,
        t: "Pre-Screening & Verification",
        d: "Certificates, licenses, and experience authenticated.",
      },
      {
        icon: Video,
        t: "Interview Preparation",
        d: "Mock interviews, presentation coaching, professional readiness.",
      },
      {
        icon: Handshake,
        t: "Employer Interview",
        d: "Introduction to a verified employer, coordinator-facilitated.",
      },
      {
        icon: FileSignature,
        t: "Selection",
        d: "Offer letter issued, terms confirmed in writing.",
      },
    ],
  },
  {
    phase: "Train & Get Certified",
    tag: "Phase 02",
    color: "var(--color-navy)",
    steps: [
      {
        icon: Languages,
        t: "Language Training",
        d: "English proficiency support arranged where applicable.",
      },
      {
        icon: Award,
        t: "Licensing Training",
        d: "Prometric coaching — DHA / HAAD / SCFHS / QCHP.",
      },
      {
        icon: Syringe,
        t: "Medical Examination",
        d: "Medical fitness coordination at approved centres.",
      },
      {
        icon: FolderCheck,
        t: "Documentation & Attestation",
        d: "Dataflow, certificate attestation, MEA compliance.",
      },
    ],
  },
  {
    phase: "Process & Depart",
    tag: "Phase 03",
    color: "var(--color-blue)",
    steps: [
      {
        icon: Stamp,
        t: "Visa Processing",
        d: "Employment visa file, embassy coordination, stamping.",
      },
      {
        icon: PlaneTakeoff,
        t: "Pre-Departure Orientation",
        d: "Cultural orientation, workplace guidance, document checklist.",
      },
      {
        icon: Ticket,
        t: "Ticketing & Travel",
        d: "Flight booking and travel documentation confirmed.",
      },
      {
        icon: PlaneLanding,
        t: "Airport Departure",
        d: "Departure support, coordinator on call on travel day.",
      },
    ],
  },
  {
    phase: "Arrive & Settle In",
    tag: "Phase 04",
    color: "var(--color-navy)",
    steps: [
      {
        icon: HeartHandshake,
        t: "Post-Arrival Support",
        d: "First-week check-in, accommodation confirmed, coordinator on call.",
      },
    ],
  },
];

function Journey() {
  return (
    <section id="journey" className="relative overflow-hidden bg-blue-wash py-20 sm:py-24">
      <svg
        viewBox="0 0 1440 60"
        className="absolute inset-x-0 top-0 h-8 w-full text-white"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,10 1440,30 L1440,0 L0,0 Z"
          fill="currentColor"
        />
      </svg>
      <DotGrid className="absolute right-8 top-10 h-[200px] w-[200px] opacity-60" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Complete Recruitment Journey"
          lines={[
            "From Registration to Post-Arrival Support.",
            "One Coordinator.",
            "Zero Surprises.",
          ]}
          sub="Every Ozone candidate moves through the same four phases — comprehensive, compliant, and fully supported at every step."
          center
        />

        <div className="relative mt-16">
          {/* continuous spine */}
          <div
            className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-blue/50 via-navy/20 to-blue/50 sm:left-1/2 sm:-translate-x-1/2"
            aria-hidden
          />

          <div className="space-y-14">
            {JOURNEY_PHASES.map((group, gi) => (
              <div key={group.phase}>
                {/* phase label */}
                <div className="relative mb-6 flex items-center gap-4 sm:justify-center">
                  <div
                    className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-4 border-blue-wash text-sm font-display font-bold text-white shadow-[0_8px_24px_-8px_rgba(11,31,58,0.5)]"
                    style={{ background: group.color }}
                  >
                    {String(gi + 1).padStart(2, "0")}
                  </div>
                  <div className="sm:absolute sm:left-1/2 sm:ml-9">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue">
                      {group.tag}
                    </div>
                    <div className="font-display text-lg font-bold text-navy sm:text-xl">
                      {group.phase}
                    </div>
                  </div>
                </div>

                {/* steps within the phase */}
                <div className="grid gap-4 pl-[3.75rem] sm:grid-cols-2 sm:gap-5 sm:pl-0">
                  {group.steps.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.t}
                        className="flex gap-4 rounded-2xl border border-border bg-white p-5 shadow-[0_12px_40px_-28px_rgba(11,31,58,0.3)] transition-transform hover:-translate-y-0.5"
                      >
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-wash text-blue">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-display text-sm font-semibold text-navy">{s.t}</div>
                          <div className="mt-1 text-xs leading-relaxed text-ink/70">{s.d}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA band */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-white">
          <div className="flex flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row sm:px-10">
            <div>
              <div className="font-display text-xl font-bold text-navy sm:text-2xl">
                Ready to Start? Register in Under 2 Minutes.
              </div>
              <div className="text-sm text-ink/70">
                No fee, no format, no chase — coordinator assigned within 24 hours.
              </div>
            </div>
            <BtnSolid href="/candidate">
              Apply Free <ArrowRight className="h-4 w-4" />
            </BtnSolid>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. JOBS BY COUNTRY ---------- */
type Role = { flag: string; title: string; count: number };
const COUNTRIES: Record<string, Role[]> = {
  Kuwait: [
    { flag: "🇰🇼", title: "Registered Nurses", count: 4 },
    { flag: "🇰🇼", title: "Staff Nurses", count: 3 },
    { flag: "🇰🇼", title: "Caregivers", count: 2 },
    { flag: "🇰🇼", title: "Construction Workers", count: 3 },
  ],
  "Saudi Arabia": [
    { flag: "🇸🇦", title: "Nurses — ICU, OT, Staff", count: 15 },
    { flag: "🇸🇦", title: "Doctors", count: 4 },
    { flag: "🇸🇦", title: "Engineers", count: 6 },
    { flag: "🇸🇦", title: "Hospitality Staff", count: 5 },
    { flag: "🇸🇦", title: "Skilled Technicians", count: 8 },
  ],
  UAE: [
    { flag: "🇦🇪", title: "Healthcare Professionals", count: 12 },
    { flag: "🇦🇪", title: "Hospitality Staff", count: 6 },
    { flag: "🇦🇪", title: "Retail Professionals", count: 4 },
    { flag: "🇦🇪", title: "Drivers", count: 3 },
    { flag: "🇦🇪", title: "Engineers", count: 5 },
  ],
  Qatar: [
    { flag: "🇶🇦", title: "Nurses", count: 8 },
    { flag: "🇶🇦", title: "Electricians", count: 4 },
    { flag: "🇶🇦", title: "HVAC Technicians", count: 3 },
    { flag: "🇶🇦", title: "Hotel Staff", count: 3 },
  ],
  Oman: [
    { flag: "🇴🇲", title: "Nurses", count: 5 },
    { flag: "🇴🇲", title: "Industrial Workers", count: 4 },
    { flag: "🇴🇲", title: "Mechanical Technicians", count: 3 },
  ],
  Malaysia: [{ flag: "🇲🇾", title: "Manufacturing Operators", count: 6 }],
  UK: [{ flag: "🇬🇧", title: "NMC-Registered Nurses", count: 9 }],
  Canada: [{ flag: "🇨🇦", title: "Caregivers & LPN", count: 5 }],
  Australia: [{ flag: "🇦🇺", title: "Aged Care Workers", count: 4 }],
  Germany: [{ flag: "🇩🇪", title: "Nurses (Ausbildung route)", count: 3 }],
};

function JobsByCountry() {
  const tabs = Object.keys(COUNTRIES);
  const [active, setActive] = useState("Kuwait");
  const roles = COUNTRIES[active];
  return (
    <section id="jobs" className="relative overflow-hidden bg-background py-20 sm:py-24">
      <Blob
        className="absolute -bottom-32 -left-24 h-[440px] w-[440px] opacity-50"
        color="var(--blue-wash)"
      />
      <DotGrid className="absolute right-6 top-8 h-[200px] w-[200px] opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Live Openings by Destination"
          lines={["Live Openings by Destination.", "Find Your Country.", "Find Your Role."]}
          sub="Each country has its own visa process, licensing body, and role categories. We support all of them."
          center
        />
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-border">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`relative -mb-px pb-3 pt-1 text-sm font-medium transition-colors ${
                active === t ? "text-navy" : "text-ink/60 hover:text-navy"
              }`}
            >
              {t}
              <span
                className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-blue transition-opacity ${
                  active === t ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((r) => (
            <div
              key={r.title}
              className="group rounded-2xl border border-border bg-white p-5 shadow-[0_12px_40px_-28px_rgba(11,31,58,0.3)] transition-all hover:-translate-y-0.5 hover:border-blue/40"
            >
              <div className="flex items-start justify-between">
                <div className="text-2xl">{r.flag}</div>
                <div className="rounded-full bg-blue-wash px-3 py-1 text-xs font-semibold text-blue">
                  {r.count} open
                </div>
              </div>
              <div className="mt-4 font-display text-lg font-semibold text-navy">{r.title}</div>
              <div className="mt-1 text-xs text-ink/70">
                {active} · Coordinator assigned within 24 hours
              </div>
              <a
                href="#apply"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue hover:text-navy"
              >
                View Roles <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <BtnSolid href="#apply">
            View All Openings <ArrowRight className="h-4 w-4" />
          </BtnSolid>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. QUALITY ASSURANCE ---------- */
function QualityAssurance() {
  const cards = [
    {
      i: UserCheck,
      t: "Rigorous Pre-Screening",
      d: "Every candidate is vetted before employer introduction.",
    },
    {
      i: GraduationCap,
      t: "Qualification Verification",
      d: "Certificates verified with issuing institutions.",
    },
    {
      i: Briefcase,
      t: "Experience Validation",
      d: "Employer references and work-history authenticated.",
    },
    {
      i: ClipboardCheck,
      t: "Skill Assessment",
      d: "Role-specific technical and practical assessments.",
    },
    {
      i: MessageSquare,
      t: "Interview Preparation",
      d: "Mock interviews with employer-specific formats.",
    },
    {
      i: Star,
      t: "Candidate Grooming",
      d: "Professional presence, communication, workplace readiness.",
    },
    {
      i: BookOpen,
      t: "Language Training Support",
      d: "English proficiency support for destination roles.",
    },
    {
      i: BookOpenCheck,
      t: "Prometric Coaching — Healthcare",
      d: "DHA, HAAD, SCFHS, QCHP prep included free.",
    },
    {
      i: FileCheck,
      t: "Documentation Verification",
      d: "Attestation, Dataflow, MEA compliance handled.",
    },
    {
      i: Stethoscope,
      t: "Medical Fitness Coordination",
      d: "Approved medical centres, results tracked.",
    },
    {
      i: Stamp,
      t: "Visa Documentation Support",
      d: "Employment visa filing and embassy coordination.",
    },
    {
      i: ShieldCheck,
      t: "Government Compliance Check",
      d: "Every placement is MEA-compliant, no exceptions.",
    },
    {
      i: Scale,
      t: "Ethical Recruitment Practices",
      d: "IRIS Signatory. Aligned with global fair-hiring norms.",
    },
    {
      i: Plane,
      t: "Pre-Departure Orientation",
      d: "Cultural, workplace, and first-week practical guidance.",
    },
    {
      i: Headphones,
      t: "Continuous Coordinator Support",
      d: "Post-arrival check-in through the first month.",
    },
  ];
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white sm:py-24">
      <svg
        viewBox="0 0 1440 60"
        className="absolute inset-x-0 top-0 h-8 w-full text-background"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,10 1440,30 L1440,0 L0,0 Z"
          fill="currentColor"
        />
      </svg>
      <Blob
        className="absolute -bottom-24 -left-24 h-[440px] w-[440px] opacity-20"
        color="var(--blue-soft)"
      />
      <DotGrid className="absolute right-6 top-10 h-[200px] w-[200px] opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Quality Assurance"
          lines={[
            "Quality Assurance at Every Stage.",
            "You Arrive Ready.",
            "Employers Receive the Best.",
          ]}
          sub="Before any Ozone candidate boards a flight, they've completed a rigorous multi-stage quality process — because we believe preparation is not optional, it's part of the service."
          center
          light
        />

        <div className="mt-12 flex items-center justify-end gap-2">
          <button
            aria-label="Scroll left"
            onClick={() => scroll(-1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scroll(1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 hover:bg-white/10"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div
          ref={scroller}
          className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((c, i) => {
            const Icon = c.i;
            return (
              <div
                key={c.t}
                className="relative min-w-[260px] max-w-[280px] shrink-0 snap-start rounded-2xl bg-white p-5 text-navy shadow-[0_12px_40px_-28px_rgba(11,31,58,0.3)]"
              >
                <div className="text-xs font-semibold text-navy/40">
                  Stage {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-3 grid h-10 w-10 place-items-center rounded-xl bg-blue-wash text-blue">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-3 font-display text-sm font-semibold text-navy">{c.t}</div>
                <div className="mt-1 text-xs leading-relaxed text-ink/70">{c.d}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs">
            <Scale className="h-4 w-4 text-blue-soft" /> IRIS Ethical Recruitment Signatory
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs">
            <ShieldCheck className="h-4 w-4 text-blue-soft" /> Govt. of India MEA Licensed ·
            RA-PB1238/KER/2014
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. INDUSTRIES — no photography, icon + pattern driven ---------- */
function Industries() {
  const small = [
    { i: Wrench, t: "Engineering" },
    { i: HardHat, t: "Construction" },
    { i: Fuel, t: "Oil & Gas" },
    { i: UtensilsCrossed, t: "Hospitality" },
    { i: Factory, t: "Manufacturing" },
    { i: Truck, t: "Logistics" },
    { i: Plane, t: "Aviation" },
    { i: Cpu, t: "IT & Technology" },
    { i: ShoppingBag, t: "Retail" },
  ];
  return (
    <section id="services" className="relative overflow-hidden bg-blue-wash py-20 sm:py-24">
      <svg
        viewBox="0 0 1440 60"
        className="absolute inset-x-0 top-0 h-8 w-full text-navy"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,10 1440,30 L1440,0 L0,0 Z"
          fill="currentColor"
        />
      </svg>
      <Blob
        className="absolute -top-24 -right-24 h-[420px] w-[420px] opacity-40"
        color="oklch(0.94 0.025 250)"
      />
      <DotGrid className="absolute bottom-10 left-6 h-[200px] w-[200px] opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Industries"
          lines={["Ten Industries.", "All Covered.", ""]}
          sub="From clinical care to heavy engineering — coordinator expertise across every sector we recruit for."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:grid-rows-3">
          {/* Big highlight card — icon & pattern driven, no photo */}
          <div className="relative overflow-hidden rounded-2xl bg-navy shadow-[0_20px_60px_-30px_rgba(11,31,58,0.4)] lg:col-span-2 lg:row-span-2">
            {/* decorative icon lattice */}
            <div
              className="pointer-events-none absolute inset-0 grid grid-cols-5 gap-6 p-8 opacity-[0.08]"
              aria-hidden
            >
              {Array.from({ length: 15 }).map((_, i) => (
                <Stethoscope key={i} className="h-10 w-10 text-white" />
              ))}
            </div>
            <Blob
              className="pointer-events-none absolute -bottom-16 -right-16 h-[320px] w-[320px] opacity-20"
              color="var(--blue-soft)"
            />
            <div className="relative flex h-full flex-col justify-end p-8 text-white">
              <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-white/10 backdrop-blur">
                <Stethoscope className="h-8 w-8 text-blue-soft" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-widest text-blue-soft">
                Largest Placement Sector
              </div>
              <div className="mt-2 font-display text-3xl font-bold sm:text-4xl">
                Healthcare & Nursing
              </div>
              <p className="mt-3 max-w-lg text-sm text-white/80">
                ICU, OT, ER, Paediatric, Staff Nurse, Allied Health. SCFHS, DHA, HAAD, QCHP and NMC
                pathways fully supported.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["SCFHS", "DHA", "HAAD", "QCHP", "NMC"].map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wide"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <BtnSolidBlue href="#jobs">
                  View Nursing Roles <ArrowRight className="h-4 w-4" />
                </BtnSolidBlue>
              </div>
            </div>
          </div>
          {small.map((s) => {
            const Icon = s.i;
            return (
              <div
                key={s.t}
                className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-[0_12px_40px_-28px_rgba(11,31,58,0.3)] transition-transform hover:-translate-y-0.5"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-wash text-blue">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-display text-sm font-semibold text-navy">{s.t}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. PRESENCE ---------- */

/* ---------- 8. TESTIMONIALS ---------- */
function Testimonials() {
  const items = [
    {
      photo: IMG.t2,
      quote:
        "My Ozone coordinator messaged me every Tuesday with my exact application stage. I never had to chase anyone.",
      name: "Reshma K.",
      meta: "ICU Nurse → Riyadh · Al Hammadi Hospital",
    },
    {
      photo: IMG.t3,
      quote: "Zero fees, in writing. Even my flight was booked before I asked.",
      name: "Sneha M.",
      meta: "OT Nurse → Abu Dhabi · Cleveland Clinic",
    },
    {
      photo: IMG.t1,
      quote:
        "Failed Prometric first time. Free retake coaching, cleared on attempt two. Ozone didn't give up on me.",
      name: "Anand P.",
      meta: "Biomedical Technician → Doha · Hamad Medical",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-blue-wash py-20 sm:py-24">
      <svg
        viewBox="0 0 1440 60"
        className="absolute inset-x-0 top-0 h-8 w-full text-background"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,10 1440,30 L1440,0 L0,0 Z"
          fill="currentColor"
        />
      </svg>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          lines={["Real Journeys. Real People.", "No Scripts.", ""]}
          sub="Every testimonial below is a candidate we've placed in the last 12 months."
          center
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.name}
              className="relative flex flex-col rounded-2xl bg-white p-6 shadow-[0_20px_60px_-30px_rgba(11,31,58,0.3)]"
            >
              <Quote className="h-8 w-8 rotate-180 text-blue" />
              <blockquote className="mt-4 flex-1 font-display text-lg leading-snug text-navy">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="h-11 w-11 rounded-full border border-border object-cover"
                  loading="lazy"
                />
                <div className="flex-1">
                  <div className="font-display text-sm font-semibold text-navy">{t.name}</div>
                  <div className="text-xs text-ink/70">{t.meta}</div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 9. FINAL CTA ---------- */
function FinalCTA() {
  return (
    <section id="apply" className="relative overflow-hidden bg-navy py-20 text-white sm:py-24">
      <svg
        viewBox="0 0 1440 60"
        className="absolute inset-x-0 top-0 h-8 w-full text-blue-wash"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,10 1440,30 L1440,0 L0,0 Z"
          fill="currentColor"
        />
      </svg>
      <Blob
        className="absolute -bottom-24 -right-24 h-[440px] w-[440px] opacity-15"
        color="var(--blue-soft)"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:px-8">
        <div>
          <SectionHeading
            eyebrow="Get Started"
            lines={["Ready to Work Abroad?", "Register free.", "We handle everything."]}
            sub="From your first application to your first day on site — one coordinator, zero fees, full compliance."
            light
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#apply-form"
              className="inline-flex items-center gap-2 rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-navy transition"
            >
              Apply for Jobs <ArrowRight className="h-4 w-4" />
            </a>
            <BtnOutline href="#jobs" dark>
              Browse Roles <ArrowRight className="h-4 w-4" />
            </BtnOutline>
            <BtnOutline href="#contact" dark>
              Contact Us
            </BtnOutline>
          </div>
        </div>

        <div className="grid gap-3">
          {[
            { i: Phone, t: "24×7 Hotline", d: "+91 484 000 0000" },
            { i: MessageCircle, t: "WhatsApp", d: "wa.me/914840000000" },
            { i: Mail, t: "Email", d: "hello@ozoneoverseas.com" },
            { i: Building2, t: "Head Office", d: "MG Road, Kochi, Kerala 682016" },
          ].map((c) => {
            const Icon = c.i;
            return (
              <div
                key={c.t}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10">
                  <Icon className="h-5 w-5 text-blue-soft" />
                </div>
                <div className="flex-1 border-l border-white/15 pl-4">
                  <div className="text-xs uppercase tracking-widest text-white/60">{c.t}</div>
                  <div className="font-display text-base font-semibold">{c.d}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
