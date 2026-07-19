import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { getRequirement } from "@/lib/employer/api";

type Requirement = {
  id: string;
  department?: string;
  country?: string;
  vacancies?: number;
  salary?: string;
  created_at?: string;
};

export function JobInformationCard() {
  const { jobId } = useParams({
    from: "/Employer/job-orders/$jobId",
  });

  const [job, setJob] = useState<Requirement | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getRequirement(jobId);
        setJob(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [jobId]);

  if (!job) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Job Information</CardTitle>
        </CardHeader>

        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Information</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-6">
        <Info label="Department" value={job.department ?? "-"} />
        <Info label="Country" value={job.country ?? "-"} />
        <Info label="Vacancies" value={String(job.vacancies ?? 0)} />
        <Info label="Salary" value={job.salary ?? "-"} />
        <Info
          label="Submitted"
          value={job.created_at ? new Date(job.created_at).toLocaleDateString() : "-"}
        />
      </CardContent>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <h3 className="font-semibold">{value}</h3>
    </div>
  );
}
