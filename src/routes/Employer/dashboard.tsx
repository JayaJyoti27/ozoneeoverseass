import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { StatCard } from "@/components/Employer/Dashboard/StatCard";
import { dashboardStats } from "@/components/Employer/Dashboard/mock";
import { RecruitmentPipeline } from "@/components/Employer/Dashboard/RecruitmentPipeline";
import { QuickActions } from "@/components/Employer/Dashboard/QuickActions";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { getDashboard } from "@/lib/employer/api";

export const Route = createFileRoute("/Employer/dashboard")({
  component: EmployerDashboard,
});

function EmployerDashboard() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getDashboard();
        console.log(JSON.stringify(data, null, 2));
        setDashboard(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employer Dashboard</h1>

          <p className="text-muted-foreground">
            Welcome back. Here's an overview of your recruitment activities.
          </p>

          {dashboard?.employer && (
            <p className="mt-2 text-sm text-muted-foreground">
              Logged in as {dashboard.employer.companyName}
            </p>
          )}
        </div>

        <Button>Create Job Order</Button>
      </div>

      {loading && <p>Loading dashboard...</p>}

      {/* KPI Cards */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Active Job Orders"
          value={dashboard?.dashboard?.activeJobOrders ?? 0}
          icon={dashboardStats[0].icon}
          color={dashboardStats[0].color}
        />

        <StatCard
          title="Candidates"
          value={dashboard?.dashboard?.totalCandidates ?? 0}
          icon={dashboardStats[1].icon}
          color={dashboardStats[1].color}
        />

        <StatCard
          title="Interviews"
          value={dashboard?.dashboard?.upcomingInterviews ?? 0}
          icon={dashboardStats[2].icon}
          color={dashboardStats[2].color}
        />

        <StatCard
          title="Deployments"
          value={dashboard?.dashboard?.deployments ?? 0}
          icon={dashboardStats[3].icon}
          color={dashboardStats[3].color}
        />
      </section>

      {/* Bottom Section */}
      <section className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <RecruitmentPipeline dashboard={dashboard?.dashboard} />
        </div>

        <div className="space-y-6 xl:col-span-5">
          <QuickActions />
        </div>
      </section>
    </div>
  );
}
