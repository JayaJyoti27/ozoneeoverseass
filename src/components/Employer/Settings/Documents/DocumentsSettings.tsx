import { UploadDocumentDialog } from "./UploadDocumentDialog";
import { DocumentsTable } from "./DocumentsTable";

export function DocumentsSettings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <UploadDocumentDialog />
      </div>

      <DocumentsTable />
    </div>
  );
}
