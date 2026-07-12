import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  Users,
  Search,
  Globe2,
  Briefcase,
  CalendarClock,
  LayoutGrid,
  List,
  Loader2,
  Inbox,
  BadgeCheck,
} from "lucide-react";

import { getCandidates, getCandidateById } from "@/api/employer";
import { X, Mail, Phone } from "lucide-react";
import { EmployerNavbar } from "@/components/Employer/EmployerNav";
export const Route = createFileRoute("/Employer/candidate")({
  component: CandidatesPage,
});

type Candidate = {
  id: string | number;
  name: string;
  specialty: string;
  nationality: string;
  experience_years: number;
  status: string;
  avatar_url?: string;
};

const STATUS_STYLES: Record<string, string> = {
  available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  shortlisted: "bg-blue-50 text-blue-700 border-blue-200",
  interviewing: "bg-blue-50 text-blue-700 border-blue-200",
  placed: "bg-gray-100 text-gray-600 border-gray-200",
  hired: "bg-gray-100 text-gray-600 border-gray-200",
  unavailable: "bg-amber-50 text-amber-700 border-amber-200",
};

function statusStyle(status: string) {
  const key = status?.toLowerCase().replace(/\s+/g, "_");
  return STATUS_STYLES[key] || "bg-gray-100 text-gray-600 border-gray-200";
}

function initials(name: string) {
  return (
    name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("") || "?"
  );
}

function CandidatesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["candidate-search"],
    queryFn: getCandidates,
  });

  const [search, setSearch] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [view, setView] = useState<"grid" | "table">("grid");

  const candidates: Candidate[] = data ?? [];

  const specialties = useMemo(() => {
    const unique = new Set(candidates.map((c) => c.specialty).filter(Boolean));
    return ["all", ...Array.from(unique)];
  }, [candidates]);

  const filtered = useMemo(() => {
    return candidates.filter((c) => {
      const matchesSearch =
        !search ||
        [c.name, c.specialty, c.nationality].join(" ").toLowerCase().includes(search.toLowerCase());
      const matchesSpecialty = specialtyFilter === "all" || c.specialty === specialtyFilter;
      return matchesSearch && matchesSpecialty;
    });
  }, [candidates, search, specialtyFilter]);

  const availableCount = candidates.filter((c) =>
    ["available", "active"].includes(c.status?.toLowerCase()),
  ).length;
  const nationalities = new Set(candidates.map((c) => c.nationality)).size;
  const avgExperience = candidates.length
    ? Math.round(
        candidates.reduce((sum, c) => sum + (Number(c.experience_years) || 0), 0) /
          candidates.length,
      )
    : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
      </div>
    );
  }
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: selectedCandidate, isLoading: detailLoading } = useQuery({
    queryKey: ["candidate-detail", selectedId],
    queryFn: () => getCandidateById(selectedId as string),
    enabled: !!selectedId,
  });
  return (
    <>
    <EmployerNavbar/>
    <div className="relative min-h-screen bg-[#F6F8FC]">
      <div className="pointer-events-none absolute left-6 top-8 grid grid-cols-6 gap-1.5 opacity-40">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="h-1 w-1 rounded-full bg-[#0A1F44]/30" />
        ))}
      </div>
      <div className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-blue-100/60 blur-2xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
            <Users className="h-3.5 w-3.5" />
            EMPLOYER · TALENT POOL
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
            Candidate <span className="text-blue-600">Search</span>
          </h1>
          <p className="mt-2 max-w-lg text-gray-500">
            Browse verified candidates matched to your sector, and shortlist the ones you want to
            move forward.
          </p>
        </div>

        {/* Stat chips */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatChip
            icon={<BadgeCheck className="h-5 w-5 text-blue-600" />}
            label="Available Now"
            value={availableCount}
          />
          <StatChip
            icon={<Globe2 className="h-5 w-5 text-blue-600" />}
            label="Nationalities"
            value={nationalities}
          />
          <StatChip
            icon={<CalendarClock className="h-5 w-5 text-blue-600" />}
            label="Avg. Experience"
            value={`${avgExperience} yrs`}
          />
        </div>

        {/* Card container */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-4">
            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, specialty, nationality..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex flex-wrap gap-2">
                {specialties.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpecialtyFilter(s)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition ${
                      specialtyFilter === s
                        ? "border-[#0A1F44] bg-[#0A1F44] text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* view toggle */}
              <div className="ml-1 flex items-center gap-1 rounded-full border border-gray-200 p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`rounded-full p-1.5 transition ${
                    view === "grid" ? "bg-[#0A1F44] text-white" : "text-gray-400"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setView("table")}
                  className={`rounded-full p-1.5 transition ${
                    view === "table" ? "bg-[#0A1F44] text-white" : "text-gray-400"
                  }`}
                  aria-label="Table view"
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                <Inbox className="h-6 w-6 text-blue-500" />
              </div>
              <p className="font-semibold text-[#0A1F44]">No candidates found</p>
              <p className="max-w-xs text-sm text-gray-500">
                {candidates.length === 0
                  ? "Candidates matched to your requirements will show up here."
                  : "Try adjusting your search or filter."}
              </p>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <div
                  key={c.id}
                  className="group rounded-2xl border border-gray-100 p-5 transition hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0A1F44] text-sm font-bold text-white">
                        {initials(c.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-[#0A1F44]">{c.name}</p>
                        <p className="text-xs text-gray-500">{c.specialty}</p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${statusStyle(
                        c.status,
                      )}`}
                    >
                      {c.status?.replace(/_/g, " ")}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Globe2 className="h-3.5 w-3.5 text-gray-400" />
                      {c.nationality}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-gray-400" />
                      {c.experience_years} yrs
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedId(String(c.id))}
                    className="mt-4 w-full rounded-full border border-[#0A1F44] py-2 text-xs font-semibold text-[#0A1F44] transition group-hover:bg-[#0A1F44] group-hover:text-white"
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50/70 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="p-4 text-left font-semibold">Name</th>
                    <th className="p-4 text-left font-semibold">Specialty</th>
                    <th className="p-4 text-left font-semibold">Nationality</th>
                    <th className="p-4 text-left font-semibold">Experience</th>
                    <th className="p-4 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedId(String(c.id))}
                      className="cursor-pointer transition hover:bg-blue-50/40"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0A1F44] text-xs font-bold text-white">
                            {initials(c.name)}
                          </div>
                          <span className="font-semibold text-[#0A1F44]">{c.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{c.specialty}</td>
                      <td className="p-4 text-gray-600">
                        <span className="inline-flex items-center gap-1.5">
                          <Globe2 className="h-3.5 w-3.5 text-gray-400" />
                          {c.nationality}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">{c.experience_years} years</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle(
                            c.status,
                          )}`}
                        >
                          {c.status?.replace(/_/g, " ")}
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
      {selectedId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0A1F44]">Candidate Profile</h2>
              <button
                onClick={() => setSelectedId(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {detailLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
              </div>
            ) : selectedCandidate ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0A1F44] text-sm font-bold text-white">
                    {initials(selectedCandidate.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A1F44]">{selectedCandidate.name}</p>
                    <p className="text-xs text-gray-500">{selectedCandidate.specialty}</p>
                  </div>
                  <span
                    className={`ml-auto inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle(
                      selectedCandidate.status,
                    )}`}
                  >
                    {selectedCandidate.status?.replace(/_/g, " ")}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <DetailRow label="Nationality" value={selectedCandidate.nationality} />
                  <DetailRow
                    label="Experience"
                    value={`${selectedCandidate.experience_years ?? "—"} yrs`}
                  />
                  <DetailRow label="Current Country" value={selectedCandidate.current_country} />
                  <DetailRow label="Specialty" value={selectedCandidate.specialty} />
                </div>

                {selectedCandidate.email && (
                  <a>
                    href={`mailto:${selectedCandidate.email}`}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                    <Mail className="h-4 w-4" />
                    {selectedCandidate.email}
                  </a>
                )}
                {selectedCandidate.phone && (
                  <a>
                    href={`tel:${selectedCandidate.phone}`}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                    <Phone className="h-4 w-4" />
                    {selectedCandidate.phone}
                  </a>
                )}

                {selectedCandidate.resume_url && (
                  <a>
                    href={selectedCandidate.resume_url}
                    target="_blank" rel="noreferrer" className="inline-flex items-center
                    rounded-full bg-[#0A1F44] px-4 py-2 text-xs font-semibold text-white
                    hover:bg-[#0d2a5c]" View Resume
                  </a>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Couldn't load this candidate.</p>
            )}
          </div>
        </div>
      )}
    </div>
    </>
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
function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-0.5 font-medium text-[#0A1F44]">{value || "—"}</p>
    </div>
  );
}
