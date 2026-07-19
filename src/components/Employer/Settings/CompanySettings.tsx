import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

export function CompanySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Company Name</Label>

            <Input defaultValue="ABC Healthcare" />
          </div>

          <div>
            <Label>Industry</Label>

            <Input defaultValue="Healthcare" />
          </div>
        </div>

        <Button>Update Company</Button>
      </CardContent>
    </Card>
  );
}
