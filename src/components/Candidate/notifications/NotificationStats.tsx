import { Bell, BellRing, CheckCircle2 } from "lucide-react";

import { Card } from "@/components/ui/card";

import { useNotifications } from "@/lib/candidate/hooks";

export default function NotificationStats() {
  const { data } = useNotifications();

  const total = data?.length ?? 0;

  const unread = data?.filter((n) => !n.read).length ?? 0;

  const read = data?.filter((n) => n.read).length ?? 0;

  const cards = [
    {
      title: "Total",
      value: total,
      icon: Bell,
    },
    {
      title: "Unread",
      value: unread,
      icon: BellRing,
    },
    {
      title: "Read",
      value: read,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title} className="rounded-2xl p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{card.title}</p>

                <h2 className="mt-2 text-3xl font-bold">{card.value}</h2>
              </div>

              <Icon className="h-8 w-8 text-primary" />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
