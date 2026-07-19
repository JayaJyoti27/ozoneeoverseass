import { useEffect, useState } from "react";
import { BadgeCheck, Loader2, IdCard } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { getVisas, submitVisa, approveVisa, issueVisa, rejectVisa } from "@/lib/recruitment/api";

interface Props {
  applicationId: string;
}

export default function VisaCard({ applicationId }: Props) {
  const [loading, setLoading] = useState(true);
  const [visas, setVisas] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, [applicationId]);

  async function load() {
    setLoading(true);

    try {
      const data = await getVisas(applicationId);
      setVisas(data.visas ?? []);
    } finally {
      setLoading(false);
    }
  }

  async function submit(id: string) {
    await submitVisa(id);
    load();
  }

  async function approve(id: string) {
    await approveVisa(
      id,
      "TEMP-VISA",
      new Date().toISOString(),
      new Date(Date.now() + 31536000000).toISOString(),
    );

    load();
  }

  async function issue(id: string) {
    await issueVisa(id);
    load();
  }

  async function reject(id: string) {
    const remarks = prompt("Reason") ?? "";

    await rejectVisa(id, remarks);

    load();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visa</CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin" />
          </div>
        ) : visas.length === 0 ? (
          <p className="text-muted-foreground">No visa created.</p>
        ) : (
          <div className="space-y-4">
            {visas.map((visa) => (
              <div key={visa.id} className="rounded-lg border p-4">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <IdCard className="h-4 w-4" />

                      <span className="font-medium">{visa.visa_number ?? "Pending"}</span>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">{visa.country}</p>
                  </div>

                  <Badge>{visa.status}</Badge>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => submit(visa.id)}>
                    Submit
                  </Button>

                  <Button size="sm" variant="secondary" onClick={() => approve(visa.id)}>
                    <BadgeCheck className="mr-2 h-4 w-4" />
                    Approve
                  </Button>

                  <Button size="sm" onClick={() => issue(visa.id)}>
                    Issue
                  </Button>

                  <Button size="sm" variant="destructive" onClick={() => reject(visa.id)}>
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
