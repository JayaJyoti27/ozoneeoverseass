import { CalendarDays, Clock3, ExternalLink, UserRound } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useInterviews } from "@/lib/candidate/hooks";

export default function UpcomingInterview() {
  const { data, isLoading, isError } = useInterviews();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Interview</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="h-44 animate-pulse rounded-xl bg-muted" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Interview</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-destructive">Unable to load interview.</p>
        </CardContent>
      </Card>
    );
  }

  const interview = data?.find((i) => i.status.toLowerCase() === "scheduled");

  if (!interview) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Interview</CardTitle>
        </CardHeader>

        <CardContent className="py-12 text-center">
          <CalendarDays className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

          <h3 className="font-semibold">No Interview Scheduled</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Once an employer schedules your interview it will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Interview</CardTitle>

        <Badge>Scheduled</Badge>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <p className="text-lg font-semibold">
            {new Date(interview.interview_date).toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Clock3 className="h-5 w-5 text-primary" />

            <span>
              {new Date(interview.interview_date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <UserRound className="h-5 w-5 text-primary" />

            <span>{interview.interviewer_name}</span>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-primary" />

            <span>{interview.mode}</span>
          </div>
        </div>

        {interview.meeting_link && (
          <Button className="w-full" asChild>
            <a href={interview.meeting_link} target="_blank" rel="noreferrer">
              Join Meeting
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
