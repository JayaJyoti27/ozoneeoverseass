import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FlightCard({ deployment }: { deployment: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Flight Information</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Info label="Flight" value={deployment.flight_number} />
        <Info label="Airline" value={deployment.airline_name} />
        <Info label="Departure" value={deployment.departure_time} />
        <Info label="Arrival" value={deployment.arrival_time} />
      </CardContent>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value ?? "-"}</p>
    </div>
  );
}
