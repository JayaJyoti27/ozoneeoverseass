import { Card } from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function JobFilters() {
  return (
    <Card className="rounded-2xl p-5">
      <h2 className="mb-5 font-semibold">Filters</h2>

      <div className="space-y-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Country" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="saudi">Saudi Arabia</SelectItem>

            <SelectItem value="uae">UAE</SelectItem>

            <SelectItem value="qatar">Qatar</SelectItem>

            <SelectItem value="kuwait">Kuwait</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Industry" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="construction">Construction</SelectItem>

            <SelectItem value="hospitality">Hospitality</SelectItem>

            <SelectItem value="healthcare">Healthcare</SelectItem>

            <SelectItem value="oil">Oil & Gas</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Salary" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="1000">1000+</SelectItem>

            <SelectItem value="2000">2000+</SelectItem>

            <SelectItem value="3000">3000+</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}
