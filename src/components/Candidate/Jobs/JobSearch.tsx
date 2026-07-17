import { Search } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function JobSearch() {
  return (
    <Card className="rounded-2xl p-5">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />

        <Input className="pl-10" placeholder="Search jobs..." />
      </div>
    </Card>
  );
}
