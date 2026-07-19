import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CandidateSummaryCard() {
  const summary = {
    applied: 48,
    shortlisted: 21,
    interviewed: 14,
    selected: 8,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Summary</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4">
        <Stat label="Applied" value={summary.applied} />
        <Stat label="Shortlisted" value={summary.shortlisted} />
        <Stat label="Interviewed" value={summary.interviewed} />
        <Stat label="Selected" value={summary.selected} />
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border p-4 text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
