import { CheckCircle2, Circle } from "lucide-react";

import { Card } from "@/components/ui/card";

import type { CandidateApplication } from "@/lib/candidate/types";

const steps = [
  "applied",
  "under_review",
  "shortlisted",
  "interview_scheduled",
  "selected",
  "offer_sent",
  "medical",
  "visa",
  "deployment",
];

interface Props {
  application: CandidateApplication;
}

export default function ApplicationTimeline({ application }: Props) {
  const current = steps.indexOf(application.status);

  return (
    <Card className="rounded-2xl p-6">
      <h2 className="mb-6 text-xl font-semibold">Recruitment Timeline</h2>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const done = index <= current;

          return (
            <div key={step} className="flex gap-4">
              {done ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}

              <span className="capitalize">{step.replaceAll("_", " ")}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
