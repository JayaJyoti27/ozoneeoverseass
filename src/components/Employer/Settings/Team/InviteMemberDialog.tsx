import { UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function InviteMemberDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <Label>Email</Label>

            <Input placeholder="employee@company.com" />
          </div>

          <div>
            <Label>Role</Label>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>

                <SelectItem value="manager">HR Manager</SelectItem>

                <SelectItem value="recruiter">Recruiter</SelectItem>

                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button>Send Invitation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
