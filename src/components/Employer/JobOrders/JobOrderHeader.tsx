import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { getRequirement } from "@/lib/employer/api";

type Requirement = {
  id: string;
  title?: string;
  position?: string;
  status?: string;
};

export function JobOrderHeader() {
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

  if (!job) return null;

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{job.position ?? job.title ?? "Job Order"}</h1>

        <p className="text-muted-foreground">{job.id}</p>
      </div>

      <div className="flex gap-3">
        <Badge className="px-4 py-2">{job.status ?? "Pending"}</Badge>

        <Button variant="outline">Download PDF</Button>
      </div>
    </div>
  );
}
