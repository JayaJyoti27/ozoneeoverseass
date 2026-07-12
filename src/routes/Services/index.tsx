import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Header } from "@/";
import { Footer } from "@/components/site/footer";
import { services } from "@/lib/services-data";
import { Blob, DotGrid } from "@/components/site/decor";

export const Route = createFileRoute("/Services/")({
  component: Index,
});

const grouped = [
  {
    label: "Employer Services",
    slugs: [
      "healthcare-recruitment",
      "for-nurses",
      "for-doctors",
      "for-paramedical-technicians",
      "technical-recruitment",
    ],
  },
  {
    label: "Candidate Services",
    slugs: [
      "nursing-recruitment",
      "prometric-coaching",
      "mock-interviews",
      "grooming-sessions",
      "training",
      "visa-services",
      "documentation",
    ],
  },
];

function Index() {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1000px 500px at 80% -10%, color-mix(in oklab, var(--sky) 90%, white) 0%, transparent 60%), linear-gradient(180deg, #ffffff 0%, #fbfcfe 100%)",
          }}
        />
        <div className="container-ozone py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border shadow-[0_2px_10px_-6px_rgba(11,31,58,0.15)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy">
                MEA Licensed · 15+ Years · 5,000+ Placements
              </span>
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.02] text-navy">
              Verified Talent for the GCC.
              <br />
              <span className="text-blue">One Licensed Partner.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Ozone Overseas places pre-screened healthcare and technical professionals from India
              into GCC hospitals and employers — end-to-end, compliant, in 6–8 weeks.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#post" className="btn-navy btn-navy-hover">
                Post a Requirement
              </a>
              <Link to="/Services" className="btn-outline-blue btn-outline-blue-hover">
                Browse Candidate Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-24 overflow-hidden">
        <Blob className="absolute -top-10 -right-16 w-72 h-72 -z-10" style={{ opacity: 0.9 }} />
        <DotGrid className="absolute top-20 left-6 w-24 h-24 opacity-70" />

        <div className="container-ozone relative">
          <div className="max-w-2xl mb-14">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue mb-3">
              Our Services
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-navy leading-tight">
              Twelve services. One accountable coordinator.
            </h2>
          </div>

          <div className="grid gap-14">
            {grouped.map((group) => (
              <div key={group.label}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-border" />
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy/60">
                    {group.label}
                  </div>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.slugs.map((slug) => {
                    const s = services[slug];
                    return (
                      <Link
                        key={slug}
                        to={`/services/${slug}` as string}
                        className="group relative rounded-2xl border border-border bg-white p-6 hover:border-blue transition shadow-[0_4px_20px_-14px_rgba(11,31,58,0.15)] hover:shadow-soft"
                      >
                        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-blue">
                          {s.category}
                        </div>
                        <h3 className="mt-3 font-display font-bold text-lg text-navy leading-snug">
                          {s.serviceName}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {s.subtext}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy group-hover:text-blue transition">
                          Explore{" "}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
