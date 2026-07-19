import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  getDashboardReport,
  getCandidateReport,
  getEmployerReport,
  getRecruitmentReport,
} from "@/lib/admin/reports";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/utils/download";
import { exportCandidateReport } from "@/lib/admin/reports";
import SimpleBarChart from "./SimpleBarChart";
import StatCard from "./StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/Admin/reports/")({
  component: ReportsPage,
});

function ReportsPage() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [candidate, setCandidate] = useState<any>(null);
  const [employer, setEmployer] = useState<any>(null);
  const [recruitment, setRecruitment] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const [d, c, e, r] = await Promise.all([
        getDashboardReport(),
        getCandidateReport(),
        getEmployerReport(),
        getRecruitmentReport(),
      ]);

      setDashboard(d);
      setCandidate(c);
      setEmployer(e);
      setRecruitment(r);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="p-8">Loading reports...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Reports</h1>

      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>

          <TabsTrigger value="candidate">Candidates</TabsTrigger>

          <TabsTrigger value="employer">Employers</TabsTrigger>

          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <StatCard title="Employers" value={dashboard.summary.employers} />

            <StatCard title="Candidates" value={dashboard.summary.candidates} />

            <StatCard title="Requirements" value={dashboard.summary.requirements} />

            <StatCard title="Job Orders" value={dashboard.summary.jobOrders} />

            <StatCard title="Applications" value={dashboard.summary.applications} />

            <StatCard title="Interviews" value={dashboard.summary.interviews} />

            <StatCard title="Medicals" value={dashboard.summary.medicals} />

            <StatCard title="Visas" value={dashboard.summary.visas} />

            <StatCard title="Deployments" value={dashboard.summary.deployments} />
          </div>
        </TabsContent>

        <TabsContent value="candidate">
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button
                onClick={async () => {
                  const blob = await exportCandidateReport();
                  downloadBlob(blob, "candidate-report.csv");
                }}
              >
                Export CSV
              </Button>
            </div>

            {/*
              TODO: candidate report content goes here.
              The original file was cut off with "..." at this point, so I don't
              know the real shape of `candidate` (e.g. candidate.summary.total,
              candidate.skills, etc). Tell me the fields on the candidate report
              object and I'll wire up StatCards / charts to match the other tabs.
            */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {candidate?.summary &&
                Object.entries(candidate.summary).map(([key, value]) => (
                  <StatCard key={key} title={key} value={value as number} />
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="employer">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard title="Total Employers" value={employer.summary.total} />
              <StatCard title="Active" value={employer.summary.active} />
              <StatCard title="Pending Approval" value={employer.summary.pending} />
              <StatCard title="Suspended" value={employer.summary.suspended} />
            </div>

            <CardContent>
              <SimpleBarChart
                data={Object.entries(employer.countries).map(([name, value]) => ({
                  name,
                  value: value as number,
                }))}
              />
            </CardContent>

            <Card>
              <CardHeader>
                <CardTitle>Approval Status</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  {Object.entries(employer.approval).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between border-b pb-2">
                      <span>{status}</span>
                      <span className="font-semibold">{count as number}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Employers</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  {employer.topEmployers.map((item: any) => (
                    <div
                      key={item.employerId}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <span>{item.companyName}</span>
                      <span className="font-semibold">{item.totalJobs} Jobs</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recruitment">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <StatCard title="Applications" value={recruitment.summary.applications} />

              <StatCard title="Interviews" value={recruitment.summary.interviews} />

              <StatCard title="Medicals" value={recruitment.summary.medicals} />

              <StatCard title="Visas" value={recruitment.summary.visas} />

              <StatCard title="Deployments" value={recruitment.summary.deployments} />
            </div>

            <CardContent>
              <SimpleBarChart
                data={Object.entries(recruitment.funnel).map(([name, value]) => ({
                  name,
                  value: value as number,
                }))}
              />
            </CardContent>

            <CardContent>
              <SimpleBarChart
                data={Object.entries(recruitment.medicals).map(([name, value]) => ({
                  name,
                  value: value as number,
                }))}
              />
            </CardContent>

            <CardContent>
              <SimpleBarChart
                data={Object.entries(recruitment.visas).map(([name, value]) => ({
                  name,
                  value: value as number,
                }))}
              />
            </CardContent>

            <CardContent>
              <SimpleBarChart
                data={Object.entries(recruitment.deployments).map(([name, value]) => ({
                  name,
                  value: value as number,
                }))}
              />
            </CardContent>

            <CardContent>
              <SimpleBarChart
                data={Object.entries(recruitment.monthly).map(([name, value]) => ({
                  name,
                  value: value as number,
                }))}
              />
            </CardContent>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
