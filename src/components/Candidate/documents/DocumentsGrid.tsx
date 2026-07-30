import DocumentCard from "./DocumentCard";
import type { CandidateDocument } from "@/lib/candidate/types";

interface Props {
  documents: CandidateDocument[];
  isLoading?: boolean;
}

export default function DocumentsGrid({ documents, isLoading }: Props) {
  if (isLoading) {
    return <div>Loading documents...</div>;
  }

  if (!documents.length) {
    return <div className="rounded-xl border p-10 text-center">No documents uploaded.</div>;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} />
      ))}
    </div>
  );
}
