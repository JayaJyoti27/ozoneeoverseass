import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { timeline } from "./Details/mock";
const events = ["Interview Scheduled", "Reminder Sent", "Awaiting Interview"];

export function TimelineCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {timeline.map((item) => (
          <div key={item.title} className="rounded-lg border p-4">
            <p className="font-medium">{item.title}</p>

            <p className="text-sm text-muted-foreground">{item.date}</p>

            <p className="text-xs text-muted-foreground mt-1">{item.user}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
