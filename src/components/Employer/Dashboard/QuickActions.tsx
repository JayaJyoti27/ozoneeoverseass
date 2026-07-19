import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Plus, Building2, CalendarDays, FileText } from "lucide-react";

const actions = [
  {
    title: "Create Job Order",
    icon: Plus,
  },
  {
    title: "Update Company",
    icon: Building2,
  },
  {
    title: "Schedule Interview",
    icon: CalendarDays,
  },
  {
    title: "Upload Documents",
    icon: FileText,
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Button key={action.title} variant="outline" className="justify-start gap-3 h-12">
              <Icon className="h-5 w-5" />

              {action.title}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
