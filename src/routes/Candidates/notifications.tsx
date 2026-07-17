import { createFileRoute } from "@tanstack/react-router";

import NotificationStats from "@/components/Candidate/notifications/NotificationStats";
import NotificationFilters from "@/components/Candidate/notifications/NotificationFilters";
import NotificationList from "@/components/Candidate/notifications/NotificationList";

export const Route = createFileRoute("/Candidates/notifications")({
  component: CandidateNotificationsPage,
});

function CandidateNotificationsPage() {
  return (
    <div className="space-y-6">
      <NotificationStats />

      <NotificationFilters />

      <NotificationList />
    </div>
  );
}
