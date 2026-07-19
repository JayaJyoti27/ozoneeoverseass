import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export function InterviewCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Date</p>

          <p className="font-medium">28 July 2026</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Time</p>

          <p className="font-medium">03:00 PM (GST)</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Mode</p>

          <p className="font-medium">Google Meet</p>
        </div>

        <Button className="w-full">Join Interview</Button>
      </CardContent>
    </Card>
  );
}
