import { AlertTriangle, CheckCircle2, Clock3, FileText } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DocumentStatsData {
  total: number;
  verified: number;
  pending: number;
  required: number;
}

interface DocumentStatsProps {
  stats?: DocumentStatsData;
  loading?: boolean;
}

export default function DocumentStats({ stats, loading }: DocumentStatsProps) {
  const items = [
    {
      title: "Total Documents",
      value: stats?.total ?? 0,
      description: "Uploaded",
      icon: FileText,
    },
    {
      title: "Verified",
      value: stats?.verified ?? 0,
      description: "Approved",
      icon: CheckCircle2,
    },
    {
      title: "Pending Review",
      value: stats?.pending ?? 0,
      description: "Awaiting verification",
      icon: Clock3,
    },
    {
      title: "Required",
      value: stats?.required ?? 0,
      description: "Need Upload",
      icon: AlertTriangle,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>

              <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              {loading ? (
                <>
                  <div className="mb-2 h-8 w-16 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold">{item.value}</div>

                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
