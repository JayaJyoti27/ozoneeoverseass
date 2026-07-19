import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Props {
  next: () => void;
  back: () => void;
}

interface UploadDocument {
  id: number;
  title: string;
  required: boolean;
  uploaded: boolean;
  fileName?: string;
}

export function DocumentsStep({ next, back }: Props) {
  const [documents, setDocuments] = useState<UploadDocument[]>([
    {
      id: 1,
      title: "Business Registration Certificate",
      required: true,
      uploaded: false,
    },
    {
      id: 2,
      title: "Trade License",
      required: true,
      uploaded: false,
    },
    {
      id: 3,
      title: "Tax / VAT Certificate",
      required: false,
      uploaded: false,
    },
    {
      id: 4,
      title: "Authorized Signatory ID",
      required: true,
      uploaded: false,
    },
    {
      id: 5,
      title: "Company Profile",
      required: false,
      uploaded: false,
    },
  ]);

  const uploadedCount = documents.filter((d) => d.uploaded).length;

  const progress = (uploadedCount / documents.length) * 100;

  const upload = (id: number, file: File | null) => {
    if (!file) return;

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              uploaded: true,
              fileName: file.name,
            }
          : doc,
      ),
    );
  };

  const remove = (id: number) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              uploaded: false,
              fileName: "",
            }
          : doc,
      ),
    );
  };

  return (
    <div className="space-y-8">
      <CardHeader className="px-0">
        <CardTitle className="text-3xl">Company Documents</CardTitle>

        <CardDescription>Upload documents for company verification.</CardDescription>
      </CardHeader>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Upload Progress</span>

            <span className="text-sm text-muted-foreground">
              {uploadedCount}/{documents.length}
            </span>
          </div>

          <Progress value={progress} />
        </CardContent>
      </Card>

      <div className="space-y-5">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="flex items-center justify-between py-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>

                <div>
                  <h3 className="font-medium">
                    {doc.title}

                    {doc.required && <span className="ml-2 text-red-500">*</span>}
                  </h3>

                  {doc.uploaded ? (
                    <p className="mt-1 text-sm text-green-600">{doc.fileName}</p>
                  ) : (
                    <p className="mt-1 text-sm text-muted-foreground">PDF, PNG or JPG</p>
                  )}
                </div>
              </div>

              {doc.uploaded ? (
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-600" />

                  <Button size="icon" variant="ghost" onClick={() => remove(doc.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label>
                  <input
                    hidden
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => upload(doc.id, e.target.files?.[0] ?? null)}
                  />

                  <Button asChild variant="outline">
                    <span>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </span>
                  </Button>
                </label>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={back}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button onClick={next}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
