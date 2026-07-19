import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AuditLogSettings() {
  const logs = [
    {
      id: 1,
      action: "Updated Company Profile",
      user: "John Smith",
      date: "18 Jul 2026 • 10:15 AM",
      type: "Update",
    },
    {
      id: 2,
      action: "Created New Job Order",
      user: "Sarah Johnson",
      date: "18 Jul 2026 • 11:30 AM",
      type: "Create",
    },
    {
      id: 3,
      action: "Uploaded Business License",
      user: "Michael Lee",
      date: "17 Jul 2026 • 03:45 PM",
      type: "Upload",
    },
    {
      id: 4,
      action: "Invited Team Member",
      user: "John Smith",
      date: "16 Jul 2026 • 09:20 AM",
      type: "Invite",
    },
    {
      id: 5,
      action: "Changed Security Settings",
      user: "Admin",
      date: "15 Jul 2026 • 05:10 PM",
      type: "Security",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Audit Logs</CardTitle>

        <Button variant="outline" size="sm">
          Export Logs
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-1">
              <p className="font-medium">{log.action}</p>

              <p className="text-sm text-muted-foreground">
                {log.user} • {log.date}
              </p>
            </div>

            <Badge variant="secondary">{log.type}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
