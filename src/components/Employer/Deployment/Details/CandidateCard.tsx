import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { deployment } from "./mock";

export function CandidateCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Information</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-6">
        <Info label="Candidate" value={deployment.candidate} />

        <Info label="Position" value={deployment.position} />

        <Info label="Destination" value={deployment.country} />

        <Info label="Employer" value={deployment.employer} />
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
