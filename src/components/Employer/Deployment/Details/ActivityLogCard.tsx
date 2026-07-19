import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { activityLog } from "./mock";

export function ActivityLogCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {activityLog.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />

            <div className="flex-1">
              <p className="font-medium">{item.action}</p>

              <p className="text-sm text-muted-foreground">{item.user}</p>

              <p className="text-xs text-muted-foreground">{item.date}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
