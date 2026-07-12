import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Flag,
  Stethoscope,
  BadgeCheck,
  FileText,
  Globe2,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Archive,
  ExternalLink,
  AlertTriangle,
  X,
} from "lucide-react";
import { getCandidate, updateCandidate, archiveCandidate } from "@/api/admin";
import { AdminNav } from "@/components/Admin/AdminNav";
export const Route = createFileRoute("/Admin/candidate/$id")({
  component: CandidateDetailsPage,
});

type CandidateForm = {
  name: string;
  email: string;
  phone: string;
  nationality: string;
  specialty: string;
  experience_years: string;
  status: string;
  cv_url?: string;
  target_countries?: string[];
};

const EMPTY_FORM: CandidateForm = {
  name: "",
  email: "",
  phone: "",
  nationality: "",
  specialty: "",
  experience_years: "",
  status: "",
  cv_url: "",
  target_countries: [],
};

export default function CandidateDetailsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["candidate", id],
    queryFn: () => getCandidate(id),
  });

  const [form, setForm] = useState<CandidateForm>(EMPTY_FORM);
  const [showSaved, setShowSaved] = useState(false);
  const [confirmArchive, setConfirmArchive] = useState(false);

  const updateMutation = useMutation({
    mutationFn: (body: CandidateForm) => updateCandidate(id, body),
    onSuccess: () => {
      refetch();
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2500);
    },
  });

  const archiveMutation = useMutation({
    mutationFn: () => archiveCandidate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-candidates"] });
      navigate({ to: "/Admin/candidates" });
    },
  });

  useEffect(() => {
    if (data) {
      setForm({ ...EMPTY_FORM, ...data, experience_years: String(data.experience_years ?? "") });
    }
  }, [data]);

  const updateField = (key: keyof CandidateForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const initials = form.name?.trim()
    ? form.name
        .trim()
        .split(/\s+/)
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "—";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
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
        <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-blue-100/60 blur-2xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-12">
          {/* Back link */}
          <Link
            to="/Admin/candidates"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-[#0A1F44]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Candidates
          </Link>

          {/* Header */}
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
                <User className="h-3.5 w-3.5" />
                ADMIN · CANDIDATE
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
                {form.name || "Candidate Details"}
              </h1>
              <p className="mt-2 text-gray-500">View and edit this candidate's profile.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setConfirmArchive(true)}
                disabled={archiveMutation.isPending}
                className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
              >
                <Archive className="h-4 w-4" />
                Archive
              </button>
              <button
                onClick={() => updateMutation.mutate(form)}
                disabled={updateMutation.isPending}
                className="inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2a5c] disabled:opacity-60"
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Save
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {showSaved && (
            <div className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Changes saved
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Left summary */}
            <div className="h-fit space-y-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0A1F44] text-lg font-bold text-white">
                  {initials}
                </div>
                <h3 className="mt-4 text-base font-bold text-[#0A1F44]">
                  {form.name || "Unnamed"}
                </h3>
                <p className="text-sm text-gray-500">{form.specialty || "—"}</p>
                <span
                  className={`mt-3 inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${
                    form.status === "active"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                >
                  {form.status || "unknown"}
                </span>
              </div>

              {/* Resume card */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <h3 className="text-sm font-bold text-[#0A1F44]">Resume</h3>
                </div>
                {form.cv_url ? (
                  <a
                    href={form.cv_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline"
                  >
                    View Resume
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <p className="text-sm text-gray-400">No resume uploaded</p>
                )}
              </div>
            </div>

            {/* Right: form + target countries */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-[#0A1F44]">Personal Details</h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Name"
                    icon={<User className="h-4 w-4" />}
                    value={form.name}
                    onChange={updateField("name")}
                  />
                  <Field
                    label="Email"
                    icon={<Mail className="h-4 w-4" />}
                    value={form.email}
                    onChange={updateField("email")}
                    type="email"
                  />
                  <Field
                    label="Phone"
                    icon={<Phone className="h-4 w-4" />}
                    value={form.phone}
                    onChange={updateField("phone")}
                  />
                  <Field
                    label="Nationality"
                    icon={<Flag className="h-4 w-4" />}
                    value={form.nationality}
                    onChange={updateField("nationality")}
                  />
                  <Field
                    label="Specialty"
                    icon={<Stethoscope className="h-4 w-4" />}
                    value={form.specialty}
                    onChange={updateField("specialty")}
                  />
                  <Field
                    label="Experience (years)"
                    icon={<BadgeCheck className="h-4 w-4" />}
                    value={form.experience_years}
                    onChange={updateField("experience_years")}
                    type="number"
                  />
                </div>

                {updateMutation.isError && (
                  <p className="mt-4 text-sm text-red-500">
                    Something went wrong saving changes. Please try again.
                  </p>
                )}
              </div>

              {/* Target countries */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-4 flex items-center gap-2">
                  <Globe2 className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-[#0A1F44]">Target Countries</h2>
                </div>
                {form.target_countries && form.target_countries.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {form.target_countries.map((country) => (
                      <span
                        key={country}
                        className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No target countries set</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Archive confirm dialog */}
        {confirmArchive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <button
                  onClick={() => setConfirmArchive(false)}
                  className="text-gray-400 transition hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#0A1F44]">Archive this candidate?</h3>
              <p className="mt-1.5 text-sm text-gray-500">
                {form.name || "This candidate"} will be moved out of active listings. You can
                restore them later from the admin panel.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setConfirmArchive(false)}
                  className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setConfirmArchive(false);
                    archiveMutation.mutate();
                  }}
                  disabled={archiveMutation.isPending}
                  className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
                >
                  {archiveMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Archiving...
                    </>
                  ) : (
                    "Archive"
                  )}
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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
