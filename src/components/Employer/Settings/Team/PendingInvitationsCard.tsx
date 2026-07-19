import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { pendingInvites } from "./mock";

export function PendingInvitationsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Invitations</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {pendingInvites.map((invite) => (
          <div key={invite.id} className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">{invite.email}</p>

              <p className="text-sm text-muted-foreground">
                {invite.role} • {invite.invitedAt}
              </p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Resend
              </Button>

              <Button size="sm" variant="destructive">
                Cancel
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
