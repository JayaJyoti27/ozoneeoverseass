import { useRef } from "react";

import { Award, Download, Eye, Trash2, Upload } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useDocuments, useUploadDocument, useDeleteDocument } from "@/lib/candidate/hooks";

export default function CertificatesSection() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: documents } = useDocuments();

  const upload = useUploadDocument();

  const remove = useDeleteDocument();

  const certificates = documents?.filter((d) => d.document_type === "certificate") ?? [];

  async function uploadCertificate(file: File) {
    const form = new FormData();

    form.append("file", file);

    form.append("document_type", "certificate");

    await upload.mutateAsync(form);
  }

  return (
    <Card className="rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Award className="h-5 w-5" />
            Certificates
          </h2>

          <p className="text-muted-foreground">
            Upload your trade certificates, licenses and qualifications.
          </p>
        </div>

        <Button onClick={() => inputRef.current?.click()}>
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>

      <input
        hidden
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={(e) => {
          if (!e.target.files) return;

          [...e.target.files].forEach((file) => uploadCertificate(file));
        }}
      />

      {!certificates.length && (
        <div className="mt-10 rounded-xl border border-dashed p-10 text-center">
          <Award className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

          <h3 className="font-semibold">No Certificates Uploaded</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Upload certificates to strengthen your profile.
          </p>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {certificates.map((cert) => (
          <Card key={cert.id} className="border p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Award className="h-8 w-8 text-primary" />

                <div>
                  <h3 className="font-medium">{cert.file_name}</h3>

                  <Badge>Certificate</Badge>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="icon" variant="outline" asChild>
                  <a href={cert.public_url} target="_blank">
                    <Eye className="h-4 w-4" />
                  </a>
                </Button>

                <Button size="icon" variant="outline" asChild>
                  <a href={cert.public_url} download>
                    <Download className="h-4 w-4" />
                  </a>
                </Button>

                <Button size="icon" variant="destructive" onClick={() => remove.mutate(cert.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
