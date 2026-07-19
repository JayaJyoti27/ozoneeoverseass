import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  notification: any;
  onRead: () => void;
  onDelete: () => void;
}

export default function NotificationCard({ notification, onRead, onDelete }: Props) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <h3 className="font-semibold">{notification.title}</h3>

          <p className="text-muted-foreground">{notification.message}</p>

          <p className="mt-2 text-xs text-muted-foreground">{notification.type}</p>
        </div>

        <div className="flex gap-2">
          {!notification.is_read && (
            <Button size="sm" onClick={onRead}>
              Mark Read
            </Button>
          )}

          <Button size="sm" variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
