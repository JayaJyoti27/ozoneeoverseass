import { Card } from "@/components/ui/card";

import { Plane, MapPin, Clock3, Building2 } from "lucide-react";

import { useDeployments } from "@/lib/candidate/hooks";
export default function TravelDetails() {
  const { data } = useDeployments();

  const deployment = data?.[0];

  if (!deployment) return null;

  return (
    <Card className="rounded-2xl p-6">
      <h2 className="mb-6 text-xl font-semibold">Travel Details</h2>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Plane className="h-5 w-5" />
          Flight: {deployment.flight_number}
        </div>

        <div className="flex items-center gap-3">
          <Clock3 className="h-5 w-5" />
          Departure: {deployment.departure_time}
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5" />
          Destination: {deployment.destination_country}
        </div>

        <div className="flex items-center gap-3">
          <Building2 className="h-5 w-5" />
          Employer: {deployment.company_name}
        </div>
      </div>
    </Card>
  );
}
