import { Card } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import type { CandidateApplication } from "@/lib/candidate/types";

interface Props {
  application: CandidateApplication;
}

export default function NextSteps({ application }: Props) {
  return (
    <Card className="rounded-2xl p-6">
      <h2 className="mb-6 text-xl font-semibold">Current Status</h2>

      <Badge className="mb-5">{application.status.replaceAll("_", " ")}</Badge>

      <div className="space-y-3 text-sm">
        {application.interview_date && (
          <p>📅 Interview: {new Date(application.interview_date).toLocaleString()}</p>
        )}

        {application.offer_status && <p>💼 Offer: {application.offer_status}</p>}

        {application.medical_status && <p>❤️ Medical: {application.medical_status}</p>}

        {application.visa_status && <p>🛂 Visa: {application.visa_status}</p>}

        {application.deployment_status && <p>✈️ Deployment: {application.deployment_status}</p>}
      </div>
    </Card>
  );
}
