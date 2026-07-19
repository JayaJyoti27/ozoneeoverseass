import { Card, CardContent } from "@/components/ui/card";

export function InterviewStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Stat title="Scheduled" value="18" />

      <Stat title="Completed" value="41" />

      <Stat title="Cancelled" value="4" />

      <Stat title="Pending Feedback" value="9" />
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{title}</p>

        <h2 className="mt-2 text-3xl font-bold">{value}</h2>
      </CardContent>
    </Card>
  );
}
