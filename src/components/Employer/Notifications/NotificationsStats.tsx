import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { title: "Unread", value: 6 },
  { title: "High Priority", value: 3 },
  { title: "Today", value: 8 },
  { title: "This Week", value: 24 },
];

export function NotificationsStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">{stat.title}</p>

            <h2 className="mt-2 text-3xl font-bold">{stat.value}</h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
