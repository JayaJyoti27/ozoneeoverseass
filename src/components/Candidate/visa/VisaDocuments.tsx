import { Download, Eye, FileText } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useDocuments } from "@/lib/candidate/hooks";

export default function VisaDocuments() {
  const { data } = useDocuments();

  const docs = data?.filter((d) => d.document_type === "visa") ?? [];

  return (
    <Card className="rounded-2xl p-6">
      <h2 className="mb-6 text-xl font-semibold">Visa Documents</h2>

      {!docs.length && (
        <div className="rounded-xl border p-10 text-center">No visa documents uploaded.</div>
      )}

      <div className="space-y-4">
        {docs.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />

              <div>
                <h3 className="font-semibold">{doc.file_name}</h3>

                <p className="text-sm text-muted-foreground">Visa Document</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="icon" variant="outline" asChild>
                <a href={doc.public_url} target="_blank">
                  <Eye className="h-4 w-4" />
                </a>
              </Button>

              <Button size="icon" variant="outline" asChild>
                <a href={doc.public_url} download>
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
