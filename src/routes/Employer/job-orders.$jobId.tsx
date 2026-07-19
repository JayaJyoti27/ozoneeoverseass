import { createFileRoute } from "@tanstack/react-router";

import { JobOrderHeader } from "@/components/Employer/JobOrders/JobOrderHeader";
import { JobOrderTimeline } from "@/components/Employer/JobOrders/JobOrderTimeline";
import { JobInformationCard } from "@/components/Employer/JobOrders/JobInformationCard";
import { DocumentsCard } from "@/components/Employer/JobOrders/Details/DocumentsCard";
import { CandidateSummaryCard } from "@/components/Employer/JobOrders/Details/CandidateSummaryCard";
import { CandidatesTable } from "@/components/Employer/JobOrders/Details/CandidatesTable";
export const Route = createFileRoute("/Employer/job-orders/$jobId")({
  component: JobOrderDetailsPage,
});

function JobOrderDetailsPage() {
  return (
    <div className="space-y-6">
      <JobOrderHeader />

      <JobOrderTimeline />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <JobInformationCard />
          <DocumentsCard />
        </div>

        <CandidateSummaryCard />
      </div>
    </div>
  );
}
