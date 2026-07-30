import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useDocuments } from "@/lib/candidate/hooks";

import DocumentStats from "@/components/Candidate/documents/DocumentStats";
import DocumentsFilters from "@/components/Candidate/documents/DocumentsFilters";
import DocumentsGrid from "@/components/Candidate/documents/DocumentsGrid";
import RequiredDocuments from "@/components/Candidate/documents/RequiredDocuments";

import { DOCUMENT_CATALOG } from "@/components/Candidate/documents/documentCatalog";

export const Route = createFileRoute("/Candidates/documents")({
  component: CandidateDocumentsPage,
});

function CandidateDocumentsPage() {
  const { data, isLoading } = useDocuments();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const stats = useMemo(() => {
    const docs = data ?? [];
    const uploadedTypes = new Set(docs.map((d) => d.document_type));
    const requiredTypes = DOCUMENT_CATALOG.filter((d) => d.required).map((d) => d.type);
    const missingRequired = requiredTypes.filter((t) => !uploadedTypes.has(t));

    return {
      total: docs.length,
      verified: docs.filter((d) => d.status === "approved").length,
      pending: docs.filter((d) => d.status === "pending" || d.status === "under_review").length,
      required: missingRequired.length,
    };
  }, [data]);

  const filtered = useMemo(() => {
    return (data ?? []).filter((doc) => {
      const matchesType = typeFilter === "all" || doc.document_type === typeFilter;
      const matchesSearch = doc.file_name.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [data, search, typeFilter]);

  return (
    <div className="space-y-6">
      <DocumentStats stats={stats} loading={isLoading} />

      <DocumentsFilters
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
      />

      <RequiredDocuments documents={data ?? []} />

      <DocumentsGrid documents={filtered} isLoading={isLoading} />
    </div>
  );
}
