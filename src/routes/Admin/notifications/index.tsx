import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  getNotifications,
  markNotificationRead,
  deleteNotification,
} from "@/lib/admin/notification";

import NotificationCard from "./NotificationCard";

export const Route = createFileRoute("/Admin/notifications/")({
  component: NotificationsPage,
});

function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    const data = await getNotifications();

    setNotifications(data.notifications);
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Notifications</h1>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onRead={async () => {
              await markNotificationRead(notification.id);
              loadNotifications();
            }}
            onDelete={async () => {
              await deleteNotification(notification.id);
              loadNotifications();
            }}
          />
        ))}
      </div>
    </div>
  );
}
