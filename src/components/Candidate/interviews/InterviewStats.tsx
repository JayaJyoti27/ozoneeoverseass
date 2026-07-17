import { Calendar, CheckCircle2, Clock3 } from "lucide-react";

import { Card } from "@/components/ui/card";

import { useInterviews } from "@/lib/candidate/hooks";

export default function InterviewStats() {
  const { data } = useInterviews();

  const upcoming = data?.filter((i) => i.status === "scheduled").length ?? 0;

  const completed = data?.filter((i) => i.status === "completed").length ?? 0;

  const missed = data?.filter((i) => i.status === "missed").length ?? 0;

  const cards = [
    {
      title: "Upcoming",
      value: upcoming,
      icon: Calendar,
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
    },
    {
      title: "Missed",
      value: missed,
      icon: Clock3,
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
