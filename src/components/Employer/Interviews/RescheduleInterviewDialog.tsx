import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CalendarClock } from "lucide-react";

export function RescheduleInterviewDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <CalendarClock className="mr-2 h-4 w-4" />
          Reschedule
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Reschedule Interview</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="grid gap-2">
            <Label>Date</Label>

            <Input type="date" />
          </div>

          <div className="grid gap-2">
            <Label>Time</Label>

            <Input type="time" />
          </div>

          <div className="grid gap-2">
            <Label>Meeting Platform</Label>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose platform" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="google">Google Meet</SelectItem>

                <SelectItem value="zoom">Zoom</SelectItem>

                <SelectItem value="teams">Microsoft Teams</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Meeting Link</Label>

            <Input />
          </div>

          <div className="grid gap-2">
            <Label>Reason</Label>

            <Input placeholder="Why is this interview being rescheduled?" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
