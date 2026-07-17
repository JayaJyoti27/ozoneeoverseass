import { Card } from "@/components/ui/card";

import type { CandidateApplication } from "@/lib/candidate/types";

interface Props {
  application: CandidateApplication;
}

export default function RecruiterRemarks({ application }: Props) {
  return (
    <Card className="rounded-2xl p-6">
      <h2 className="mb-5 text-xl font-semibold">Recruiter Remarks</h2>

      <p>{application.remarks || "No remarks available."}</p>
    </Card>
  );
}
