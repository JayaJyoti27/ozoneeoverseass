import { BadgeCheck, CalendarDays, CreditCard, FileText, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Link } from "@tanstack/react-router";
import { useVisas } from "@/lib/candidate/hooks";

function getVariant(status: string) {
  switch (status.toLowerCase()) {
    case "approved":
    case "issued":
      return "default";

    case "rejected":
      return "destructive";

    case "under_review":
    case "submitted":
      return "secondary";

    default:
      return "outline";
  }
}

function getIcon(status: string) {
  switch (status.toLowerCase()) {
    case "approved":
    case "issued":
      return <BadgeCheck className="h-5 w-5 text-green-600" />;

    case "rejected":
      return <XCircle className="h-5 w-5 text-red-600" />;

    default:
      return <CreditCard className="h-5 w-5 text-primary" />;
  }
}

export default function VisaCard() {
  const { data, isLoading, isError } = useVisas();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Visa</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="h-40 animate-pulse rounded-xl bg-muted" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Visa</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-destructive">Unable to load visa.</p>
        </CardContent>
      </Card>
    );
  }

  const visa = data?.[0];

  if (!visa) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Visa</CardTitle>
        </CardHeader>

        <CardContent className="py-12 text-center">
          <CreditCard className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

          <h3 className="font-semibold">Visa Not Started</h3>

          <p className="mt-2 text-sm text-muted-foreground">Visa information will appear here.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Visa</CardTitle>

        <Badge variant={getVariant(visa.status)}>{visa.status.replaceAll("_", " ")}</Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          {getIcon(visa.status)}

          <span className="font-medium">{visa.status.replaceAll("_", " ")}</span>
        </div>

        {visa.visa_number && (
          <div className="flex items-center gap-3">
            <CreditCard className="h-4 w-4 text-primary" />

            <span>{visa.visa_number}</span>
          </div>
        )}

        {visa.expiry_date && (
          <div className="flex items-center gap-3">
            <CalendarDays className="h-4 w-4 text-primary" />

            <span>{new Date(visa.expiry_date).toLocaleDateString()}</span>
          </div>
        )}

        <Button asChild className="w-full">
          <Link to="/Candidates/visa">View Visa</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
