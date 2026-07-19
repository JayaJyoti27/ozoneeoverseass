import { CheckCheck, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  selected: number;
}

export function BulkActionsBar({ selected }: Props) {
  if (!selected) return null;

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between rounded-lg border bg-background p-4">
      <span className="font-medium">{selected} selected</span>

      <div className="flex gap-2">
        <Button variant="outline">
          <CheckCheck className="mr-2 h-4 w-4" />
          Mark Read
        </Button>

        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}
