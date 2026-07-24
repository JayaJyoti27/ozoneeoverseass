import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Building2,
  Users,
  FileText,
  BriefcaseBusiness,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getDashboard } from "@/lib/admin/api";
import { DotGrid, Blob } from "@/components/site/decor";

export const Route = createFileRoute("/Admin/reports/")({
  component: ReportsPage,
});

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] border border-border bg-white p-6 shadow-[0_12px_40px_-28px_rgba(11,31,58,0.35)]">
      <h3 className="font-display text-lg font-semibold text-navy">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ReportRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  icon: any;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-blue-wash/40 px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-wash text-blue">
          <Icon size={16} />
        </span>
        <span className="text-sm font-medium text-navy">{label}</span>
      </div>
      <span className="font-display text-lg font-bold text-navy">{value}</span>
    </div>
  );
}

function ReportsPage() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      setLoading(true);
      setError(null);
      const data = await getDashboard();
      setDashboard(data);
    } catch (err) {
      console.error("Failed to load reports:", err);
      setError("Couldn't load report data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-blue" size={32} />
        <p className="text-sm text-ink">Loading reports…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-red-50 text-red-500">
          <AlertCircle size={28} />
        </span>
        <p className="text-ink">{error}</p>
        <Button onClick={loadReports} className="rounded-full bg-navy px-6 hover:bg-blue">
          Retry
        </Button>
      </div>
    );
  }

  const totals = [
    { label: "Total Employers", value: dashboard?.stats?.employers ?? 0, icon: Building2 },
    { label: "Total Candidates", value: dashboard?.stats?.candidates ?? 0, icon: Users },
    { label: "Total Requirements", value: dashboard?.stats?.requirements ?? 0, icon: FileText },
    {
      label: "Total Job Orders",
      value: dashboard?.stats?.jobOrders ?? 0,
      icon: BriefcaseBusiness,
    },
  ];

  const pendingEmployers = dashboard?.pendingEmployers?.length ?? 0;
  const pendingRequirements = dashboard?.pendingRequirements?.length ?? 0;

  return (
    <div className="space-y-8">
      {/* Hero banner — matches Dashboard */}
      <div className="relative overflow-hidden rounded-[28px] bg-blue-wash px-8 py-8">
        <Blob
          className="-right-16 -top-24 h-72 w-72 opacity-60"
          color="var(--color-blue-soft, #DCE9FB)"
        />
        <DotGrid className="left-8 top-6 h-20 w-24 opacity-70" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue backdrop-blur">
            <BarChart3 className="h-3.5 w-3.5" /> Reports
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-navy">Reports</h1>
          <p className="mt-1 text-ink">Platform-wide totals and pending activity</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Platform Totals">
          <div className="space-y-3">
            {totals.map((t) => (
              <ReportRow key={t.label} label={t.label} value={t.value} icon={t.icon} />
            ))}
          </div>
        </Panel>

        <Panel title="Pending Review">
          <div className="space-y-3">
            <ReportRow label="Pending Employers" value={pendingEmployers} icon={Building2} />
            <ReportRow label="Pending Requirements" value={pendingRequirements} icon={FileText} />
          </div>
        </Panel>
      </div>
    </div>
  );
}
