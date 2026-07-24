import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  getNotifications,
  markNotificationRead,
  deleteNotification,
} from "@/lib/admin/notification";

import NotificationCard from "./NotificationCard";
import { Bell, Inbox, Loader2 } from "lucide-react";
import { DotGrid, Blob } from "@/components/site/decor";

export const Route = createFileRoute("/Admin/notifications/")({
  component: NotificationsPage,
});

function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    setLoading(true);

    try {
      const data = await getNotifications();
      setNotifications(data?.notifications ?? []);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-blue" size={32} />
        <p className="text-sm text-ink">Loading notifications…</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero banner — matches Dashboard */}
      <div className="relative overflow-hidden rounded-[28px] bg-blue-wash px-8 py-8">
        <Blob
          className="-right-16 -top-24 h-72 w-72 opacity-60"
          color="var(--color-blue-soft, #DCE9FB)"
        />
        <DotGrid className="left-8 top-6 h-20 w-24 opacity-70" />

        <div className="relative flex flex-wrap items-start justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue backdrop-blur">
              <Bell className="h-3.5 w-3.5" /> Notifications
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold text-navy">Notifications</h1>
            <p className="mt-1 text-ink">Recent activity and system alerts</p>
          </div>

          {notifications.length > 0 && (
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-blue backdrop-blur">
              {notifications.length} total
            </span>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-[24px] border border-border bg-white p-16 text-center shadow-[0_12px_40px_-28px_rgba(11,31,58,0.35)]">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue-wash text-blue">
            <Inbox size={20} />
          </span>
          <p className="mt-3 text-sm text-ink">No notifications yet.</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
