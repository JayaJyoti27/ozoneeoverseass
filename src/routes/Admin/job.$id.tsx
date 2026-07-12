import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  Globe2,
  MapPin,
  Building2,
  Wallet,
  BarChart3,
  ShieldCheck,
  FileText,
  Users,
  Send,
  Archive as ArchiveIcon,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  X,
  Inbox,
} from "lucide-react";
import { getJob, updateJob, archiveJob } from "@/api/admin";
import { AdminNav } from "@/components/Admin/AdminNav";
export const Route = createFileRoute("/Admin/job/$id")({
  component: JobDetailsPage,
});

type JobForm = {
  title: string;
  country: string;
  city: string;
  sector: string;
  employer_type: string;
  salary_min: number | string;
  salary_max: number | string;
  currency: string;
  experience_required: string;
  license_required: string;
  description: string;
  status: string;
  applications?: {
    id: string | number;
    name: string;
    status: string;
    applied_at: string;
  }[];
};

const EMPTY_FORM: JobForm = {
  title: "",
  country: "",
  city: "",
  sector: "",
  employer_type: "",
  salary_min: "",
  salary_max: "",
  currency: "",
  experience_required: "",
  license_required: "",
  description: "",
  status: "",
};

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  closed: "bg-gray-100 text-gray-600 border-gray-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
};

const APP_STATUS_STYLES: Record<string, string> = {
  shortlisted: "bg-blue-50 text-blue-700 border-blue-200",
  interview: "bg-blue-50 text-blue-700 border-blue-200",
  hired: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-600 border-red-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
};

function statusStyle(status: string) {
  return STATUS_STYLES[status?.toLowerCase()] || "bg-gray-100 text-gray-600 border-gray-200";
}

function appStatusStyle(status: string) {
  return APP_STATUS_STYLES[status?.toLowerCase()] || "bg-gray-100 text-gray-600 border-gray-200";
}

