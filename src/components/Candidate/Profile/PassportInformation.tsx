import { useState } from "react";
import { Calendar, Download, Eye, FileText, Pencil, Save, Upload, X } from "lucide-react";

import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";

import { useDocuments, useUploadDocument } from "@/lib/candidate/hooks";
import type { Candidate } from "@/lib/candidate/types";

interface Props {
  candidate: Candidate;
}
export default function PassportInformation({ candidate }: Props) {
  const { data: documents } = useDocuments();

  const upload = useUploadDocument();

  const [editing, setEditing] = useState(false);

  const passport = documents?.find((d) => d.document_type === "passport");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;

    const form = new FormData();

    form.append("file", e.target.files[0]);

    form.append("document_type", "passport");

    await upload.mutateAsync(form);
  }

  return (
    <Card className="rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Passport</h2>

          <p className="text-muted-foreground">Passport details and uploaded copy.</p>
        </div>

        {!editing ? (
          <Button onClick={() => setEditing(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setEditing(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>

            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <Label>Passport Number</Label>

          <Input
            disabled={!editing}
            defaultValue={candidate.passport_number ?? ""}
            placeholder="Passport Number"
          />
        </div>

        <div>
          <Label>Country</Label>

          <Input disabled={!editing} defaultValue={candidate.nationality ?? ""} />
        </div>

        <div>
          <Label>Issue Date</Label>

          <Input type="date" disabled={!editing} />
        </div>

        <div>
          <Label>Expiry Date</Label>

          <Input type="date" disabled={!editing} />
        </div>
      </div>

      <div className="mt-8 rounded-xl border p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />

            <div>
              <h3 className="font-medium">Passport Copy</h3>

              <p className="text-sm text-muted-foreground">Upload PDF / JPG / PNG</p>
            </div>
          </div>

          {passport && <Badge>Uploaded</Badge>}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild>
            <label>
              <Upload className="mr-2 h-4 w-4" />
              Upload
              <input hidden type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleUpload} />
            </label>
          </Button>

          {passport?.public_url && (
            <>
              <Button variant="outline" asChild>
                <a href={passport.public_url} target="_blank">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </a>
              </Button>

              <Button variant="outline" asChild>
                <a href={passport.public_url} download>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </a>
              </Button>
            </>
          )}
        </div>
      </div>

      {passport?.expires_at && (
        <div className="mt-6 flex items-center gap-3 rounded-xl bg-muted p-4">
          <Calendar className="h-5 w-5 text-primary" />

          <span>
            Passport expires on{" "}
            <strong>{new Date(passport.expires_at).toLocaleDateString()}</strong>
          </span>
        </div>
      )}
    </Card>
  );
}
