import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  ClipboardList,
  Plus,
  Search,
  MapPin,
  Briefcase,
  Users,
  Clock,
  Loader2,
  Inbox,
} from "lucide-react";
import { EmployerNavbar } from "@/components/Employer/EmployerNav";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getRequirements, createRequirement } from "@/api/employer";
import { X } from "lucide-react";
export const Route = createFileRoute("/Employer/requirements")({
  component: RequirementsPage,
});

type Requirement = {
  id: string | number;
  role: string;
  country: string;
  sector: string;
  headcount: number;
  timeline: string;
  status: string;
};

const STATUS_STYLES: Record<string, string> = {
  open: "bg-emerald-50 text-emerald-700 border-emerald-200",
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  in_progress: "bg-blue-50 text-blue-700 border-blue-200",
  matching: "bg-blue-50 text-blue-700 border-blue-200",
  closed: "bg-gray-100 text-gray-600 border-gray-200",
  filled: "bg-gray-100 text-gray-600 border-gray-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
};

function statusStyle(status: string) {
  const key = status?.toLowerCase().replace(/\s+/g, "_");
  return STATUS_STYLES[key] || "bg-gray-100 text-gray-600 border-gray-200";
}

function RequirementsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["requirements"],
    queryFn: getRequirements,
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const requirements: Requirement[] = data ?? [];

  const statuses = useMemo(() => {
    const unique = new Set(requirements.map((r) => r.status).filter(Boolean));
    return ["all", ...Array.from(unique)];
  }, [requirements]);

  const filtered = useMemo(() => {
    return requirements.filter((r) => {
      const matchesSearch =
        !search ||
        [r.role, r.country, r.sector].join(" ").toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [requirements, search, statusFilter]);

  const totalHeadcount = requirements.reduce((sum, r) => sum + (Number(r.headcount) || 0), 0);
  const openCount = requirements.filter((r) =>
    ["open", "active", "in_progress", "matching"].includes(r.status?.toLowerCase()),
  ).length;
  const countries = new Set(requirements.map((r) => r.country)).size;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
      </div>
    );
  }
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    country: "",
    sector: "",
    role: "",
    headcount: "",
    timeline: "",
    message: "",
  });

  const createMutation = useMutation({
    mutationFn: createRequirement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requirements"] });
      setModalOpen(false);
      setForm({
        company_name: "",
        contact_name: "",
        email: "",
        country: "",
        sector: "",
        role: "",
        headcount: "",
        timeline: "",
        message: "",
      });
    },
    onError: (err: any) => {
      setFormError(err?.response?.data?.message || "Failed to submit requirement.");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    if (
      !form.company_name ||
      !form.contact_name ||
      !form.email ||
      !form.country ||
      !form.sector ||
      !form.role ||
      !form.headcount ||
      !form.timeline
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }

    createMutation.mutate({ ...form, headcount: Number(form.headcount) });
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
                <ClipboardList className="h-3.5 w-3.5" />
                EMPLOYER · HIRING
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
                Hiring <span className="text-blue-600">Requirements</span>
              </h1>
              <p className="mt-2 max-w-lg text-gray-500">
                Track every open mandate and see where each role stands in the match pipeline.
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d2a5c]"
            >
              <Plus className="h-4 w-4" />
              New Requirement
            </button>
          </div>

          {/* Stat chips, mirrors homepage stat row */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatChip
              icon={<Briefcase className="h-5 w-5 text-blue-600" />}
              label="Open Roles"
              value={openCount}
            />
            <StatChip
              icon={<Users className="h-5 w-5 text-blue-600" />}
              label="Total Headcount"
              value={totalHeadcount}
            />
            <StatChip
              icon={<MapPin className="h-5 w-5 text-blue-600" />}
              label="Countries"
              value={countries}
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
                  placeholder="Search role, country, sector..."
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
                <p className="font-semibold text-[#0A1F44]">No requirements found</p>
                <p className="max-w-xs text-sm text-gray-500">
                  {requirements.length === 0
                    ? "Post your first hiring requirement to start matching with candidates."
                    : "Try adjusting your search or filter."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50/70 text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="p-4 text-left font-semibold">Role</th>
                      <th className="p-4 text-left font-semibold">Country</th>
                      <th className="p-4 text-left font-semibold">Sector</th>
                      <th className="p-4 text-left font-semibold">Headcount</th>
                      <th className="p-4 text-left font-semibold">Timeline</th>
                      <th className="p-4 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((r) => (
                      <tr key={r.id} className="transition hover:bg-blue-50/40">
                        <td className="p-4 font-semibold text-[#0A1F44]">{r.role}</td>
                        <td className="p-4 text-gray-600">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-gray-400" />
                            {r.country}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">{r.sector}</td>
                        <td className="p-4 text-gray-600">
                          <span className="inline-flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5 text-gray-400" />
                            {r.headcount}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-gray-400" />
                            {r.timeline}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle(
                              r.status,
                            )}`}
                          >
                            {r.status?.replace(/_/g, " ")}
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
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#0A1F44]">New Hiring Requirement</h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Company Name *">
                    <input
                      value={form.company_name}
                      onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                      className="input"
                    />
                  </Field>
                  <Field label="Contact Name *">
                    <input
                      value={form.contact_name}
                      onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
                      className="input"
                    />
                  </Field>
                </div>

                <Field label="Email *">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                  <Field label="Sector *">
                    <input
                      value={form.sector}
                      onChange={(e) => setForm({ ...form, sector: e.target.value })}
                      className="input"
                    />
                  </Field>
                </div>

                <Field label="Role *">
                  <input
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="input"
                  />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Headcount *">
                    <input
                      type="number"
                      value={form.headcount}
                      onChange={(e) => setForm({ ...form, headcount: e.target.value })}
                      className="input"
                    />
                  </Field>
                  <Field label="Timeline *">
                    <input
                      placeholder="e.g. 4-6 weeks"
                      value={form.timeline}
                      onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                      className="input"
                    />
                  </Field>
                </div>

                <Field label="Message">
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    className="input"
                  />
                </Field>

                {formError && <p className="text-sm text-red-600">{formError}</p>}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0d2a5c] disabled:opacity-60"
                  >
                    {createMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                    Submit Requirement
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
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-gray-500">{label}</span>
      {children}
    </label>
  );
}
