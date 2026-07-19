import { teamMembers } from "./mock";

import { Button } from "@/components/ui/button";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EditMemberDialog } from "./EditMemberDialog";
import { DeleteMemberDialog } from "./DeleteMemberDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TeamTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>

              <TableHead>Role</TableHead>

              <TableHead>Status</TableHead>

              <TableHead>Last Login</TableHead>

              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{member.name}</p>

                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </TableCell>

                <TableCell>{member.role}</TableCell>

                <TableCell>{member.status}</TableCell>

                <TableCell>{member.lastLogin}</TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <EditMemberDialog member={member} />

                    <DeleteMemberDialog />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
