import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  getDashboard,
  getJobs,
  getRequirements,
  getApplications,
  getCompanyProfile,
} from "@/api/employer";
import {
  Building2,
  Briefcase,
  ClipboardList,
  Users,
  Mail,
  Globe2,
  ArrowRight,
  Loader2,
  Inbox,
  MapPin,
  Search,
  FolderKanban,
  Sparkles,
} from "lucide-react";
import { EmployerNavbar } from "@/components/Employer/EmployerNav";
export const Route = createFileRoute("/Employer/dashboard")({
  component: DashboardPage,
});

const STATUS_STYLES: Record<string, string> = {
  open: "bg-emerald-50 text-emerald-700 border-emerald-200",
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  published: "bg-emerald-50 text-emerald-700 border-emerald-200",
  in_progress: "bg-blue-50 text-blue-700 border-blue-200",
  matching: "bg-blue-50 text-blue-700 border-blue-200",
  under_review: "bg-blue-50 text-blue-700 border-blue-200",
  shortlisted: "bg-blue-50 text-blue-700 border-blue-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
  offered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  hired: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  closed: "bg-gray-100 text-gray-600 border-gray-200",
  filled: "bg-gray-100 text-gray-600 border-gray-200",
};

function statusStyle(status: string) {
  const key = status?.toLowerCase().replace(/\s+/g, "_");
  return STATUS_STYLES[key] || "bg-gray-100 text-gray-600 border-gray-200";
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle(
        status,
      )}`}
    >
      {status?.replace(/_/g, " ") || "—"}
    </span>
  );
}

function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["employer-dashboard"],
    queryFn: getDashboard,
  });

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["employer-profile"],
    queryFn: getCompanyProfile,
  });

  const { data: jobsData, isLoading: jobsLoading } = useQuery({
    queryKey: ["employer-jobs"],
    queryFn: getJobs,
  });

  const { data: requirementsData, isLoading: requirementsLoading } = useQuery({
    queryKey: ["employer-requirements"],
    queryFn: getRequirements,
  });

  const { data: applicationsData, isLoading: applicationsLoading } = useQuery({
    queryKey: ["employer-applications"],
    queryFn: getApplications,
  });

  const jobs = jobsData ?? [];
  const requirements = requirementsData ?? [];
  const applications = applicationsData ?? [];

  const recentJobs = [...jobs]
    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const recentRequirements = [...requirements]
    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const recentApplications = [...applications]
    .sort((a: any, b: any) => new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime())
    .slice(0, 5);

  const isLoading =
    statsLoading || profileLoading || jobsLoading || requirementsLoading || applicationsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
      </div>
    );
  }

  return (
    <>
      <EmployerNavbar />
      <div className="relative min-h-screen bg-[#F6F8FC]">
        <div className="pointer-events-none absolute left-6 top-8 grid grid-cols-6 gap-1.5 opacity-40">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-[#0A1F44]/30" />
          ))}
        </div>
        <div className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-blue-100/60 blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-12">
          {/* Header */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
              <Sparkles className="h-3.5 w-3.5" />
              EMPLOYER · DASHBOARD
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
              {profile?.company_name ? `Welcome, ${profile.company_name}` : "Employer Dashboard"}
            </h1>
            <p className="mt-2 max-w-lg text-gray-500">
              Here's what's happening across your jobs, requirements, and applications.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Left: company snapshot */}
            <div className="h-fit space-y-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0A1F44] text-lg font-bold text-white">
                  {profile?.company_name?.trim()
                    ? profile.company_name.trim().slice(0, 2).toUpperCase()
                    : "CO"}
                </div>
                <h3 className="mt-4 text-base font-bold text-[#0A1F44]">
                  {profile?.company_name || "Company name not set"}
                </h3>
                <p className="text-sm text-gray-500">{profile?.sector || "Sector not set"}</p>

                <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4 text-blue-500" />
                    {profile?.email || "—"}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe2 className="h-4 w-4 text-blue-500" />
                    {profile?.country || "—"}
                  </div>
                </div>

                <Link
                  to="/Employer/my-company"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline"
                >
                  Edit Company Profile
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Quick actions */}
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-400">
                  Quick Actions
                </p>
                <div className="space-y-1">
                  <QuickAction
                    to="/Employer/jobs"
                    icon={<Briefcase className="h-4 w-4" />}
                    label="Manage Jobs"
                  />
                  <QuickAction
                    to="/Employer/requirements"
                    icon={<FolderKanban className="h-4 w-4" />}
                    label="Manage Requirements"
                  />
                  <QuickAction
                    to="/Employer/applications"
                    icon={<ClipboardList className="h-4 w-4" />}
                    label="Review Applications"
                  />
                  <QuickAction
                    to="/Employer/candidate"
                    icon={<Search className="h-4 w-4" />}
                    label="Search Candidates"
                  />
                </div>
              </div>
            </div>

            {/* Right: stats + tables */}
            <div className="space-y-8">
              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
                <StatCard
                  icon={<Briefcase className="h-5 w-5" />}
                  label="Total Jobs"
                  value={stats?.jobs ?? 0}
                />
                <StatCard
                  icon={<Briefcase className="h-5 w-5" />}
                  label="Active Jobs"
                  value={stats?.activeJobs ?? 0}
                  highlight
                />
                <StatCard
                  icon={<FolderKanban className="h-5 w-5" />}
                  label="Requirements"
                  value={stats?.requirements ?? 0}
                />
                <StatCard
                  icon={<ClipboardList className="h-5 w-5" />}
                  label="Applications"
                  value={stats?.applications ?? 0}
                />
              </div>

              {/* Recent Jobs */}
              <DashboardTable
                title="Recent Jobs"
                viewAllTo="/Employer/jobs"
                empty="No jobs posted yet."
                headers={["Title", "Country", "Status"]}
                rows={recentJobs.map((job: any) => (
                  <tr key={job.id} className="transition hover:bg-blue-50/40">
                    <td className="p-4 font-semibold text-[#0A1F44]">{job.title}</td>
                    <td className="p-4 text-gray-600">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-gray-400" />
                        {job.country}
                      </span>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={job.status} />
                    </td>
                  </tr>
                ))}
              />

              {/* Recent Requirements */}
              <DashboardTable
                title="Recent Requirements"
                viewAllTo="/Employer/requirements"
                empty="No requirements submitted yet."
                headers={["Role", "Country", "Headcount", "Status"]}
                rows={recentRequirements.map((req: any) => (
                  <tr key={req.id} className="transition hover:bg-blue-50/40">
                    <td className="p-4 font-semibold text-[#0A1F44]">{req.role}</td>
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
                    <td className="p-4">
                      <StatusBadge status={req.status} />
                    </td>
                  </tr>
                ))}
              />

              {/* Recent Applications */}
              <DashboardTable
                title="Recent Applications"
                viewAllTo="/Employer/applications"
                empty="No applications received yet."
                headers={["Candidate", "Job", "Status"]}
                rows={recentApplications.map((app: any) => (
                  <tr key={app.id} className="transition hover:bg-blue-50/40">
                    <td className="p-4 font-semibold text-[#0A1F44]">{app.candidate_name}</td>
                    <td className="p-4 text-gray-600">{app.job_title}</td>
                    <td className="p-4">
                      <StatusBadge status={app.status} />
                    </td>
                  </tr>
                ))}
              />
            </div>
          </div>
        </div>
      </div>
    </>
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
      className={`rounded-2xl border p-5 shadow-sm ${
        highlight ? "border-transparent bg-[#0A1F44] text-white" : "border-gray-100 bg-white"
      }`}
    >
      <div
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
          highlight ? "bg-white/15 text-white" : "bg-blue-50 text-blue-600"
        }`}
      >
        {icon}
      </div>
      <p className={highlight ? "text-sm text-blue-200" : "text-sm text-gray-500"}>{label}</p>
      <p className="mt-1 text-2xl font-extrabold">{value}</p>
    </div>
  );
}

function QuickAction({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-blue-50 hover:text-[#0A1F44]"
    >
      <span className="text-blue-500">{icon}</span>
      {label}
    </Link>
  );
}

function DashboardTable({
  title,
  viewAllTo,
  empty,
  headers,
  rows,
}: {
  title: string;
  viewAllTo: string;
  empty: string;
  headers: string[];
  rows: React.ReactNode[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <h2 className="text-lg font-bold text-[#0A1F44]">{title}</h2>
        <Link
          to={viewAllTo}
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">
            <Inbox className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-sm text-gray-500">{empty}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/70 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                {headers.map((h) => (
                  <th key={h} className="p-4 text-left font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">{rows}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
