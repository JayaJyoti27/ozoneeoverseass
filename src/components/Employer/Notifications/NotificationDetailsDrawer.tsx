import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import { Eye } from "lucide-react";

type Notification = {
  title: string;
  message: string;
  type: string;
  priority: string;
  createdAt: string;
};

interface Props {
  notification: Notification;
}

export function NotificationDetailsDrawer({ notification }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{notification.title}</SheetTitle>

          <SheetDescription>{notification.createdAt}</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-8">
          <Info label="Type" value={notification.type} />

          <Info label="Priority" value={notification.priority} />

          <Info label="Description" value={notification.message} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="font-medium mt-1">{value}</p>
    </div>
  );
}
