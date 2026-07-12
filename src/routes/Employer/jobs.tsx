import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  Briefcase,
  Plus,
  Search,
  MapPin,
  Wallet,
  GraduationCap,
  Loader2,
  Inbox,
  Globe2,
  X,
} from "lucide-react";
import { getJobs, createJob, updateJob } from "@/api/employer";
import { EmployerNavbar } from "@/components/Employer/EmployerNav";
export const Route = createFileRoute("/Employer/jobs")({
  component: JobsPage,
});

type Job = {
  id: string | number;
  title: string;
  country: string;
  city?: string;
  sector?: string;
  currency: string;
  salary_min: number;
  salary_max: number;
  experience_required: string;
  status: string;
  description?: string;
};

const STATUS_STYLES: Record<string, string> = {
  open: "bg-emerald-50 text-emerald-700 border-emerald-200",
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  published: "bg-emerald-50 text-emerald-700 border-emerald-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
  paused: "bg-amber-50 text-amber-700 border-amber-200",
  closed: "bg-gray-100 text-gray-600 border-gray-200",
  filled: "bg-gray-100 text-gray-600 border-gray-200",
};

function statusStyle(status: string) {
  const key = status?.toLowerCase().replace(/\s+/g, "_");
  return STATUS_STYLES[key] || "bg-gray-100 text-gray-600 border-gray-200";
}

function formatSalary(currency: string, min: number, max: number) {
  const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : n);
  if (!min && !max) return "—";
  if (min && max) return `${currency} ${fmt(min)} - ${fmt(max)}`;
  return `${currency} ${fmt(min || max)}`;
}

const EMPTY_FORM = {
  title: "",
  country: "",
  city: "",
  sector: "",
  currency: "USD",
  salary_min: "",
  salary_max: "",
  experience_required: "",
  status: "draft",
  description: "",
};

function JobsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["employer-jobs"],
    queryFn: getJobs,
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");

  const jobs: Job[] = data ?? [];

  const statuses = useMemo(() => {
    const unique = new Set(jobs.map((j) => j.status).filter(Boolean));
    return ["all", ...Array.from(unique)];
  }, [jobs]);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchesSearch =
        !search ||
        [j.title, j.country, j.experience_required]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || j.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, statusFilter]);

  const openCount = jobs.filter((j) =>
    ["open", "active", "published"].includes(j.status?.toLowerCase()),
  ).length;
  const countries = new Set(jobs.map((j) => j.country)).size;
  const avgSalaryMax =
    jobs.length > 0
      ? Math.round(jobs.reduce((sum, j) => sum + (Number(j.salary_max) || 0), 0) / jobs.length)
      : 0;

  const createMutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employer-jobs"] });
      closeModal();
    },
    onError: (err: any) => {
      setFormError(err?.response?.data?.message || "Failed to create job.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: any }) => updateJob(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employer-jobs"] });
      closeModal();
    },
    onError: (err: any) => {
      setFormError(err?.response?.data?.message || "Failed to update job.");
    },
  });

  function openCreateModal() {
    setEditingJob(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setModalOpen(true);
  }

  function openEditModal(job: Job) {
    setEditingJob(job);
    setForm({
      title: job.title || "",
      country: job.country || "",
      city: job.city || "",
      sector: job.sector || "",
      currency: job.currency || "USD",
      salary_min: job.salary_min?.toString() || "",
      salary_max: job.salary_max?.toString() || "",
      experience_required: job.experience_required || "",
      status: job.status || "draft",
      description: job.description || "",
    });
    setFormError("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingJob(null);
    setForm(EMPTY_FORM);
    setFormError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    if (!form.title.trim() || !form.country.trim()) {
      setFormError("Title and country are required.");
      return;
    }

    const body = {
      ...form,
      salary_min: form.salary_min ? Number(form.salary_min) : undefined,
      salary_max: form.salary_max ? Number(form.salary_max) : undefined,
    };

    if (editingJob) {
      updateMutation.mutate({ id: String(editingJob.id), body });
    } else {
      createMutation.mutate(body);
    }
  }

  const saving = createMutation.isPending || updateMutation.isPending;

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

        <div className="relative mx-auto max-w-6xl px-6 py-12">
          {/* Header */}
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
                <Briefcase className="h-3.5 w-3.5" />
                EMPLOYER · JOBS
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
                My <span className="text-blue-600">Jobs</span>
              </h1>
              <p className="mt-2 max-w-lg text-gray-500">
                Manage every posted role and track how it's performing in the pipeline.
              </p>
            </div>

            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d2a5c]"
            >
              <Plus className="h-4 w-4" />
              New Job
            </button>
          </div>

          {/* Stat chips */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatChip
              icon={<Briefcase className="h-5 w-5 text-blue-600" />}
              label="Open Jobs"
              value={openCount}
            />
            <StatChip
              icon={<Globe2 className="h-5 w-5 text-blue-600" />}
              label="Countries"
              value={countries}
            />
            <StatChip
              icon={<Wallet className="h-5 w-5 text-blue-600" />}
              label="Avg. Max Salary"
              value={avgSalaryMax ? avgSalaryMax.toLocaleString() : "—"}
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
                  placeholder="Search job, country, experience..."
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
                <p className="font-semibold text-[#0A1F44]">No jobs found</p>
                <p className="max-w-xs text-sm text-gray-500">
                  {jobs.length === 0
                    ? "Post your first job to start receiving verified candidates."
                    : "Try adjusting your search or filter."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50/70 text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="p-4 text-left font-semibold">Job</th>
                      <th className="p-4 text-left font-semibold">Country</th>
                      <th className="p-4 text-left font-semibold">Salary</th>
                      <th className="p-4 text-left font-semibold">Experience</th>
                      <th className="p-4 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((job) => (
                      <tr
                        key={job.id}
                        onClick={() => openEditModal(job)}
                        className="cursor-pointer transition hover:bg-blue-50/40"
                      >
                        <td className="p-4 font-semibold text-[#0A1F44]">{job.title}</td>
                        <td className="p-4 text-gray-600">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-gray-400" />
                            {job.country}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">
                          <span className="inline-flex items-center gap-1.5">
                            <Wallet className="h-3.5 w-3.5 text-gray-400" />
                            {formatSalary(job.currency, job.salary_min, job.salary_max)}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">
                          <span className="inline-flex items-center gap-1.5">
                            <GraduationCap className="h-3.5 w-3.5 text-gray-400" />
                            {job.experience_required}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle(
                              job.status,
                            )}`}
                          >
                            {job.status?.replace(/_/g, " ")}
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

        {/* Create/Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#0A1F44]">
                  {editingJob ? "Edit Job" : "New Job"}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Field label="Title *">
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="input"
                  />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Country *">
                    <input
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className="input"
                    />
                  </Field>
                  <Field label="City">
                    <input
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="input"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Sector">
                    <input
                      value={form.sector}
                      onChange={(e) => setForm({ ...form, sector: e.target.value })}
                      className="input"
                    />
                  </Field>
                  <Field label="Experience Required">
                    <input
                      value={form.experience_required}
                      onChange={(e) => setForm({ ...form, experience_required: e.target.value })}
                      className="input"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Field label="Currency">
                    <input
                      value={form.currency}
                      onChange={(e) => setForm({ ...form, currency: e.target.value })}
                      className="input"
                    />
                  </Field>
                  <Field label="Salary Min">
                    <input
                      type="number"
                      value={form.salary_min}
                      onChange={(e) => setForm({ ...form, salary_min: e.target.value })}
                      className="input"
                    />
                  </Field>
                  <Field label="Salary Max">
                    <input
                      type="number"
                      value={form.salary_max}
                      onChange={(e) => setForm({ ...form, salary_max: e.target.value })}
                      className="input"
                    />
                  </Field>
                </div>

                <Field label="Status">
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="input"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="closed">Closed</option>
                  </select>
                </Field>

                <Field label="Description">
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={4}
                    className="input"
                  />
                </Field>

                {formError && <p className="text-sm text-red-600">{formError}</p>}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0d2a5c] disabled:opacity-60"
                  >
                    {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                    {editingJob ? "Save Changes" : "Post Job"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-gray-500">{label}</span>
      {children}
    </label>
  );
}

function StatChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
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
