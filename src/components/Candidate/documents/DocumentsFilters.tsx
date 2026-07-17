import { Search } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function DocumentsFilters() {
  return (
    <Card className="rounded-2xl p-5">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input className="pl-10" placeholder="Search document..." />
        </div>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Document Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>

            <SelectItem value="passport">Passport</SelectItem>

            <SelectItem value="resume">Resume</SelectItem>

            <SelectItem value="certificate">Certificate</SelectItem>

            <SelectItem value="medical">Medical</SelectItem>

            <SelectItem value="visa">Visa</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}
