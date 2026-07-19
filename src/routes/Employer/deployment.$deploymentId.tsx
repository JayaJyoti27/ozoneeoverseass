import { createFileRoute } from "@tanstack/react-router";

import { DeploymentHeader } from "@/components/Employer/Deployment/DeploymentHeader";
import { CandidateCard } from "@/components/Employer/Deployment/Details/CandidateCard";
import { VisaCard } from "@/components/Employer/Deployment/Details/VisaCard";
import { MedicalCard } from "@/components/Employer/Deployment/Details/MedicalCard";
import { FlightCard } from "@/components/Employer/Deployment/Details/FlightCard";
import { TimelineCard } from "@/components/Employer/Deployment/Details/TimelineCard";
import { DocumentChecklistCard } from "@/components/Employer/Deployment/Details/DocumentChecklistCard";
import { ActivityLogCard } from "@/components/Employer/Deployment/Details/ActivityLogCard";
export const Route = createFileRoute("/Employer/deployment/$deploymentId")({
  component: DeploymentDetailsPage,
});

function DeploymentDetailsPage() {
  return (
    <div className="space-y-6">
      <DeploymentHeader />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <CandidateCard />

          <VisaCard />

          <MedicalCard />

          <FlightCard />

          <DocumentChecklistCard />
        </div>

        <div className="space-y-6">
          <TimelineCard />

          <ActivityLogCard />
        </div>
      </div>
    </div>
  );
}
