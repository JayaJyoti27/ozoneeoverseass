import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Interview {
  date: string; // e.g. "28 July 2026"
  time: string; // e.g. "03:00 PM (GST)"
  mode: string; // e.g. "Google Meet"
  meeting_link?: string | null;
}

export function InterviewCard({ interview }: { interview: Interview | null }) {
  if (!interview) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Interview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No interview scheduled yet.</p>
        </CardContent>
      </Card>
    );
  }

  const handleJoin = () => {
    if (interview.meeting_link) {
      window.open(interview.meeting_link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Date</p>
          <p className="font-medium">{interview.date}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Time</p>
          <p className="font-medium">{interview.time}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Mode</p>
          <p className="font-medium">{interview.mode}</p>
        </div>

        <Button className="w-full" onClick={handleJoin} disabled={!interview.meeting_link}>
          {interview.meeting_link ? "Join Interview" : "Link not available yet"}
        </Button>
      </CardContent>
    </Card>
  );
}
