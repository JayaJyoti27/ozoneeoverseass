import { useEffect, useState } from "react";
import { HeartPulse, Loader2, CheckCircle2, RotateCcw, XCircle } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  getMedicals,
  markMedicalFit,
  markMedicalRetest,
  markMedicalUnfit,
} from "@/lib/recruitment/api";

interface Props {
  applicationId: string;
}

export default function MedicalCard({ applicationId }: Props) {
  const [loading, setLoading] = useState(true);
  const [medicals, setMedicals] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, [applicationId]);

  async function load() {
    setLoading(true);

    try {
      const data = await getMedicals(applicationId);

      setMedicals(data.medicals ?? []);
    } finally {
      setLoading(false);
    }
  }

  async function fit(id: string) {
    await markMedicalFit(id);
    load();
  }

  async function unfit(id: string) {
    const remarks = prompt("Reason") ?? "";

    await markMedicalUnfit(id, remarks);

    load();
  }

  async function retest(id: string) {
    const remarks = prompt("Retest remarks") ?? "";

    await markMedicalRetest(id, remarks);

    load();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical</CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="animate-spin" />
          </div>
        ) : medicals.length === 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">No medical scheduled.</p>

            <Button>Schedule Medical</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {medicals.map((medical) => (
              <div key={medical.id} className="rounded-lg border p-4">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <HeartPulse className="h-4 w-4" />

                      <span className="font-medium">{medical.hospital_name ?? "Medical"}</span>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {medical.exam_date ? new Date(medical.exam_date).toLocaleDateString() : "-"}
                    </p>
                  </div>

                  <Badge>{medical.status}</Badge>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => fit(medical.id)}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Fit
                  </Button>

                  <Button size="sm" variant="secondary" onClick={() => retest(medical.id)}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Retest
                  </Button>

                  <Button size="sm" variant="destructive" onClick={() => unfit(medical.id)}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Unfit
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
