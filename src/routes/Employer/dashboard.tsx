import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Briefcase, Users, CalendarDays, Plane } from "lucide-react";

import { StatCard } from "@/components/Employer/Dashboard/StatCard";
import { RecruitmentPipeline } from "@/components/Employer/Dashboard/RecruitmentPipeline";
import { QuickActions } from "@/components/Employer/Dashboard/QuickActions";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { getDashboard } from "@/lib/employer/api";

export const Route = createFileRoute("/Employer/dashboard")({
  component: EmployerDashboard,
});

const STAT_CONFIG = {
  activeJobOrders: { title: "Active Job Orders", icon: Briefcase, color: "blue" },
  totalCandidates: { title: "Candidates", icon: Users, color: "green" },
  upcomingInterviews: { title: "Interviews", icon: CalendarDays, color: "amber" },
  deployments: { title: "Deployments", icon: Plane, color: "purple" },
} as const;

function EmployerDashboard() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getDashboard();
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
          title={STAT_CONFIG.activeJobOrders.title}
          value={dashboard?.dashboard?.activeJobOrders ?? 0}
          icon={STAT_CONFIG.activeJobOrders.icon}
          color={STAT_CONFIG.activeJobOrders.color}
        />

        <StatCard
          title={STAT_CONFIG.totalCandidates.title}
          value={dashboard?.dashboard?.totalCandidates ?? 0}
          icon={STAT_CONFIG.totalCandidates.icon}
          color={STAT_CONFIG.totalCandidates.color}
        />

        <StatCard
          title={STAT_CONFIG.upcomingInterviews.title}
          value={dashboard?.dashboard?.upcomingInterviews ?? 0}
          icon={STAT_CONFIG.upcomingInterviews.icon}
          color={STAT_CONFIG.upcomingInterviews.color}
        />

        <StatCard
          title={STAT_CONFIG.deployments.title}
          value={dashboard?.dashboard?.deployments ?? 0}
          icon={STAT_CONFIG.deployments.icon}
          color={STAT_CONFIG.deployments.color}
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
