import { useRef } from "react";

import { Download, Eye, FileText, RefreshCw, Upload } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { useDocuments, useUploadDocument } from "@/lib/candidate/hooks";

export default function ResumeSection() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: documents, isLoading } = useDocuments();

  const upload = useUploadDocument();

  const resume = documents?.find((d) => d.document_type === "resume");

  async function uploadResume(file: File) {
    const form = new FormData();

    form.append("file", file);

    form.append("document_type", "resume");

    await upload.mutateAsync(form);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;

    uploadResume(e.target.files[0]);
  }

  return (
    <Card className="rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <FileText className="h-5 w-5" />
            Resume
          </h2>

          <p className="text-muted-foreground">Upload your latest CV.</p>
        </div>

        {resume ? <Badge>Uploaded</Badge> : <Badge variant="outline">Not Uploaded</Badge>}
      </div>

      <input hidden ref={inputRef} type="file" accept=".pdf,.doc,.docx" onChange={onChange} />

      {upload.isPending && (
        <div className="mt-6">
          <Progress value={70} />

          <p className="mt-2 text-sm text-muted-foreground">Uploading Resume...</p>
        </div>
      )}

      {!resume && !isLoading && (
        <div className="mt-8 rounded-xl border border-dashed p-10 text-center">
          <Upload className="mx-auto mb-4 h-10 w-10 text-primary" />

          <h3 className="font-semibold">Upload Resume</h3>

          <p className="mt-2 text-sm text-muted-foreground">PDF, DOC or DOCX</p>

          <Button className="mt-6" onClick={() => inputRef.current?.click()}>
            Choose File
          </Button>
        </div>
      )}

      {resume && (
        <div className="mt-8 rounded-xl border p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-primary/10 p-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">{resume.file_name}</h3>

              <p className="text-sm text-muted-foreground">{resume.document_type}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <a href={resume.public_url} target="_blank">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </a>
            </Button>

            <Button variant="outline" asChild>
              <a href={resume.public_url} download>
                <Download className="mr-2 h-4 w-4" />
                Download
              </a>
            </Button>

            <Button onClick={() => inputRef.current?.click()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Replace Resume
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
