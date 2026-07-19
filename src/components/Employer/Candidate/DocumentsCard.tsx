import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

export function DocumentsCard() {
  const documents = [
    {
      id: 1,
      name: "Business Registration Certificate",
      uploadedOn: "15 Jul 2026",
      status: "Verified",
    },
    {
      id: 2,
      name: "Trade License",
      uploadedOn: "18 Jul 2026",
      status: "Verified",
    },
    {
      id: 3,
      name: "Tax Registration",
      uploadedOn: "22 Jul 2026",
      status: "Pending",
    },
    {
      id: 4,
      name: "Insurance Certificate",
      uploadedOn: "-",
      status: "Missing",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Documents</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {documents.map((document) => (
          <div
            key={document.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />

              <div>
                <h3 className="font-medium">{document.name}</h3>

                <p className="text-sm text-muted-foreground">Uploaded: {document.uploadedOn}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant={
                  document.status === "Verified"
                    ? "default"
                    : document.status === "Pending"
                      ? "secondary"
                      : "destructive"
                }
              >
                {document.status}
              </Badge>

              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
