import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  FileText,
  User,
  CheckCircle,
  MapPin,
  ArrowRight,
  Loader2,
  Inbox,
  Wallet,
  Clock,
  XCircle,
  Sparkles,
} from "lucide-react";
import { getCandidateDashboard } from "@/api/candidate";
import { CandidateNav } from "@/components/Candidate/CandidateNav";

export const Route = createFileRoute("/Candidates/dashboard")({
  component: CandidateDashboard,
});

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  submitted: "bg-amber-50 text-amber-700 border-amber-200",
  under_review: "bg-blue-50 text-blue-700 border-blue-200",
  shortlisted: "bg-blue-50 text-blue-700 border-blue-200",
  interview: "bg-blue-50 text-blue-700 border-blue-200",
  offered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  hired: "bg-emerald-50 text-emerald-700 border-emerald-200",
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  withdrawn: "bg-gray-100 text-gray-600 border-gray-200",
};

function statusKey(status: string) {
  return status?.toLowerCase().replace(/\s+/g, "_");
}

function statusStyle(status: string) {
  return STATUS_STYLES[statusKey(status)] || "bg-gray-100 text-gray-600 border-gray-200";
}

function CandidateDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["candidate-dashboard"],
    queryFn: getCandidateDashboard,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
      </div>
    );
  }

  const profileIncomplete = (data?.profileCompletion ?? 0) < 100;

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

        <div className="relative mx-auto max-w-6xl px-6 py-12">
          {/* Header */}
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
                <Sparkles className="h-3.5 w-3.5" />
                CANDIDATE · DASHBOARD
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
                Welcome <span className="text-blue-600">back</span>
              </h1>
              <p className="mt-2 max-w-lg text-gray-500">
                Here's how your job search is going right now.
              </p>
            </div>
          </div>

          {/* Profile completion nudge banner */}
          {profileIncomplete && (
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                  <User className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-amber-800">
                    Your profile is {data.profileCompletion}% complete
                  </p>
                  <p className="text-sm text-amber-700/80">
                    Complete it to appear in more employer matches.
                  </p>
                </div>
              </div>
              <Link
                to="/Candidates/profile"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0A1F44] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2a5c]"
              >
                Complete Profile
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}

          {/* Stat cards */}
          <div className="mb-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<User className="h-5 w-5" />}
              title="Profile Completion"
              value={`${data.profileCompletion}%`}
            />
            <StatCard
              icon={<Briefcase className="h-5 w-5" />}
              title="Applications"
              value={data.totalApplications}
            />
            <StatCard
              icon={<FileText className="h-5 w-5" />}
              title="Interviews"
              value={data.interviews}
            />
            <StatCard
              icon={<CheckCircle className="h-5 w-5" />}
              title="Placed"
              value={data.placed}
              highlight
            />
          </div>

          {/* Recent Applications */}
          <div className="mb-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <h2 className="text-lg font-bold text-[#0A1F44]">Recent Applications</h2>
              <Link
                to="/Candidates/applications"
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
              >
                View All
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {!data.recentApplications || data.recentApplications.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">
                  <Inbox className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-sm text-gray-500">
                  No applications yet — browse jobs to get started.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50/70 text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="p-4 text-left font-semibold">Job</th>
                      <th className="p-4 text-left font-semibold">Country</th>
                      <th className="p-4 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.recentApplications.map((app: any) => (
                      <tr key={app.id} className="transition hover:bg-blue-50/40">
                        <td className="p-4 font-semibold text-[#0A1F44]">{app.job_title}</td>
                        <td className="p-4 text-gray-600">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-gray-400" />
                            {app.country}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle(
                              app.status,
                            )}`}
                          >
                            {app.status?.replace(/_/g, " ")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recommended Jobs */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <h2 className="text-lg font-bold text-[#0A1F44]">Recommended Jobs</h2>
              <Link
                to="/Candidates/jobs"
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
              >
                Browse Jobs
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {!data.recommendedJobs || data.recommendedJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">
                  <Briefcase className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-sm text-gray-500">
                  No recommendations yet — complete your profile for better matches.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                {data.recommendedJobs.map((job: any) => (
                  <Link
                    key={job.id}
                    to="/Candidates/jobs/$id"
                    params={{ id: String(job.id) }}
                    className="group rounded-2xl border border-gray-100 p-5 transition hover:border-blue-200 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-[#0A1F44]">{job.title}</h3>
                        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-gray-500">
                          <MapPin className="h-3.5 w-3.5 text-gray-400" />
                          {job.country}
                        </p>
                        {(job.salary_min || job.salary_max) && (
                          <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-gray-500">
                            <Wallet className="h-3.5 w-3.5 text-gray-400" />
                            {job.currency} {job.salary_min}
                            {job.salary_max ? ` - ${job.salary_max}` : ""}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({
  icon,
  title,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm ${
        highlight ? "border-transparent bg-[#0A1F44] text-white" : "border-gray-100 bg-white"
      }`}
    >
      <div
        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${
          highlight ? "bg-white/15 text-white" : "bg-blue-50 text-blue-600"
        }`}
      >
        {icon}
      </div>
      <p className={highlight ? "text-sm text-blue-200" : "text-sm text-gray-500"}>{title}</p>
      <h2 className="mt-1 text-3xl font-extrabold">{value}</h2>
    </div>
  );
}
