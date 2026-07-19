import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { deployment } from "./mock";

export function VisaCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visa Status</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Current Status</p>

          <p className="font-medium">{deployment.visaStatus}</p>
        </div>

        <Badge>Approved</Badge>
      </CardContent>
    </Card>
  );
}
