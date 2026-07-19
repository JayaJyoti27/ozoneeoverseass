import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { getEmployers, approveEmployer, suspendEmployer, activateEmployer } from "@/lib/admin/api";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/Admin/employers/")({
  component: EmployersPage,
});

function EmployersPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [employers, setEmployers] = useState<any[]>([]);

  useEffect(() => {
    loadEmployers();
  }, []);

  async function loadEmployers() {
    setLoading(true);

    try {
      const data = await getEmployers();

      setEmployers(Array.isArray(data) ? data : (data.data ?? []));
    } finally {
      setLoading(false);
    }
  }

  async function approve(id: string) {
    await approveEmployer(id);
    loadEmployers();
  }

  async function suspend(id: string) {
    await suspendEmployer(id);
    loadEmployers();
  }

  async function activate(id: string) {
    await activateEmployer(id);
    loadEmployers();
  }

  const filtered = useMemo(() => {
    return employers.filter((e) => JSON.stringify(e).toLowerCase().includes(search.toLowerCase()));
  }, [search, employers]);

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employers</h1>

          <p className="text-muted-foreground">Manage all employers</p>
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
                <TableHead>Company</TableHead>

                <TableHead>Email</TableHead>

                <TableHead>Country</TableHead>

                <TableHead>Status</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((e) => (
                <TableRow
                  key={e.id}
                  className="cursor-pointer"
                  onClick={() =>
                    navigate({
                      to: `/Admin/employers/${e.id}`,
                    })
                  }
                >
                  <TableCell>{e.company_name}</TableCell>

                  <TableCell>{e.email}</TableCell>

                  <TableCell>{e.country}</TableCell>

                  <TableCell>
                    <Badge>{e.status}</Badge>
                  </TableCell>

                  <TableCell
                    className="space-x-2 text-right"
                    onClick={(ev) => ev.stopPropagation()}
                  >
                    <Button size="sm" onClick={() => approve(e.id)}>
                      Approve
                    </Button>

                    <Button size="sm" variant="secondary" onClick={() => activate(e.id)}>
                      Activate
                    </Button>

                    <Button size="sm" variant="destructive" onClick={() => suspend(e.id)}>
                      Suspend
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
