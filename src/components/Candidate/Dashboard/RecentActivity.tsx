import { Briefcase, CalendarDays, CheckCircle2, Clock3, FileText, Plane } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import type { Activity } from "@/lib/candidate/types";

function getIcon(title: string) {
  const t = title.toLowerCase();

  if (t.includes("application")) return <Briefcase className="h-5 w-5 text-blue-600" />;

  if (t.includes("interview")) return <CalendarDays className="h-5 w-5 text-orange-600" />;

  if (t.includes("document")) return <FileText className="h-5 w-5 text-purple-600" />;

  if (t.includes("visa")) return <CheckCircle2 className="h-5 w-5 text-green-600" />;

  if (t.includes("deployment")) return <Plane className="h-5 w-5 text-cyan-600" />;

  return <Clock3 className="h-5 w-5 text-primary" />;
}

function getBadge(title: string) {
  const t = title.toLowerCase();

  if (t.includes("approved")) return "Approved";

  if (t.includes("scheduled")) return "Scheduled";

  if (t.includes("uploaded")) return "Uploaded";

  if (t.includes("rejected")) return "Rejected";

  return "Updated";
}

function getRelativeTime(date: string) {
  const now = new Date().getTime();
  const created = new Date(date).getTime();

  const diff = Math.floor((now - created) / 1000);

  if (diff < 60) return "Just now";

  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;

  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;

  if (diff < 172800) return "Yesterday";

  return new Date(date).toLocaleDateString();
}

interface Props {
  activity?: Activity[];
}

export default function RecentActivity({ activity = [] }: Props) {
  if (!activity.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>

        <CardContent className="py-12 text-center">
          <Clock3 className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

          <h3 className="font-semibold">No Activity</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Your recent updates will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {activity.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-muted p-2">{getIcon(item.title)}</div>

                <div className="mt-2 h-full w-px bg-border" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{item.title}</h3>

                  <Badge variant="secondary">{getBadge(item.title)}</Badge>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>

                <p className="mt-2 text-xs text-muted-foreground">
                  {getRelativeTime(item.created_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
