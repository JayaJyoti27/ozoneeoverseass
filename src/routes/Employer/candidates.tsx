import { createFileRoute } from "@tanstack/react-router";

import { CandidatesTable } from "@/components/Employer/Candidate/CandidatesTable";

export const Route = createFileRoute("/Employer/candidates")({
  component: CandidatesPage,
});

function CandidatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Candidates</h1>
        <p className="text-muted-foreground">Everyone who has applied to your job orders.</p>
      </div>

      <CandidatesTable />
    </div>
  );
}
