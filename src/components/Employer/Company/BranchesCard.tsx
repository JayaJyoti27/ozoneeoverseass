import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Building2 } from "lucide-react";

import { branches } from "./mock";

export function BranchesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Branches</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {branches.map((branch) => (
          <div key={branch.id} className="rounded-xl border p-5 transition hover:border-primary">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-3">
                <Building2 className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h3 className="font-semibold">{branch.city}</h3>

                <p className="text-sm text-muted-foreground">Branch Office</p>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">Employees</div>

            <div className="mt-1 text-3xl font-bold">{branch.employees}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
