import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getJobs, archiveJob } from "@/api/admin";
import {
  Briefcase,
  Search,
  RefreshCw,
  Globe2,
  Wallet,
  BarChart3,
  Users,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Archive as ArchiveIcon,
  Loader2,
  Inbox,
  X,
  AlertTriangle,
} from "lucide-react";
import { AdminNav } from "@/components/Admin/AdminNav";
export const Route = createFileRoute("/Admin/jobs")({
  component: JobsPage,
});

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  closed: "bg-gray-100 text-gray-600 border-gray-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
};

function statusStyle(status: string) {
  return STATUS_STYLES[status?.toLowerCase()] || "bg-gray-100 text-gray-600 border-gray-200";
}

function formatSalary(job: any) {
  if (!job.salary_min && !job.salary_max) return "—";
  const min = Number(job.salary_min).toLocaleString();
  const max = Number(job.salary_max).toLocaleString();
  return `${job.currency ?? ""} ${min} - ${max}`.trim();
}

function JobsPage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pendingArchive, setPendingArchive] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["admin-jobs", search, country, status, page],
    queryFn: () => getJobs({ search, country, status, page, limit: 10 }),
  });

  const archive = useMutation({
    mutationFn: archiveJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
      setPendingArchive(null);
    },
  });

  const jobs = data?.data ?? [];
  const total = data?.total ?? jobs.length;
  const totalPages = data?.totalPages ?? Math.max(1, Math.ceil(total / 10));
  const activeCount = jobs.filter((j: any) => j.status?.toLowerCase() === "active").length;
  const totalApplicants = jobs.reduce(
    (sum: number, j: any) => sum + (Number(j.applicants) || 0),
    0,
  );
  const countries = new Set(jobs.map((j: any) => j.country)).size;

  const updateFilter = (setter: (v: string) => void) => (v: string) => {
    setPage(1);
    setter(v);
  };

  return (
    <>
      <AdminNav />
      <div className="relative min-h-screen bg-[#F6F8FC]">
        <div className="pointer-events-none absolute left-6 top-8 grid grid-cols-6 gap-1.5 opacity-40">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-[#0A1F44]/30" />
          ))}
        </div>
        <div className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-blue-100/60 blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-12">
          {/* Header */}
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
                <Briefcase className="h-3.5 w-3.5" />
                ADMIN · JOBS
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
                Job <span className="text-blue-600">Listings</span>
              </h1>
              <p className="mt-2 max-w-lg text-gray-500">
                Manage every job posting live across all countries and employers.
              </p>
            </div>

            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-[#0A1F44] transition hover:border-gray-300 disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {/* Stat chips */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatChip
              icon={<BarChart3 className="h-5 w-5 text-blue-600" />}
              label="Active on This Page"
              value={activeCount}
            />
            <StatChip
              icon={<Users className="h-5 w-5 text-blue-600" />}
              label="Applicants on This Page"
              value={totalApplicants}
            />
            <StatChip
              icon={<Globe2 className="h-5 w-5 text-blue-600" />}
              label="Countries on This Page"
              value={countries}
            />
          </div>

          {/* Filters + table card */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="grid grid-cols-1 gap-3 border-b border-gray-100 p-4 sm:grid-cols-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  placeholder="Search job title..."
                  className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  value={search}
                  onChange={(e) => updateFilter(setSearch)(e.target.value)}
                />
              </div>

              <input
                placeholder="Country"
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                value={country}
                onChange={(e) => updateFilter(setCountry)(e.target.value)}
              />

              <select
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                value={status}
                onChange={(e) => updateFilter(setStatus)(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
              </div>
            ) : jobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                  <Inbox className="h-6 w-6 text-blue-500" />
                </div>
                <p className="font-semibold text-[#0A1F44]">No jobs found</p>
                <p className="max-w-xs text-sm text-gray-500">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50/70 text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="w-10 p-4"></th>
                      <th className="p-4 text-left font-semibold">Title</th>
                      <th className="p-4 text-left font-semibold">Country</th>
                      <th className="p-4 text-left font-semibold">Salary</th>
                      <th className="p-4 text-left font-semibold">Experience</th>
                      <th className="p-4 text-left font-semibold">Status</th>
                      <th className="p-4 text-left font-semibold">Applicants</th>
                      <th className="p-4 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {jobs.map((job: any) => (
                      <tr key={job.id} className="transition hover:bg-blue-50/40">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 accent-[#0A1F44]"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0A1F44]">
                              <Briefcase className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-semibold text-[#0A1F44]">{job.title}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">
                          <span className="inline-flex items-center gap-1.5">
                            <Globe2 className="h-3.5 w-3.5 text-gray-400" />
                            {job.country}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">
                          <span className="inline-flex items-center gap-1.5">
                            <Wallet className="h-3.5 w-3.5 text-gray-400" />
                            {formatSalary(job)}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">{job.experience_required || "—"}</td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle(
                              job.status,
                            )}`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">
                          <span className="inline-flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5 text-gray-400" />
                            {job.applicants ?? 0}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <Link
                              to="/Admin/job/$id"
                              params={{ id: job.id }}
                              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#0A1F44] transition hover:border-blue-300 hover:bg-blue-50"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              View
                            </Link>
                            <Link
                              to="/Admin/job/$id"
                              params={{ id: job.id }}
                              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#0A1F44] transition hover:border-blue-300 hover:bg-blue-50"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Link>
                            <button
                              onClick={() => setPendingArchive(job)}
                              disabled={archive.isPending && archive.variables === job.id}
                              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-500 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700 disabled:opacity-50"
                            >
                              <ArchiveIcon className="h-3.5 w-3.5" />
                              Archive
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 p-4">
              <p className="text-xs text-gray-500">
                Page {page} of {totalPages}
                {isFetching && " · refreshing..."}
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-[#0A1F44] transition hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#0A1F44] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0d2a5c] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Archive confirmation modal */}
        {pendingArchive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1F44]/40 p-6 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <button
                  onClick={() => setPendingArchive(null)}
                  className="text-gray-400 transition hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#0A1F44]">Archive this job posting?</h3>
              <p className="mt-1 text-sm text-gray-500">
                "{pendingArchive.title}" will be archived and hidden from active listings, but its{" "}
                {pendingArchive.applicants ?? 0} applicant record
                {pendingArchive.applicants === 1 ? "" : "s"} will be kept.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setPendingArchive(null)}
                  className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => archive.mutate(pendingArchive.id)}
                  disabled={archive.isPending}
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                  {archive.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArchiveIcon className="h-4 w-4" />
                  )}
                  Archive Job
                </button>
              </div>
            </div>
          </div>
        )}
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
