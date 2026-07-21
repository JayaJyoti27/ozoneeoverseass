import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock } from "lucide-react";

export function TimelineCard({ timeline }: { timeline: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployment Timeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {timeline.map((item, index) => {
          const completed = !!item.created_at;
          return (
            <div key={item.id} className="relative flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${completed ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"}`}
                >
                  {completed ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                </div>
                {index !== timeline.length - 1 && <div className="mt-2 h-10 w-px bg-border" />}
              </div>
              <div className="pb-6">
                <p className="font-medium">{item.action}</p>
                <p className="text-sm text-muted-foreground">{item.created_at ?? "Pending"}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
