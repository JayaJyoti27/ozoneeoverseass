import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getEmployer, approveEmployer, suspendEmployer, activateEmployer } from "@/lib/admin/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/Admin/employers/$id")({
  component: EmployerDetails,
});

function EmployerDetails() {
  const { id } = Route.useParams();

  const [loading, setLoading] = useState(true);
  const [employer, setEmployer] = useState<any>(null);

  useEffect(() => {
    loadEmployer();
  }, [id]);

  async function loadEmployer() {
    setLoading(true);

    try {
      const data = await getEmployer(id);
      setEmployer(data.data ?? data);
    } finally {
      setLoading(false);
    }
  }

  async function approve() {
    await approveEmployer(id);
    loadEmployer();
  }

  async function suspend() {
    await suspendEmployer(id);
    loadEmployer();
  }

  async function activate() {
    await activateEmployer(id);
    loadEmployer();
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!employer) {
    return <p>Employer not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{employer.company_name}</h1>

          <p className="text-muted-foreground">Employer Details</p>
        </div>

        <Badge>{employer.status}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <Info label="Company" value={employer.company_name} />

            <Info label="Email" value={employer.email} />

            <Info label="Country" value={employer.country} />

            <Info label="Phone" value={employer.phone} />

            <Info label="Website" value={employer.website} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button className="w-full" onClick={approve}>
              Approve Employer
            </Button>

            <Button variant="secondary" className="w-full" onClick={activate}>
              Activate Employer
            </Button>

            <Button variant="destructive" className="w-full" onClick={suspend}>
              Suspend Employer
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submitted Requirements</CardTitle>
        </CardHeader>

        <CardContent>
          {employer.requirements?.length ? (
            <div className="space-y-3">
              {employer.requirements.map((req: any) => (
                <div key={req.id} className="rounded-lg border p-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-semibold">{req.role}</h4>

                      <p className="text-sm text-muted-foreground">{req.country}</p>
                    </div>

                    <Badge>{req.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No requirements submitted.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">{label}</span>

      <span className="text-muted-foreground">{value || "-"}</span>
    </div>
  );
}
