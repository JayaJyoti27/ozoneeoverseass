import { useEffect, useState } from "react";
import { Calendar, Download, Eye, FileText, Pencil, Save, Upload, X } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import { useDocuments, useUploadDocument, useUpdateProfile } from "@/lib/candidate/hooks";
import type { Candidate } from "@/lib/candidate/types";

interface Props {
  candidate: Candidate;
}

interface FormState {
  passport_number: string;
  nationality: string;
  passport_issue_date: string;
  passport_expiry_date: string;
}

function toFormState(candidate: Candidate): FormState {
  return {
    passport_number: candidate.passport_number ?? "",
    nationality: candidate.nationality ?? "",
    passport_issue_date: candidate.passport_issue_date ?? "",
    passport_expiry_date: candidate.passport_expiry_date ?? "",
  };
}

export default function PassportInformation({ candidate }: Props) {
  const { data: documents } = useDocuments();
  const upload = useUploadDocument();
  const updateProfile = useUpdateProfile();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<FormState>(toFormState(candidate));

  useEffect(() => {
    setForm(toFormState(candidate));
  }, [candidate]);

  const passport = documents?.find((d) => d.document_type === "passport");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;

    const uploadForm = new FormData();
    uploadForm.append("file", e.target.files[0]);
    uploadForm.append("document_type", "passport");

    await upload.mutateAsync(uploadForm);
  }

  function update(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    await updateProfile.mutateAsync({
      ...form,
      passport_issue_date: form.passport_issue_date || null,
      passport_expiry_date: form.passport_expiry_date || null,
    });
    setEditing(false);
  }

  function handleCancel() {
    setForm(toFormState(candidate));
    setEditing(false);
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
            <Button variant="outline" onClick={handleCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>

            <Button onClick={handleSave} disabled={updateProfile.isPending}>
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
            value={form.passport_number}
            onChange={(e) => update("passport_number", e.target.value)}
            placeholder="Passport Number"
          />
        </div>

        <div>
          <Label>Country</Label>
          <Input
            disabled={!editing}
            value={form.nationality}
            onChange={(e) => update("nationality", e.target.value)}
          />
        </div>

        <div>
          <Label>Issue Date</Label>
          <Input
            type="date"
            disabled={!editing}
            value={form.passport_issue_date}
            onChange={(e) => update("passport_issue_date", e.target.value)}
          />
        </div>

        <div>
          <Label>Expiry Date</Label>
          <Input
            type="date"
            disabled={!editing}
            value={form.passport_expiry_date}
            onChange={(e) => update("passport_expiry_date", e.target.value)}
          />
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

      {form.passport_expiry_date && (
        <div className="mt-6 flex items-center gap-3 rounded-xl bg-muted p-4">
          <Calendar className="h-5 w-5 text-primary" />
          <span>
            Passport expires on{" "}
            <strong>{new Date(form.passport_expiry_date).toLocaleDateString()}</strong>
          </span>
        </div>
      )}
    </Card>
  );
}
