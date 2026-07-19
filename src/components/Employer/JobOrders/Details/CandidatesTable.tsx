import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CandidatesTable() {
  const candidates = [
    {
      id: "C-101",
      name: "Rahul Sharma",
      status: "Interview",
    },
    {
      id: "C-102",
      name: "Priya Verma",
      status: "Selected",
    },
    {
      id: "C-103",
      name: "Amit Kumar",
      status: "Screening",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidates</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>{candidate.id}</TableCell>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
