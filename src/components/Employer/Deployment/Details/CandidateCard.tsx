import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CandidateCard({ deployment }: { deployment: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Information</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6">
        <Info label="Candidate" value={deployment.application?.candidate?.full_name} />
        <Info label="Position" value={deployment.job?.title} />
        <Info label="Destination" value={deployment.job?.country} />
        <Info label="Employer" value={deployment.employer_name ?? "-"} />
      </CardContent>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value ?? "-"}</p>
    </div>
  );
}
