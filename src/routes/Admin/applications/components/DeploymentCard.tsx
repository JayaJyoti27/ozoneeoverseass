import { useEffect, useState } from "react";
import { Plane, Loader2, CheckCircle2 } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  getDeployments,
  confirmTravel,
  markDeparted,
  markArrived,
  completeDeployment,
} from "@/lib/recruitment/api";

interface Props {
  applicationId: string;
}

export default function DeploymentCard({ applicationId }: Props) {
  const [loading, setLoading] = useState(true);
  const [deployments, setDeployments] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, [applicationId]);

  async function load() {
    setLoading(true);

    try {
      const data = await getDeployments(applicationId);

      setDeployments(data.deployments ?? []);
    } finally {
      setLoading(false);
    }
  }

  async function travel(id: string) {
    await confirmTravel(id);
    load();
  }

  async function departed(id: string) {
    await markDeparted(id);
    load();
  }

  async function arrived(id: string) {
    await markArrived(id);
    load();
  }

  async function complete(id: string) {
    await completeDeployment(id, "Deployment completed");

    load();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployment</CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin" />
          </div>
        ) : deployments.length === 0 ? (
          <p className="text-muted-foreground">No deployment available.</p>
        ) : (
          <div className="space-y-4">
            {deployments.map((deployment) => (
              <div key={deployment.id} className="rounded-lg border p-4">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Plane className="h-4 w-4" />

                      <span className="font-medium">{deployment.destination ?? "Deployment"}</span>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {deployment.travel_date
                        ? new Date(deployment.travel_date).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>

                  <Badge>{deployment.status}</Badge>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => travel(deployment.id)}>
                    Confirm Travel
                  </Button>

                  <Button size="sm" variant="secondary" onClick={() => departed(deployment.id)}>
                    Departed
                  </Button>

                  <Button size="sm" onClick={() => arrived(deployment.id)}>
                    Arrived
                  </Button>

                  <Button size="sm" variant="default" onClick={() => complete(deployment.id)}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Complete
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
