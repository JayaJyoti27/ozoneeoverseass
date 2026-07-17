import { Calendar, Clock3, ExternalLink, User } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { CandidateInterview } from "@/lib/candidate/types";

interface Props {
  interview: CandidateInterview;
}

export default function InterviewCard({ interview }: Props) {
  return (
    <Card className="rounded-2xl p-6">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">{interview.interviewer_name}</h2>

          <p className="text-muted-foreground">{interview.mode}</p>
        </div>

        <Badge>{interview.status}</Badge>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />

          {new Date(interview.interview_date).toLocaleDateString()}
        </div>

        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4" />

          {new Date(interview.interview_date).toLocaleTimeString()}
        </div>

        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />

          {interview.interviewer_email}
        </div>
      </div>

      {interview.meeting_link && (
        <Button className="mt-6" asChild>
          <a href={interview.meeting_link} target="_blank" rel="noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Join Interview
          </a>
        </Button>
      )}
    </Card>
  );
}
