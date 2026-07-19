import { useState } from "react";
import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

export function ScheduleInterviewDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <CalendarDays className="mr-2 h-4 w-4" />
          Schedule Interview
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>

          <DialogDescription>Create a new interview for a shortlisted candidate.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label>Candidate</Label>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select candidate" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="1">Rahul Sharma</SelectItem>

                <SelectItem value="2">Priya Patel</SelectItem>

                <SelectItem value="3">Anjali Singh</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Date</Label>

              <Input type="date" />
            </div>

            <div className="grid gap-2">
              <Label>Time</Label>

              <Input type="time" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Interview Mode</Label>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="google">Google Meet</SelectItem>

                <SelectItem value="zoom">Zoom</SelectItem>

                <SelectItem value="teams">Microsoft Teams</SelectItem>

                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Meeting Link</Label>

            <Input placeholder="https://meet.google.com/..." />
          </div>

          <div className="grid gap-2">
            <Label>Interviewer</Label>

            <Input placeholder="Enter interviewer name" />
          </div>

          <div className="grid gap-2">
            <Label>Notes</Label>

            <Textarea rows={4} placeholder="Interview instructions..." />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button>Schedule Interview</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
