import { createFileRoute } from "@tanstack/react-router";

import DeploymentStatusCard from "@/components/Candidate/deployment/DeploymentStatusCard";
import TravelDetails from "@/components/Candidate/deployment/TravelDetails";
import TravelChecklist from "@/components/Candidate/deployment/TravelChecklist";

export const Route = createFileRoute("/Candidates/deployment")({
  component: DeploymentPage,
});

function DeploymentPage() {
  return (
    <div className="space-y-6">
      <DeploymentStatusCard />

      <TravelDetails />

      <TravelChecklist />
    </div>
  );
}
