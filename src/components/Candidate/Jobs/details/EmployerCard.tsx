import { Building2, Globe, Mail, Phone } from "lucide-react";

import { Card } from "@/components/ui/card";

import type { CandidateJob } from "@/lib/candidate/types";

interface Props {
  job: CandidateJob;
}

export default function EmployerCard({ job }: Props) {
  return (
    <Card className="rounded-2xl p-6">
      <h2 className="mb-5 text-xl font-semibold">Employer</h2>

      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Building2 className="h-5 w-5 text-primary" />

          <span>{job.company}</span>
        </div>

        {job.country && (
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-primary" />

            <span>{job.country}</span>
          </div>
        )}

        {job.contact_email && (
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />

            <span>{job.contact_email}</span>
          </div>
        )}

        {job.contact_phone && (
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-primary" />

            <span>{job.contact_phone}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
