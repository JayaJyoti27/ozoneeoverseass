import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  ClipboardList,
  Search,
  MapPin,
  Calendar,
  Loader2,
  Inbox,
  ArrowRight,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { getMyApplications } from "@/api/candidate";
import { CandidateNav } from "@/components/Candidate/CandidateNav";

export const Route = createFileRoute("/Candidates/applications")({
  component: ApplicationsPage,
});

type Application = {
  id: string | number;
  job_title: string;
  country: string;
  applied_at: string;
  status: string;
};

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

const STATUS_ICON: Record<string, React.ReactNode> = {
  pending: <Clock className="h-3 w-3" />,
  submitted: <Clock className="h-3 w-3" />,
  under_review: <Clock className="h-3 w-3" />,
  shortlisted: <Clock className="h-3 w-3" />,
  interview: <Clock className="h-3 w-3" />,
  offered: <CheckCircle2 className="h-3 w-3" />,
  hired: <CheckCircle2 className="h-3 w-3" />,
  accepted: <CheckCircle2 className="h-3 w-3" />,
  rejected: <XCircle className="h-3 w-3" />,
  withdrawn: <XCircle className="h-3 w-3" />,
};

function statusKey(status: string) {
  return status?.toLowerCase().replace(/\s+/g, "_");
}

function statusStyle(status: string) {
  return STATUS_STYLES[statusKey(status)] || "bg-gray-100 text-gray-600 border-gray-200";
}

function ApplicationsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["candidate-applications"],
    queryFn: getMyApplications,
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const applications: Application[] = data ?? [];

  const statuses = useMemo(() => {
    const unique = new Set(applications.map((a) => a.status).filter(Boolean));
    return ["all", ...Array.from(unique)];
  }, [applications]);

  const filtered = useMemo(() => {
    return applications.filter((a) => {
      const matchesSearch =
        !search || [a.job_title, a.country].join(" ").toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || a.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  const activeCount = applications.filter((a) =>
    ["pending", "submitted", "under_review", "shortlisted", "interview"].includes(
      statusKey(a.status),
    ),
  ).length;
  const offerCount = applications.filter((a) =>
    ["offered", "hired", "accepted"].includes(statusKey(a.status)),
  ).length;

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

        <div className="relative mx-auto max-w-6xl px-6 py-12">
          {/* Header */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
              <ClipboardList className="h-3.5 w-3.5" />
              CANDIDATE · APPLICATIONS
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
              My <span className="text-blue-600">Applications</span>
            </h1>
            <p className="mt-2 max-w-lg text-gray-500">
              Track every role you've applied to and where it stands.
            </p>
          </div>

          {/* Stat chips */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatChip
              icon={<ClipboardList className="h-5 w-5 text-blue-600" />}
              label="Total Applications"
              value={applications.length}
            />
            <StatChip
              icon={<Clock className="h-5 w-5 text-blue-600" />}
              label="In Progress"
              value={activeCount}
            />
            <StatChip
              icon={<CheckCircle2 className="h-5 w-5 text-blue-600" />}
              label="Offers"
              value={offerCount}
            />
          </div>

          {/* Table card */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-4">
              <div className="relative w-full max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search job or country..."
                  className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition ${
                      statusFilter === s
                        ? "border-[#0A1F44] bg-[#0A1F44] text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {s.replace(/_/g, " ")}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                  <Inbox className="h-6 w-6 text-blue-500" />
                </div>
                <p className="font-semibold text-[#0A1F44]">No applications found</p>
                <p className="max-w-xs text-sm text-gray-500">
                  {applications.length === 0
                    ? "Applications you submit will show up here."
                    : "Try adjusting your search or filter."}
                </p>
                {applications.length === 0 && (
                  <Link
                    to="/Candidates/jobs"
                    className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#0A1F44] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2a5c]"
                  >
                    Browse Jobs
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50/70 text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="p-4 text-left font-semibold">Job</th>
                      <th className="p-4 text-left font-semibold">Country</th>
                      <th className="p-4 text-left font-semibold">Applied</th>
                      <th className="p-4 text-left font-semibold">Status</th>
                      <th className="p-4 text-left font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((application) => (
                      <tr key={application.id} className="transition hover:bg-blue-50/40">
                        <td className="p-4 font-semibold text-[#0A1F44]">
                          {application.job_title}
                        </td>
                        <td className="p-4 text-gray-600">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-gray-400" />
                            {application.country}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                            {new Date(application.applied_at).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle(
                              application.status,
                            )}`}
                          >
                            {STATUS_ICON[statusKey(application.status)]}
                            {application.status?.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td className="p-4">
                          <Link
                            to="/Candidates/applications/$id"
                            params={{ id: String(application.id) }}
                            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                          >
                            View
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
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
