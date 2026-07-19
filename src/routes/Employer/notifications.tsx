import { createFileRoute } from "@tanstack/react-router";
import { BulkActionsBar } from "@/components/Employer/Notifications/BulkActionsBar";
import { NotificationsHeader } from "@/components/Employer/Notifications/NotificationsHeader";
import { NotificationsStats } from "@/components/Employer/Notifications/NotificationsStats";
import { NotificationFilters } from "@/components/Employer/Notifications/NotificationFilters";
import { NotificationsTable } from "@/components/Employer/Notifications/NotificationsTable";

export const Route = createFileRoute("/Employer/notifications")({
  component: NotificationsPage,
});

function NotificationsPage() {
  return (
    <div className="space-y-6">
      <NotificationsHeader />

      <NotificationsStats />

      <NotificationFilters />

      <BulkActionsBar selected={2} />

      <NotificationsTable />
    </div>
  );
}
