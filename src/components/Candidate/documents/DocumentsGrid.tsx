import { useDocuments } from "@/lib/candidate/hooks";

import DocumentCard from "./DocumentCard";

export default function DocumentsGrid() {
  const { data, isLoading } = useDocuments();

  if (isLoading) {
    return <div>Loading documents...</div>;
  }

  if (!data?.length) {
    return <div className="rounded-xl border p-10 text-center">No documents uploaded.</div>;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {data.map((doc) => (
        <DocumentCard key={doc.id} document={doc} />
      ))}
    </div>
  );
}
