import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  getRequirements,
  approveRequirement,
  rejectRequirement,
  requestClarification,
  convertRequirement,
} from "@/lib/admin/api";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export const Route = createFileRoute("/Admin/requirements/")({
  component: RequirementsPage,
});

function RequirementsPage() {
  const navigate = useNavigate();

  const [requirements, setRequirements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadRequirements();
  }, []);

  async function loadRequirements() {
    setLoading(true);

    try {
      const data = await getRequirements();
      setRequirements(Array.isArray(data) ? data : (data.data ?? []));
    } finally {
      setLoading(false);
    }
  }

  async function approve(id: string) {
    await approveRequirement(id);
    loadRequirements();
  }

  async function reject(id: string) {
    await rejectRequirement(id, "Rejected by Admin");
    loadRequirements();
  }

  async function clarification(id: string) {
    await requestClarification(id, "Please provide additional details.");
    loadRequirements();
  }

  async function convert(id: string) {
    await convertRequirement(id);
    loadRequirements();
  }

  const filtered = useMemo(() => {
    return requirements.filter((r) =>
      JSON.stringify(r).toLowerCase().includes(search.toLowerCase()),
    );
  }, [requirements, search]);

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
          <h1 className="text-3xl font-bold">Requirements</h1>

          <p className="text-muted-foreground">Review employer requirements</p>
        </div>

        <Input
          placeholder="Search..."
          className="w-80"
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

                <TableHead>Headcount</TableHead>

                <TableHead>Status</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((req) => (
                <TableRow
                  key={req.id}
                  className="cursor-pointer"
                  onClick={() =>
                    navigate({
                      to: `/Admin/requirements/${req.id}`,
                    })
                  }
                >
                  <TableCell>{req.company_name}</TableCell>

                  <TableCell>{req.role}</TableCell>

                  <TableCell>{req.country}</TableCell>

                  <TableCell>{req.headcount}</TableCell>

                  <TableCell>
                    <Badge>{req.status}</Badge>
                  </TableCell>

                  <TableCell className="space-x-2 text-right" onClick={(e) => e.stopPropagation()}>
                    <Button size="sm" onClick={() => approve(req.id)}>
                      Approve
                    </Button>

                    <Button size="sm" variant="secondary" onClick={() => clarification(req.id)}>
                      Clarify
                    </Button>

                    <Button size="sm" variant="outline" onClick={() => convert(req.id)}>
                      Convert
                    </Button>

                    <Button size="sm" variant="destructive" onClick={() => reject(req.id)}>
                      Reject
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
