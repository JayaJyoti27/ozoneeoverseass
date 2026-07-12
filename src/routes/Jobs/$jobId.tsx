import React from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { JobCard, formatSalary, daysAgo } from "@/components/site/Job-Card";
import { Blob, DotGrid } from "@/components/site/decor";
import { jobsApi, type Job } from "@/db/jobs";
import { Check, MessageCircle, ShieldCheck, Clock, FileCheck } from "lucide-react";

export const Route = createFileRoute("/Jobs/$jobId")({
  loader: async ({ params }) => {
    let job: Job;
    try {
      job = await jobsApi.getById(params.jobId);
    } catch {
      throw notFound();
    }

    let similar: Job[] = [];
    try {
      const all = await jobsApi.list({ sector: job.sector ?? undefined, status: "active" });
      similar = all.filter((j) => j.id !== job.id).slice(0, 3);
    } catch {
      similar = [];
    }

    return { job, similar };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Role not found — Ozone Overseas" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { job } = loaderData;
    const title = `${job.title ?? "Role"} — ${job.city ?? ""}, ${job.country ?? ""} | Ozone Overseas`;
    const desc = `${job.title ?? "Role"}${job.employer_type ? ` at ${job.employer_type}` : ""}. Apply free — coordinator assigned in 24 hours.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <>
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-navy">Role not found</h1>
        <p className="mt-3 text-muted-foreground">This listing may have been filled or removed.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-navy px-6 py-3 text-sm font-semibold text-navy-foreground"
        >
          Browse all jobs
        </Link>
      </div>
    </>
  ),
  component: JobDetailPage,
});

function JobDetailPage() {
  const { job, similar } = Route.useLoaderData();
  const salary = formatSalary(job);
  const posted = daysAgo(job.created_at);

  const requirements = [job.experience_required, job.license_required].filter((r): r is string =>
    Boolean(r),
  );

  return (
    <>
      <section className="relative overflow-hidden">
        <Blob className="pointer-events-none absolute -right-24 -top-16 h-[380px] w-[380px] opacity-70" />
        <div className="relative mx-auto max-w-7xl px-5 pt-10">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-navy">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/" className="hover:text-navy">
              Jobs
            </Link>
            <span className="mx-2">/</span>
            <span className="text-navy">{job.title}</span>
          </nav>
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-16 pt-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article>
            <div className="flex flex-wrap items-center gap-3">
              {job.sector && (
                <span className="rounded-full bg-blue px-3 py-1 text-xs font-semibold text-blue-foreground">
                  {job.sector}
                </span>
              )}
              <span className="text-sm text-muted-foreground">
                {[job.city, job.country].filter(Boolean).join(", ") || "Location TBC"}
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-navy md:text-5xl">
              {job.title ?? "Untitled Role"}
            </h1>
            {job.employer_type && (
              <p className="mt-2 italic text-muted-foreground">{job.employer_type}</p>
            )}
            {posted > 0 && (
              <p className="mt-1 text-sm text-muted-foreground">Posted {posted} days ago</p>
            )}

            <div className="my-8 h-px w-24 bg-gold" />

            {job.description && (
              <>
                <h2 className="font-display text-2xl font-bold text-navy">About the Role</h2>
                <div className="mt-4 space-y-4 text-navy/80 leading-relaxed">
                  {job.description
                    .split("\n")
                    .filter(Boolean)
                    .map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                </div>
              </>
            )}

            {requirements.length > 0 && (
              <>
                <h2 className="mt-10 font-display text-2xl font-bold text-navy">Requirements</h2>
                <ul className="mt-4 space-y-2.5">
                  {requirements.map((r) => (
                    <li key={r} className="flex gap-3 text-navy/80">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="mt-10 font-display text-2xl font-bold text-navy">Salary & Package</h2>
            <p className="mt-3 font-display text-2xl font-bold text-gold">{salary}</p>
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-blue/20 bg-card p-6 shadow-elevated">
              <h3 className="font-display text-lg font-bold text-navy">{job.title}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {job.country && <Chip>{job.country}</Chip>}
                {job.city && <Chip>{job.city}</Chip>}
                {job.sector && <Chip>{job.sector}</Chip>}
              </div>
              <p className="mt-4 font-display text-xl font-bold text-gold">{salary}</p>

              <div className="my-5 h-px bg-border" />

              <Link
                to="/"
                className="block rounded-full bg-navy py-3 text-center text-sm font-semibold text-navy-foreground shadow-soft transition-transform hover:-translate-y-0.5"
              >
                Apply for This Role
              </Link>

              <a
                href="https://wa.me/919847000000"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-full border-2 border-whatsapp py-3 text-sm font-semibold text-whatsapp transition-colors hover:bg-whatsapp hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>

              <div className="my-5 h-px bg-border" />

              <ul className="space-y-3 text-sm">
                <TrustLine icon={<ShieldCheck className="h-4 w-4" />}>₹0 Candidate Fees</TrustLine>
                <TrustLine icon={<Clock className="h-4 w-4" />}>
                  Coordinator Assigned in 24hrs
                </TrustLine>
                <TrustLine icon={<FileCheck className="h-4 w-4" />}>Visa & Docs Handled</TrustLine>
              </ul>

              <div className="mt-5 rounded-2xl bg-lightblue/70 p-3 text-center text-xs font-semibold text-navy/80">
                MEA Licensed · RA-1234/KER/1234/5678
              </div>
            </div>
          </aside>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="relative">
          <DotGrid className="pointer-events-none absolute -left-8 top-10 h-64 w-64 opacity-40" />
          <div className="relative mx-auto max-w-7xl px-5 pb-16">
            <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">Similar Roles</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {similar.map((j) => (
                <JobCard key={j.id} job={j} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-lightblue px-2.5 py-1 text-xs font-medium text-navy">
      {children}
    </span>
  );
}
function TrustLine({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2.5 text-navy/80">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-lightblue text-blue">
        {icon}
      </span>
      <span className="font-medium">{children}</span>
    </li>
  );
}
