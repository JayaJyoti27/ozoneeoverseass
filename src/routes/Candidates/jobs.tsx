import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Wallet,
  GraduationCap,
  Briefcase,
  Globe2,
  Loader2,
  Inbox,
  ArrowRight,
} from "lucide-react";
import { Heart } from "lucide-react";
import { getJobs, applyForJob, saveJob } from "@/api/candidate";
import { CandidateNav } from "@/components/Candidate/CandidateNav";

export const Route = createFileRoute("/Candidates/jobs")({
  component: JobsPage,
});

type Job = {
  id: string | number;
  title: string;
  country: string;
  currency: string;
  salary_min: number;
  salary_max: number;
  experience_required: string;
  description: string;
};

function formatSalary(currency: string, min: number, max: number) {
  const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : n);
  if (!min && !max) return "—";
  if (min && max) return `${currency} ${fmt(min)} - ${fmt(max)}`;
  return `${currency} ${fmt(min || max)}`;
}

function JobsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["candidate-jobs"],
    queryFn: getJobs,
  });
  const queryClient = useQueryClient();
  const applyMutation = useMutation({
    mutationFn: (jobId: string) => applyForJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidate-jobs"] });
    },
  });
  const saveMutation = useMutation({
    mutationFn: (jobId: string) => saveJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
    },
  });
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");

  const jobs: Job[] = data ?? [];

  const countries = useMemo(() => {
    const unique = new Set(jobs.map((j) => j.country).filter(Boolean));
    return ["all", ...Array.from(unique)];
  }, [jobs]);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchesSearch =
        !search ||
        [j.title, j.country, j.experience_required, j.description]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      const matchesCountry = countryFilter === "all" || j.country === countryFilter;
      return matchesSearch && matchesCountry;
    });
  }, [jobs, search, countryFilter]);

  const uniqueCountries = new Set(jobs.map((j) => j.country)).size;
  const totalJobs = jobs.length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
      </div>
    );
  }

  return (
    <>
      <CandidateNav />
      <div className="relative min-h-screen bg-[#F6F8FC]">
        <div className="pointer-events-none absolute left-6 top-8 grid grid-cols-6 gap-1.5 opacity-40">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-[#0A1F44]/30" />
          ))}
        </div>
        <div className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-blue-100/60 blur-2xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-12">
          {/* Header */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
              <Briefcase className="h-3.5 w-3.5" />
              CANDIDATE · OPPORTUNITIES
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
              Browse <span className="text-blue-600">Jobs</span>
            </h1>
            <p className="mt-2 max-w-lg text-gray-500">
              Verified roles from employers actively hiring right now.
            </p>
          </div>

          {/* Stat chips */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StatChip
              icon={<Briefcase className="h-5 w-5 text-blue-600" />}
              label="Open Roles"
              value={totalJobs}
            />
            <StatChip
              icon={<Globe2 className="h-5 w-5 text-blue-600" />}
              label="Countries Hiring"
              value={uniqueCountries}
            />
          </div>

          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search title, country, skill..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {countries.map((c) => (
                <button
                  key={c}
                  onClick={() => setCountryFilter(c)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition ${
                    countryFilter === c
                      ? "border-[#0A1F44] bg-[#0A1F44] text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Job cards */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white py-20 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                <Inbox className="h-6 w-6 text-blue-500" />
              </div>
              <p className="font-semibold text-[#0A1F44]">No jobs found</p>
              <p className="max-w-xs text-sm text-gray-500">
                {jobs.length === 0
                  ? "New roles are added regularly — check back soon."
                  : "Try adjusting your search or filter."}
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              {filtered.map((job) => (
                <div
                  key={job.id}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-[#0A1F44]">{job.title}</h2>
                      <span className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-gray-500">
                        <MapPin className="h-3.5 w-3.5 text-gray-400" />
                        {job.country}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="inline-flex items-center gap-1.5 font-semibold text-[#0A1F44]">
                        <Wallet className="h-4 w-4 text-blue-500" />
                        {formatSalary(job.currency, job.salary_min, job.salary_max)}
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-gray-500">
                        <GraduationCap className="h-3.5 w-3.5 text-gray-400" />
                        {job.experience_required}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 line-clamp-2 text-sm text-gray-600">{job.description}</p>

                  <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-100 pt-5">
                    <Link
                      to="/Candidates/jobs/$id"
                      params={{ id: String(job.id) }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#0A1F44] transition hover:border-gray-300 hover:bg-gray-50"
                    >
                      View Details
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <button
                      onClick={() => saveMutation.mutate(String(job.id))}
                      disabled={saveMutation.isPending && saveMutation.variables === String(job.id)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#0A1F44] transition hover:border-blue-300 hover:bg-blue-50 disabled:opacity-60"
                    >
                      <Heart className="h-3.5 w-3.5" />
                      {saveMutation.isPending && saveMutation.variables === String(job.id)
                        ? "Saving..."
                        : "Save"}
                    </button>
                    <button
                      className="rounded-full bg-[#0A1F44] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2a5c]"
                      onClick={() => applyMutation.mutate(String(job.id))}
                      disabled={applyMutation.isPending && applyMutation.variables === job.id}
                    >
                      {applyMutation.isPending && applyMutation.variables === job.id
                        ? "Applying..."
                        : "Apply"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function StatChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
        {icon}
      </div>
      <div>
        <p className="text-lg font-extrabold text-[#0A1F44]">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}
