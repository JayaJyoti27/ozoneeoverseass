import { Bookmark } from "lucide-react";

import { Card } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

export default function SavedJobsSidebar() {
  return (
    <Card className="rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Saved Jobs</h2>

        <Badge>Coming Soon</Badge>
      </div>

      <div className="mt-6 text-sm text-muted-foreground">Saved jobs will appear here.</div>
    </Card>
  );
}
