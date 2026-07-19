import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function IntegrationsSettings() {
  const integrations = [
    {
      id: 1,
      name: "Google Workspace",
      description: "Email and calendar integration",
      status: "Connected",
    },
    {
      id: 2,
      name: "Slack",
      description: "Receive recruitment notifications",
      status: "Connected",
    },
    {
      id: 3,
      name: "Zoom",
      description: "Schedule candidate interviews",
      status: "Disconnected",
    },
    {
      id: 4,
      name: "Dropbox",
      description: "Store company documents",
      status: "Disconnected",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <h3 className="font-medium">{integration.name}</h3>

              <p className="text-sm text-muted-foreground">{integration.description}</p>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant={integration.status === "Connected" ? "default" : "secondary"}>
                {integration.status}
              </Badge>

              <Button variant={integration.status === "Connected" ? "destructive" : "default"}>
                {integration.status === "Connected" ? "Disconnect" : "Connect"}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
