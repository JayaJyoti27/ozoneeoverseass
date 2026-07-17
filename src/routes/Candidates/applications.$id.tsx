import { createFileRoute } from "@tanstack/react-router";

import ApplicationHero from "@/components/Candidate/applications/details/ApplicationHero";
import ApplicationTimeline from "@/components/Candidate/applications/details/ApplicationTimeline";
import JobSummary from "@/components/Candidate/applications/details/JobSummary";
import RecruiterRemarks from "@/components/Candidate/applications/details/RecruiterRemarks";
import NextSteps from "@/components/Candidate/applications/details/NextSteps";

import { useApplication } from "@/lib/candidate/hooks";

export const Route = createFileRoute("/Candidates/applications/$id")({
  component: ApplicationDetailsPage,
});

function ApplicationDetailsPage() {
  const { id } = Route.useParams();

  const { data, isLoading, isError } = useApplication(id);

  if (isLoading) return <div className="p-8">Loading...</div>;

  if (isError || !data) return <div className="p-8">Application not found.</div>;

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="space-y-6 xl:col-span-2">
        <ApplicationHero application={data} />

        <ApplicationTimeline application={data} />

        <JobSummary application={data} />

        <RecruiterRemarks application={data} />
      </div>

      <div>
        <NextSteps application={data} />
      </div>
    </div>
  );
}
