import { InviteMemberDialog } from "./InviteMemberDialog";
import { PendingInvitationsCard } from "./PendingInvitationsCard";
import { TeamTable } from "./TeamTable";

export function TeamSettings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <InviteMemberDialog />
      </div>

      <PendingInvitationsCard />

      <TeamTable />
    </div>
  );
}
