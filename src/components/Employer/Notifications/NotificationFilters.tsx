import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NotificationFilters() {
  return (
    <div className="flex gap-4">
      <Select>
        <SelectTrigger className="w-52">
          <SelectValue placeholder="Notification Type" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>

          <SelectItem value="candidate">Candidate</SelectItem>

          <SelectItem value="interview">Interview</SelectItem>

          <SelectItem value="deployment">Deployment</SelectItem>

          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
