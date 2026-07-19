import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const summary = [
  {
    label: "Applications",
    value: 52,
  },
  {
    label: "Shortlisted",
    value: 21,
  },
  {
    label: "Interview Scheduled",
    value: 14,
  },
  {
    label: "Selected",
    value: 8,
  },
  {
    label: "Visa Processing",
    value: 6,
  },
  {
    label: "Deployed",
    value: 4,
  },
];

export function CandidateSummaryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {summary.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-muted-foreground">{item.label}</span>

            <span className="text-lg font-bold">{item.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
