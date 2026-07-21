import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Building2, Users, FileText, BriefcaseBusiness, Loader2, AlertCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDashboard } from "@/lib/admin/api";

export const Route = createFileRoute("/Admin/dashboard")({
  component: Dashboard,
});

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number | string;
  icon: any;
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>
        </div>

        <div className="rounded-xl bg-blue-50 p-4">
          <Icon className="text-blue-600" size={26} />
        </div>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError(null);
      const data = await getDashboard();
      setDashboard(data);
    } catch (err) {
      console.error("Failed to load admin dashboard:", err);
      setError("Couldn't load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
        <AlertCircle className="text-red-500" size={40} />
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={loadDashboard}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="text-muted-foreground">Recruitment overview</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <StatCard title="Employers" value={dashboard?.stats?.employers ?? 0} icon={Building2} />

        <StatCard title="Candidates" value={dashboard?.stats?.candidates ?? 0} icon={Users} />

        <StatCard
          title="Requirements"
          value={dashboard?.stats?.requirements ?? 0}
          icon={FileText}
        />

        <StatCard
          title="Job Orders"
          value={dashboard?.stats?.jobOrders ?? 0}
          icon={BriefcaseBusiness}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Pending Employers</h3>

            {(dashboard?.pendingEmployers ?? []).length === 0 ? (
              <p className="text-muted-foreground">No pending employers</p>
            ) : (
              <div className="space-y-4">
                {dashboard.pendingEmployers.map((e: any) => (
                  <div key={e.id} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <p className="font-medium">{e.company_name}</p>

                      <p className="text-sm text-muted-foreground">{e.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Pending Requirements</h3>

            {(dashboard?.pendingRequirements ?? []).length === 0 ? (
              <p className="text-muted-foreground">No pending requirements</p>
            ) : (
              <div className="space-y-4">
                {dashboard.pendingRequirements.map((r: any) => (
                  <div key={r.id} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <p className="font-medium">{r.role}</p>

                      <p className="text-sm text-muted-foreground">{r.company_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
