import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    title: "Visa Processing",
    value: "12",
  },
  {
    title: "Medical Pending",
    value: "6",
  },
  {
    title: "Flights Booked",
    value: "18",
  },
  {
    title: "Successfully Deployed",
    value: "94",
  },
];

export function DeploymentStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((item) => (
        <Card key={item.title}>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">{item.title}</p>

            <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
