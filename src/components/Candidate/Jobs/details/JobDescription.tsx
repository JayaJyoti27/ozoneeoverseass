import { Card } from "@/components/ui/card";

import type { CandidateJob } from "@/lib/candidate/types";

interface Props {
  job: CandidateJob;
}

export default function JobDescription({ job }: Props) {
  return (
    <Card className="rounded-2xl p-6">
      <h2 className="mb-5 text-2xl font-semibold">Job Description</h2>

      <div className="prose max-w-none whitespace-pre-wrap">{job.description}</div>
    </Card>
  );
}
