import { createFileRoute } from "@tanstack/react-router";

import { InterviewsHeader } from "@/components/Employer/Interviews/InterviewHeader";
import { InterviewsTable } from "@/components/Employer/Interviews/InterviewsTable";
import { InterviewStats } from "@/components/Employer/Interviews/InterviewStats";

export const Route = createFileRoute("/Employer/interviews")({
  component: InterviewsPage,
});

function InterviewsPage() {
  return (
    <div className="space-y-6">
      <InterviewsHeader />

      <InterviewStats />

      <InterviewsTable />
    </div>
  );
}
