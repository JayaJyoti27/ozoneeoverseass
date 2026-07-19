import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, UserRound, Building2, BriefcaseBusiness, Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import {
  getApplications,
  updateApplicationStage,
  rejectApplication,
  withdrawApplication,
} from "@/lib/recruitment/api";

export const Route = createFileRoute("/Admin/applications/")({
  component: ApplicationsPage,
});

function ApplicationsPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    setLoading(true);

    try {
      const data = await getApplications();
      setApplications(Array.isArray(data) ? data : (data.data ?? []));
    } finally {
      setLoading(false);
    }
  }

  async function nextStage(id: string) {
    await updateApplicationStage(id, "next");
    loadApplications();
  }

  async function reject(id: string) {
    await rejectApplication(id);
    loadApplications();
  }

  async function withdraw(id: string) {
    await withdrawApplication(id);
    loadApplications();
  }

  const filtered = useMemo(() => {
    return applications.filter((a) =>
      JSON.stringify(a).toLowerCase().includes(search.toLowerCase()),
    );
  }, [applications, search]);

  const stats = {
    total: applications.length,
    screening: applications.filter((a) => a.stage === "screening").length,
    interview: applications.filter((a) => a.stage === "interview").length,
    medical: applications.filter((a) => a.stage === "medical").length,
    visa: applications.filter((a) => a.stage === "visa").length,
    deployment: applications.filter((a) => a.stage === "deployment").length,
  };

  if (loading)
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Applications</h1>

        <p className="text-muted-foreground">Recruitment Pipeline</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-6">
        <StatCard title="Applications" value={stats.total} />

        <StatCard title="Screening" value={stats.screening} />

        <StatCard title="Interview" value={stats.interview} />

        <StatCard title="Medical" value={stats.medical} />

        <StatCard title="Visa" value={stats.visa} />

        <StatCard title="Deployment" value={stats.deployment} />
      </div>

      <div className="flex justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 text-gray-400" size={16} />

          <Input
            className="pl-9"
            placeholder="Search candidate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>

                <TableHead>Employer</TableHead>

                <TableHead>Role</TableHead>

                <TableHead>Recruiter</TableHead>

                <TableHead>Stage</TableHead>

                <TableHead>Status</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((application) => (
                <TableRow
                  key={application.id}
                  className="cursor-pointer"
                  onClick={() =>
                    navigate({
                      to: `/Admin/applications/${application.id}`,
                    })
                  }
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <UserRound size={16} />

                      {application.candidate_name}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 size={16} />

                      {application.company_name}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <BriefcaseBusiness size={16} />

                      {application.role}
                    </div>
                  </TableCell>

                  <TableCell>{application.recruiter ?? "-"}</TableCell>

                  <TableCell>
                    <StageBadge stage={application.stage} />
                  </TableCell>

                  <TableCell>
                    <Badge>{application.status}</Badge>
                  </TableCell>

                  <TableCell className="space-x-2 text-right" onClick={(e) => e.stopPropagation()}>
                    <Button size="sm" onClick={() => nextStage(application.id)}>
                      Next
                    </Button>

                    <Button size="sm" variant="secondary">
                      Assign
                    </Button>

                    <Button size="sm" variant="outline" onClick={() => withdraw(application.id)}>
                      Withdraw
                    </Button>

                    <Button size="sm" variant="destructive" onClick={() => reject(application.id)}>
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value }: any) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{title}</p>

        <h2 className="mt-2 text-3xl font-bold">{value}</h2>
      </CardContent>
    </Card>
  );
}

function StageBadge({ stage }: { stage: string }) {
  const colors: Record<string, string> = {
    applied: "bg-gray-200",
    screening: "bg-blue-500 text-white",
    shortlisted: "bg-indigo-500 text-white",
    interview: "bg-orange-500 text-white",
    medical: "bg-purple-500 text-white",
    visa: "bg-cyan-500 text-white",
    deployment: "bg-green-500 text-white",
    completed: "bg-emerald-600 text-white",
  };

  return <Badge className={colors[stage] || ""}>{stage}</Badge>;
}
