import { createFileRoute } from "@tanstack/react-router";

import ApplicationFilters from "@/components/Candidate/applications/ApplicationFilters";
import ApplicationList from "@/components/Candidate/applications/ApplicationList";
import ApplicationStats from "@/components/Candidate/applications/ApplicationStats";

export const Route = createFileRoute("/Candidates/applications")({
  component: ApplicationsPage,
});

function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <ApplicationStats />

      <ApplicationFilters />

      <ApplicationList />
    </div>
  );
}
