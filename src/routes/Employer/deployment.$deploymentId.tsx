import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { getDeployment } from "@/lib/employer/api";

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
  const { deploymentId } = Route.useParams();

  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeployment();
  }, [deploymentId]);

  async function loadDeployment() {
    setLoading(true);
    try {
      const result = await getDeployment(deploymentId);
      setData(result);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !data) return <div>Loading...</div>;

  const { deployment, timeline } = data;

  return (
    <div className="space-y-6">
      <DeploymentHeader />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <CandidateCard deployment={deployment} />
          <VisaCard deployment={deployment} />
          <MedicalCard deployment={deployment} />
          <FlightCard deployment={deployment} />
          <DocumentChecklistCard />
        </div>

        <div className="space-y-6">
          <TimelineCard timeline={timeline} />
          <ActivityLogCard timeline={timeline} />
        </div>
      </div>
    </div>
  );
}
