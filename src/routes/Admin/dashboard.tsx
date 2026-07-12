import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  LayoutDashboard,
  RefreshCw,
  Users,
  Building2,
  Briefcase,
  ClipboardList,
  FileClock,
  Globe2,
  ArrowUpRight,
  Loader2,
  AlertTriangle,
  Inbox,
} from "lucide-react";
import { getDashboard } from "@/api/admin";
import {AdminNav} from "@/components/Admin/AdminNav"
export const Route = createFileRoute("/Admin/dashboard")({
  component: DashboardPage,
});

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  placed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  review: "bg-amber-50 text-amber-700 border-amber-200",
  inactive: "bg-gray-100 text-gray-600 border-gray-200",
  closed: "bg-gray-100 text-gray-600 border-gray-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
  rejected: "bg-red-50 text-red-600 border-red-200",
};

function statusStyle(status: string) {
  return STATUS_STYLES[status?.toLowerCase()] || "bg-gray-100 text-gray-600 border-gray-200";
}

const QUICK_LINKS = [
  { to: "/Admin/candidates", label: "Candidates", icon: Users },
  { to: "/Admin/employer", label: "Employers", icon: Building2 },
  { to: "/Admin/jobs", label: "Jobs", icon: Briefcase },
  { to: "/Admin/applications", label: "Applications", icon: ClipboardList },
];

export default function DashboardPage() {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getDashboard,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F8FC]">
        <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="relative min-h-screen bg-[#F6F8FC]">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-[#0A1F44]">Failed to load dashboard</h2>
          <p className="mt-1 text-sm text-gray-500">
            Something went wrong while fetching platform data.
          </p>
          <button
            onClick={() => refetch()}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d2a5c]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <AdminNav/>
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
              <LayoutDashboard className="h-3.5 w-3.5" />
              ADMIN · OVERVIEW
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
              Platform <span className="text-blue-600">Dashboard</span>
            </h1>
            <p className="mt-2 max-w-lg text-gray-500">
              A live snapshot of candidates, employers, jobs, and applications across Ozone
              Overseas.
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

        {/* Stat cards, mirrors homepage icon-chip stat row */}
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard
            icon={<Users className="h-5 w-5 text-blue-600" />}
            label="Candidates"
            value={data.totalCandidates ?? 0}
          />
          <StatCard
            icon={<Building2 className="h-5 w-5 text-blue-600" />}
            label="Employers"
            value={data.totalEmployers ?? 0}
          />
          <StatCard
            icon={<Briefcase className="h-5 w-5 text-blue-600" />}
            label="Jobs"
            value={data.totalJobs ?? 0}
          />
          <StatCard
            icon={<ClipboardList className="h-5 w-5 text-blue-600" />}
            label="Applications"
            value={data.totalApplications ?? 0}
          />
          <StatCard
            icon={<FileClock className="h-5 w-5 text-blue-600" />}
            label="Pending Requirements"
            value={data.pendingRequirements ?? 0}
            highlight={data.pendingRequirements > 0}
          />
          <StatCard
            icon={<Globe2 className="h-5 w-5 text-blue-600" />}
            label="Countries"
            value={data.totalCountries ?? 0}
          />
        </div>

        {/* Quick Navigation */}
        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-5 text-lg font-bold text-[#0A1F44]">Quick Navigation</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {QUICK_LINKS.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="group flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-[#F6F8FC] p-5 text-center transition hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0A1F44] transition group-hover:bg-blue-600">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-semibold text-[#0A1F44]">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent sections */}
        <div className="space-y-6">
          <RecentSection
            title="Recent Candidates"
            viewAllTo="/Admin/candidates"
            columns={["Name", "Specialty", "Status"]}
            rows={data.recentCandidates}
            renderRow={(c: any) => (
              <>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0A1F44] text-xs font-bold text-white">
                      {c.name?.slice(0, 2).toUpperCase() || "?"}
                    </div>
                    <span className="font-semibold text-[#0A1F44]">{c.name}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{c.specialty || "—"}</td>
                <td className="p-4">
                  <StatusBadge status={c.status} />
                </td>
              </>
            )}
          />

          <RecentSection
            title="Recent Employer"
            viewAllTo="/Admin/employer"
            columns={["Company", "Country", "Status"]}
            rows={data.recentEmployer}
            renderRow={(e: any) => (
              <>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0A1F44] text-xs font-bold text-white">
                      {e.company_name?.slice(0, 2).toUpperCase() || "CO"}
                    </div>
                    <span className="font-semibold text-[#0A1F44]">{e.company_name}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{e.country || "—"}</td>
                <td className="p-4">
                  <StatusBadge status={e.status} />
                </td>
              </>
            )}
          />

          <RecentSection
            title="Recent Jobs"
            viewAllTo="/Admin/jobs"
            columns={["Title", "Country", "Status"]}
            rows={data.recentJobs}
            renderRow={(j: any) => (
              <>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0A1F44]">
                      <Briefcase className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="font-semibold text-[#0A1F44]">{j.title}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{j.country || "—"}</td>
                <td className="p-4">
                  <StatusBadge status={j.status} />
                </td>
              </>
            )}
          />
        </div>
      </div>
    </div>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (!status) return <span className="text-xs text-gray-400">—</span>;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle(
        status,
      )}`}
    >
      {status}
    </span>
  );
}

function StatCard({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 shadow-sm ${
        highlight ? "border-amber-200 bg-amber-50" : "border-gray-100 bg-white"
      }`}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">{icon}</div>
      <p className="mt-3 text-2xl font-extrabold text-[#0A1F44]">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function RecentSection({
  title,
  viewAllTo,
  columns,
  rows,
  renderRow,
}: {
  title: string;
  viewAllTo: string;
  columns: string[];
  rows: any[] | undefined;
  renderRow: (row: any) => React.ReactNode;
}) {
  const items = rows ?? [];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-6">
        <h2 className="text-lg font-bold text-[#0A1F44]">{title}</h2>
        <Link
          to={viewAllTo}
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          View all
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
          <Inbox className="h-6 w-6 text-gray-300" />
          <p className="text-sm text-gray-400">Nothing here yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/70 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                {columns.map((col) => (
                  <th key={col} className="p-4 text-left font-semibold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((row: any) => (
                <tr key={row.id} className="transition hover:bg-blue-50/40">
                  {renderRow(row)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
