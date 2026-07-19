import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Pencil } from "lucide-react";

interface Props {
  member: {
    name: string;
    email: string;
    role: string;
    status: string;
  };
}

export function EditMemberDialog({ member }: Props) {
  const [active, setActive] = useState(member.status === "Active");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Team Member</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <Label>Name</Label>

            <Input defaultValue={member.name} />
          </div>

          <div>
            <Label>Email</Label>

            <Input defaultValue={member.email} />
          </div>

          <div>
            <Label>Role</Label>

            <Select defaultValue={member.role}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>

                <SelectItem value="HR Manager">HR Manager</SelectItem>

                <SelectItem value="Recruiter">Recruiter</SelectItem>

                <SelectItem value="Viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Active Account</p>

              <p className="text-sm text-muted-foreground">
                Allow this member to access the portal.
              </p>
            </div>

            <Switch checked={active} onCheckedChange={setActive} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline">Cancel</Button>

          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
