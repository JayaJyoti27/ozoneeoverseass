import { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
}

export default function StatCard({ title, value, icon: Icon, subtitle }: Props) {
  return (
    <Card className="group rounded-2xl border bg-background p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">{value}</h2>

          {subtitle && <p className="mt-2 text-xs text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="rounded-xl bg-primary/10 p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}
