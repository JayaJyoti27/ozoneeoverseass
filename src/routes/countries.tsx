import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Building2, Globe2, Users } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/footer";
import { InteractiveGlobe } from "@/components/site/interactive-globs";
import { CountryFlag } from "@/components/site/country-flag";
import { COUNTRIES } from "@/components/site/countries-data";
import candidateAirport from "@/assets/candidate-airport.jpg";
import employerMeeting from "@/assets/employer-meeting.jpg";

export const Route = createFileRoute("/countries")({
  head: () => ({
    meta: [
      { title: "Countries — 17 Live Destinations · Ozone Overseas" },
      {
        name: "description",
        content:
          "Healthcare and technical recruitment across 17 countries — Middle East, Europe, Canada, Asia Pacific. 5,000+ placements. One licensed process.",
      },
      { property: "og:title", content: "Countries — Ozone Overseas" },
      {
        property: "og:description",
        content:
          "Every highlighted country is a live destination. Explore 17 markets on the interactive globe.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CountriesPage,
});

function CountriesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <StatsBand />
        <GlobeSection />
        <CountryListSection />
        <TwoCardSplit />
      </main>
      <Footer />
    </div>
  );
}

/* ============================================================
 * HERO — flag tile columns replace the globe
 * ============================================================ */
function Hero() {
  // Split countries into two staggered columns
  const colA = COUNTRIES.filter((_, i) => i % 2 === 0);
  const colB = COUNTRIES.filter((_, i) => i % 2 === 1);

  return (
    <section className="relative pt-24 md:pt-28 pb-16 md:pb-20 overflow-hidden">
      {/* Ambient shapes */}
      <div
        className="absolute -bottom-24 -left-32 h-[420px] w-[520px] wave-blob opacity-80"
        aria-hidden
      />
      <div className="absolute top-16 -right-16 h-64 w-80 wave-blob opacity-80" aria-hidden />
      <div className="absolute top-24 left-6 h-24 w-40 dot-grid opacity-60" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* LEFT */}
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-sky text-brand-blue text-xs font-semibold px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            17 Countries. One Agency.
          </span>

          <h1 className="mt-5 font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-navy">
            Your Next Chapter
            <br />
            <span className="text-brand-blue">Could Start Anywhere.</span>
          </h1>

          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl">
            Healthcare and technical recruitment across the Middle East, Europe, Canada, and beyond.
            5,000 placements. 17 countries. One process.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/countries"
              className="inline-flex items-center gap-2 rounded-full bg-navy text-white px-6 py-3 text-sm font-semibold hover:bg-brand-blue transition shadow-[var(--shadow-soft)]"
            >
              Find a Job <ArrowRight className="size-4" />
            </Link>
            <a
              href="#country-list"
              className="inline-flex items-center gap-2 rounded-full border border-brand-blue/40 text-brand-blue px-6 py-3 text-sm font-semibold hover:bg-sky transition"
            >
              Explore Countries ↓
            </a>
          </div>
        </div>

        {/* RIGHT — scrolling flag tile grid */}
        <div className="relative">
          <div className="absolute inset-0 -m-6 dot-grid opacity-40 rounded-3xl" aria-hidden />
          <div
            className="relative marquee-mask-y grid grid-cols-2 gap-3 md:gap-4 h-[420px] md:h-[480px] overflow-hidden mx-auto"
            style={{
              maxWidth: "320px",
              maskImage:
                "linear-gradient(to bottom, transparent 0, black 12%, black 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0, black 12%, black 88%, transparent 100%)",
            }}
          >
            <FlagColumn items={colA} speed="fast" offset={0} />
            <FlagColumn items={colB} speed="slow" offset={-32} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FlagColumn({
  items,
  speed,
  offset,
}: {
  items: typeof COUNTRIES;
  speed: "fast" | "slow";
  offset: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex flex-col gap-3 md:gap-4 ${
          speed === "fast" ? "marquee-track-up" : "marquee-track-up-slow"
        }`}
        style={{ marginTop: offset }}
      >
        {doubled.map((c, i) => (
          <div
            key={`${c.code}-${i}`}
            className="aspect-square rounded-[20px] bg-white border border-brand-blue/25 shadow-[var(--shadow-soft)] flex items-center justify-center overflow-hidden p-2 md:p-3"
          >
            <CountryFlag code={c.code} className="w-full h-full rounded-[14px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
 * STATS BAND
 * ============================================================ */
function StatsBand() {
  const stats = [
    { icon: Globe2, value: "17+", label: "Countries Active" },
    { icon: Users, value: "5,000+", label: "Placements Made" },
    { icon: Building2, value: "200+", label: "Employer Partners" },
  ];
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative rounded-[36px] bg-sky px-6 md:px-14 py-10 md:py-12 overflow-hidden">
          <div className="absolute -top-16 -right-24 h-56 w-56 wave-blob opacity-90" aria-hidden />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 relative">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex items-center gap-5 justify-center md:justify-start md:px-8 ${
                  i > 0 ? "md:border-l md:border-gold/40" : ""
                }`}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-blue shadow-[var(--shadow-soft)]">
                  <s.icon className="size-5" />
                </span>
                <div>
                  <div className="font-display font-bold text-3xl md:text-4xl text-navy leading-none">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-sm text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * GLOBE SECTION — grey bg, globe in a wide white card
 * ============================================================ */
function GlobeSection() {
  return (
    <section
      className="relative py-20 md:py-28 mt-16 md:mt-20"
      style={{
        backgroundColor: "#F5F6F8",
        borderTopLeftRadius: "48px",
        borderTopRightRadius: "48px",
      }}
    >
      <div
        className="absolute -bottom-16 -left-24 h-[380px] w-[480px] wave-blob opacity-70"
        aria-hidden
      />
      <div className="absolute top-10 right-6 h-24 w-40 dot-grid opacity-60" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 relative">
        <div className="max-w-3xl">
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight leading-[1.05]">
            <span className="text-navy">17 Countries.</span>
            <br />
            <span className="text-brand-blue">One Map.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            Every pin is a live destination — hover to see the open role count in real time.
          </p>
        </div>

        <div className="relative mt-10 md:mt-14 rounded-[28px] bg-white border border-border shadow-[var(--shadow-lift)] p-4 md:p-8 overflow-hidden">
          <InteractiveGlobe />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * COUNTRY LIST SECTION — pills + curved CTA band
 * ============================================================ */
function CountryListSection() {
  const [selected, setSelected] = useState<string>(COUNTRIES[0]?.name ?? "");

  return (
    <section id="country-list" className="relative py-20 md:py-28 bg-background overflow-hidden">
      <div className="absolute top-10 left-6 h-24 w-40 dot-grid opacity-60" aria-hidden />
      <div
        className="absolute bottom-10 -right-24 h-[360px] w-[460px] wave-blob opacity-80"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 relative">
        <div className="text-center text-[11px] tracking-[0.28em] font-semibold text-muted-foreground uppercase">
          ——— Every Destination ———
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {COUNTRIES.map((c) => (
            <CountryPill key={c.code} country={c} />
          ))}
        </div>

        {/* Curved light-blue CTA strip */}
        <div className="mt-16 md:mt-24 relative rounded-[36px] bg-sky px-6 md:px-14 py-12 md:py-16 overflow-hidden">
          <div className="absolute -top-16 -left-16 h-56 w-56 wave-blob opacity-80" aria-hidden />
          <div className="absolute bottom-6 right-8 h-16 w-24 dot-grid opacity-60" aria-hidden />

          <div className="relative max-w-3xl mx-auto text-center">
            <h3 className="font-display font-bold text-3xl md:text-5xl tracking-tight leading-[1.05]">
              <span className="text-navy">Find a Job in Your</span>
              <br />
              <span className="text-brand-blue">Dream Country.</span>
            </h3>
            <p className="mt-4 text-muted-foreground text-base md:text-lg">
              Pick a destination and we'll show you every live role our recruiters have open there.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {COUNTRIES.slice(0, 10).map((c) => (
                <button
                  key={c.code}
                  onClick={() => setSelected(c.name)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition ${
                    selected === c.name
                      ? "bg-navy text-white border-navy"
                      : "bg-white text-navy border-brand-blue/25 hover:border-brand-blue"
                  }`}
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center overflow-hidden rounded-sm">
                    <CountryFlag code={c.code} className="w-full h-full" />
                  </span>
                  {c.name}
                </button>
              ))}
            </div>

            <div className="mt-8">
              <Link
                to="/countries"
                search={selected ? { country: selected } : undefined}
                className="inline-flex items-center gap-2 rounded-full bg-navy text-white px-6 py-3 text-sm font-semibold hover:bg-brand-blue transition shadow-[var(--shadow-soft)]"
              >
                Search Roles <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountryPill({ country }: { country: (typeof COUNTRIES)[number] }) {
  const slug = country.name.toLowerCase().replace(/\s+/g, "-");
  return (
    <Link
      to="/countries"
      search={{ country: country.name }}
      aria-label={`View roles in ${country.name}`}
      data-slug={slug}
      className="group inline-flex items-center gap-3 rounded-full bg-white border border-brand-blue/25 pl-2 pr-4 py-1.5 shadow-[var(--shadow-soft)] hover:border-brand-blue transition"
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-sky overflow-hidden">
        <CountryFlag code={country.code} className="w-full h-full" />
      </span>
      <span className="font-semibold text-navy text-sm">{country.name}</span>
      <span className="text-xs text-muted-foreground group-hover:text-gold transition">
        {country.roles} roles
      </span>
    </Link>
  );
}

/* ============================================================
 * TWO-CARD SPLIT
 * ============================================================ */
function TwoCardSplit() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        className="absolute -bottom-24 -right-32 h-[420px] w-[520px] wave-blob opacity-90"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 relative">
        <h2 className="max-w-3xl font-display font-bold text-3xl md:text-5xl text-navy tracking-tight">
          Wherever You're Headed, We've Already Been There.
        </h2>

        <div className="mt-12 grid md:grid-cols-2 gap-6 md:gap-7">
          {/* Candidates */}
          <div className="relative rounded-[28px] bg-sky p-8 md:p-10 overflow-hidden min-h-[440px] flex flex-col shadow-[var(--shadow-soft)]">
            <div className="absolute top-6 left-6 h-16 w-24 dot-grid opacity-70" aria-hidden />
            <span className="relative inline-flex self-start rounded-full bg-white text-brand-blue text-xs font-semibold px-3 py-1">
              For Candidates
            </span>
            <h3 className="relative mt-4 font-display font-bold text-3xl md:text-4xl text-navy max-w-xs">
              Find Opportunities
            </h3>
            <p className="relative mt-3 text-muted-foreground max-w-sm">
              Live roles across 17 countries, vetted by recruiters who've placed in every one.
            </p>
            <div className="relative mt-6">
              <Link
                to="/countries"
                className="inline-flex items-center gap-2 rounded-full bg-navy text-white px-5 py-3 text-sm font-semibold hover:bg-brand-blue transition"
              >
                Browse Roles <ArrowRight className="size-4" />
              </Link>
            </div>
            <img
              src={candidateAirport}
              alt="Healthcare professional at airport"
              loading="lazy"
              width={1024}
              height={1024}
              className="pointer-events-none absolute -bottom-6 -right-6 h-64 w-64 md:h-72 md:w-72 object-cover rounded-3xl border-4 border-white shadow-[var(--shadow-lift)]"
            />
          </div>

          {/* Employers */}
          <div className="relative rounded-[28px] bg-navy text-white p-8 md:p-10 overflow-hidden min-h-[440px] flex flex-col shadow-[var(--shadow-soft)]">
            <div
              className="absolute top-6 left-6 h-16 w-24 opacity-60"
              aria-hidden
              style={{
                backgroundImage:
                  "radial-gradient(oklch(0.62 0.09 255 / 0.55) 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
            />
            <span className="relative inline-flex self-start rounded-full bg-white/10 text-white text-xs font-semibold px-3 py-1">
              For Employers
            </span>
            <h3 className="relative mt-4 font-display font-bold text-3xl md:text-4xl max-w-sm">
              Hire International Talent
            </h3>
            <p className="relative mt-3 text-white/70 max-w-sm">
              Speak to a partner who's already placed in your sector and your country.
            </p>
            <div className="relative mt-6">
              <Link
                to="/countries"
                className="inline-flex items-center gap-2 rounded-full bg-gold text-navy px-5 py-3 text-sm font-semibold hover:bg-gold/90 transition"
              >
                Employer Portal <ArrowRight className="size-4" />
              </Link>
            </div>
            <img
              src={employerMeeting}
              alt="HR partners in meeting"
              loading="lazy"
              width={1024}
              height={1024}
              className="pointer-events-none absolute -bottom-6 -right-6 h-64 w-64 md:h-72 md:w-72 object-cover rounded-3xl border-4 border-navy shadow-[var(--shadow-lift)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
