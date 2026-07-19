import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CheckCircle2, Clock } from "lucide-react";

import { deploymentTimeline } from "./mock";

export function TimelineCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployment Timeline</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {deploymentTimeline.map((item, index) => {
          const completed = item.date !== "-";

          return (
            <div key={item.title} className="relative flex gap-4">
              {/* Timeline Icon */}

              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    completed ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {completed ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                </div>

                {index !== deploymentTimeline.length - 1 && (
                  <div className="mt-2 h-10 w-px bg-border" />
                )}
              </div>

              {/* Timeline Content */}

              <div className="pb-6">
                <p className="font-medium">{item.title}</p>

                <p className="text-sm text-muted-foreground">{completed ? item.date : "Pending"}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
