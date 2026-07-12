import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Building2,
  User,
  Mail,
  Globe2,
  Briefcase,
  Users,
  Clock,
  FileText,
  ClipboardList,
  Send,
  Archive as ArchiveIcon,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";
import { getEmployer, updateEmployer, archiveEmployer } from "@/api/admin";
import { AdminNav } from "@/components/Admin/AdminNav";
export const Route = createFileRoute("/Admin/employer/$id")({
  component: EmployerDetailsPage,
});

type EmployerForm = {
  company_name: string;
  contact_name: string;
  email: string;
  country: string;
  sector: string;
  status: string;
  role: string;
  headcount: number | string;
  timeline: string;
  message: string;
  requirements_count?: number;
  jobs_count?: number;
  applications_count?: number;
};

const EMPTY_FORM: EmployerForm = {
  company_name: "",
  contact_name: "",
  email: "",
  country: "",
  sector: "",
  status: "",
  role: "",
  headcount: "",
  timeline: "",
  message: "",
};

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactive: "bg-gray-100 text-gray-600 border-gray-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
};

function statusStyle(status: string) {
  return STATUS_STYLES[status?.toLowerCase()] || "bg-gray-100 text-gray-600 border-gray-200";
}

export default function EmployerDetailsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-employer", id],
    queryFn: () => getEmployer(id),
  });

  const [form, setForm] = useState<EmployerForm>(EMPTY_FORM);
  const [dirty, setDirty] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [confirmArchive, setConfirmArchive] = useState(false);

  const update = useMutation({
    mutationFn: (body: EmployerForm) =>
      updateEmployer(id, { ...body, headcount: Number(body.headcount) || 0 }),
    onSuccess: () => {
      refetch();
      setDirty(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2500);
    },
  });

  const archive = useMutation({
    mutationFn: () => archiveEmployer(id),
    onSuccess: () => navigate({ to: "/Admin/employer" }),
  });

  useEffect(() => {
    if (data) setForm({ ...EMPTY_FORM, ...data });
  }, [data]);

  const set = (key: keyof EmployerForm) => (v: string) => {
    setForm((f) => ({ ...f, [key]: v }));
    setDirty(true);
  };

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
          {/* Back link */}
          <Link
            to="/Admin/employer"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-[#0A1F44]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Employers
          </Link>

          {/* Header */}
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A1F44] text-sm font-bold text-white">
                  {form.company_name?.slice(0, 2).toUpperCase() || "CO"}
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight text-[#0A1F44] sm:text-3xl">
                    {form.company_name || "Employer Details"}
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
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatChip
              icon={<ClipboardList className="h-5 w-5 text-blue-600" />}
              label="Requirements"
              value={form.requirements_count ?? 0}
            />
            <StatChip
              icon={<Briefcase className="h-5 w-5 text-blue-600" />}
              label="Jobs"
              value={form.jobs_count ?? 0}
            />
            <StatChip
              icon={<Users className="h-5 w-5 text-blue-600" />}
              label="Applications"
              value={form.applications_count ?? 0}
            />
            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-extrabold capitalize text-[#0A1F44]">
                  {form.status || "—"}
                </p>
                <p className="text-xs text-gray-500">Current Status</p>
              </div>
            </div>
          </div>

          {/* Company info card */}
          <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-[#0A1F44]">Company Information</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Company Name"
                icon={<Building2 className="h-4 w-4" />}
                value={form.company_name}
                onChange={set("company_name")}
              />
              <Field
                label="Contact Person"
                icon={<User className="h-4 w-4" />}
                value={form.contact_name}
                onChange={set("contact_name")}
              />
              <Field
                label="Email"
                icon={<Mail className="h-4 w-4" />}
                value={form.email}
                onChange={set("email")}
                type="email"
              />
              <Field
                label="Country"
                icon={<Globe2 className="h-4 w-4" />}
                value={form.country}
                onChange={set("country")}
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
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Hiring info card */}
          <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-[#0A1F44]">Hiring Details</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              <Field
                label="Hiring Role"
                icon={<Briefcase className="h-4 w-4" />}
                value={form.role}
                onChange={set("role")}
              />
              <Field
                label="Headcount"
                icon={<Users className="h-4 w-4" />}
                value={String(form.headcount ?? "")}
                onChange={set("headcount")}
                type="number"
              />
              <Field
                label="Timeline"
                icon={<Clock className="h-4 w-4" />}
                value={form.timeline}
                onChange={set("timeline")}
              />
            </div>
          </div>

          {/* Notes card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-[#0A1F44]">Employer Notes</h2>
            </div>
            <textarea
              rows={5}
              placeholder="Internal notes about this employer..."
              className="w-full rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              value={form.message}
              onChange={(e) => set("message")(e.target.value)}
            />
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
              <h3 className="mt-4 text-lg font-bold text-[#0A1F44]">Archive this employer?</h3>
              <p className="mt-1 text-sm text-gray-500">
                {form.company_name || "This employer"} will be archived and removed from active
                listings. This can usually be reversed by support.
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
