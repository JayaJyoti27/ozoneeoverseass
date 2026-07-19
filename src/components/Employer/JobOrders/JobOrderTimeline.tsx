import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stages = [
  "Requirement Submitted",
  "Admin Review",
  "Legalization",
  "Recruitment",
  "Interview",
  "Selected",
  "Deployment",
];

export function JobOrderTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruitment Progress</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between">
          {stages.map((stage, index) => (
            <div key={stage} className="flex flex-1 flex-col items-center">
              <div className={`h-5 w-5 rounded-full ${index <= 3 ? "bg-green-600" : "bg-muted"}`} />

              <p className="mt-3 text-center text-xs">{stage}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
