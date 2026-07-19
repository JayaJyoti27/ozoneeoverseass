import { CalendarPlus } from "lucide-react";
import { ScheduleInterviewDialog } from "./ScheduleInterviewDialog";
import { Button } from "@/components/ui/button";

export function InterviewsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Interviews</h1>

        <p className="text-muted-foreground">Manage scheduled interviews.</p>
      </div>

      <Button>
        <CalendarPlus className="mr-2 h-4 w-4" />
        <ScheduleInterviewDialog />
      </Button>
    </div>
  );
}
