import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Users,
  Search,
  Download,
  Plus,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Inbox,
  AlertTriangle,
  RotateCcw,
  X,
} from "lucide-react";
import { getCandidates, deleteCandidate } from "@/api/admin";
import { AddCandidateModal } from "./AddCandidateModal";
import { AdminNav } from "@/components/Admin/AdminNav";
export const Route = createFileRoute("/Admin/candidates")({
  component: CandidatesPage,
});

type Candidate = {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  specialty: string;
  experience_years: number;
  status: string;
};

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  archived: "bg-gray-100 text-gray-600 border-gray-200",
};

function statusStyle(status: string) {
  const key = status?.toLowerCase();
  return STATUS_STYLES[key] || "bg-gray-100 text-gray-600 border-gray-200";
}

function initials(name: string) {
  if (!name?.trim()) return "—";
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string | number>>(new Set());
  const [showAddModal, setShowAddModal] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Candidate | null>(null);

  const limit = 10;
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-candidates", search, status, specialty, sort, page],
    queryFn: () => getCandidates({ search, status, specialty, sort, page, limit }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-candidates"] });
      setPendingDelete(null);
    },
  });

  const candidates: Candidate[] = data?.data ?? [];
  const totalPages = data?.totalPages ?? null;
  const allSelected = candidates.length > 0 && selected.size === candidates.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(candidates.map((c) => c.id)));
    }
  };

  const toggleOne = (id: string | number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (error) {
    return (
      <div className="relative min-h-screen bg-[#F6F8FC]">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-3 px-6 py-32 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <p className="font-semibold text-[#0A1F44]">Failed to load candidates</p>
          <p className="max-w-xs text-sm text-gray-500">
            Something went wrong fetching this data. Try again.
          </p>
          <button
            onClick={() => refetch()}
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2a5c]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Retry
          </button>
        </div>
      </div>
    );
  }


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

      <div className="relative mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
              <Users className="h-3.5 w-3.5" />
              ADMIN · CANDIDATES
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
              Candidates
            </h1>
            <p className="mt-2 max-w-lg text-gray-500">
              Manage all registered candidates across the platform.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#0A1F44] transition hover:border-gray-300 hover:bg-gray-50">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2a5c]"
            >
              <Plus className="h-4 w-4" />
              Add Candidate
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search name, email..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
            className="rounded-xl border border-gray-200 bg-white p-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>

          <input
            placeholder="Specialty"
            value={specialty}
            onChange={(e) => {
              setPage(1);
              setSpecialty(e.target.value);
            }}
            className="rounded-xl border border-gray-200 bg-white p-2.5 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white p-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* Bulk action bar */}
        {selected.size > 0 && (
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3">
            <p className="text-sm font-semibold text-blue-800">{selected.size} selected</p>
            <p className="text-xs text-blue-700">Bulk actions coming soon</p>
          </div>
        )}

        {/* Table card */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
            </div>
          ) : candidates.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                <Inbox className="h-6 w-6 text-blue-500" />
              </div>
              <p className="font-semibold text-[#0A1F44]">No candidates found</p>
              <p className="max-w-xs text-sm text-gray-500">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50/70 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="w-12 p-4 text-left">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleAll}
                        className="h-4 w-4 rounded border-gray-300 accent-[#0A1F44]"
                      />
                    </th>
                    <th className="p-4 text-left font-semibold">Name</th>
                    <th className="p-4 text-left font-semibold">Email</th>
                    <th className="p-4 text-left font-semibold">Phone</th>
                    <th className="p-4 text-left font-semibold">Nationality</th>
                    <th className="p-4 text-left font-semibold">Specialty</th>
                    <th className="p-4 text-left font-semibold">Experience</th>
                    <th className="p-4 text-left font-semibold">Status</th>
                    <th className="p-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {candidates.map((candidate) => (
                    <tr
                      key={candidate.id}
                      className={`transition ${
                        selected.has(candidate.id) ? "bg-blue-50/40" : "hover:bg-blue-50/20"
                      }`}
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selected.has(candidate.id)}
                          onChange={() => toggleOne(candidate.id)}
                          className="h-4 w-4 rounded border-gray-300 accent-[#0A1F44]"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0A1F44] text-xs font-bold text-white">
                            {initials(candidate.name)}
                          </div>
                          <span className="font-semibold text-[#0A1F44]">{candidate.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{candidate.email}</td>
                      <td className="p-4 text-gray-600">{candidate.phone}</td>
                      <td className="p-4 text-gray-600">{candidate.nationality}</td>
                      <td className="p-4 text-gray-600">{candidate.specialty}</td>
                      <td className="p-4 text-gray-600">{candidate.experience_years} yrs</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle(
                            candidate.status,
                          )}`}
                        >
                          {candidate.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1.5">
                          <Link
                            to="/Admin/candidate/$id"
                            params={{ id: String(candidate.id) }}
                            title="View"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-gray-300 hover:bg-gray-50"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Link>
                          <button
                            onClick={() => setPendingDelete(candidate)}
                            title="Delete"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
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

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#0A1F44] transition hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Previous
          </button>

          <span className="text-sm text-gray-500">
            Page {page}
            {totalPages ? ` of ${totalPages}` : ""}
          </span>

          <button
            disabled={totalPages ? page >= totalPages : candidates.length < limit}
            onClick={() => setPage((p) => p + 1)}
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#0A1F44] transition hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {showAddModal && <AddCandidateModal onClose={() => setShowAddModal(false)} />}

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
            <h3 className="mt-4 text-lg font-bold text-[#0A1F44]">
              Permanently delete {pendingDelete.name}?
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              This cannot be undone. Consider archiving instead if you just want to hide them.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setPendingDelete(null)}
                className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteMutation.mutate(String(pendingDelete.id))}
                disabled={deleteMutation.isPending}
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {deleteMutation.isPending ? (
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
