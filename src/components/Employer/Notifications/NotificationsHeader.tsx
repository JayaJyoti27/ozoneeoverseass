import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

export function NotificationsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>

        <p className="text-muted-foreground">Stay updated with recruitment activities.</p>
      </div>

      <Button variant="outline">
        <Bell className="mr-2 h-4 w-4" />
        Mark All Read
      </Button>
    </div>
  );
}
