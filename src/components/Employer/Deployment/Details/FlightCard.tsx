import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { deployment } from "./mock";

export function FlightCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Flight Information</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4">
        <Info label="Flight" value={deployment.flightNo} />

        <Info label="Departure" value={deployment.departure} />

        <Info label="Destination" value={deployment.destination} />

        <Info label="Departure Date" value={deployment.departureDate} />
      </CardContent>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="font-medium">{value}</p>
    </div>
  );
}
