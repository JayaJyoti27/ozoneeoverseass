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

import { DOCUMENT_CATALOG } from "./documentCatalog";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
}

export default function DocumentsFilters({
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
}: Props) {
  return (
    <Card className="rounded-2xl p-5">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            className="pl-10"
            placeholder="Search document..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <Select value={typeFilter} onValueChange={onTypeFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="Document Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>

            {DOCUMENT_CATALOG.map((item) => (
              <SelectItem key={item.type} value={item.type}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}
