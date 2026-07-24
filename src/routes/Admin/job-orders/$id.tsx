import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getJobOrder, openRecruitment, closeRecruitment } from "@/lib/admin/api";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { DotGrid } from "@/components/site/decor";

export const Route = createFileRoute("/Admin/job-orders/$id")({
  component: JobOrderDetails,
});

const STATUS_STYLES: Record<string, string> = {
  open: "bg-emerald-50 text-emerald-700",
  active: "bg-emerald-50 text-emerald-700",
  closed: "bg-red-50 text-red-700",
  pending: "bg-amber-50 text-amber-700",
};

function StatusPill({ status }: { status?: string }) {
  const key = (status || "").toLowerCase();
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
        STATUS_STYLES[key] ?? "bg-blue-wash text-blue"
      }`}
    >
      {status || "-"}
    </span>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] border border-border bg-white p-6 shadow-[0_12px_40px_-28px_rgba(11,31,58,0.35)]">
      <h3 className="font-display text-lg font-semibold text-navy">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function JobOrderDetails() {
  const { id } = Route.useParams();

  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<any>();

  useEffect(() => {
    load();
  }, [id]);

  async function load() {
    setLoading(true);

    try {
      const data = await getJobOrder(id);
      setJob(data.data ?? data);
    } finally {
      setLoading(false);
    }
  }

  async function open() {
    await openRecruitment(id);
    load();
  }

  async function close() {
    await closeRecruitment(id);
    load();
  }

  if (loading || !job)
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-blue" size={32} />
        <p className="text-sm text-ink">Loading job order…</p>
      </div>
    );

  const stages = [
    { title: "Applications", value: job.applications ?? 0 },
    { title: "Shortlisted", value: job.shortlisted ?? 0 },
    { title: "Interviewed", value: job.interviewed ?? 0 },
    { title: "Selected", value: job.selected ?? 0 },
    { title: "Deployed", value: job.deployed ?? 0 },
  ];
  const maxStage = Math.max(1, ...stages.map((s) => s.value));

  return (
    <div className="relative space-y-6">
      <DotGrid className="right-0 top-0 h-20 w-20 opacity-60" />

      <div className="relative flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue">
            Job Order
          </span>
          <h1 className="mt-1 font-display text-3xl font-bold text-navy">{job.role}</h1>
          <p className="mt-1 text-ink">{job.company_name}</p>
        </div>

        <StatusPill status={job.status} />
      </div>

      <div className="relative grid gap-6 lg:grid-cols-3">
        <Panel title="Job Information">
          <div className="space-y-3">
            <Info label="Role" value={job.role} />
            <Info label="Country" value={job.country} />
            <Info label="Sector" value={job.sector} />
            <Info label="Openings" value={job.headcount} />
            <Info label="Timeline" value={job.timeline} />
          </div>
        </Panel>

        <Panel title="Recruitment Progress">
          <div className="space-y-4">
            {stages.map((s) => (
              <div key={s.title}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-navy">{s.title}</span>
                  <span className="font-semibold text-navy">{s.value}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-blue-wash">
                  <div
                    className="h-full rounded-full bg-blue transition-all"
                    style={{ width: `${(s.value / maxStage) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Actions">
          <div className="space-y-3">
            <Button className="w-full rounded-full bg-navy hover:bg-blue" onClick={open}>
              Open Recruitment
            </Button>
            <Button variant="destructive" className="w-full rounded-full" onClick={close}>
              Close Recruitment
            </Button>
          </div>
        </Panel>
      </div>

      <Panel title="Assigned Candidates">
        {!job.candidates?.length ? (
          <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
            <p className="text-sm text-ink">No candidates assigned.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {job.candidates.map((candidate: any) => (
              <div
                key={candidate.id}
                className="flex items-center justify-between rounded-2xl border border-border p-4 transition hover:border-blue"
              >
                <div>
                  <h4 className="font-semibold text-navy">{candidate.name}</h4>
                  <p className="text-sm text-ink">{candidate.email}</p>
                </div>
                <StatusPill status={candidate.status} />
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-blue-wash/40 px-4 py-3">
      <span className="text-sm font-medium text-navy">{label}</span>
      <span className="text-sm text-ink">{value ?? "-"}</span>
    </div>
  );
}
