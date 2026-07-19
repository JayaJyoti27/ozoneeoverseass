import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

import { getInterviews } from "@/lib/employer/api";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

type Interview = {
  id: string;
  candidate_name?: string;
  candidate?: string;
  position?: string;
  job_title?: string;
  interview_date?: string;
  date?: string;
  interview_time?: string;
  time?: string;
  mode?: string;
  status?: string;
};

export function InterviewsTable() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getInterviews();

        setInterviews(Array.isArray(data) ? data : (data.data ?? []));
      } catch (err) {
        console.error("Failed to load interviews", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Interview Schedule</CardTitle>
        </CardHeader>

        <CardContent>Loading interviews...</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Schedule</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {interviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No Interviews Scheduled
                </TableCell>
              </TableRow>
            ) : (
              interviews.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.candidate_name ?? item.candidate ?? "-"}
                  </TableCell>

                  <TableCell>{item.position ?? item.job_title ?? "-"}</TableCell>

                  <TableCell>
                    {item.interview_date
                      ? new Date(item.interview_date).toLocaleDateString()
                      : (item.date ?? "-")}
                  </TableCell>

                  <TableCell>{item.interview_time ?? item.time ?? "-"}</TableCell>

                  <TableCell>{item.mode ?? "-"}</TableCell>

                  <TableCell>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {item.status ?? "Pending"}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
