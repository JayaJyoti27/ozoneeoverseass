import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  ClipboardList,
  Search,
  RefreshCw,
  Users,
  CheckCircle2,
  PlaneTakeoff,
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Inbox,
} from "lucide-react";
import { getApplications } from "@/api/admin";
import { AdminNav } from "@/components/Admin/AdminNav";
export const Route = createFileRoute("/Admin/applications")({
  component: ApplicationsPage,
});

const STATUS_ORDER = ["applied", "review", "interview", "documentation", "visa", "placed"];

const STATUS_STYLES: Record<string, string> = {
  applied: "bg-gray-100 text-gray-600 border-gray-200",
  review: "bg-amber-50 text-amber-700 border-amber-200",
  interview: "bg-blue-50 text-blue-700 border-blue-200",
  documentation: "bg-blue-50 text-blue-700 border-blue-200",
  visa: "bg-indigo-50 text-indigo-700 border-indigo-200",
  placed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-600 border-red-200",
};

function statusStyle(status: string) {
  return STATUS_STYLES[status?.toLowerCase()] || "bg-gray-100 text-gray-600 border-gray-200";
}

function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["admin-applications", search, status, page],
    queryFn: () => getApplications({ search, status, page, limit: 10 }),
  });

  const applications = data?.data ?? [];
  const total = data?.total ?? applications.length;
  const totalPages = data?.totalPages ?? Math.max(1, Math.ceil(total / 10));

  const placedCount = applications.filter((a: any) => a.status?.toLowerCase() === "placed").length;
  const inPipeline = applications.filter((a: any) =>
    ["review", "interview", "documentation", "visa"].includes(a.status?.toLowerCase()),
  ).length;
  const visaStage = applications.filter((a: any) => a.status?.toLowerCase() === "visa").length;

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
                <ClipboardList className="h-3.5 w-3.5" />
                ADMIN · APPLICATIONS
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
                Candidate <span className="text-blue-600">Applications</span>
              </h1>
              <p className="mt-2 max-w-lg text-gray-500">
                Track every candidate as they move from application to placement.
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
              icon={<Users className="h-5 w-5 text-blue-600" />}
              label="In Pipeline (This Page)"
              value={inPipeline}
            />
            <StatChip
              icon={<PlaneTakeoff className="h-5 w-5 text-blue-600" />}
              label="At Visa Stage"
              value={visaStage}
            />
            <StatChip
              icon={<CheckCircle2 className="h-5 w-5 text-blue-600" />}
              label="Placed (This Page)"
              value={placedCount}
            />
          </div>

          {/* Filters + table card */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="grid grid-cols-1 gap-3 border-b border-gray-100 p-4 sm:grid-cols-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  placeholder="Search candidate..."
                  className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  value={search}
                  onChange={(e) => updateFilter(setSearch)(e.target.value)}
                />
              </div>

              <select
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                value={status}
                onChange={(e) => updateFilter(setStatus)(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="applied">Applied</option>
                <option value="review">Review</option>
                <option value="interview">Interview</option>
                <option value="documentation">Documentation</option>
                <option value="visa">Visa</option>
                <option value="placed">Placed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
              </div>
            ) : applications.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                  <Inbox className="h-6 w-6 text-blue-500" />
                </div>
                <p className="font-semibold text-[#0A1F44]">No applications found</p>
                <p className="max-w-xs text-sm text-gray-500">
                  Try adjusting your search or filter.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50/70 text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="p-4 text-left font-semibold">Candidate</th>
                      <th className="p-4 text-left font-semibold">Job</th>
                      <th className="p-4 text-left font-semibold">Pipeline Stage</th>
                      <th className="p-4 text-left font-semibold">Applied</th>
                      <th className="p-4 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {applications.map((app: any) => (
                      <tr key={app.id} className="transition hover:bg-blue-50/40">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0A1F44] text-xs font-bold text-white">
                              {app.candidate_name?.slice(0, 2).toUpperCase() || "?"}
                            </div>
                            <span className="font-semibold text-[#0A1F44]">
                              {app.candidate_name}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">{app.job_title}</td>
                        <td className="p-4">
                          <div className="flex flex-col gap-1.5">
                            <span
                              className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle(
                                app.status,
                              )}`}
                            >
                              {app.status}
                            </span>
                            {app.status?.toLowerCase() !== "rejected" && (
                              <PipelineTrack status={app.status} />
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">
                          {new Date(app.applied_at).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <Link
                            to="/Admin/application/$id"
                            params={{ id: app.id }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#0A1F44] transition hover:border-blue-300 hover:bg-blue-50"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            View
                          </Link>
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
      </div>
    </>
  );
}

function PipelineTrack({ status }: { status: string }) {
  const currentIndex = STATUS_ORDER.indexOf(status?.toLowerCase());
  return (
    <div className="flex items-center gap-1">
      {STATUS_ORDER.map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-4 rounded-full ${i <= currentIndex ? "bg-[#0A1F44]" : "bg-gray-200"}`}
        />
      ))}
    </div>
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
