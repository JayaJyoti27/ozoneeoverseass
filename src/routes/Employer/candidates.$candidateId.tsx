import { createFileRoute } from "@tanstack/react-router";

import { CandidateHeader } from "@/components/Employer/Candidate/Details/CandidateHeader";
import { CandidateProfileCard } from "@/components/Employer/Candidate/Details/CandidateProfileCard";
import { CandidateDocumentsCard } from "@/components/Employer/Candidate/Details/CandidateDocumentsCard";
import { InterviewCard } from "@/components/Employer/Candidate/InterviewCard";

export const Route = createFileRoute("/Employer/candidates/$candidateId")({
  component: CandidateDetailsPage,
});

function CandidateDetailsPage() {
  return (
    <div className="space-y-6">
      <CandidateHeader />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <CandidateProfileCard />
          <CandidateDocumentsCard />
        </div>

        <InterviewCard />
      </div>
    </div>
  );
}
