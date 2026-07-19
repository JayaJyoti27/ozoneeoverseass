import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { getCandidate, activateCandidate, suspendCandidate } from "@/lib/admin/api";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, Download } from "lucide-react";

export const Route = createFileRoute("/Admin/candidates/$id")({
  component: CandidateDetails,
});

function CandidateDetails() {
  const { id } = Route.useParams();

  const [candidate, setCandidate] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCandidate();
  }, [id]);

  async function loadCandidate() {
    setLoading(true);

    try {
      const data = await getCandidate(id);
      setCandidate(data.data ?? data);
    } finally {
      setLoading(false);
    }
  }

  async function activate() {
    await activateCandidate(id);
    loadCandidate();
  }

  async function suspend() {
    await suspendCandidate(id);
    loadCandidate();
  }

  if (loading)
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{candidate.name}</h1>

          <p className="text-muted-foreground">Candidate Profile</p>
        </div>

        <Badge>{candidate.status}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT */}

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4">
              <Info label="Name" value={candidate.name} />

              <Info label="Email" value={candidate.email} />

              <Info label="Phone" value={candidate.phone} />

              <Info label="Country" value={candidate.country} />

              <Info label="Passport" value={candidate.passport_number} />

              <Info label="Experience" value={candidate.experience} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.skills?.map((skill: string) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
            </CardHeader>

            <CardContent>
              {!candidate.applications?.length && (
                <p className="text-muted-foreground">No applications yet.</p>
              )}

              {candidate.applications?.map((app: any) => (
                <div key={app.id} className="border rounded-lg p-4 mb-3">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-semibold">{app.role}</h4>

                      <p className="text-sm text-muted-foreground">{app.company}</p>
                    </div>

                    <Badge>{app.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <DocumentButton title="Resume" />

              <DocumentButton title="Passport" />

              <DocumentButton title="Medical" />

              <DocumentButton title="Certificates" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <Button className="w-full" onClick={activate}>
                Activate Candidate
              </Button>

              <Button variant="destructive" className="w-full" onClick={suspend}>
                Suspend Candidate
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recruitment Status</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <Status title="Application" />

              <Separator />

              <Status title="Interview" />

              <Separator />

              <Status title="Medical" />

              <Separator />

              <Status title="Visa" />

              <Separator />

              <Status title="Deployment" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: any) {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-xs text-muted-foreground">{label}</p>

      <h4 className="mt-2 font-semibold">{value || "-"}</h4>
    </div>
  );
}

function Status({ title }: any) {
  return (
    <div className="flex justify-between">
      <span>{title}</span>
      <Badge variant="outline">Pending</Badge>
    </div>
  );
}

function DocumentButton({ title }: { title: string }) {
  return (
    <Button variant="outline" className="w-full justify-between">
      {title}

      <Download size={16} />
    </Button>
  );
}
