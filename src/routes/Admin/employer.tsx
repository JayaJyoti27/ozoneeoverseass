import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Users,
  Search,
  Download,
  Building2,
  Globe2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Archive,
  Loader2,
  AlertTriangle,
  Inbox,
} from "lucide-react";
import { getEmployers } from "@/api/admin";
import { AdminNav } from "@/components/Admin/AdminNav";
export const Route = createFileRoute("/Admin/employer")({
  component: EmployersPage,
});

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactive: "bg-gray-100 text-gray-600 border-gray-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
};

function statusStyle(status: string) {
  const key = status?.toLowerCase();
  return STATUS_STYLES[key] || "bg-gray-100 text-gray-600 border-gray-200";
}

export default function EmployersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [country, setCountry] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string | number>>(new Set());

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["admin-employers", search, status, country, sort, page],
    queryFn: () => getEmployers({ search, status, country, sort, page, limit: 10 }),
  });

  const employers = data?.data ?? [];
  const total = data?.total ?? employers.length;
  const totalPages = data?.totalPages ?? Math.max(1, Math.ceil(total / 10));
  const activeCount = employers.filter((e: any) => e.status?.toLowerCase() === "active").length;
  const countries = new Set(employers.map((e: any) => e.country)).size;

  const toggleRow = (id: string | number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === employers.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(employers.map((e: any) => e.id)));
    }
  };

  if (error) {
    return (
      <div className="relative min-h-screen bg-[#F6F8FC]">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-[#0A1F44]">Failed to load employers</h2>
          <p className="mt-1 text-sm text-gray-500">
            Something went wrong while fetching the data.
          </p>
          <button
            onClick={() => refetch()}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d2a5c]"
          >
            Retry
          </button>
        </div>
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

        <div className="relative mx-auto max-w-7xl px-6 py-12">
          {/* Header */}
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
                <Building2 className="h-3.5 w-3.5" />
                ADMIN · EMPLOYERS
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
                Employer <span className="text-blue-600">Companies</span>
              </h1>
              <p className="mt-2 max-w-lg text-gray-500">
                Manage every partner employer, their verification status, and hiring activity.
              </p>
            </div>

            <button className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-[#0A1F44] transition hover:border-gray-300">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>

          {/* Stat chips */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatChip
              icon={<Users className="h-5 w-5 text-blue-600" />}
              label="Total Employers"
              value={total}
            />
            <StatChip
              icon={<Building2 className="h-5 w-5 text-blue-600" />}
              label="Active on This Page"
              value={activeCount}
            />
            <StatChip
              icon={<Globe2 className="h-5 w-5 text-blue-600" />}
              label="Countries on This Page"
              value={countries}
            />
          </div>

          {/* Filters + table card */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="grid grid-cols-1 gap-3 border-b border-gray-100 p-4 sm:grid-cols-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  placeholder="Search company or contact..."
                  className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  value={search}
                  onChange={(e) => {
                    setPage(1);
                    setSearch(e.target.value);
                  }}
                />
              </div>

              <select
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                value={status}
                onChange={(e) => {
                  setPage(1);
                  setStatus(e.target.value);
                }}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>

              <input
                placeholder="Country"
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                value={country}
                onChange={(e) => {
                  setPage(1);
                  setCountry(e.target.value);
                }}
              />

              <select
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
              </div>
            ) : employers.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                  <Inbox className="h-6 w-6 text-blue-500" />
                </div>
                <p className="font-semibold text-[#0A1F44]">No employers found</p>
                <p className="max-w-xs text-sm text-gray-500">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50/70 text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="w-10 p-4">
                        <input
                          type="checkbox"
                          checked={selected.size === employers.length && employers.length > 0}
                          onChange={toggleAll}
                          className="h-4 w-4 rounded border-gray-300 accent-[#0A1F44]"
                        />
                      </th>
                      <th className="p-4 text-left font-semibold">Company</th>
                      <th className="p-4 text-left font-semibold">Contact</th>
                      <th className="p-4 text-left font-semibold">Email</th>
                      <th className="p-4 text-left font-semibold">Country</th>
                      <th className="p-4 text-left font-semibold">Sector</th>
                      <th className="p-4 text-left font-semibold">Status</th>
                      <th className="p-4 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {employers.map((employer: any) => (
                      <tr key={employer.id} className="transition hover:bg-blue-50/40">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selected.has(employer.id)}
                            onChange={() => toggleRow(employer.id)}
                            className="h-4 w-4 rounded border-gray-300 accent-[#0A1F44]"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0A1F44] text-xs font-bold text-white">
                              {employer.company_name?.slice(0, 2).toUpperCase() || "CO"}
                            </div>
                            <span className="font-semibold text-[#0A1F44]">
                              {employer.company_name}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">{employer.contact_name}</td>
                        <td className="p-4 text-gray-600">{employer.email}</td>
                        <td className="p-4 text-gray-600">
                          <span className="inline-flex items-center gap-1.5">
                            <Globe2 className="h-3.5 w-3.5 text-gray-400" />
                            {employer.country}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">{employer.sector}</td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle(
                              employer.status,
                            )}`}
                          >
                            {employer.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1.5">
                            <Link
                              to="/Admin/employer/$id"
                              params={{ id: employer.id }}
                              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#0A1F44] transition hover:border-blue-300 hover:bg-blue-50"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              View
                            </Link>
                            <button className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#0A1F44] transition hover:border-blue-300 hover:bg-blue-50">
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </button>
                            <button className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600">
                              <Archive className="h-3.5 w-3.5" />
                              Archive
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 p-4">
              <p className="text-xs text-gray-500">
                Page {page} of {totalPages}
                {isFetching && " · refreshing..."}
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-[#0A1F44] transition hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#0A1F44] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0d2a5c] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
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
