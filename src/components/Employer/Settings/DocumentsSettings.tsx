import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DocumentsSettings() {
  const documents = [
    {
      id: 1,
      name: "Business Registration Certificate",
      status: "Verified",
      uploaded: "15 Jul 2026",
    },
    {
      id: 2,
      name: "Trade License",
      status: "Pending",
      uploaded: "18 Jul 2026",
    },
    {
      id: 3,
      name: "Company PAN",
      status: "Verified",
      uploaded: "20 Jul 2026",
    },
    {
      id: 4,
      name: "Tax Certificate",
      status: "Missing",
      uploaded: "-",
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
            <div>
              <h3 className="font-medium">{document.name}</h3>

              <p className="text-sm text-muted-foreground">Uploaded: {document.uploaded}</p>
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
                View
              </Button>

              <Button size="sm">Upload</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
