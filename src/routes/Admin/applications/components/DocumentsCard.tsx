import { useEffect, useState } from "react";
import { FileText, CheckCircle2, XCircle, Loader2 } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { getDocuments, verifyDocument, rejectDocument } from "@/lib/recruitment/api";

interface Props {
  applicationId: string;
}

export default function DocumentsCard({ applicationId }: Props) {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, [applicationId]);

  async function load() {
    setLoading(true);

    try {
      const data = await getDocuments(applicationId);
      setDocuments(data.documents ?? []);
    } finally {
      setLoading(false);
    }
  }

  async function verify(id: string) {
    await verifyDocument(id);
    load();
  }

  async function reject(id: string) {
    const reason = prompt("Reason for rejection");

    if (!reason) return;

    await rejectDocument(id, reason);

    load();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="animate-spin" />
          </div>
        ) : documents.length === 0 ? (
          <p className="text-muted-foreground">No uploaded documents.</p>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="rounded-lg border p-4">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />

                      <span className="font-medium">{doc.document_type}</span>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">{doc.file_name}</p>
                  </div>

                  <Badge>{doc.status}</Badge>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button size="sm" onClick={() => verify(doc.id)}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Verify
                  </Button>

                  <Button size="sm" variant="destructive" onClick={() => reject(doc.id)}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
