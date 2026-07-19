import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CancelInterviewDialog } from "./CancelInterviewDialog";
import { interview } from "./Details/mock";
import { RescheduleInterviewDialog } from "./RescheduleInterviewDialog";
import { Button } from "@/components/ui/button";
export function InterviewInformationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Info label="Date" value={interview.date} />

        <Info label="Time" value={interview.time} />

        <Info label="Mode" value={interview.mode} />

        <Info label="Interviewer" value={interview.interviewer} />

        <div className="pt-4 flex gap-3">
          <RescheduleInterviewDialog />
          <CancelInterviewDialog />
        </div>
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
