import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FeedbackForm() {
  const [decision, setDecision] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Feedback</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-2">
          <Label>Overall Rating</Label>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>

              <SelectItem value="4">⭐⭐⭐⭐ Good</SelectItem>

              <SelectItem value="3">⭐⭐⭐ Average</SelectItem>

              <SelectItem value="2">⭐⭐ Poor</SelectItem>

              <SelectItem value="1">⭐ Very Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Interview Notes</Label>

          <Textarea rows={6} placeholder="Write your interview feedback..." />
        </div>

        <div className="grid gap-2">
          <Label>Final Decision</Label>

          <Select onValueChange={setDecision}>
            <SelectTrigger>
              <SelectValue placeholder="Choose decision" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="selected">Select Candidate</SelectItem>

              <SelectItem value="hold">Keep On Hold</SelectItem>

              <SelectItem value="reject">Reject Candidate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Save Draft</Button>

          <Button disabled={!decision}>Submit Feedback</Button>
        </div>
      </CardContent>
    </Card>
  );
}
