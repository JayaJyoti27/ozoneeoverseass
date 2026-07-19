import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Switch } from "@/components/ui/switch";

const settings = [
  {
    title: "Email Notifications",
    description: "Receive updates via email.",
  },
  {
    title: "SMS Notifications",
    description: "Receive SMS alerts.",
  },
  {
    title: "In-App Notifications",
    description: "Show notifications inside the portal.",
  },
  {
    title: "Weekly Reports",
    description: "Receive recruitment summary every week.",
  },
];

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {settings.map((item) => (
          <div key={item.title} className="flex items-center justify-between border rounded-lg p-4">
            <div>
              <p className="font-medium">{item.title}</p>

              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>

            <Switch defaultChecked />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
