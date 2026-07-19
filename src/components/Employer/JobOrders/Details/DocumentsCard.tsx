import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DocumentsCard() {
  const documents = [
    { id: 1, name: "Job Description.pdf", status: "Uploaded" },
    { id: 2, name: "Employment Contract.pdf", status: "Uploaded" },
    { id: 3, name: "Visa Requirements.pdf", status: "Pending" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between rounded-lg border p-3">
            <span>{doc.name}</span>

            <Badge>{doc.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
