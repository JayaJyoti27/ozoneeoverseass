import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

export function ProfileSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Full Name</Label>

            <Input defaultValue="John Smith" />
          </div>

          <div>
            <Label>Email</Label>

            <Input defaultValue="john@company.com" />
          </div>
        </div>

        <div>
          <Label>Phone Number</Label>

          <Input defaultValue="+91 9876543210" />
        </div>

        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
