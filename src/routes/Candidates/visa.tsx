import { createFileRoute } from "@tanstack/react-router";

import VisaStatusCard from "@/components/Candidate/visa/VisaStatusCard";
import VisaTimeline from "@/components/Candidate/visa/VisaTimeline";
import VisaDocuments from "@/components/Candidate/visa/VisaDocuments";

export const Route = createFileRoute("/Candidates/visa")({
  component: VisaPage,
});

function VisaPage() {
  return (
    <div className="space-y-6">
      <VisaStatusCard />

      <VisaTimeline />

      <VisaDocuments />
    </div>
  );
}
