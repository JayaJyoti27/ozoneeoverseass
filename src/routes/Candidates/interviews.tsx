import { createFileRoute } from "@tanstack/react-router";

import UpcomingInterviews from "@/components/Candidate/interviews/UpcomingInterviews";
import PastInterviews from "@/components/Candidate/interviews/PastInterviews";
import InterviewStats from "@/components/Candidate/interviews/InterviewStats";

export const Route = createFileRoute("/Candidates/interviews")({
  component: InterviewsPage,
});

function InterviewsPage() {
  return (
    <div className="space-y-6">
      <InterviewStats />

      <UpcomingInterviews />

      <PastInterviews />
    </div>
  );
}
