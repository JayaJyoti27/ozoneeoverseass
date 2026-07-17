import { Building2, DollarSign, Globe, Briefcase } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { CandidateJob } from "@/lib/candidate/types";

interface Props {
  job: CandidateJob;
}

export default function JobHero({ job }: Props) {
  return (
    <Card className="rounded-2xl p-8">
      <Badge>Hiring Now</Badge>

      <h1 className="mt-5 text-4xl font-bold">{job.title}</h1>

      <div className="mt-6 flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />

          {job.company}
        </div>

        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5" />

          {job.country}
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          {job.salary} {job.currency}
        </div>

        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />

          {job.employment_type}
        </div>
      </div>
    </Card>
  );
}
