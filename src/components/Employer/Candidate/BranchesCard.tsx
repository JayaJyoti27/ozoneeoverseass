import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";

export function BranchesCard() {
  const branches = [
    {
      id: 1,
      name: "Riyadh Headquarters",
      country: "Saudi Arabia",
      employees: 180,
      status: "Active",
    },
    {
      id: 2,
      name: "Jeddah Branch",
      country: "Saudi Arabia",
      employees: 65,
      status: "Active",
    },
    {
      id: 3,
      name: "Dubai Office",
      country: "UAE",
      employees: 28,
      status: "Active",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Branches</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {branches.map((branch) => (
          <div key={branch.id} className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground" />

              <div>
                <h3 className="font-medium">{branch.name}</h3>

                <p className="text-sm text-muted-foreground">{branch.country}</p>

                <p className="text-xs text-muted-foreground">{branch.employees} Employees</p>
              </div>
            </div>

            <Badge>{branch.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
