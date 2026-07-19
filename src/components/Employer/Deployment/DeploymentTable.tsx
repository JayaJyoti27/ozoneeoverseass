import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

import { getDeployments } from "@/lib/employer/api";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

type Deployment = {
  id: string;
  candidate_name?: string;
  candidate?: string;
  position?: string;
  job_title?: string;
  country?: string;
  visa_status?: string;
  visa?: string;
  medical_status?: string;
  medical?: string;
  flight_date?: string;
  flight?: string;
  status?: string;
};

export function DeploymentTable() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getDeployments();

        setDeployments(Array.isArray(data) ? data : (data.data ?? []));
      } catch (err) {
        console.error("Failed to load deployments", err);
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
          <CardTitle>Deployment Pipeline</CardTitle>
        </CardHeader>

        <CardContent>Loading deployments...</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployment Pipeline</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Visa</TableHead>
              <TableHead>Medical</TableHead>
              <TableHead>Flight</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {deployments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No Deployments Found
                </TableCell>
              </TableRow>
            ) : (
              deployments.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.candidate_name ?? item.candidate ?? "-"}
                  </TableCell>

                  <TableCell>{item.position ?? item.job_title ?? "-"}</TableCell>

                  <TableCell>{item.country ?? "-"}</TableCell>

                  <TableCell>{item.visa_status ?? item.visa ?? "-"}</TableCell>

                  <TableCell>{item.medical_status ?? item.medical ?? "-"}</TableCell>

                  <TableCell>{item.flight_date ?? item.flight ?? "-"}</TableCell>

                  <TableCell>{item.status ?? "-"}</TableCell>

                  <TableCell>
                    <Button variant="outline" size="sm">
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
