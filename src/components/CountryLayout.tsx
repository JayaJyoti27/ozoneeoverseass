import { Link } from "@tanstack/react-router";
import {
  Stethoscope,
  HeartPulse,
  HandHeart,
  HardHat,
  Briefcase,
  Wrench,
  Building2,
  UtensilsCrossed,
  Zap,
  Snowflake,
  Hotel,
  Factory,
  Cog,
  ShoppingBag,
  Car,
  Hammer,
  GraduationCap,
  ShieldCheck,
  FileCheck2,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Quote,
  Wallet,
  Compass,
  MapPin,
  Star,
} from "lucide-react";
import type { Country } from "@/data/countries";
import { MEA_LICENSE, PROCESS_STEPS, WHY_OZONE } from "@/data/countries";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const iconMap = {
  Stethoscope,
  HeartPulse,
  HandHeart,
  HardHat,
  Briefcase,
  Wrench,
  Building2,
  UtensilsCrossed,
  Zap,
  Snowflake,
  Hotel,
  Factory,
  Cog,
  ShoppingBag,
  Car,
  Hammer,
  GraduationCap,
} as const;

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

const WaveBand = ({ className = "", flip = false }: { className?: string; flip?: boolean }) => (
  <svg
    viewBox="0 0 1440 80"
    className={className}
    preserveAspectRatio="none"
    aria-hidden
    style={{ transform: flip ? "scaleY(-1)" : undefined }}
  >
    <path
      d="M0,40 C240,90 480,0 720,30 C960,60 1200,80 1440,30 L1440,80 L0,80 Z"
      fill="currentColor"
    />
  </svg>
);

/* ---------- page ---------- */

export function CountryPageLayout({ country }: { country: Country }) {
  const jobLd = {
    "@context": "https://schema.org",
    "@graph": country.jobCategories.map((job) => ({
      "@type": "JobPosting",
      title: `${job.title} — ${country.name}`,
      description: `${job.title} opportunities in ${country.name} via Ozone Overseas, MEA-licensed recruitment.`,
      hiringOrganization: { "@type": "Organization", name: "Ozone Overseas" },
      jobLocation: {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressCountry: country.name },
      },
      employmentType: "FULL_TIME",
    })),
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobLd) }}
      />
      <Header />
      <Hero country={country} />
      <LicenseBar country={country} />
      <Stats country={country} />
      <Jobs country={country} />
      <SalaryBenefits country={country} />
      <ProcessTimeline />
      <Visa country={country} />
      <Documentation country={country} />
      <LifeInCountry country={country} />
      <WhyOzone />
      <Testimonials country={country} />
      <FAQ country={country} />
      <CTA country={country} />
      <Footer />
    </div>
  );
}

/* ---------- 1. hero ---------- */

