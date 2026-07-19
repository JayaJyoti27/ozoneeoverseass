import { companyDocuments } from "./mock";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

export function DocumentsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Documents</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>

              <TableHead>Category</TableHead>

              <TableHead>Status</TableHead>

              <TableHead>Expiry</TableHead>

              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {companyDocuments.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{doc.name}</p>

                    <p className="text-sm text-muted-foreground">Uploaded by {doc.uploadedBy}</p>
                  </div>
                </TableCell>

                <TableCell>{doc.category}</TableCell>

                <TableCell>
                  <Badge>{doc.status}</Badge>
                </TableCell>

                <TableCell>{doc.expiresAt}</TableCell>

                <TableCell>
                  <Button size="sm" variant="outline">
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
