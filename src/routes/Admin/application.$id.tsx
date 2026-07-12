import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Globe2,
  Briefcase,
  MapPin,
  Building2,
  CalendarDays,
  ClipboardList,
  FileText,
  Send,
  Loader2,
  CheckCircle2,
  Circle,
  XCircle,
} from "lucide-react";
import { getApplication, updateApplication } from "@/api/admin";
import { AdminNav } from "@/components/Admin/AdminNav";
export const Route = createFileRoute("/Admin/application/$id")({
  component: ApplicationDetailsPage,
});

const STATUS_ORDER = [
  "applied",
  "review",
  "interview",
  "documentation",
  "visa",
  "travel",
  "placed",
];

const STATUS_LABELS: Record<string, string> = {
  applied: "Applied",
  review: "Under Review",
  interview: "Interview",
  documentation: "Documentation",
  visa: "Visa",
  travel: "Travel",
  placed: "Placed",
  rejected: "Rejected",
};

const STATUS_STYLES: Record<string, string> = {
  applied: "bg-gray-100 text-gray-600 border-gray-200",
  review: "bg-amber-50 text-amber-700 border-amber-200",
  interview: "bg-blue-50 text-blue-700 border-blue-200",
  documentation: "bg-blue-50 text-blue-700 border-blue-200",
  visa: "bg-indigo-50 text-indigo-700 border-indigo-200",
  travel: "bg-indigo-50 text-indigo-700 border-indigo-200",
  placed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-600 border-red-200",
};

function statusStyle(status: string) {
  return STATUS_STYLES[status?.toLowerCase()] || "bg-gray-100 text-gray-600 border-gray-200";
}

type FormState = { status: string; notes: string };

export default function ApplicationDetailsPage() {
  const { id } = Route.useParams();
  useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["application", id],
    queryFn: () => getApplication(id),
  });

  const [form, setForm] = useState<FormState>({ status: "", notes: "" });
  const [dirty, setDirty] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const update = useMutation({
    mutationFn: (body: FormState) => updateApplication(id, body),
    onSuccess: () => {
      refetch();
      setDirty(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2500);
    },
  });

  useEffect(() => {
    if (data) {
      setForm({ status: data.status ?? "", notes: data.notes ?? "" });
    }
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F8FC]">
        <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
      </div>
    );
  }

  const isRejected = form.status?.toLowerCase() === "rejected";
  const currentIndex = STATUS_ORDER.indexOf(form.status?.toLowerCase());

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

        <div className="relative mx-auto max-w-4xl px-6 py-12">
          <Link
            to="/Admin/applications"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-[#0A1F44]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Applications
          </Link>

          {/* Header */}
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0A1F44] text-sm font-bold text-white">
                {data.candidate_name?.slice(0, 2).toUpperCase() || "?"}
              </div>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-[#0A1F44] sm:text-3xl">
                  {data.candidate_name ?? "Application Details"}
                </h1>
                <span
                  className={`mt-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusStyle(
                    form.status,
                  )}`}
                >
                  {STATUS_LABELS[form.status?.toLowerCase()] || form.status}
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

          {/* Candidate card */}
          <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-[#0A1F44]">Candidate</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Info label="Name" icon={<User className="h-4 w-4" />} value={data.candidate_name} />
              <Info label="Email" icon={<Mail className="h-4 w-4" />} value={data.email} />
              <Info label="Phone" icon={<Phone className="h-4 w-4" />} value={data.phone} />
              <Info
                label="Nationality"
                icon={<Globe2 className="h-4 w-4" />}
                value={data.nationality}
              />
            </div>
          </div>

          {/* Job card */}
          <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-[#0A1F44]">Job</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Info label="Title" icon={<Briefcase className="h-4 w-4" />} value={data.job_title} />
              <Info label="Country" icon={<MapPin className="h-4 w-4" />} value={data.country} />
              <Info
                label="Employer"
                icon={<Building2 className="h-4 w-4" />}
                value={data.employer}
              />
              <Info
                label="Applied On"
                icon={<CalendarDays className="h-4 w-4" />}
                value={data.applied_at ? new Date(data.applied_at).toLocaleDateString() : null}
              />
            </div>
          </div>

          {/* Status card */}
          <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-4 flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-[#0A1F44]">Recruitment Status</h2>
            </div>
            <select
              className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              value={form.status}
              onChange={(e) => {
                setForm({ ...form, status: e.target.value });
                setDirty(true);
              }}
            >
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Notes card */}
          <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-[#0A1F44]">Internal Notes</h2>
            </div>
            <textarea
              rows={8}
              placeholder="Add internal notes about this candidate..."
              className="w-full rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              value={form.notes}
              onChange={(e) => {
                setForm({ ...form, notes: e.target.value });
                setDirty(true);
              }}
            />
          </div>

          {/* Timeline card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-[#0A1F44]">Timeline</h2>
            </div>

            {isRejected ? (
              <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
                <XCircle className="h-5 w-5 shrink-0 text-red-500" />
                <p className="text-sm text-red-700">
                  This application was rejected. The pipeline below reflects progress made before
                  rejection.
                </p>
              </div>
            ) : null}

            <ul className="mt-5 space-y-1">
              {STATUS_ORDER.map((step, i) => {
                const completed = i < currentIndex || (isRejected && i < STATUS_ORDER.length);
                const isCurrent = i === currentIndex && !isRejected;
                const done = i <= currentIndex && !isRejected;

                return (
                  <li key={step} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      {done ? (
                        <CheckCircle2 className="h-5 w-5 text-[#0A1F44]" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-300" />
                      )}
                      {i < STATUS_ORDER.length - 1 && (
                        <span
                          className={`mt-1 h-6 w-0.5 ${
                            i < currentIndex && !isRejected ? "bg-[#0A1F44]" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                    <div className="pb-6">
                      <p
                        className={`text-sm font-semibold ${
                          isCurrent ? "text-[#0A1F44]" : done ? "text-gray-700" : "text-gray-400"
                        }`}
                      >
                        {STATUS_LABELS[step]}
                      </p>
                      {isCurrent && <p className="text-xs text-blue-600">Current stage</p>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function Info({ label, icon, value }: { label: string; icon: React.ReactNode; value: any }) {
  return (
    <div>
      <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
        <span className="text-blue-500">{icon}</span>
        {label}
      </p>
      <h3 className="font-semibold text-[#0A1F44]">{value ?? "—"}</h3>
    </div>
  );
}
