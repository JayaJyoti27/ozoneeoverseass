import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { getJobOrders, openRecruitment, closeRecruitment } from "@/lib/admin/api";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/Admin/requirements/$id")({
  component: JobOrdersPage,
});

function JobOrdersPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);

    try {
      const data = await getJobOrders();
      setOrders(Array.isArray(data) ? data : (data.data ?? []));
    } finally {
      setLoading(false);
    }
  }

  async function open(id: string) {
    await openRecruitment(id);
    loadOrders();
  }

  async function close(id: string) {
    await closeRecruitment(id);
    loadOrders();
  }

  const filtered = useMemo(() => {
    return orders.filter((o) => JSON.stringify(o).toLowerCase().includes(search.toLowerCase()));
  }, [orders, search]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Job Orders</h1>

          <p className="text-muted-foreground">Recruitment management</p>
        </div>

        <Input
          className="w-80"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employer</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Openings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((job) => (
                <TableRow
                  key={job.id}
                  className="cursor-pointer"
                  onClick={() =>
                    navigate({
                      to: `/Admin/job-orders/${job.id}`,
                    })
                  }
                >
                  <TableCell>{job.company_name}</TableCell>

                  <TableCell>{job.role}</TableCell>

                  <TableCell>{job.country}</TableCell>

                  <TableCell>{job.headcount}</TableCell>

                  <TableCell>
                    <Badge>{job.status}</Badge>
                  </TableCell>

                  <TableCell className="space-x-2 text-right" onClick={(e) => e.stopPropagation()}>
                    <Button size="sm" onClick={() => open(job.id)}>
                      Open
                    </Button>

                    <Button size="sm" variant="destructive" onClick={() => close(job.id)}>
                      Close
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
