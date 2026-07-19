import { useEffect, useState } from "react";
import { CalendarDays, Loader2 } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { getInterviews } from "@/lib/recruitment/api";

interface Props {
  applicationId: string;
}

export default function InterviewCard({ applicationId }: Props) {
  const [loading, setLoading] = useState(true);

  const [interviews, setInterviews] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, [applicationId]);

  async function load() {
    setLoading(true);

    try {
      const data = await getInterviews(applicationId);

      setInterviews(data.interviews ?? []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Interviews</CardTitle>

        <Button size="sm">Schedule</Button>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="animate-spin" />
          </div>
        ) : interviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">No interviews scheduled.</p>
        ) : (
          <div className="space-y-4">
            {interviews.map((interview) => (
              <div key={interview.id} className="rounded-lg border p-4">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />

                      <span className="font-medium">{interview.round ?? "Interview"}</span>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {interview.scheduled_at
                        ? new Date(interview.scheduled_at).toLocaleString()
                        : "-"}
                    </p>
                  </div>

                  <Badge>{interview.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
