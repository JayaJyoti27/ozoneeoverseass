import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  getRequirements,
  approveRequirement,
  rejectRequirement,
  requestClarification,
  convertRequirement,
} from "@/lib/admin/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, FileText, Inbox } from "lucide-react";
import { DotGrid, Blob } from "@/components/site/decor";

export const Route = createFileRoute("/Admin/requirements/")({
  component: RequirementsPage,
});

const STATUS_STYLES: Record<string, string> = {
  approved: "bg-emerald-50 text-emerald-700",
  converted: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  clarification: "bg-amber-50 text-amber-700",
  rejected: "bg-red-50 text-red-700",
};

function StatusPill({ status }: { status?: string }) {
  const key = (status || "").toLowerCase();
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
        STATUS_STYLES[key] ?? "bg-blue-wash text-blue"
      }`}
    >
      {status || "-"}
    </span>
  );
}

// header + every row share this grid so columns always line up and fill width
const GRID_COLS = "grid-cols-[1.2fr_1.1fr_0.9fr_0.8fr_0.9fr_2fr]";

function RequirementsPage() {
  const navigate = useNavigate();

  const [requirements, setRequirements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadRequirements();
  }, []);

  async function loadRequirements() {
    setLoading(true);

    try {
      const data = await getRequirements();
      setRequirements(Array.isArray(data) ? data : (data.data ?? []));
    } finally {
      setLoading(false);
    }
  }

  async function approve(id: string) {
    await approveRequirement(id);
    loadRequirements();
  }

  async function reject(id: string) {
    await rejectRequirement(id, "Rejected by Admin");
    loadRequirements();
  }

  async function clarification(id: string) {
    await requestClarification(id, "Please provide additional details.");
    loadRequirements();
  }

  async function convert(id: string) {
    await convertRequirement(id);
    loadRequirements();
  }

  const filtered = useMemo(() => {
    return requirements.filter((r) =>
      JSON.stringify(r).toLowerCase().includes(search.toLowerCase()),
    );
  }, [requirements, search]);

  if (loading) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-blue" size={32} />
        <p className="text-sm text-ink">Loading requirements…</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero banner — matches Dashboard */}
      <div className="relative overflow-hidden rounded-[28px] bg-blue-wash px-8 py-8">
        <Blob
          className="-right-16 -top-24 h-72 w-72 opacity-60"
          color="var(--color-blue-soft, #DCE9FB)"
        />
        <DotGrid className="left-8 top-6 h-20 w-24 opacity-70" />

        <div className="relative flex flex-wrap items-start justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue backdrop-blur">
              <FileText className="h-3.5 w-3.5" /> Requirements
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold text-navy">Requirements</h1>
            <p className="mt-1 text-ink">Review employer requirements</p>
          </div>

          <div className="relative w-80 max-w-full">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink" />
            <Input
              className="rounded-full border-none bg-white pl-10 shadow-sm focus-visible:ring-blue"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table card — CSS grid rows, guaranteed full width, no cutoff */}
      <div className="overflow-hidden rounded-[24px] border border-border bg-white shadow-[0_12px_40px_-28px_rgba(11,31,58,0.35)]">
        {/* header row */}
        <div className={`grid ${GRID_COLS} gap-2 border-b border-border bg-blue-wash/50 px-6 py-4`}>
          <span className="text-xs font-semibold uppercase tracking-wide text-navy">Employer</span>
          <span className="text-xs font-semibold uppercase tracking-wide text-navy">Role</span>
          <span className="text-xs font-semibold uppercase tracking-wide text-navy">Country</span>
          <span className="text-xs font-semibold uppercase tracking-wide text-navy">Headcount</span>
          <span className="text-xs font-semibold uppercase tracking-wide text-navy">Status</span>
          <span className="text-right text-xs font-semibold uppercase tracking-wide text-navy">
            Actions
          </span>
        </div>

        {/* rows */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-blue-wash text-blue">
              <Inbox size={20} />
            </span>
            <p className="text-sm text-ink">No requirements found.</p>
          </div>
        ) : (
          filtered.map((req) => (
            <div
              key={req.id}
              className={`grid ${GRID_COLS} cursor-pointer items-center gap-2 border-b border-border px-6 py-4 transition last:border-0 hover:bg-blue-wash/40`}
              onClick={() => navigate({ to: `/Admin/requirements/${req.id}` })}
            >
              <span className="truncate font-medium text-navy">{req.company_name}</span>
              <span className="truncate text-ink">{req.role}</span>
              <span className="truncate text-ink">{req.country}</span>
              <span className="truncate text-ink">{req.headcount}</span>
              <span>
                <StatusPill status={req.status} />
              </span>
              <div
                className="flex flex-wrap items-center justify-end gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  size="sm"
                  className="rounded-full bg-navy px-3 text-xs hover:bg-blue"
                  onClick={() => approve(req.id)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full bg-blue-wash px-3 text-xs text-blue hover:bg-blue-soft"
                  onClick={() => clarification(req.id)}
                >
                  Clarify
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full border-border px-3 text-xs hover:border-blue hover:text-blue"
                  onClick={() => convert(req.id)}
                >
                  Convert
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="rounded-full px-3 text-xs"
                  onClick={() => reject(req.id)}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
