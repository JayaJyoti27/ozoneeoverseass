import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getJobOrder, updateJobOrder, openRecruitment, closeRecruitment } from "@/lib/admin/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/Admin/job-orders/$id")({
  component: JobOrderDetails,
});

function JobOrderDetails() {
  const { id } = Route.useParams();

  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<any>();

  useEffect(() => {
    load();
  }, []);

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

  if (loading)
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{job.role}</h1>

          <p className="text-muted-foreground">{job.company_name}</p>
        </div>

        <Badge>{job.status}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Info label="Role" value={job.role} />

            <Info label="Country" value={job.country} />

            <Info label="Sector" value={job.sector} />

            <Info label="Openings" value={job.headcount} />

            <Info label="Timeline" value={job.timeline} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recruitment Progress</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <ProgressRow title="Applications" value={job.applications ?? 0} />

            <ProgressRow title="Shortlisted" value={job.shortlisted ?? 0} />

            <ProgressRow title="Interviewed" value={job.interviewed ?? 0} />

            <ProgressRow title="Selected" value={job.selected ?? 0} />

            <ProgressRow title="Deployed" value={job.deployed ?? 0} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <Button className="w-full" onClick={open}>
              Open Recruitment
            </Button>

            <Button variant="destructive" className="w-full" onClick={close}>
              Close Recruitment
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assigned Candidates</CardTitle>
        </CardHeader>

        <CardContent>
          {!job.candidates?.length && (
            <p className="text-muted-foreground">No candidates assigned.</p>
          )}

          {job.candidates?.map((candidate: any) => (
            <div key={candidate.id} className="flex justify-between items-center border-b py-4">
              <div>
                <h4 className="font-medium">{candidate.name}</h4>

                <p className="text-sm text-muted-foreground">{candidate.email}</p>
              </div>

              <Badge>{candidate.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Info({ label, value }: any) {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-xs text-muted-foreground">{label}</p>

      <h4 className="font-semibold mt-2">{value}</h4>
    </div>
  );
}

function ProgressRow({ title, value }: any) {
  return (
    <div className="flex justify-between">
      <span>{title}</span>

      <span className="font-semibold">{value}</span>
    </div>
  );
}
