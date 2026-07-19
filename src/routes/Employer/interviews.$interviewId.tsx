import { createFileRoute } from "@tanstack/react-router";

import { InterviewsHeader } from "@/components/Employer/Interviews/InterviewHeader";
import { CandidateCard } from "@/components/Employer/Interviews/CandidateCard";
import { InterviewInformationCard } from "@/components/Employer/Interviews/InterviewInformationCard";
import { TimelineCard } from "@/components/Employer/Interviews/TimelineCard";
import { FeedbackCard } from "@/components/Employer/Interviews/FeedbackCard";

export const Route = createFileRoute("/Employer/interviews/$interviewId")({
  component: InterviewDetailsPage,
});

function InterviewDetailsPage() {
  return (
    <div className="space-y-6">
      <InterviewsHeader />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <CandidateCard />

          <InterviewInformationCard />

          <FeedbackCard />
        </div>

        <TimelineCard />
      </div>
    </div>
  );
}
