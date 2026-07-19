import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { markNotificationRead } from "@/lib/employer/api";

import { NotificationDetailsDrawer } from "./NotificationDetailsDrawer";
import { NotificationActions } from "./NotificationActions";

export function NotificationCard({ notification }: { notification: any }) {
  async function handleRead() {
    if (notification.read) return;

    try {
      await markNotificationRead(notification.id);

      notification.read = true;
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  }

  return (
    <Card className={!notification.read ? "border-primary" : ""} onClick={handleRead}>
      <CardContent className="flex items-start justify-between p-6">
        <Checkbox checked={notification.selected ?? false} />

        <div className="flex-1 space-y-2 ml-4">
          <div className="flex items-center gap-3">
            {notification.priority && <Badge variant="outline">{notification.priority}</Badge>}

            <NotificationDetailsDrawer notification={notification} />

            <NotificationActions read={notification.read} />
          </div>

          <p className="text-sm">{notification.message}</p>

          <p className="text-xs text-muted-foreground">
            {notification.createdAt ?? notification.created_at ?? "-"}
          </p>
        </div>

        {notification.priority && <Badge variant="outline">{notification.priority}</Badge>}
      </CardContent>
    </Card>
  );
}
