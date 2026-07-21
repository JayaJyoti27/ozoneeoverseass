import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function VisaCard({ deployment }: { deployment: any }) {
  const status = deployment.visa?.status ?? "Not started";
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visa Status</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Current Status</p>
          <p className="font-medium">{status}</p>
        </div>
        <Badge>{status}</Badge>
      </CardContent>
    </Card>
  );
}