function Hero({ country }: { country: Country }) {
  return (
    <section className="relative overflow-hidden">
      <svg
        aria-hidden
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMaxYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="countryHeroWave" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-blue-wash)" />
            <stop offset="100%" stopColor="var(--color-blue-soft)" />
          </linearGradient>
        </defs>
        <path
          d="M1440,0 L1440,900 L520,900 C620,720 420,640 520,460 C620,280 980,260 880,120 C820,40 1180,0 1440,0 Z"
          fill="url(#countryHeroWave)"
        />
        <path
          d="M1440,120 C1240,180 1100,60 940,140 C780,220 720,440 880,540 C1040,640 1300,560 1440,640 L1440,120 Z"
          fill="var(--color-blue-soft)"
          opacity="0.55"
        />
      </svg>
      <DotGrid className="absolute left-6 top-32 h-24 w-24 opacity-70" />

      <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:py-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" /> Govt. of India · MEA Licensed
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-navy md:text-5xl lg:text-6xl">
            {country.name} Recruitment
            <br />
            <span className="text-blue">Agency — Ozone Overseas</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-ink md:text-lg">{country.tagline}</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/80">{country.intro}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/For-Candidates"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-blue transition"
            >
              Apply for Jobs in {country.name} <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-blue px-6 py-3 text-sm font-semibold text-blue hover:bg-blue hover:text-white transition"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="relative mx-auto h-[380px] w-full max-w-[480px] lg:h-[440px]">
          <DotGrid className="absolute top-0 right-0 h-20 w-20" />
          <div className="absolute left-2 top-4 h-full w-[86%] overflow-hidden rounded-[28px] ring-4 ring-blue/25 shadow-[0_30px_60px_-20px_rgba(30,77,140,0.5)]">
            <img
              src={country.heroImageUrl}
              alt={`${country.name} — ${country.heroImageKeywords}`}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <DotGrid className="absolute -bottom-2 -left-2 h-16 w-16 opacity-80" />
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. floating license bar ---------- */

function LicenseBar({ country }: { country: Country }) {
  return (
    <section className="px-6">
      <div className="relative z-20 mx-auto -mt-10 max-w-6xl">
        <div className="rounded-[28px] bg-navy p-6 text-white shadow-[0_20px_60px_-30px_rgba(11,31,58,0.5)] md:flex md:items-center md:justify-between md:p-8">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-blue-soft">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <div className="text-xs uppercase tracking-wider text-blue-soft">
                Government of India MEA Recruitment Licence
              </div>
              <div className="mt-1 font-mono text-lg font-semibold">{MEA_LICENSE}</div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-white/70 md:mt-0">
            Every {country.name} placement is documented, contract-transparent, and lodged through
            the MEA e-Migrate system. No cash. No shortcuts.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. stats ---------- */

function Stats({ country }: { country: Country }) {
  const accents = ["bg-blue", "var(--gold, #C9A646)", "bg-navy"];
  return (
    <section className="relative overflow-hidden px-6 py-20">
      <Blob className="absolute -left-24 top-0 h-72 w-72 opacity-50" color="var(--blue-wash)" />
      <div className="relative mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {country.stats.map((s, i) => (
          <div
            key={s.label}
            className="relative overflow-hidden rounded-[20px] border border-border bg-white p-6 text-center shadow-[0_12px_40px_-28px_rgba(11,31,58,0.35)]"
          >
            <span
              className={`absolute inset-x-0 top-0 h-1 ${i % 2 === 0 ? "bg-blue" : "bg-navy"}`}
            />
            <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-blue-wash text-blue">
              <TrendingIconFor index={i} />
            </div>
            <div className="font-display text-3xl font-bold text-navy">{s.value}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-ink/70">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrendingIconFor({ index }: { index: number }) {
  const icons = [Star, MapPin, Building2, Wallet];
  const Icon = icons[index % icons.length];
  return <Icon className="h-5 w-5" />;
}

/* ---------- 4. jobs ---------- */

function Jobs({ country }: { country: Country }) {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <Blob className="absolute -right-32 top-10 h-80 w-80 opacity-50" color="var(--blue-wash)" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Live opportunities"
          title={`Live Opportunities in ${country.name}`}
          subtitle="Vetted employers, transparent contracts, MEA-registered placements only."
        />
        <div className="mt-12 flex flex-wrap justify-center gap-5">
          {country.jobCategories.map((job) => {
            const Icon = iconMap[job.icon] ?? Briefcase;
            return (
              <Link
                key={job.title}
                to="/"
                className="group relative w-full max-w-[340px] flex-1 basis-[300px] overflow-hidden rounded-[24px] border border-border bg-white p-6 shadow-[0_12px_40px_-28px_rgba(11,31,58,0.3)] transition hover:-translate-y-1 hover:border-blue"
              >
                <span className="mb-5 inline-flex rounded-xl bg-blue-wash p-3 text-blue">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="font-display text-lg font-semibold text-navy">{job.title}</div>
                <div className="mt-1 text-sm text-ink/70">Current openings in {country.name}</div>
                <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue">
                  View roles <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. salary & benefits ---------- */

function SalaryBenefits({ country }: { country: Country }) {
  return (
    <section className="relative overflow-hidden bg-blue-wash px-6 py-24">
      <Blob className="absolute -left-24 -top-16 h-72 w-72 opacity-50" color="var(--blue-soft)" />
      <DotGrid className="absolute bottom-10 right-10 h-20 w-20 opacity-70" />
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
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Salary & benefits"
          title={`Indicative pay bands in ${country.name}`}
          subtitle="Ranges reflect current employer offers on our roster. Actual salary depends on experience, certification, and employer tier."
        />
        <div className="mt-10 overflow-hidden rounded-[24px] bg-white shadow-[0_20px_60px_-30px_rgba(11,31,58,0.3)]">
          <div className="hidden grid-cols-[1.4fr_1fr_1.6fr] gap-4 border-b border-border bg-blue-wash/60 px-6 py-4 text-xs uppercase tracking-wider text-ink/70 md:grid">
            <div>Role</div>
            <div>Salary range</div>
            <div>Standard benefits</div>
          </div>
          <ul className="divide-y divide-border">
            {country.salaryTable.map((row) => (
              <li
                key={row.role}
                className="grid gap-2 px-6 py-5 md:grid-cols-[1.4fr_1fr_1.6fr] md:items-center md:gap-4"
              >
                <div className="flex items-center gap-3 font-semibold text-navy">
                  <Wallet className="h-4 w-4 text-blue" />
                  {row.role}
                </div>
                <div className="text-sm font-semibold text-blue">{row.range}</div>
                <div className="text-sm text-ink/70">{row.benefits}</div>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-xs text-ink/60">
          Figures are gross monthly, before deductions. Talk to our {country.name} desk for the
          current, role-specific offer letter.
        </p>
      </div>
    </section>
  );
}

/* ---------- 6. process timeline ---------- */

function ProcessTimeline() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <Blob className="absolute bottom-0 right-0 h-96 w-96 opacity-40" color="var(--blue-wash)" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="How it works"
          title="Your journey to a job in the Gulf"
          subtitle="Five documented stages — the same for every candidate."
        />
        <div className="relative mt-16">
          <svg
            viewBox="0 0 1000 40"
            className="pointer-events-none absolute left-0 right-0 top-10 hidden h-10 w-full md:block"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M20,20 L980,20"
              fill="none"
              stroke="var(--color-blue)"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
          </svg>
          <ol className="relative grid gap-6 md:grid-cols-5">
            {PROCESS_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="relative rounded-[20px] bg-white p-6 pt-4 shadow-[0_12px_40px_-28px_rgba(11,31,58,0.3)]"
              >
                <span className="pointer-events-none absolute right-3 top-1 font-display text-5xl font-extrabold text-blue-wash">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div className="relative text-sm font-semibold text-navy">{step.title}</div>
                <p className="relative mt-2 text-xs leading-relaxed text-ink/70">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. visa ---------- */

function Visa({ country }: { country: Country }) {
  return (
    <section className="relative overflow-hidden bg-blue-wash px-6 py-24">
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
      <Blob className="absolute -right-20 top-10 h-72 w-72 opacity-40" color="var(--blue-soft)" />
      <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue">
            Visa assistance
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy md:text-4xl">
            {country.name} visa & work-permit support
          </h2>
          <p className="mt-5 text-ink">{country.visaNotes}</p>

          <div className="mt-7 inline-flex items-center gap-3 rounded-full bg-navy px-5 py-3 text-white">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10">
              <ShieldCheck className="h-4 w-4 text-blue-soft" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-soft">
              MEA e-Migrate registered
            </span>
          </div>
        </div>
        <ul className="grid gap-3">
          {country.visaHandled.map((item, i) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-[18px] bg-white p-4 shadow-[0_10px_30px_-22px_rgba(11,31,58,0.35)]"
            >
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-display text-xs font-bold text-white ${
                  i % 2 === 0 ? "bg-blue" : "bg-navy"
                }`}
              >
                {i + 1}
              </span>
              <span className="text-sm text-navy">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 8. documentation ---------- */

function Documentation({ country }: { country: Country }) {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <Blob className="absolute -left-32 top-20 h-72 w-72 opacity-40" color="var(--blue-wash)" />
      <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue">
            Documentation support
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy md:text-4xl">
            Pre-departure paperwork, handled
          </h2>
          <p className="mt-5 text-ink">{country.documentationNotes}</p>
        </div>
        <div className="rounded-[24px] border border-border bg-white p-8 shadow-[0_20px_60px_-30px_rgba(11,31,58,0.3)]">
          <span className="mb-4 inline-flex rounded-xl bg-blue-wash p-3 text-blue">
            <FileCheck2 className="h-6 w-6" />
          </span>
          <div className="text-xs uppercase tracking-wider text-ink/60">
            Document checklist — {country.name}
          </div>
          <ul className="mt-4 grid gap-3">
            {country.documentationChecklist.map((doc) => (
              <li key={doc} className="flex items-start gap-3 text-sm text-navy">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue hover:text-navy"
          >
            Open the full Candidate Portal checklist <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- 9. life in country + gallery ---------- */

function LifeInCountry({ country }: { country: Country }) {
  return (
    <section className="relative overflow-hidden bg-blue-wash px-6 py-24">
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
      <Blob className="absolute -right-24 -top-16 h-72 w-72 opacity-40" color="var(--blue-soft)" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue">
              <Compass className="h-3.5 w-3.5" /> Life in {country.name}
            </div>
            <h2 className="font-display text-3xl font-bold leading-tight text-navy md:text-4xl">
              Landing well, not just landing.
            </h2>
            <p className="mt-5 text-ink">{country.lifeInCountry}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {country.gallery.map((img, idx) => (
              <img
                key={img.url + idx}
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className={`h-40 w-full rounded-[20px] object-cover shadow-[0_12px_30px_-20px_rgba(11,31,58,0.35)] md:h-48 ${
                  idx % 2 === 0 ? "md:translate-y-4" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 10. why ozone ---------- */

function WhyOzone() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <Blob className="absolute -right-28 bottom-0 h-72 w-72 opacity-40" color="var(--blue-wash)" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Why Ozone Overseas"
          title="A recruiter you can hold accountable"
          subtitle="Four reasons candidates and employers keep coming back."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {WHY_OZONE.map((w) => (
            <div
              key={w.title}
              className="rounded-[20px] border border-border bg-white p-6 shadow-[0_12px_40px_-28px_rgba(11,31,58,0.3)]"
            >
              <span className="mb-3 inline-flex rounded-xl bg-blue-wash p-3 text-blue">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div className="font-display text-lg font-semibold text-navy">{w.title}</div>
              <p className="mt-2 text-sm text-ink/70">{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 11. testimonials ---------- */

function Testimonials({ country }: { country: Country }) {
  return (
    <section className="relative overflow-hidden bg-blue-wash px-6 py-24">
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
      <Blob className="absolute -left-24 top-10 h-72 w-72 opacity-40" color="var(--blue-soft)" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader eyebrow="Candidate voices" title={`Placed by Ozone in ${country.name}`} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {country.testimonials.map((t) => (
            <figure
              key={t.name}
              className="relative rounded-[24px] bg-white p-7 shadow-[0_20px_60px_-30px_rgba(11,31,58,0.3)]"
            >
              <Quote className="absolute -top-3 left-6 h-9 w-9 rotate-180 text-blue" />
              <blockquote className="mt-4 leading-relaxed text-navy/90">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-blue-soft pt-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-bold text-white">
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <div>
                  <div className="font-semibold text-navy">{t.name}</div>
                  <div className="text-xs text-ink/70">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 12. faq ---------- */

function FAQ({ country }: { country: Country }) {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <Blob className="absolute -left-24 top-20 h-64 w-64 opacity-40" color="var(--blue-wash)" />
      <div className="relative mx-auto max-w-3xl">
        <SectionHeader
          eyebrow="FAQ"
          title={`Working in ${country.name} — questions candidates ask`}
        />
        <Accordion type="single" collapsible className="mt-10">
          {country.faqs.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              value={`item-${i}`}
              className="mb-3 rounded-[18px] border border-border bg-white px-5 shadow-[0_10px_30px_-22px_rgba(11,31,58,0.3)]"
            >
              <AccordionTrigger className="text-left text-base font-medium text-navy hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-ink/70">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------- 13. cta ---------- */

function CTA({ country }: { country: Country }) {
  return (
    <section id="cta" className="relative overflow-hidden bg-blue-wash px-6 pt-24 pb-28">
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
      <Blob
        className="absolute -bottom-32 -left-32 h-96 w-96 opacity-50"
        color="var(--blue-soft)"
      />
      <Blob
        className="absolute -top-16 -right-16 h-64 w-64 opacity-40"
        color="oklch(0.94 0.025 250)"
      />
      <DotGrid className="absolute top-16 left-1/3 h-20 w-20 opacity-70" />

      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="font-display text-4xl font-bold leading-tight text-navy md:text-5xl">
          Ready for your move to <span className="text-blue">{country.name}?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ink">
          Apply directly or talk to our {country.name} desk. Every conversation is confidential and
          every offer is contract-first.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/For-Candidates"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-blue transition"
          >
            Apply for Jobs in {country.name} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-blue px-6 py-3 text-sm font-semibold text-blue hover:bg-blue hover:text-white transition"
          >
            Contact Us
          </Link>
        </div>
        <div className="mt-10 text-xs text-ink/60">
          Government of India MEA Recruitment Licence · {MEA_LICENSE}
        </div>
      </div>
    </section>
  );
}

/* ---------- shared ---------- */

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center">
      <span className="text-xs font-semibold uppercase tracking-widest text-blue">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-3 max-w-2xl text-ink/70">{subtitle}</p>}
    </div>
  );
}
