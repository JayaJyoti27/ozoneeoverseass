import { useEffect, useState } from "react";
import { CalendarDays, Loader2 } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { getInterviews, scheduleInterview } from "@/lib/recruitment/api";

interface Props {
  applicationId: string;
}

export default function InterviewCard({ applicationId }: Props) {
  const [loading, setLoading] = useState(true);
  const [interviews, setInterviews] = useState<any[]>([]);

  const [scheduling, setScheduling] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [round, setRound] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [mode, setMode] = useState("");

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

  async function handleSchedule() {
    if (!round || !scheduledAt) return;

    setScheduling(true);
    try {
      await scheduleInterview(applicationId, {
        round,
        scheduled_at: new Date(scheduledAt).toISOString(),
        mode,
      });
      setDialogOpen(false);
      setRound("");
      setScheduledAt("");
      setMode("");
      await load(); // refresh list
    } catch (err) {
      console.error("Failed to schedule interview", err);
      // TODO: surface error toast
    } finally {
      setScheduling(false);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Interviews</CardTitle>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">Schedule</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div>
                <Label htmlFor="round">Round</Label>
                <Input
                  id="round"
                  placeholder="e.g. Technical, HR, Final"
                  value={round}
                  onChange={(e) => setRound(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="scheduled_at">Date & Time</Label>
                <Input
                  id="scheduled_at"
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="mode">Mode</Label>
                <Input
                  id="mode"
                  placeholder="e.g. Video call, In-person"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleSchedule} disabled={scheduling || !round || !scheduledAt}>
                {scheduling ? "Scheduling..." : "Confirm"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
