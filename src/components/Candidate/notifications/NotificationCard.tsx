import { Bell, ExternalLink } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useMarkNotificationRead } from "@/lib/candidate/hooks";

import type { CandidateNotification } from "@/lib/candidate/types";

interface Props {
  notification: CandidateNotification;
}

export default function NotificationCard({ notification }: Props) {
  const markRead = useMarkNotificationRead();

  return (
    <Card className="rounded-2xl p-6">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Bell className="mt-1 h-5 w-5 text-primary" />

          <div>
            <h2 className="font-semibold">{notification.title}</h2>

            <p className="mt-2 text-muted-foreground">{notification.message}</p>

            <p className="mt-3 text-xs text-muted-foreground">
              {new Date(notification.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        <Badge variant={notification.read ? "secondary" : "default"}>
          {notification.read ? "Read" : "Unread"}
        </Badge>
      </div>

      <div className="mt-6 flex gap-3">
        {!notification.read && (
          <Button onClick={() => markRead.mutate(notification.id)}>Mark Read</Button>
        )}

        {notification.link && (
          <Button variant="outline" asChild>
            <a href={notification.link}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Open
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
}
