import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { interview } from "./Details/mock";

export function CandidateCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Info label="Name" value={interview.candidate} />

        <Info label="Nationality" value={interview.nationality} />

        <Info label="Applied Position" value={interview.position} />
      </CardContent>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="font-medium">{value}</p>
    </div>
  );
}
