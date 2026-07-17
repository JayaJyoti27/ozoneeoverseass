import { CheckCircle2, Circle } from "lucide-react";

import { Card } from "@/components/ui/card";

const steps = ["scheduled", "checked_in", "under_review", "fit", "completed"];

export default function MedicalTimeline() {
  const current = 2;

  return (
    <Card className="rounded-2xl p-6">
      <h2 className="mb-6 text-xl font-semibold">Medical Progress</h2>

      <div className="space-y-5">
        {steps.map((step, index) => {
          const done = index <= current;

          return (
            <div key={step} className="flex gap-3">
              {done ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5" />
              )}

              <span className="capitalize">{step.replaceAll("_", " ")}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
