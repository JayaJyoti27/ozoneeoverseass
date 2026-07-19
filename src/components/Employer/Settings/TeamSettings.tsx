import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function TeamSettings() {
  const members = [
    {
      id: 1,
      name: "John Smith",
      email: "john@company.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@company.com",
      role: "Recruiter",
    },
    {
      id: 3,
      name: "Michael Lee",
      email: "michael@company.com",
      role: "HR",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Management</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="space-y-4">
          <h3 className="font-semibold">Invite New Member</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input placeholder="employee@company.com" />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Input placeholder="Recruiter / Admin / HR" />
            </div>
          </div>

          <Button>Send Invitation</Button>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Current Team Members</h3>

          <div className="space-y-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge>{member.role}</Badge>

                  <Button variant="outline" size="sm">
                    Edit
                  </Button>

                  <Button variant="destructive" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
