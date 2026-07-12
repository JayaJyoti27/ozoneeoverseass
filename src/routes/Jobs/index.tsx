import { createFileRoute, Link } from "@tanstack/react-router";

import {Blob, DotGrid } from "@/components/site/decor";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/Jobs/")({
  component: Index,
});

const CARDS = [
  { to: "/jobs", eyebrow: "Job Board", title: "Live International Roles", desc: "Filterable board of every verified opening — 17 countries, updated weekly." },
  { to: "/vacancies", eyebrow: "For Candidates", title: "Apply to Live Vacancies", desc: "Same board, candidate-forward. Free to apply, coordinator in 24hrs." },
  { to: "/candidate-portal", eyebrow: "Register", title: "Candidate Portal", desc: "One CV. Ten countries open. Coordinator review within 48 hours." },
  { to: "/employer-portal", eyebrow: "Hire", title: "Employer Portal", desc: "Post a requirement free. First pre-screened shortlist in 48 hours." },
] as const;

function Index() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Blob className="pointer-events-none absolute -right-32 -top-24 h-[480px] w-[480px] opacity-80" />
        <DotGrid className="pointer-events-none absolute -left-8 bottom-0 h-72 w-72 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue/30 bg-lightblue px-3.5 py-1 text-xs font-semibold text-blue">
            MEA Licensed · Since 2011
          </span>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-[1.02] text-navy md:text-7xl">
            International careers, <span className="text-blue">honestly done.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Ozone Overseas places nurses, technicians and engineers across 17 countries — with zero fees for candidates and 48-hour shortlists for employers.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {CARDS.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="group relative overflow-hidden rounded-3xl border border-blue/20 bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:border-navy hover:shadow-elevated"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">{c.eyebrow}</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-navy md:text-3xl">{c.title}</h2>
                <p className="mt-3 text-navy/70">{c.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue">
                  Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
