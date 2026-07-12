import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Globe2,
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Inbox,
  AlertTriangle,
  Send,
  Tag,
} from "lucide-react";
import { getCountries, createCountry, updateCountry, deleteCountry } from "@/api/admin";
import { AdminNav } from "@/components/Admin/AdminNav";
export const Route = createFileRoute("/Admin/countries")({
  component: CountriesPage,
});

type CountryForm = {
  name: string;
  code: string;
  status: string;
};

const EMPTY_FORM: CountryForm = { name: "", code: "", status: "active" };

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactive: "bg-gray-100 text-gray-600 border-gray-200",
};

function statusStyle(status: string) {
  return STATUS_STYLES[status?.toLowerCase()] || "bg-gray-100 text-gray-600 border-gray-200";
}

export default function CountriesPage() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CountryForm>(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<any>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  const create = useMutation({
    mutationFn: createCountry,
    onSuccess: () => {
      refetch();
      setForm(EMPTY_FORM);
    },
  });

  const update = useMutation({
    mutationFn: ({ id, body }: { id: string; body: CountryForm }) => updateCountry(id, body),
    onSuccess: () => {
      refetch();
      setEditingId(null);
      setForm(EMPTY_FORM);
    },
  });

  const remove = useMutation({
    mutationFn: deleteCountry,
    onSuccess: () => refetch(),
  });

  const countries = data ?? [];
  const activeCount = countries.filter((c: any) => c.status?.toLowerCase() === "active").length;

  const isValid = form.name.trim().length > 0 && form.code.trim().length > 0;
  const isPending = create.isPending || update.isPending;

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const submit = () => {
    if (!isValid) return;
    if (editingId) {
      update.mutate({ id: editingId, body: form });
    } else {
      create.mutate(form);
    }
  };

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

      <div className="relative mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
            <Globe2 className="h-3.5 w-3.5" />
            ADMIN · COUNTRIES
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
            Manage <span className="text-blue-600">Countries</span>
          </h1>
          <p className="mt-2 max-w-lg text-gray-500">
            Control which countries are available for jobs, employers, and candidate placements.
          </p>
        </div>

        {/* Stat chips */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:max-w-md">
          <StatChip
            icon={<Globe2 className="h-5 w-5 text-blue-600" />}
            label="Total Countries"
            value={countries.length}
          />
          <StatChip
            icon={<Tag className="h-5 w-5 text-blue-600" />}
            label="Active"
            value={activeCount}
          />
        </div>

        {/* Form card */}
        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {editingId ? (
                <Pencil className="h-5 w-5 text-blue-600" />
              ) : (
                <Plus className="h-5 w-5 text-blue-600" />
              )}
              <h2 className="text-lg font-bold text-[#0A1F44]">
                {editingId ? "Edit Country" : "Add Country"}
              </h2>
            </div>
            {editingId && (
              <button
                onClick={cancelEdit}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-[#0A1F44]"
              >
                <X className="h-4 w-4" />
                Cancel edit
              </button>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0A1F44]">
                Country Name
              </label>
              <input
                className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. United Arab Emirates"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0A1F44]">Code</label>
              <input
                className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm uppercase text-gray-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. UAE"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                maxLength={5}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0A1F44]">Status</label>
              <select
                className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={submit}
              disabled={!isValid || isPending}
              className="inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2a5c] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : editingId ? (
                <Pencil className="h-4 w-4" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {editingId ? "Update Country" : "Add Country"}
            </button>
            {!isValid && (form.name || form.code) && (
              <span className="text-xs text-amber-600">Both name and code are required.</span>
            )}
          </div>
        </div>

        {/* Table card */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
            </div>
          ) : countries.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                <Inbox className="h-6 w-6 text-blue-500" />
              </div>
              <p className="font-semibold text-[#0A1F44]">No countries added yet</p>
              <p className="max-w-xs text-sm text-gray-500">
                Add your first country using the form above.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50/70 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="p-4 text-left font-semibold">Country</th>
                    <th className="p-4 text-left font-semibold">Code</th>
                    <th className="p-4 text-left font-semibold">Status</th>
                    <th className="p-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {countries.map((country: any) => (
                    <tr
                      key={country.id}
                      className={`transition ${
                        editingId === country.id ? "bg-blue-50/60" : "hover:bg-blue-50/40"
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0A1F44]">
                            <Globe2 className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-semibold text-[#0A1F44]">{country.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-xs font-semibold text-gray-600">
                          {country.code}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle(
                            country.status,
                          )}`}
                        >
                          {country.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingId(country.id);
                              setForm({
                                name: country.name,
                                code: country.code,
                                status: country.status,
                              });
                            }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#0A1F44] transition hover:border-blue-300 hover:bg-blue-50"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </button>
                          <button
                            onClick={() => setPendingDelete(country)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation */}
      {pendingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1F44]/40 p-6 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <button
                onClick={() => setPendingDelete(null)}
                className="text-gray-400 transition hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#0A1F44]">Delete {pendingDelete.name}?</h3>
            <p className="mt-1 text-sm text-gray-500">
              This removes it from the platform. Any jobs or candidates currently tied to this
              country may be affected — consider setting it to Inactive instead if you just want to
              hide it.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setPendingDelete(null)}
                className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  remove.mutate(pendingDelete.id);
                  setPendingDelete(null);
                }}
                disabled={remove.isPending}
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {remove.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Delete
              </button>
            </div>
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
