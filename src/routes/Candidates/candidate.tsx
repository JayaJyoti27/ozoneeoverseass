import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  Minus,
  MessageCircle,
  ShieldCheck,
  Users,
  Wallet,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/footer";
import { CandidateTracker } from "@/components/Candidate/candidate-tracker";
import candidate1 from "@/assets/candidate-airport.jpg";
import candidate2 from "@/assets/candidate-2.jpg";
import servicePhoto from "@/assets/service-photo.jpg";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import story4 from "@/assets/story-4.jpg";

export const Route = createFileRoute("/Candidates/candidate")({
  head: () => ({
    meta: [
      { title: "Candidates — Ozone Overseas | Free Applications, One Coordinator" },
      {
        name: "description",
        content:
          "Free applications, zero candidate fees. We handle licensing, visa, flight and onboarding across 10 countries with one accountable coordinator.",
      },
      { property: "og:title", content: "Your Career Abroad Starts Here — Ozone Overseas" },
      {
        property: "og:description",
        content: "Zero candidate fees. 94% visa success. One coordinator from CV to landing.",
      },
    ],
  }),
  component: CandidatesPage,
});

/* ---------- decorative primitives ---------- */
function Blob({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-[45%_55%_60%_40%/45%_55%_45%_55%] bg-blue-soft ${className}`}
      aria-hidden
    />
  );
}
function DotCluster({ className = "" }: { className?: string }) {
  return <div className={`pointer-events-none absolute dot-grid-soft ${className}`} aria-hidden />;
}

/* ---------- page ---------- */
function CandidatesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Header />
      <Hero />
      <TrustBand />
      <WhyChoose />
      <Services />
      <Journey />
      <Stories />
      <Destinations />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ---------- 2. Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Blob className="w-[560px] h-[560px] -top-32 -right-40 opacity-70" />
      <DotCluster className="w-40 h-40 bottom-24 right-16 opacity-70 rounded-2xl" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-14 md:pt-20 pb-20 md:pb-28 grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-20 items-center">
        <div className="fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-soft px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-blue">
            <Sparkles className="w-3.5 h-3.5" /> For Candidates
          </span>
          <h1 className="mt-5 font-display text-[44px] md:text-[64px] leading-[1.02] font-bold text-navy tracking-tight">
            Your Career Abroad
            <br />
            <span className="text-blue">Starts Here.</span>
          </h1>
          <p className="mt-6 text-[17px] md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Applications are free. We handle licensing, visa, flight and onboarding — through one
            coordinator.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/Candidates/dashboard"
              className="group inline-flex items-center gap-2 rounded-full bg-navy text-white px-6 py-3.5 font-medium hover:bg-navy/90 transition-colors"
            >
              View Dashboard{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#journey"
              className="inline-flex items-center gap-2 rounded-full border-2 border-blue text-blue px-6 py-3.5 font-medium hover:bg-blue-soft transition-colors"
            >
              How It Works
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue" /> MEA Licensed
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gold" /> IRIS Signatory
            </div>
            <div className="h-4 w-px bg-border" />
            <div>Since 2009</div>
          </div>
        </div>

        <div className="relative fade-up">
          {/* Floating stat badges */}
          <div className="absolute -top-5 -left-4 md:-left-10 z-20 rounded-full bg-white shadow-[var(--shadow-soft)] pl-1.5 pr-4 py-1.5 flex items-center gap-2.5 border border-border/60">
            <span className="w-7 h-7 rounded-full bg-gold/15 grid place-items-center">
              <Wallet className="w-3.5 h-3.5 text-gold" />
            </span>
            <span className="text-[13px] font-semibold text-navy">₹0 Candidate Fees</span>
          </div>
          <div className="absolute -bottom-4 -right-2 md:-right-6 z-20 rounded-full bg-white shadow-[var(--shadow-soft)] pl-1.5 pr-4 py-1.5 flex items-center gap-2.5 border border-border/60">
            <span className="w-7 h-7 rounded-full bg-blue/10 grid place-items-center">
              <TrendingUp className="w-3.5 h-3.5 text-blue" />
            </span>
            <span className="text-[13px] font-semibold text-navy">94% Visa Success</span>
          </div>
          <div className="relative mx-auto">
            <CandidateTracker />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. Trust stats band ---------- */
function TrustBand() {
  const stats = [
    { icon: Users, label: "Candidates Placed", value: "5,000+" },
    { icon: Wallet, label: "Candidate Fees Ever", value: "₹0" },
    { icon: TrendingUp, label: "Visa Success Rate (2024)", value: "94%" },
  ];
  return (
    <section className="relative">
      <div
        className="relative bg-blue-soft py-10 md:py-14"
        style={{ clipPath: "ellipse(120% 100% at 50% 50%)" }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`relative flex items-center gap-4 md:justify-center ${i > 0 ? "md:border-l md:border-blue/15" : ""}`}
            >
              <div className="w-11 h-11 rounded-2xl bg-white grid place-items-center shadow-sm">
                <s.icon className="w-5 h-5 text-blue" />
              </div>
              <div>
                <div className="text-[11px] font-semibold tracking-widest text-blue/80 uppercase">
                  {s.label}
                </div>
                <div className="font-display font-bold text-navy text-3xl md:text-4xl leading-none mt-1">
                  {s.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. Why Candidates Choose Us ---------- */
function WhyChoose() {
  const points = [
    "Direct employer relationships, no sub-agents",
    "Transparent fee policy in writing",
    "Same coordinator through visa & landing",
    "Free Prometric coaching included",
  ];
  return (
    <section className="relative py-24 md:py-32">
      <Blob className="w-[420px] h-[420px] bottom-0 -right-32 opacity-60" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: photos */}
        <div className="relative h-[520px]">
          <div className="absolute top-0 left-0 w-[62%] rounded-3xl overflow-hidden shadow-[var(--shadow-card)]">
            <img
              src={candidate1}
              alt="Nurse on hospital corridor"
              className="w-full h-[380px] object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[55%] rounded-3xl overflow-hidden shadow-[var(--shadow-card)] border-4 border-white">
            <img
              src={candidate2}
              alt="Healthcare professional"
              className="w-full h-[320px] object-cover"
              loading="lazy"
            />
          </div>
          <DotCluster className="w-32 h-32 top-6 -right-3 rounded-2xl opacity-80" />
          <div className="absolute top-6 -left-4 md:left-4 z-10 rounded-full bg-white shadow-[var(--shadow-soft)] px-4 py-2 flex items-center gap-2 border border-border/60">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span className="text-[13px] font-semibold text-navy">MEA Licensed Since 2009</span>
          </div>
        </div>

        {/* Right: copy */}
        <div>
          <span className="inline-flex rounded-full bg-blue-soft px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-blue">
            Built Around You
          </span>
          <h2 className="mt-5 font-display text-[36px] md:text-5xl font-bold text-navy leading-[1.05] tracking-tight">
            Built Around the Candidate —{" "}
            <span className="italic text-blue font-display">not the commission.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed max-w-lg">
            We built our practice on relationships, not referral chains. Every candidate is placed
            through a licensed portal, with written protections.
          </p>
          <ul className="mt-8 space-y-3.5">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 w-6 h-6 rounded-full bg-gold/15 grid place-items-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-gold" strokeWidth={3} />
                </span>
                <span className="text-[15.5px] text-navy">{p}</span>
              </li>
            ))}
          </ul>
          <a
            href="#roles"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-navy text-white px-6 py-3.5 font-medium hover:bg-navy/90 transition-colors"
          >
            See Open Roles <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. Services (numbered cards, accordion) ---------- */
type ServiceCard = {
  n: string;
  title: string;
  desc: string;
  variant: "navy" | "soft" | "photo" | "white";
};
const SERVICES: ServiceCard[] = [
  {
    n: "01",
    title: "Free Prometric Coaching",
    desc: "Live cohort + recorded sessions. Mock exams turned around in 48h. A dedicated WhatsApp study room with your peers and mentors.",
    variant: "navy",
  },
  {
    n: "02",
    title: "Zero Candidate Fees",
    desc: "Employers pay us — always. The fee clause is written into your offer letter, so there is no ambiguity, ever.",
    variant: "soft",
  },
  {
    n: "03",
    title: "We Handle Every Document",
    desc: "Dataflow verification, MOH/DHA portal filings, embassy stamping, apostille — all done by our in-house licensing team.",
    variant: "photo",
  },
  {
    n: "04",
    title: "A Real Person on WhatsApp",
    desc: "One coordinator, start to landing. They know your file, your timeline and your family situation. No ticket queues.",
    variant: "white",
  },
];
function Services() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="roles" className="relative py-24 md:py-32 bg-blue-soft/50">
      <Blob className="w-[400px] h-[400px] -top-20 -left-32 opacity-60 bg-white" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-blue border border-blue/10">
            Candidate Services
          </span>
          <h2 className="mt-5 font-display text-[36px] md:text-5xl font-bold text-navy leading-[1.05] tracking-tight">
            Everything Included. <span className="italic text-blue">Nothing Hidden.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCardView
              key={s.n}
              card={s}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCardView({
  card,
  open,
  onToggle,
}: {
  card: ServiceCard;
  open: boolean;
  onToggle: () => void;
}) {
  const styles: Record<
    ServiceCard["variant"],
    { wrap: string; num: string; title: string; desc: string; btn: string }
  > = {
    navy: {
      wrap: "bg-navy text-white",
      num: "text-white/25",
      title: "text-white",
      desc: "text-white/75",
      btn: "bg-white/10 text-white hover:bg-white/15",
    },
    soft: {
      wrap: "bg-blue-soft text-navy",
      num: "text-blue/30",
      title: "text-navy",
      desc: "text-navy/70",
      btn: "bg-white text-navy hover:bg-white/80",
    },
    photo: {
      wrap: "text-white",
      num: "text-white/60",
      title: "text-white",
      desc: "text-white/85",
      btn: "bg-white/15 text-white hover:bg-white/25",
    },
    white: {
      wrap: "bg-white text-navy border border-border",
      num: "text-navy/15",
      title: "text-navy",
      desc: "text-navy/70",
      btn: "bg-navy text-white hover:bg-navy/90",
    },
  };
  const st = styles[card.variant];
  return (
    <div
      className={`relative rounded-3xl overflow-hidden p-7 min-h-[380px] flex flex-col justify-between transition-all duration-300 ${st.wrap} ${open ? "md:col-span-2 lg:col-span-1" : ""}`}
    >
      {card.variant === "photo" && (
        <>
          <img
            src={servicePhoto}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/70 to-navy/90" />
        </>
      )}
      <div className="relative flex items-start justify-between">
        <div className={`font-display font-bold text-[52px] leading-none ${st.num}`}>{card.n}</div>
        <button
          onClick={onToggle}
          aria-label="toggle"
          className={`w-9 h-9 rounded-full grid place-items-center transition-colors ${st.btn}`}
        >
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>
      <div className="relative">
        <h3 className={`font-display font-bold text-xl md:text-[22px] leading-tight ${st.title}`}>
          {card.title}
        </h3>
        <div
          className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] mt-3 opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <p className={`text-sm leading-relaxed overflow-hidden ${st.desc}`}>{card.desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- 6. Journey (S-path) ---------- */
const STEPS = [
  {
    n: "01",
    title: "Apply",
    desc: "Submit your CV in under 90 seconds. Free, no CV format needed.",
  },
  {
    n: "02",
    title: "Get Verified",
    desc: "Coordinator review, shortlist call, employer interview within 10–14 days.",
  },
  {
    n: "03",
    title: "License & Visa",
    desc: "Dataflow + Prometric + embassy stamping — all handled for you.",
  },
  {
    n: "04",
    title: "Board & Settle",
    desc: "Pre-departure briefing, airport pickup, first-week check-ins.",
  },
];
function Journey() {
  return (
    <section id="journey" className="relative py-24 md:py-32 overflow-hidden">
      <Blob className="w-[500px] h-[500px] bottom-10 right-[-160px] opacity-60" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.6fr] gap-14 items-start">
          <div>
            <span className="inline-flex rounded-full bg-blue-soft px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-blue">
              Your Journey
            </span>
            <h2 className="mt-5 font-display text-[36px] md:text-5xl font-bold text-navy leading-[1.05] tracking-tight">
              Four Clear Stages,
              <br />
              <span className="italic text-blue">One Accountable Coordinator.</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              From application to landing card — same face, same phone number, same accountability.
            </p>
          </div>

          {/* S-path */}
          <div className="relative min-h-[560px] md:min-h-[520px]">
            <svg
              className="hidden md:block absolute inset-0 w-full h-full"
              viewBox="0 0 700 520"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M60 80 C 260 80, 260 220, 460 220 S 700 380, 240 380 S 60 460, 640 460"
                stroke="oklch(0.46 0.13 260 / 0.35)"
                strokeWidth="2"
                strokeDasharray="6 8"
                fill="none"
              />
            </svg>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-14">
              {STEPS.map((s, i) => (
                <div
                  key={s.n}
                  className={`relative ${i % 2 === 1 ? "md:mt-16" : ""} ${i === 2 ? "md:-mt-4" : ""}`}
                >
                  <div className="absolute -top-6 -left-2 font-display font-bold text-[86px] leading-none text-blue-soft select-none pointer-events-none">
                    {s.n}
                  </div>
                  <div className="relative bg-white rounded-2xl border border-border p-5 shadow-[var(--shadow-soft)]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-navy text-white grid place-items-center font-display font-semibold text-sm">
                        {s.n}
                      </div>
                      <h3 className="font-display font-bold text-navy text-lg">{s.title}</h3>
                    </div>
                    <p className="mt-3 text-[14.5px] text-muted-foreground leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. Success stories ---------- */
const STORIES = [
  {
    photo: story1,
    name: "Reshma K.",
    role: "ICU Nurse → Riyadh",
    quote: "The coordinator called me the day my visa cleared. Same person who called on day one.",
    timeline: "11 weeks · interview to flight",
  },
  {
    photo: story2,
    name: "Anand P.",
    role: "GP Doctor → Dubai",
    quote: "Prometric coaching was free. Passed on my first attempt with the mock cohort.",
    timeline: "14 weeks · interview to flight",
  },
  {
    photo: story3,
    name: "Sneha M.",
    role: "Pharmacist → Muscat",
    quote: "No hidden fees, ever. The offer letter itself said the employer covered everything.",
    timeline: "9 weeks · interview to flight",
  },
  {
    photo: story4,
    name: "Rahul T.",
    role: "Physiotherapist → Doha",
    quote:
      "My family got briefed the week before I flew. Airport pickup was waiting — small thing, big deal.",
    timeline: "12 weeks · interview to flight",
  },
];
function Stories() {
  return (
    <section className="relative py-24 md:py-32 bg-blue-soft/50">
      <Blob className="w-[520px] h-[520px] -bottom-40 left-[-140px] opacity-60 bg-white" />
      <DotCluster className="w-32 h-32 top-16 right-16 opacity-80 rounded-2xl" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-blue border border-blue/10">
            Success Stories
          </span>
          <h2 className="mt-5 font-display text-[36px] md:text-5xl font-bold text-navy leading-[1.05] tracking-tight">
            Real Journeys, Named Coordinators, <span className="italic text-blue">No Scripts.</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STORIES.map((s) => (
            <article
              key={s.name}
              className="group relative bg-white rounded-3xl overflow-hidden border border-border/70 hover:shadow-[var(--shadow-card)] transition-shadow"
            >
              <div className="relative p-3">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={s.photo}
                    alt={s.name}
                    className="w-full h-56 object-cover"
                    loading="lazy"
                  />
                </div>
                <button className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white grid place-items-center shadow-md">
                  <ArrowUpRight className="w-4 h-4 text-navy" />
                </button>
                <div className="absolute -bottom-3 left-6 rounded-full bg-navy text-white text-[11px] font-semibold px-3.5 py-1.5 shadow-sm">
                  {s.role}
                </div>
              </div>
              <div className="p-6 pt-6">
                <p className="font-display font-semibold text-navy text-[15.5px] leading-snug">
                  "{s.quote}"
                </p>
                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                  <div className="text-sm font-semibold text-navy">{s.name}</div>
                  <div className="text-[11.5px] text-muted-foreground">{s.timeline}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 8. Destinations ---------- */
const COUNTRIES = [
  { flag: "🇸🇦", name: "Saudi Arabia" },
  { flag: "🇦🇪", name: "UAE" },
  { flag: "🇴🇲", name: "Oman" },
  { flag: "🇶🇦", name: "Qatar" },
  { flag: "🇰🇼", name: "Kuwait" },
  { flag: "🇧🇭", name: "Bahrain" },
  { flag: "🇬🇧", name: "United Kingdom" },
  { flag: "🇮🇪", name: "Ireland" },
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇲🇹", name: "Malta" },
];
function Destinations() {
  const row = [...COUNTRIES, ...COUNTRIES];
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-blue-soft px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-blue">
            Where You Can Go
          </span>
          <h2 className="mt-5 font-display text-[36px] md:text-5xl font-bold text-navy leading-[1.05] tracking-tight">
            Your Next Chapter, <span className="italic text-blue">in 10 Countries.</span>
          </h2>
        </div>
      </div>

      <div className="mt-14 space-y-4">
        {[0, 1].map((r) => (
          <div
            key={r}
            className="relative overflow-hidden"
            style={{
              maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            }}
          >
            <div
              className={`flex gap-3 whitespace-nowrap w-max ${r === 0 ? "marquee" : "marquee-reverse"}`}
            >
              {row.map((c, i) => (
                <div
                  key={`${r}-${i}`}
                  className="inline-flex items-center gap-2.5 rounded-full bg-white border border-border px-5 py-3 shadow-sm"
                >
                  <span className="text-lg leading-none">{c.flag}</span>
                  <span className="text-[14px] font-semibold text-navy">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 mt-12">
        <div className="rounded-[28px] bg-navy text-white px-6 md:px-10 py-8 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {[
            { v: "32", l: "Open Roles" },
            { v: "17", l: "Partner Hospitals" },
            { v: "94%", l: "Visa Approval Rate" },
          ].map((s, i) => (
            <div
              key={s.l}
              className={`flex flex-col md:items-center ${i > 0 ? "md:border-l md:border-white/10" : ""}`}
            >
              <div className="font-display font-bold text-4xl md:text-5xl">{s.v}</div>
              <div className="mt-1 text-[13px] text-white/70 tracking-wide">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-end">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:gap-2.5 transition-all"
          >
            Explore All Openings <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            "MOH / DHA / SCFHS Approved · Direct portal access",
            "Govt. Licensed · RA-PB1238/KER/2014",
            "Ethical Recruitment · IRIS Signatory",
          ].map((t) => (
            <div
              key={t}
              className="flex items-center gap-3 rounded-2xl bg-blue-soft border border-blue/10 px-4 py-3.5"
            >
              <ShieldCheck className="w-4 h-4 text-blue shrink-0" />
              <span className="text-[13px] font-medium text-navy">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 9. FAQ ---------- */
const FAQS = [
  {
    q: "How much does it cost to apply?",
    a: "Absolutely nothing. Every candidate application is free — Ozone is paid entirely by the employer, and this is written into your offer letter.",
  },
  {
    q: "How long does the whole process take?",
    a: "For most Gulf healthcare roles, 8–12 weeks from a successful interview to your flight, depending on Dataflow and embassy timelines.",
  },
  {
    q: "Do you help with Prometric preparation?",
    a: "Yes — free live cohort classes, recorded lessons, and 48-hour mock exam turnaround. Included for every candidate we represent.",
  },
  {
    q: "Which countries do you place candidates in?",
    a: "Saudi Arabia, UAE, Oman, Qatar, Kuwait, Bahrain, UK, Ireland, Germany and Malta. Roles vary by month — check the Openings feed.",
  },
  {
    q: "What happens if I don't clear the employer interview?",
    a: "Your coordinator resubmits you to the next matching role at no cost. Your file stays active in our system.",
  },
  {
    q: "Will I have one point of contact throughout?",
    a: "Yes. One named coordinator on WhatsApp, from CV submission through your first month on the ground.",
  },
];
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-24 md:py-32 bg-secondary/60">
      <DotCluster className="w-40 h-40 bottom-12 left-8 opacity-60 rounded-2xl" />
      <div className="relative max-w-3xl mx-auto px-5 md:px-8">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-blue border border-blue/10">
            FAQ
          </span>
          <h2 className="mt-5 font-display text-[36px] md:text-5xl font-bold text-navy leading-[1.05] tracking-tight">
            Candidate Questions,
            <br />
            <span className="italic text-blue">Straight Answers.</span>
          </h2>
        </div>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                >
                  <span className="font-display font-semibold text-navy text-[16.5px] md:text-lg">
                    {f.q}
                  </span>
                  <span className="shrink-0 w-8 h-8 rounded-full bg-white border border-border grid place-items-center group-hover:border-blue transition-colors">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-blue" />
                    ) : (
                      <Plus className="w-4 h-4 text-navy" />
                    )}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}
                >
                  <p className="overflow-hidden text-[14.5px] text-muted-foreground leading-relaxed pr-12">
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- 10. Final CTA ---------- */
function FinalCTA() {
  return (
    <section className="relative pt-24 md:pt-28">
      <div className="relative bg-blue-soft" style={{ clipPath: "ellipse(140% 100% at 50% 100%)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-20 pb-28 md:pt-28 md:pb-36 grid lg:grid-cols-[1.15fr_1fr] gap-14 items-center">
          <div>
            <span className="inline-flex rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-blue border border-blue/10">
              Start Today
            </span>
            <h2 className="mt-5 font-display text-[36px] md:text-[54px] font-bold text-navy leading-[1.02] tracking-tight">
              One CV. One Coordinator. <br />
              <span className="italic text-blue">Ten Countries Open.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
              Free to apply. Visa & licensing handled. Your tracker goes live the day you submit.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#roles"
                className="inline-flex items-center gap-2 rounded-full bg-navy text-white px-6 py-3.5 font-medium hover:bg-navy/90"
              >
                Browse Open Roles <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border-2 border-blue text-blue px-6 py-3.5 font-medium hover:bg-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="relative">
            <DotCluster className="w-28 h-28 -top-6 -right-4 rounded-2xl opacity-70" />
            <div className="relative mx-auto">
              <CandidateTracker compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
