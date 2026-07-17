import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ArrowUpRight, ChevronDown, Building2 } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./footer";
import { Blob, DotGrid } from "./decor";

export type ServiceData = {
  slug: string;
  serviceName: string;
  category: string;
  breadcrumbLabel: string;
  headline1: string;
  headline2: string;
  subtext: string;
  primaryCta: string;
  secondaryCta: string;
  primaryHref?: string;
  secondaryHref?: string;
  heroStats: [Stat, Stat, Stat];
  bandStats: [Stat, Stat, Stat];
  badge: string;
  photo: string;
  photoAlt: string;

  includedHeading: string;
  includedSubline: string;
  features: [Feature, Feature, Feature, Feature];

  whoHeading?: string;
  audiences: [Audience, Audience];

  // NEW — Industries Served
  industriesHeading?: string;
  industriesSubline?: string;
  industries?: Industry[];

  processHeading: string;
  processSubline: string;
  steps: [Step, Step, Step, Step];

  // NEW — FAQs
  faqHeading?: string;
  faqSubline?: string;
  faqs?: FAQ[];

  ctaHeading: string;
  ctaSubline: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

type Stat = { value: string; label: string };
type Feature = { title: string; desc: string };
type Audience = {
  eyebrow: string;
  heading: string;
  desc: string;
  cta: string;
  photo: string;
};
type Step = { title: string; desc: string; tag: string };
type Industry = { title: string; desc: string };
type FAQ = { q: string; a: string };

const featureCardStyle = (i: number) => {
  switch (i) {
    case 0:
      return "bg-navy text-white";
    case 1:
      return "bg-sky text-navy";
    case 2:
      return "bg-white text-navy border border-border";
    default:
      return "bg-mist text-navy";
  }
};

// Fallback content so sections never look empty on services-data.ts entries
// that haven't been updated with industries/faqs yet.
const DEFAULT_INDUSTRIES: Industry[] = [
  {
    title: "Hospitals & Healthcare Groups",
    desc: "Multi-specialty and specialty hospitals across the GCC.",
  },
  { title: "Nursing Homes & Clinics", desc: "Long-term care and outpatient facilities." },
  { title: "Government Health Authorities", desc: "MOH-affiliated and public sector facilities." },
  { title: "Diagnostic & Lab Networks", desc: "Imaging, pathology, and diagnostic chains." },
  { title: "Home Healthcare Providers", desc: "In-home nursing and care agencies." },
  { title: "Rehabilitation Centers", desc: "Post-acute and physiotherapy-led facilities." },
];

const DEFAULT_FAQS: FAQ[] = [
  {
    q: "How long does the placement process take?",
    a: "Typically 6-8 weeks from requirement confirmation to candidate deployment, depending on documentation, licensing, and visa processing timelines.",
  },
  {
    q: "Are candidates pre-screened before submission?",
    a: "Yes. Every candidate goes through credential verification, skills assessment, and interview rounds before being shortlisted for an employer.",
  },
  {
    q: "Is Ozone Overseas licensed for overseas recruitment?",
    a: "Yes, we are an MEA-licensed recruitment agency with 15+ years of experience placing healthcare and technical professionals into the GCC.",
  },
  {
    q: "What support is provided after deployment?",
    a: "We assist with onboarding, documentation follow-up, and remain the point of contact for both employer and candidate post-placement.",
  },
];

function FaqItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
      >
        <span className="font-display font-semibold text-lg text-navy group-hover:text-blue transition">
          {faq.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-blue transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
        }`}
        style={{ display: "grid" }}
      >
        <div className="overflow-hidden">
          <p className="text-muted-foreground leading-relaxed max-w-2xl">{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

export function ServicePage({ data }: { data: ServiceData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const industries = data.industries ?? DEFAULT_INDUSTRIES;
  const faqs = data.faqs ?? DEFAULT_FAQS;

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1200px 500px at 85% -10%, color-mix(in oklab, var(--sky) 90%, white) 0%, transparent 60%), linear-gradient(180deg, #ffffff 0%, #fbfcfe 100%)",
          }}
        />
        <div className="container-ozone pt-8 pb-16 lg:pt-10 lg:pb-24 min-h-[calc(100vh-72px)] flex items-center">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center w-full">
            {/* LEFT */}

            <div className="max-w-xl">
              <nav className="text-xs text-muted-foreground flex items-center gap-1.5 mb-6">
                <Link to="/" className="hover:text-navy">
                  Home
                </Link>
                <span>/</span>
                <Link to="/" className="hover:text-navy">
                  Services
                </Link>
                <span>/</span>
                <span className="text-navy font-medium">{data.breadcrumbLabel}</span>
              </nav>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border shadow-[0_2px_10px_-6px_rgba(11,31,58,0.15)] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy">
                  {data.category}
                </span>
              </div>

              <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-navy">
                {data.headline1}
                <br />
                <span className="text-blue">{data.headline2}</span>
              </h1>

              <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                {data.subtext}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={data.primaryHref ?? "#post"} className="btn-navy btn-navy-hover">
                  {data.primaryCta}
                </a>
                <a
                  href={data.secondaryHref ?? "#browse"}
                  className="btn-outline-blue btn-outline-blue-hover"
                >
                  {data.secondaryCta}
                </a>
              </div>

              {/* Stat row */}
              <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
                {data.heroStats.map((s, i) => (
                  <div key={i} className="relative">
                    {i > 0 && <div className="absolute left-0 top-2 bottom-2 w-px bg-gold/50" />}
                    <div className={i > 0 ? "pl-4" : ""}>
                      <div className="font-display font-bold text-2xl md:text-3xl text-navy">
                        {s.value}
                      </div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground mt-1 leading-tight">
                        {s.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              {/* rings */}

              <Blob
                className="absolute -top-10 -right-16 w-72 h-72 -z-10"
                style={{ opacity: 0.9 }}
              />

              <DotGrid className="absolute -bottom-6 -right-6 w-28 h-28 rounded-2xl -z-10" />

              <div className="relative rounded-[28px] overflow-hidden shadow-soft">
                <img
                  src={data.photo}
                  alt={data.photoAlt}
                  className="w-full h-[520px] object-cover"
                  loading="eager"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(0deg, color-mix(in oklab, var(--navy) 55%, transparent) 0%, transparent 100%)",
                  }}
                />
              </div>

              {/* floating badge */}
              <div className="absolute -top-4 right-4 md:-top-5 md:right-6 bg-white rounded-2xl shadow-soft px-4 py-3 flex items-center gap-2.5 border border-border">
                <div className="w-8 h-8 rounded-full bg-gold/15 grid place-items-center">
                  <Check className="w-4 h-4 text-gold" strokeWidth={3} />
                </div>
                <div className="text-[13px] font-semibold text-navy leading-tight max-w-[180px]">
                  {data.badge}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="relative -mt-2">
        <div className="container-ozone">
          <div
            className="relative rounded-[36px] overflow-hidden bg-sky px-6 md:px-12 py-10"
            style={{
              boxShadow: "0 30px 60px -40px color-mix(in oklab, var(--navy) 50%, transparent)",
            }}
          >
            <Blob className="absolute -top-10 -right-16 w-72 h-72 -z-10" style={{ opacity: 0.9 }} />
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-2">
              {data.bandStats.map((s, i) => (
                <div key={i} className="relative flex flex-col items-center md:items-start">
                  {i > 0 && (
                    <div className="hidden md:block absolute -left-1 top-2 bottom-2 w-px bg-gold/60" />
                  )}
                  <div className="font-display font-bold text-4xl md:text-5xl text-navy">
                    {s.value}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy/70">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED (Key Benefits) */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <Blob className="absolute -top-10 -right-16 w-72 h-72 -z-10" style={{ opacity: 0.9 }} />
        <div className="container-ozone relative">
          <div className="max-w-2xl mb-12">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue mb-3">
              What's Included
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-navy leading-tight">
              {data.includedHeading}
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">{data.includedSubline}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.features.map((f, i) => (
              <div
                key={i}
                className={`group relative rounded-3xl p-7 min-h-[320px] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 ${featureCardStyle(
                  i,
                )}`}
              >
                <div>
                  <div
                    className={`text-[11px] font-mono font-semibold tracking-widest ${
                      i === 0 ? "text-gold" : "text-blue"
                    }`}
                  >
                    0{i + 1}
                  </div>
                  <h3
                    className={`mt-6 font-display font-bold text-xl leading-snug ${
                      i === 0 ? "text-white" : "text-navy"
                    }`}
                  >
                    {f.title}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      i === 0 ? "text-white/75" : "text-muted-foreground"
                    }`}
                  >
                    {f.desc}
                  </p>
                </div>
                <div className="mt-6 flex justify-end">
                  <div
                    className={`w-9 h-9 rounded-full grid place-items-center transition-transform group-hover:rotate-45 ${
                      i === 0 ? "bg-white/10 text-white" : "bg-navy/5 text-navy"
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-mist">
        <Blob className="absolute -top-10 -right-16 w-72 h-72 -z-10" style={{ opacity: 0.9 }} />
        <div className="container-ozone relative">
          <div className="max-w-2xl mb-12">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue mb-3">
              Audience
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-navy leading-tight">
              {data.whoHeading ?? "Who This Is For"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 - light blue */}
            <div className="relative rounded-[28px] bg-sky p-8 md:p-10 min-h-[380px] overflow-hidden shadow-soft">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue">
                {data.audiences[0].eyebrow}
              </div>
              <h3 className="mt-4 font-display font-extrabold text-2xl md:text-3xl text-navy max-w-sm leading-tight">
                {data.audiences[0].heading}
              </h3>
              <p className="mt-4 text-navy/70 max-w-md">{data.audiences[0].desc}</p>
              <a href="#audience-1" className="btn-navy btn-navy-hover mt-8">
                {data.audiences[0].cta} <ArrowRight className="w-4 h-4" />
              </a>
              <div className="absolute -bottom-4 -right-4 w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden border-4 border-white shadow-soft">
                <img
                  src={data.audiences[0].photo}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Card 2 - navy */}
            <div className="relative rounded-[28px] bg-navy p-8 md:p-10 min-h-[380px] overflow-hidden shadow-soft text-white">
              <div
                aria-hidden
                className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20"
                style={{
                  background: "radial-gradient(circle, var(--gold) 0%, transparent 65%)",
                }}
              />
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                {data.audiences[1].eyebrow}
              </div>
              <h3 className="mt-4 font-display font-extrabold text-2xl md:text-3xl text-white max-w-sm leading-tight">
                {data.audiences[1].heading}
              </h3>
              <p className="mt-4 text-white/70 max-w-md">{data.audiences[1].desc}</p>
              <a href="#audience-2" className="btn-gold mt-8">
                {data.audiences[1].cta} <ArrowRight className="w-4 h-4" />
              </a>
              <div className="absolute -bottom-4 -right-4 w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden border-4 border-white/10 shadow-soft">
                <img
                  src={data.audiences[1].photo}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES SERVED — NEW */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <DotGrid className="absolute top-16 right-8 w-24 h-24 opacity-60" />
        <div className="container-ozone relative">
          <div className="max-w-2xl mb-12">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue mb-3">
              Industries Served
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-navy leading-tight">
              {data.industriesHeading ?? "Where our placements land"}
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              {data.industriesSubline ??
                "Built for the sectors that need verified, ready-to-deploy talent."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-white p-6 hover:border-blue transition shadow-[0_4px_20px_-14px_rgba(11,31,58,0.15)]"
              >
                <div className="w-10 h-10 rounded-full bg-sky grid place-items-center">
                  <Building2 className="w-4.5 h-4.5 text-blue" />
                </div>
                <h3 className="mt-4 font-display font-bold text-lg text-navy leading-snug">
                  {ind.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS (Recruitment Process) */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-mist">
        <Blob className="absolute -top-10 -right-16 w-72 h-72 -z-10" style={{ opacity: 0.9 }} />
        <div className="container-ozone relative">
          <div className="max-w-2xl mb-16">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue mb-3">
              How It Works
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-navy leading-tight">
              {data.processHeading}
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">{data.processSubline}</p>
          </div>

          {/* S-path steps */}
          <div className="relative">
            {/* connector line - desktop */}
            <svg
              aria-hidden
              viewBox="0 0 1200 260"
              preserveAspectRatio="none"
              className="hidden lg:block absolute inset-x-0 top-8 w-full h-[260px] -z-10"
            >
              <path
                d="M 60 60 C 260 60 260 200 460 200 S 660 60 860 60 S 1060 200 1140 200"
                fill="none"
                stroke="var(--blue)"
                strokeOpacity="0.25"
                strokeWidth="2"
                strokeDasharray="6 8"
              />
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
              {data.steps.map((step, i) => {
                const raised = i % 2 === 0;
                return (
                  <div key={i} className={`relative ${raised ? "lg:mt-0" : "lg:mt-24"}`}>
                    <div className="absolute -top-8 left-2 font-display font-black text-[80px] leading-none text-blue/10 select-none">
                      0{i + 1}
                    </div>
                    <div className="relative bg-white rounded-2xl border border-border p-6 shadow-soft">
                      <div className="w-11 h-11 rounded-full bg-navy text-white grid place-items-center font-display font-bold">
                        {i + 1}
                      </div>
                      <h3 className="mt-4 font-display font-bold text-lg text-navy leading-snug">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {step.desc}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold border border-gold/40 rounded-full px-2.5 py-1">
                        {step.tag}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs — NEW */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="container-ozone relative">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue mb-3">
                FAQs
              </div>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl text-navy leading-tight">
                {data.faqHeading ?? "Frequently Asked Questions"}
              </h2>
              <p className="mt-4 text-muted-foreground text-lg max-w-sm">
                {data.faqSubline ??
                  "Everything employers and candidates usually ask before starting."}
              </p>
            </div>

            <div>
              {faqs.map((faq, i) => (
                <FaqItem
                  key={i}
                  faq={faq}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-20">
        <div className="container-ozone">
          <div className="relative overflow-hidden rounded-[36px] bg-sky px-6 md:px-14 py-12 md:py-16">
            <Blob className="absolute -top-10 -right-16 w-72 h-72 -z-10" style={{ opacity: 0.9 }} />
            <DotGrid className="absolute bottom-6 right-6 w-24 h-24 rounded-xl opacity-70" />

            <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
              <div>
                <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-navy leading-tight max-w-xl">
                  {data.ctaHeading}
                </h2>
                <p className="mt-4 text-navy/70 text-lg max-w-lg">{data.ctaSubline}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#post" className="btn-navy btn-navy-hover">
                    {data.ctaPrimary}
                  </a>
                  <a href="#talk" className="btn-outline-blue btn-outline-blue-hover">
                    {data.ctaSecondary}
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-3xl shadow-soft p-6 border border-border">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue">
                    Live Signal
                  </div>
                  <div className="mt-3 font-display font-extrabold text-4xl text-navy">
                    {data.heroStats[2].value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {data.heroStats[2].label}
                  </div>
                  <div className="mt-5 pt-5 border-t border-border grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-display font-bold text-xl text-navy">
                        {data.heroStats[0].value}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                        {data.heroStats[0].label}
                      </div>
                    </div>
                    <div>
                      <div className="font-display font-bold text-xl text-navy">
                        {data.heroStats[1].value}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                        {data.heroStats[1].label}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  aria-hidden
                  className="absolute -bottom-3 -right-3 -z-10 w-full h-full rounded-3xl bg-gold/30"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
