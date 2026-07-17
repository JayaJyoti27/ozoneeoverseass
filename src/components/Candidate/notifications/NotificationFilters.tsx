import { Search } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NotificationFilters() {
  return (
    <Card className="rounded-2xl p-5">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input className="pl-10" placeholder="Search notifications..." />
        </div>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>

            <SelectItem value="application">Applications</SelectItem>

            <SelectItem value="interview">Interviews</SelectItem>

            <SelectItem value="offer">Offers</SelectItem>

            <SelectItem value="medical">Medical</SelectItem>

            <SelectItem value="visa">Visa</SelectItem>

            <SelectItem value="deployment">Deployment</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}
