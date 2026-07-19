import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function CancelInterviewDialog() {
  const [reason, setReason] = useState("");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Cancel Interview
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Interview?</AlertDialogTitle>

          <AlertDialogDescription>
            This action will notify the recruitment team and update the interview status to{" "}
            <strong>Cancelled</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-2 py-2">
          <Label>Cancellation Reason</Label>

          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain why the interview is being cancelled..."
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Keep Interview</AlertDialogCancel>

          <AlertDialogAction disabled={!reason.trim()}>Confirm Cancellation</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
