import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

import { candidate } from "./mock";

export function CandidateProfileCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Profile</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-6">
        <Info label="Position" value={candidate.position} />
        <Info label="Nationality" value={candidate.nationality} />
        <Info label="Age" value={String(candidate.age)} />
        <Info label="Experience" value={candidate.experience} />
        <Info label="Education" value={candidate.education} />
        <Info label="Passport" value={candidate.passport} />
      </CardContent>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="font-semibold">{value}</p>
    </div>
  );
}
