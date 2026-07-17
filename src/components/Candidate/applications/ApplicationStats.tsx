import { CheckCircle2, Clock3, Calendar, XCircle } from "lucide-react";

import { Card } from "@/components/ui/card";

import { useApplications } from "@/lib/candidate/hooks";

export default function ApplicationStats() {
  const { data } = useApplications();

  const total = data?.length ?? 0;

  const pending = data?.filter((a) => a.status === "under_review").length ?? 0;

  const interview = data?.filter((a) => a.status === "interview_scheduled").length ?? 0;

  const rejected = data?.filter((a) => a.status === "rejected").length ?? 0;

  const cards = [
    {
      title: "Applications",
      value: total,
      icon: Clock3,
    },
    {
      title: "Under Review",
      value: pending,
      icon: Clock3,
    },
    {
      title: "Interviews",
      value: interview,
      icon: Calendar,
    },
    {
      title: "Rejected",
      value: rejected,
      icon: XCircle,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title} className="rounded-2xl p-5">
            <div className="flex items-center justify-between">
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
