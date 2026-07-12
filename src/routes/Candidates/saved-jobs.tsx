import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Bookmark, MapPin, Wallet, Loader2, Inbox, ArrowRight, X, Heart } from "lucide-react";
import { getSavedJobs, removeSavedJob } from "@/api/candidate";
import { CandidateNav } from "@/components/Candidate/CandidateNav";

export const Route = createFileRoute("/Candidates/saved-jobs")({
  component: SavedJobsPage,
});

type SavedJob = {
  id: string;
  title: string;
  country: string;
  currency: string;
  salary_min: number;
  salary_max: number;
};

function formatSalary(currency: string, min: number, max: number) {
  const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : n);
  if (!min && !max) return "—";
  if (min && max) return `${currency} ${fmt(min)} - ${fmt(max)}`;
  return `${currency} ${fmt(min || max)}`;
}

function SavedJobsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["saved-jobs"],
    queryFn: getSavedJobs,
  });

  const [removingId, setRemovingId] = useState<string | null>(null);

  const remove = useMutation({
    mutationFn: removeSavedJob,
    onMutate: (id: string) => setRemovingId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
    },
    onSettled: () => setRemovingId(null),
  });

  const jobs: SavedJob[] = data ?? [];

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

        <div className="relative mx-auto max-w-4xl px-6 py-12">
          {/* Header */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
              <Bookmark className="h-3.5 w-3.5" />
              CANDIDATE · SAVED
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
              Saved <span className="text-blue-600">Jobs</span>
            </h1>
            <p className="mt-2 max-w-lg text-gray-500">
              Roles you've bookmarked to revisit and apply to later.
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white py-20 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                <Inbox className="h-6 w-6 text-blue-500" />
              </div>
              <p className="font-semibold text-[#0A1F44]">No saved jobs yet</p>
              <p className="max-w-xs text-sm text-gray-500">
                Save roles while browsing to keep track of ones you're interested in.
              </p>
              <Link
                to="/Candidates/jobs"
                className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#0A1F44] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2a5c]"
              >
                Browse Jobs
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-5">
              {jobs.map((job) => {
                const isRemoving = removingId === job.id;
                return (
                  <div
                    key={job.id}
                    className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition ${
                      isRemoving ? "opacity-50" : "hover:border-blue-200 hover:shadow-md"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-bold text-[#0A1F44]">{job.title}</h2>
                        <span className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-gray-500">
                          <MapPin className="h-3.5 w-3.5 text-gray-400" />
                          {job.country}
                        </span>
                      </div>
                      <p className="inline-flex items-center gap-1.5 font-semibold text-[#0A1F44]">
                        <Wallet className="h-4 w-4 text-blue-500" />
                        {formatSalary(job.currency, job.salary_min, job.salary_max)}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-100 pt-5">
                      <Link
                        to="/Candidates/jobs/$id"
                        params={{ id: String(job.id) }}
                        className="rounded-full bg-[#0A1F44] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2a5c]"
                      >
                        View & Apply
                      </Link>
                      <button
                        onClick={() => remove.mutate(job.id)}
                        disabled={isRemoving}
                        className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isRemoving ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Removing...
                          </>
                        ) : (
                          <>
                            <X className="h-3.5 w-3.5" />
                            Remove
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
