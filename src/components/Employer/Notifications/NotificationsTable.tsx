import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

import { getNotifications } from "@/lib/employer/api";

import { Card, CardContent } from "@/components/ui/card";
import { NotificationCard } from "./NotificationCard";

export function NotificationsTable() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getNotifications();
        setNotifications(Array.isArray(data) ? data : (data.data ?? []));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">Loading notifications...</CardContent>
      </Card>
    );
  }

  if (!notifications.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Bell className="mb-4 h-10 w-10 text-muted-foreground" />

          <h3 className="font-semibold">You're all caught up</h3>

          <p className="text-sm text-muted-foreground">No new notifications.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
