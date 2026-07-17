import { CheckCircle2 } from "lucide-react";

import { Card } from "@/components/ui/card";

import type { CandidateJob } from "@/lib/candidate/types";

interface Props {
  job: CandidateJob;
}

export default function JobRequirements({ job }: Props) {
  return (
    <Card className="rounded-2xl p-6">
      <h2 className="mb-6 text-2xl font-semibold">Requirements</h2>

      <div className="space-y-4">
        {job.requirements?.map((req) => (
          <div key={req} className="flex gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 text-green-600" />

            <span>{req}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
