import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  ClipboardList,
  Search,
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  MapPin,
  CalendarClock,
  Check,
  X,
  ArrowRightCircle,
  Loader2,
  Inbox,
  AlertTriangle,
} from "lucide-react";
import {
  getRequirements,
  approveRequirement,
  rejectRequirement,
  convertRequirement,
} from "@/api/admin";
import { AdminNav } from "@/components/Admin/AdminNav";
export const Route = createFileRoute("/Admin/requirements")({
  component: RequirementsPage,
});

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-600 border-red-200",
  converted: "bg-blue-50 text-blue-700 border-blue-200",
};

function statusStyle(status: string) {
  return STATUS_STYLES[status?.toLowerCase()] || "bg-gray-100 text-gray-600 border-gray-200";
}

export default function RequirementsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [pendingReject, setPendingReject] = useState<any>(null);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["requirements", search, status],
    queryFn: () => getRequirements({ search, status }),
  });

  const approve = useMutation({
    mutationFn: approveRequirement,
    onSuccess: () => refetch(),
  });
  const reject = useMutation({
    mutationFn: rejectRequirement,
    onSuccess: () => refetch(),
  });
  const convert = useMutation({
    mutationFn: convertRequirement,
    onSuccess: () => refetch(),
  });

  const requirements = data?.data ?? [];
  const pendingCount = requirements.filter(
    (r: any) => r.status?.toLowerCase() === "pending",
  ).length;
  const approvedCount = requirements.filter(
    (r: any) => r.status?.toLowerCase() === "approved",
  ).length;
  const totalHeadcount = requirements.reduce(
    (sum: number, r: any) => sum + (Number(r.headcount) || 0),
    0,
  );

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
                ADMIN · REQUIREMENTS
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
                Hiring <span className="text-blue-600">Requirements</span>
              </h1>
              <p className="mt-2 max-w-lg text-gray-500">
                Review, approve, and convert employer hiring requests into live jobs.
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
              icon={<Clock className="h-5 w-5 text-blue-600" />}
              label="Pending Review"
              value={pendingCount}
            />
            <StatChip
              icon={<CheckCircle2 className="h-5 w-5 text-blue-600" />}
              label="Approved (Not Converted)"
              value={approvedCount}
            />
            <StatChip
              icon={<Users className="h-5 w-5 text-blue-600" />}
              label="Total Headcount Requested"
              value={totalHeadcount}
            />
          </div>

          {/* Filters + table card */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="grid grid-cols-1 gap-3 border-b border-gray-100 p-4 sm:grid-cols-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  placeholder="Search company..."
                  className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
              </div>
            ) : requirements.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                  <Inbox className="h-6 w-6 text-blue-500" />
                </div>
                <p className="font-semibold text-[#0A1F44]">No requirements found</p>
                <p className="max-w-xs text-sm text-gray-500">
                  Try adjusting your search or filter.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50/70 text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="p-4 text-left font-semibold">Company</th>
                      <th className="p-4 text-left font-semibold">Role</th>
                      <th className="p-4 text-left font-semibold">Country</th>
                      <th className="p-4 text-left font-semibold">Headcount</th>
                      <th className="p-4 text-left font-semibold">Timeline</th>
                      <th className="p-4 text-left font-semibold">Status</th>
                      <th className="p-4 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {requirements.map((req: any) => {
                      const s = req.status?.toLowerCase();
                      const isPending = s === "pending";
                      const isApproved = s === "approved";
                      const busy =
                        (approve.isPending && approve.variables === req.id) ||
                        (reject.isPending && reject.variables === req.id) ||
                        (convert.isPending && convert.variables === req.id);

                      return (
                        <tr key={req.id} className="transition hover:bg-blue-50/40">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0A1F44] text-xs font-bold text-white">
                                {req.company_name?.slice(0, 2).toUpperCase() || "CO"}
                              </div>
                              <span className="font-semibold text-[#0A1F44]">
                                {req.company_name}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-600">{req.role}</td>
                          <td className="p-4 text-gray-600">
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-gray-400" />
                              {req.country}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600">
                            <span className="inline-flex items-center gap-1.5">
                              <Users className="h-3.5 w-3.5 text-gray-400" />
                              {req.headcount}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600">
                            <span className="inline-flex items-center gap-1.5">
                              <CalendarClock className="h-3.5 w-3.5 text-gray-400" />
                              {req.timeline}
                            </span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle(
                                req.status,
                              )}`}
                            >
                              {req.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {isPending && (
                                <>
                                  <button
                                    onClick={() => approve.mutate(req.id)}
                                    disabled={busy}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
                                  >
                                    <Check className="h-3.5 w-3.5" />
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => setPendingReject(req)}
                                    disabled={busy}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                                  >
                                    <X className="h-3.5 w-3.5" />
                                    Reject
                                  </button>
                                </>
                              )}
                              {isApproved && (
                                <button
                                  onClick={() => convert.mutate(req.id)}
                                  disabled={busy}
                                  className="inline-flex items-center gap-1.5 rounded-full bg-[#0A1F44] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#0d2a5c] disabled:opacity-50"
                                >
                                  {convert.isPending && convert.variables === req.id ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                  ) : (
                                    <ArrowRightCircle className="h-3.5 w-3.5" />
                                  )}
                                  Convert to Job
                                </button>
                              )}
                              {!isPending && !isApproved && (
                                <span className="text-xs text-gray-400">No actions available</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Reject confirmation */}
        {pendingReject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1F44]/40 p-6 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <button
                  onClick={() => setPendingReject(null)}
                  className="text-gray-400 transition hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#0A1F44]">Reject this requirement?</h3>
              <p className="mt-1 text-sm text-gray-500">
                {pendingReject.company_name}'s request for {pendingReject.role} will be marked
                rejected and won't be convertible to a job.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setPendingReject(null)}
                  className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    reject.mutate(pendingReject.id);
                    setPendingReject(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  <XCircle className="h-4 w-4" />
                  Reject
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
