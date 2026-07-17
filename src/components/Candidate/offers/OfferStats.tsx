import { BadgeCheck, Clock3, XCircle } from "lucide-react";

import { Card } from "@/components/ui/card";

import { useOffers } from "@/lib/candidate/hooks";

export default function OfferStats() {
  const { data } = useOffers();

  const pending = data?.filter((o) => o.status === "sent").length ?? 0;

  const accepted = data?.filter((o) => o.status === "accepted").length ?? 0;

  const rejected = data?.filter((o) => o.status === "rejected").length ?? 0;

  const cards = [
    {
      title: "Pending",
      value: pending,
      icon: Clock3,
    },
    {
      title: "Accepted",
      value: accepted,
      icon: BadgeCheck,
    },
    {
      title: "Rejected",
      value: rejected,
      icon: XCircle,
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
