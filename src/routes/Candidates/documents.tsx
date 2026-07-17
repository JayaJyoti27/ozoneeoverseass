import { createFileRoute } from "@tanstack/react-router";

import DocumentStats from "@/components/Candidate/documents/DocumentStats";
import DocumentsFilters from "@/components/Candidate/documents/DocumentsFilters";
import DocumentsGrid from "@/components/Candidate/documents/DocumentsGrid";

export const Route = createFileRoute("/Candidates/documents")({
  component: CandidateDocumentsPage,
});

function CandidateDocumentsPage() {
  return (
    <div className="space-y-6">
      <DocumentStats />

      <DocumentsFilters />

      <DocumentsGrid />
    </div>
  );
}
