import { createFileRoute } from "@tanstack/react-router";

import { DeploymentHeader } from "@/components/Employer/Deployment/DeploymentHeader";
import { DeploymentStats } from "@/components/Employer/Deployment/DeploymentStats";
import { DeploymentTable } from "@/components/Employer/Deployment/DeploymentTable";

export const Route = createFileRoute("/Employer/deployment")({
  component: DeploymentPage,
});

function DeploymentPage() {
  return (
    <div className="space-y-6">
      <DeploymentHeader />

      <DeploymentStats />

      <DeploymentTable />
    </div>
  );
}
