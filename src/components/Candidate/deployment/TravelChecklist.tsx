import { CheckCircle2, Circle } from "lucide-react";

import { Card } from "@/components/ui/card";

const checklist = [
  "Passport",
  "Visa",
  "Medical Clearance",
  "Employment Contract",
  "Flight Ticket",
  "Travel Insurance",
  "Emergency Contact",
];

export default function TravelChecklist() {
  return (
    <Card className="rounded-2xl p-6">
      <h2 className="mb-6 text-xl font-semibold">Travel Checklist</h2>

      <div className="space-y-4">
        {checklist.map((item) => (
          <div key={item} className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600" />

            <span>{item}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