export default function JobDetailsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-job", id],
    queryFn: () => getJob(id),
  });

  const [form, setForm] = useState<JobForm>(EMPTY_FORM);
  const [dirty, setDirty] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [confirmArchive, setConfirmArchive] = useState(false);

  const update = useMutation({
    mutationFn: (body: JobForm) =>
      updateJob(id, {
        ...body,
        salary_min: Number(body.salary_min) || 0,
        salary_max: Number(body.salary_max) || 0,
      }),
    onSuccess: () => {
      refetch();
      setDirty(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2500);
    },
  });

  const archive = useMutation({
    mutationFn: () => archiveJob(id),
    onSuccess: () => navigate({ to: "/Admin/jobs" }),
  });

  useEffect(() => {
    if (data) setForm({ ...EMPTY_FORM, ...data });
  }, [data]);

  const set = (key: keyof JobForm) => (v: string) => {
    setForm((f) => ({ ...f, [key]: v }));
    setDirty(true);
  };

  const applicants = form.applications ?? [];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F8FC]">
        <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
      </div>
    );
  }

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

        <div className="relative mx-auto max-w-5xl px-6 py-12">
          <Link
            to="/Admin/jobs"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-[#0A1F44]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Link>

          {/* Header */}
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A1F44]">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-[#0A1F44] sm:text-3xl">
                  {form.title || "Job Details"}
                </h1>
                <span
                  className={`mt-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${statusStyle(
                    form.status,
                  )}`}
                >
                  {form.status || "unknown"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {showSaved && (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Saved
                </span>
              )}
              <button
                onClick={() => setConfirmArchive(true)}
                disabled={archive.isPending}
                className="inline-flex items-center gap-2 rounded-full border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
              >
                <ArchiveIcon className="h-4 w-4" />
                Archive
              </button>
              <button
                onClick={() => update.mutate(form)}
                disabled={update.isPending || !dirty}
                className="inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2a5c] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {update.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Save Changes
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <StatChip
              icon={<Users className="h-5 w-5 text-blue-600" />}
              label="Applicants"
              value={applicants.length}
            />
            <StatChip
              icon={<Wallet className="h-5 w-5 text-blue-600" />}
              label="Salary Range"
              value={
                form.salary_min || form.salary_max
                  ? `${form.currency || ""} ${form.salary_min || 0}-${form.salary_max || 0}`
                  : "—"
              }
            />
            <StatChip
              icon={<BarChart3 className="h-5 w-5 text-blue-600" />}
              label="Experience"
              value={form.experience_required || "—"}
            />
          </div>

          {/* Job info card */}
          <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-[#0A1F44]">Job Information</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Job Title"
                icon={<Briefcase className="h-4 w-4" />}
                value={form.title}
                onChange={set("title")}
              />
              <Field
                label="Employer Type"
                icon={<Building2 className="h-4 w-4" />}
                value={form.employer_type}
                onChange={set("employer_type")}
              />
              <Field
                label="Country"
                icon={<Globe2 className="h-4 w-4" />}
                value={form.country}
                onChange={set("country")}
              />
              <Field
                label="City"
                icon={<MapPin className="h-4 w-4" />}
                value={form.city}
                onChange={set("city")}
              />
              <Field
                label="Sector"
                icon={<Briefcase className="h-4 w-4" />}
                value={form.sector}
                onChange={set("sector")}
              />
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#0A1F44]">
                  <CheckCircle2 className="h-4 w-4 text-blue-500" />
                  Status
                </label>
                <select
                  className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  value={form.status}
                  onChange={(e) => set("status")(e.target.value)}
                >
                  <option value="">Select status</option>
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>

          {/* Compensation card */}
          <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <Wallet className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-[#0A1F44]">Compensation & Requirements</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              <Field
                label="Currency"
                icon={<Wallet className="h-4 w-4" />}
                value={form.currency}
                onChange={set("currency")}
              />
              <Field
                label="Salary Min"
                icon={<Wallet className="h-4 w-4" />}
                value={String(form.salary_min ?? "")}
                onChange={set("salary_min")}
                type="number"
              />
              <Field
                label="Salary Max"
                icon={<Wallet className="h-4 w-4" />}
                value={String(form.salary_max ?? "")}
                onChange={set("salary_max")}
                type="number"
              />
              <Field
                label="Experience Required"
                icon={<BarChart3 className="h-4 w-4" />}
                value={form.experience_required}
                onChange={set("experience_required")}
              />
              <Field
                label="License Required"
                icon={<ShieldCheck className="h-4 w-4" />}
                value={form.license_required}
                onChange={set("license_required")}
              />
            </div>
          </div>

          {/* Description card */}
          <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-[#0A1F44]">Description</h2>
            </div>
            <textarea
              rows={8}
              placeholder="Job description..."
              className="w-full rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              value={form.description}
              onChange={(e) => set("description")(e.target.value)}
            />
          </div>

          {/* Applicants card */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-gray-100 p-6">
              <Users className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-[#0A1F44]">Applicants ({applicants.length})</h2>
            </div>

            {applicants.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                  <Inbox className="h-6 w-6 text-blue-500" />
                </div>
                <p className="font-semibold text-[#0A1F44]">No applicants yet</p>
                <p className="max-w-xs text-sm text-gray-500">
                  Applications will appear here once candidates apply.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50/70 text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="p-4 text-left font-semibold">Name</th>
                      <th className="p-4 text-left font-semibold">Status</th>
                      <th className="p-4 text-left font-semibold">Applied</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {applicants.map((app) => (
                      <tr key={app.id} className="transition hover:bg-blue-50/40">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0A1F44] text-xs font-bold text-white">
                              {app.name?.slice(0, 2).toUpperCase() || "?"}
                            </div>
                            <span className="font-semibold text-[#0A1F44]">{app.name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${appStatusStyle(
                              app.status,
                            )}`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">
                          {new Date(app.applied_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Archive confirmation */}
        {confirmArchive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1F44]/40 p-6 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <button
                  onClick={() => setConfirmArchive(false)}
                  className="text-gray-400 transition hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#0A1F44]">Archive this job?</h3>
              <p className="mt-1 text-sm text-gray-500">
                "{form.title || "This job"}" will be archived and hidden from active listings
                {applicants.length > 0
                  ? `, but its ${applicants.length} applicant record${
                      applicants.length === 1 ? "" : "s"
                    } will be kept`
                  : ""}
                .
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setConfirmArchive(false)}
                  className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setConfirmArchive(false);
                    archive.mutate();
                  }}
                  disabled={archive.isPending}
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                  {archive.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArchiveIcon className="h-4 w-4" />
                  )}
                  Archive
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Field({
  label,
  icon,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#0A1F44]">
        <span className="text-blue-500">{icon}</span>
        {label}
      </label>
      <input
        type={type}
        className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function StatChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
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
