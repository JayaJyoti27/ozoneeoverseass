import { useRef, useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useUploadDocument } from "@/lib/candidate/hooks";
import type { CandidateDocument } from "@/lib/candidate/types";

import { DOCUMENT_CATALOG } from "./documentCatalog";

interface Props {
  documents: CandidateDocument[];
}

export default function RequiredDocuments({ documents }: Props) {
  const upload = useUploadDocument();
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [activeType, setActiveType] = useState<string | null>(null);

  const uploadedTypes = new Set(documents.map((d) => d.document_type));

  async function handleFile(type: string, file: File) {
    const form = new FormData();
    form.append("file", file);
    form.append("document_type", type);

    setActiveType(type);
    try {
      await upload.mutateAsync(form);
    } finally {
      setActiveType(null);
    }
  }

  return (
    <Card className="rounded-2xl p-6">
      <h2 className="mb-4 font-semibold">Document Checklist</h2>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {DOCUMENT_CATALOG.map((item) => {
          const done = uploadedTypes.has(item.type);
          const isUploading = upload.isPending && activeType === item.type;

          return (
            <div
              key={item.type}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <p className="font-medium">
                  {item.label}
                  {item.required && <span className="ml-1 text-xs text-destructive">*</span>}
                </p>
                <p className="text-xs text-muted-foreground">
                  {done ? "Uploaded" : item.required ? "Required" : "Optional"}
                </p>
              </div>

              <input
                hidden
                type="file"
                accept={item.accept}
                ref={(el) => {
                  inputRefs.current[item.type] = el;
                }}
                onChange={(e) => {
                  if (!e.target.files?.length) return;
                  handleFile(item.type, e.target.files[0]);
                }}
              />

              {done ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isUploading}
                  onClick={() => inputRefs.current[item.type]?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
