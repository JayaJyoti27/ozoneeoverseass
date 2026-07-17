import { createFileRoute } from "@tanstack/react-router";

import MedicalStatusCard from "@/components/Candidate/medical/MedicalStatusCard";
import MedicalTimeline from "@/components/Candidate/medical/MedicalTimeline";
import MedicalReports from "@/components/Candidate/medical/MedicalReports";

export const Route = createFileRoute("/Candidates/medical")({
  component: MedicalPage,
});

function MedicalPage() {
  return (
    <div className="space-y-6">
      <MedicalStatusCard />

      <MedicalTimeline />

      <MedicalReports />
    </div>
  );
}
