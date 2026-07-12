import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  FileText,
  Search,
  Mail,
  Phone,
  Briefcase,
  CalendarDays,
  Loader2,
  Inbox,
  Clock3,
} from "lucide-react";
import { EmployerNavbar } from "@/components/Employer/EmployerNav";
import { getApplications, updateApplicationStatus } from "@/api/employer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const Route = createFileRoute("/Employer/applications")({
  component: ApplicationsPage,
});

type Application = {
  id: string | number;
  candidate_name: string;
  job_title: string;
  email: string;
  phone: string;
  status: string;
  applied_at: string;
};

const STATUS_STYLES: Record<string, string> = {
  applied: "bg-blue-50 text-blue-700 border-blue-200",
  new: "bg-blue-50 text-blue-700 border-blue-200",
  reviewing: "bg-amber-50 text-amber-700 border-amber-200",
  shortlisted: "bg-indigo-50 text-indigo-700 border-indigo-200",
  interviewing: "bg-indigo-50 text-indigo-700 border-indigo-200",
  offered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  hired: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-600 border-red-200",
  withdrawn: "bg-gray-100 text-gray-600 border-gray-200",
};

function statusStyle(status: string) {
  const key = status?.toLowerCase().replace(/\s+/g, "_");
  return STATUS_STYLES[key] || "bg-gray-100 text-gray-600 border-gray-200";
}

function initials(name: string) {
  return (
    name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("") || "?"
  );
}

function timeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (Number.isNaN(days)) return "—";
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function ApplicationsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["employer-applications"],
    queryFn: getApplications,
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const applications: Application[] = data ?? [];

  const statuses = useMemo(() => {
    const unique = new Set(applications.map((a) => a.status).filter(Boolean));
    return ["all", ...Array.from(unique)];
  }, [applications]);

  const filtered = useMemo(() => {
    return applications
      .filter((a) => {
        const matchesSearch =
          !search ||
          [a.candidate_name, a.job_title, a.email]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || a.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime());
  }, [applications, search, statusFilter]);

  const pendingCount = applications.filter((a) =>
    ["applied", "new", "reviewing"].includes(a.status?.toLowerCase()),
  ).length;
  const shortlistedCount = applications.filter((a) =>
    ["shortlisted", "interviewing"].includes(a.status?.toLowerCase()),
  ).length;
  const hiredCount = applications.filter((a) =>
    ["hired", "offered"].includes(a.status?.toLowerCase()),
  ).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
      </div>
    );
  }
  const queryClient = useQueryClient();

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateApplicationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employer-applications"] });
    },
  });

  const STATUS_OPTIONS = [
    "applied",
    "reviewing",
    "shortlisted",
    "interviewing",
    "offered",
    "hired",
    "rejected",
  ];

  return (
    <>
    <EmployerNavbar/>
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
            <FileText className="h-3.5 w-3.5" />
            EMPLOYER · APPLICATIONS
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
            Candidate <span className="text-blue-600">Applications</span>
          </h1>
          <p className="mt-2 max-w-lg text-gray-500">
            Review everyone who's applied to your open roles and move them through your pipeline.
          </p>
        </div>

        {/* Stat chips */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatChip
            icon={<Clock3 className="h-5 w-5 text-blue-600" />}
            label="Pending Review"
            value={pendingCount}
          />
          <StatChip
            icon={<Briefcase className="h-5 w-5 text-blue-600" />}
            label="Shortlisted"
            value={shortlistedCount}
          />
          <StatChip
            icon={<FileText className="h-5 w-5 text-blue-600" />}
            label="Offered / Hired"
            value={hiredCount}
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
                placeholder="Search candidate, role, email..."
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
                  ? "Applications to your posted roles will show up here."
                  : "Try adjusting your search or filter."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50/70 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="p-4 text-left font-semibold">Candidate</th>
                    <th className="p-4 text-left font-semibold">Job</th>
                    <th className="p-4 text-left font-semibold">Contact</th>
                    <th className="p-4 text-left font-semibold">Status</th>
                    <th className="p-4 text-left font-semibold">Applied</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((a) => (
                    <tr key={a.id} className="transition hover:bg-blue-50/40">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0A1F44] text-xs font-bold text-white">
                            {initials(a.candidate_name)}
                          </div>
                          <span className="font-semibold text-[#0A1F44]">{a.candidate_name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">
                        <span className="inline-flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5 text-gray-400" />
                          {a.job_title}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1 text-xs text-gray-500">
                          <a
                            href={`mailto:${a.email}`}
                            className="inline-flex items-center gap-1.5 hover:text-blue-600"
                          >
                            <Mail className="h-3.5 w-3.5 text-gray-400" />
                            {a.email}
                          </a>

                          <a
                            href={`tel:${a.phone}`}
                            className="inline-flex items-center gap-1.5 hover:text-blue-600"
                          >
                            <Phone className="h-3.5 w-3.5 text-gray-400" />
                            {a.phone}
                          </a>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle(
                            a.status,
                          )}`}
                        >
                          {a.status?.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5 text-gray-400" />
                          <span title={new Date(a.applied_at).toLocaleDateString()}>
                            {timeAgo(a.applied_at)}
                          </span>
                        </span>
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
