import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { getCandidates, activateCandidate, suspendCandidate } from "@/lib/admin/api";

import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export const Route = createFileRoute("/Admin/candidates/")({
  component: CandidatesPage,
});

function CandidatesPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    loadCandidates();
  }, []);

  async function loadCandidates() {
    setLoading(true);

    try {
      const data = await getCandidates();
      setCandidates(Array.isArray(data) ? data : (data.data ?? []));
    } finally {
      setLoading(false);
    }
  }

  async function activate(id: string) {
    await activateCandidate(id);
    loadCandidates();
  }

  async function suspend(id: string) {
    await suspendCandidate(id);
    loadCandidates();
  }

  const filtered = useMemo(() => {
    return candidates.filter((candidate) =>
      JSON.stringify(candidate).toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, candidates]);

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
          <h1 className="text-3xl font-bold">Candidates</h1>

          <p className="text-muted-foreground">Manage registered candidates</p>
        </div>

        <Input
          className="w-80"
          placeholder="Search candidate..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>

                <TableHead>Email</TableHead>

                <TableHead>Country</TableHead>

                <TableHead>Experience</TableHead>

                <TableHead>Status</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((candidate) => (
                <TableRow
                  key={candidate.id}
                  className="cursor-pointer"
                  onClick={() =>
                    navigate({
                      to: `/Admin/candidates/${candidate.id}`,
                    })
                  }
                >
                  <TableCell>{candidate.name}</TableCell>

                  <TableCell>{candidate.email}</TableCell>

                  <TableCell>{candidate.country}</TableCell>

                  <TableCell>{candidate.experience}</TableCell>

                  <TableCell>
                    <Badge>{candidate.status}</Badge>
                  </TableCell>

                  <TableCell className="space-x-2 text-right" onClick={(e) => e.stopPropagation()}>
                    <Button size="sm" variant="secondary" onClick={() => activate(candidate.id)}>
                      Activate
                    </Button>

                    <Button size="sm" variant="destructive" onClick={() => suspend(candidate.id)}>
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
