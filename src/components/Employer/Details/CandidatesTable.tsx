import { Eye } from "lucide-react";

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

const candidates = [
  {
    id: "CAN-101",
    name: "Rahul Sharma",
    nationality: "India",
    experience: "5 Years",
    status: "Shortlisted",
  },
  {
    id: "CAN-102",
    name: "Anjali Singh",
    nationality: "India",
    experience: "4 Years",
    status: "Interview",
  },
  {
    id: "CAN-103",
    name: "Priya Patel",
    nationality: "India",
    experience: "6 Years",
    status: "Selected",
  },
];

export function CandidatesTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shortlisted Candidates</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>

              <TableHead>Name</TableHead>

              <TableHead>Nationality</TableHead>

              <TableHead>Experience</TableHead>

              <TableHead>Status</TableHead>

              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>{candidate.id}</TableCell>

                <TableCell className="font-medium">{candidate.name}</TableCell>

                <TableCell>{candidate.nationality}</TableCell>

                <TableCell>{candidate.experience}</TableCell>

                <TableCell>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {candidate.status}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
