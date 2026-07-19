import { Check, Mail, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  read: boolean;
}

export function NotificationActions({ read }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Button size="icon" variant="ghost">
        {read ? <Mail className="h-4 w-4" /> : <Check className="h-4 w-4" />}
      </Button>

      <Button size="icon" variant="ghost">
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}
