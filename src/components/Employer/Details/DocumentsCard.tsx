import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { FileText, Download, Upload } from "lucide-react";

const documents = [
  {
    id: 1,
    name: "Demand Letter.pdf",
    uploadedBy: "Employer",
    uploadedOn: "15 Jul 2026",
    status: "Verified",
  },
  {
    id: 2,
    name: "Power of Attorney.pdf",
    uploadedBy: "Employer",
    uploadedOn: "15 Jul 2026",
    status: "Pending",
  },
  {
    id: 3,
    name: "Commercial Registration.pdf",
    uploadedBy: "Employer",
    uploadedOn: "16 Jul 2026",
    status: "Verified",
  },
];

export function DocumentsCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Supporting Documents</CardTitle>

        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between rounded-xl border p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <FileText className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h3 className="font-medium">{doc.name}</h3>

                <p className="text-sm text-muted-foreground">Uploaded by {doc.uploadedBy}</p>

                <p className="text-xs text-muted-foreground">{doc.uploadedOn}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  doc.status === "Verified"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {doc.status}
              </span>

              <Button size="icon" variant="outline">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
