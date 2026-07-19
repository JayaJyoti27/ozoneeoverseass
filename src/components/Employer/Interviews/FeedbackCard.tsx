import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { interview } from "./Details/mock";

export function FeedbackCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Notes</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-7">{interview.notes}</p>
      </CardContent>
    </Card>
  );
}
