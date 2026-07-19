import { useState } from "react";

import { CheckCircle2 } from "lucide-react";

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

import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

export function ConfirmArrivalDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Confirm Arrival
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Candidate Arrival</DialogTitle>

          <DialogDescription>
            Confirm the candidate has arrived at the destination.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="grid gap-2">
            <Label>Arrival Date</Label>

            <Input type="date" />
          </div>

          <div className="grid gap-2">
            <Label>Airport</Label>

            <Input placeholder="King Khalid International Airport" />
          </div>

          <div className="grid gap-2">
            <Label>Employer Representative</Label>

            <Input placeholder="Representative Name" />
          </div>

          <div className="grid gap-2">
            <Label>Remarks</Label>

            <Textarea rows={4} placeholder="Additional arrival notes..." />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button>Confirm Arrival</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
