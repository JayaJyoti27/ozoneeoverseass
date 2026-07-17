import { PlaneTakeoff, PlaneLanding, Plane, CalendarDays, Ticket } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Link } from "@tanstack/react-router";

import { useDeployments } from "@/lib/candidate/hooks";

function getVariant(status: string) {
  switch (status.toLowerCase()) {
    case "deployed":
    case "arrived":
      return "default";

    case "travel_confirmed":
    case "ticket_booked":
      return "secondary";

    case "cancelled":
      return "destructive";

    default:
      return "outline";
  }
}

export default function DeploymentCard() {
  const { data, isLoading, isError } = useDeployments();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Deployment</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="h-44 animate-pulse rounded-xl bg-muted" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Deployment</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-destructive">Unable to load deployment.</p>
        </CardContent>
      </Card>
    );
  }

  const deployment = data?.[0];

  if (!deployment) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Deployment</CardTitle>
        </CardHeader>

        <CardContent className="py-12 text-center">
          <Plane className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

          <h3 className="font-semibold">No Deployment Yet</h3>

          <p className="mt-2 text-sm text-muted-foreground">Flight information will appear here.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Deployment</CardTitle>

        <Badge variant={getVariant(deployment.status)}>
          {deployment.status.replaceAll("_", " ")}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {deployment.airline_name && (
          <div className="flex items-center gap-3">
            <Plane className="h-4 w-4 text-primary" />

            <span>{deployment.airline_name}</span>
          </div>
        )}

        {deployment.flight_number && (
          <div className="flex items-center gap-3">
            <Ticket className="h-4 w-4 text-primary" />

            <span>Flight {deployment.flight_number}</span>
          </div>
        )}

        {deployment.departure_time && (
          <div className="flex items-center gap-3">
            <PlaneTakeoff className="h-4 w-4 text-primary" />

            <span>{new Date(deployment.departure_time).toLocaleString()}</span>
          </div>
        )}

        {deployment.arrival_time && (
          <div className="flex items-center gap-3">
            <PlaneLanding className="h-4 w-4 text-primary" />

            <span>{new Date(deployment.arrival_time).toLocaleString()}</span>
          </div>
        )}

        <Button asChild className="w-full">
          <Link to="/Candidates/deployment">View Deployment</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
