import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { getRequirements } from "@/lib/employer/api";

type JobOrder = {
  id: string;
  position?: string;
  title?: string;
  country: string;
  vacancies: number;
  status: string;
  created_at?: string;
  submitted?: string;
};

export function JobOrdersTable() {
  const [jobOrders, setJobOrders] = useState<JobOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getRequirements();

        // Handles both { success, data } and plain array responses
        setJobOrders(Array.isArray(data) ? data : (data.data ?? []));
      } catch (err) {
        console.error("Failed to load job orders", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return <div className="rounded-xl border p-6 text-center">Loading Job Orders...</div>;
  }

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Vacancies</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobOrders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                No Job Orders Found
              </TableCell>
            </TableRow>
          ) : (
            jobOrders.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.id}</TableCell>

                <TableCell>{job.position ?? job.title ?? "-"}</TableCell>

                <TableCell>{job.country}</TableCell>

                <TableCell>{job.vacancies}</TableCell>

                <TableCell>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {job.status}
                  </span>
                </TableCell>

                <TableCell>
                  {job.created_at
                    ? new Date(job.created_at).toLocaleDateString()
                    : (job.submitted ?? "-")}
                </TableCell>

                <TableCell className="text-right">
                  <Link to="/Employer/job-orders/$jobId" params={{ jobId: job.id }}>
                    <Button size="sm" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
