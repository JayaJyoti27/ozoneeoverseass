import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <Card className="transition hover:shadow-md">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>
        </div>

        <div className={`rounded-xl bg-muted p-4 ${color}`}>
          <Icon className="h-7 w-7" />
        </div>
      </CardContent>
    </Card>
  );
}
