import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Wallet,
  GraduationCap,
  BadgeCheck,
  Building2,
  FileText,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Heart,
} from "lucide-react";
import { getJobById, applyForJob, saveJob } from "@/api/candidate";
import { CandidateNav } from "@/components/Candidate/CandidateNav";

export const Route = createFileRoute("/Candidates/jobs/$id")({
  component: JobDetailsPage,
});

function formatSalary(currency: string, min: number, max: number) {
  const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : n);
  if (!min && !max) return "—";
  if (min && max) return `${currency} ${fmt(min)} - ${fmt(max)}`;
  return `${currency} ${fmt(min || max)}`;
}

function JobDetailsPage() {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();

  const { data: job, isLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: () => getJobById(id),
  });

  const [applied, setApplied] = useState(false);

  const mutation = useMutation({
    mutationFn: () => applyForJob(id),
    onSuccess: () => {
      setApplied(true);
      queryClient.invalidateQueries({ queryKey: ["job", id] });
    },
  });
  const [saved, setSaved] = useState(false);
  const saveMutation = useMutation({
    mutationFn: () => saveJob(id),
    onSuccess: () => {
      setSaved(true);
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
    },
  });
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="relative min-h-screen bg-[#F6F8FC]">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-3 px-6 py-32 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
            <Briefcase className="h-6 w-6 text-blue-500" />
          </div>
          <p className="font-semibold text-[#0A1F44]">Job not found</p>
          <p className="max-w-xs text-sm text-gray-500">
            This role may have been closed or the link is incorrect.
          </p>
          <Link
            to="/Candidates/jobs"
            className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#0A1F44] transition hover:border-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const alreadyApplied = applied || job.has_applied;

  return (
    <>
      <CandidateNav />
      <div className="relative min-h-screen bg-[#F6F8FC]">
        <div className="pointer-events-none absolute left-6 top-8 grid grid-cols-6 gap-1.5 opacity-40">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-[#0A1F44]/30" />
          ))}
        </div>
        <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-blue-100/60 blur-2xl" />

        <div className="relative mx-auto max-w-4xl px-6 py-12">
          {/* Back link */}
          <Link
            to="/Candidates/jobs"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-[#0A1F44]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Jobs
          </Link>

          {/* Header */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
              <Briefcase className="h-3.5 w-3.5" />
              {job.employer_type || "OPEN ROLE"}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
              {job.title}
            </h1>
            <p className="mt-2 inline-flex items-center gap-1.5 text-gray-500">
              <MapPin className="h-4 w-4 text-gray-400" />
              {job.city ? `${job.city}, ${job.country}` : job.country}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
            {/* Left: details */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Info
                    icon={<Wallet className="h-4 w-4" />}
                    title="Salary"
                    value={formatSalary(job.currency, job.salary_min, job.salary_max)}
                  />
                  <Info
                    icon={<GraduationCap className="h-4 w-4" />}
                    title="Experience"
                    value={job.experience_required}
                  />
                  <Info
                    icon={<BadgeCheck className="h-4 w-4" />}
                    title="License"
                    value={job.license_required || "Not specified"}
                  />
                  <Info
                    icon={<Building2 className="h-4 w-4" />}
                    title="Employer Type"
                    value={job.employer_type || "Not specified"}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-[#0A1F44]">Description</h2>
                </div>
                <p className="whitespace-pre-line leading-relaxed text-gray-600">
                  {job.description}
                </p>
              </div>
            </div>

            {/* Right: sticky apply card */}
            <div className="h-fit lg:sticky lg:top-6">
              <div className="rounded-2xl bg-[#0A1F44] p-6 text-white shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-200">
                  Ready to apply?
                </p>
                <p className="mt-1 text-2xl font-extrabold">
                  {formatSalary(job.currency, job.salary_min, job.salary_max)}
                </p>
                <p className="mt-1 text-sm text-blue-200/80">{job.title}</p>

                <button
                  onClick={() => mutation.mutate()}
                  disabled={mutation.isPending || alreadyApplied}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0A1F44] transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Applying...
                    </>
                  ) : alreadyApplied ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Applied
                    </>
                  ) : (
                    <>
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                {mutation.isError && (
                  <p className="mt-3 text-xs text-red-300">
                    Something went wrong. Please try again.
                  </p>
                )}
                <button
                  onClick={() => saveMutation.mutate()}
                  disabled={saveMutation.isPending || saved}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Heart className="h-4 w-4" />
                  {saveMutation.isPending ? "Saving..." : saved ? "Saved" : "Save for Later"}
                </button>
                {alreadyApplied && !mutation.isPending && (
                  <p className="mt-3 text-center text-xs text-blue-200/80">
                    The employer will review your profile shortly.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Info({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div>
      <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
        <span className="text-blue-500">{icon}</span>
        {title}
      </p>
      <p className="font-semibold text-[#0A1F44]">{value || "—"}</p>
    </div>
  );
}
