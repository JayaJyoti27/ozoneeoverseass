import { BadgeCheck, CalendarDays, Globe } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useVisas } from "@/lib/candidate/hooks";

export default function VisaStatusCard() {
  const { data } = useVisas();

  const visa = data?.[0];

  if (!visa) {
    return <Card className="rounded-2xl p-10 text-center">Visa process has not started.</Card>;
  }

  return (
    <Card className="rounded-2xl p-6">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">Visa Processing</h2>

          <p className="text-muted-foreground">Current visa application status</p>
        </div>

        <Badge>{visa.status}</Badge>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5" />

          {visa.country}
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />

          {visa.expiry_date ? new Date(visa.expiry_date).toLocaleDateString() : "-"}
        </div>

        <div className="flex items-center gap-2">
          <BadgeCheck className="h-5 w-5" />

          {visa.visa_number}
        </div>
      </div>
    </Card>
  );
}
