import { ShieldCheck } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>

          <CardDescription>Update your account password.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label>Current Password</Label>

            <Input type="password" placeholder="••••••••" />
          </div>

          <div>
            <Label>New Password</Label>

            <Input type="password" placeholder="••••••••" />
          </div>

          <div>
            <Label>Confirm Password</Label>

            <Input type="password" placeholder="••••••••" />
          </div>

          <Button>Update Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>

          <CardDescription>Protect your account with an extra layer of security.</CardDescription>
        </CardHeader>

        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-primary" />

            <div>
              <p className="font-medium">Enable 2FA</p>

              <p className="text-sm text-muted-foreground">Receive OTP during login.</p>
            </div>
          </div>

          <Switch />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>

          <CardDescription>Devices currently signed in.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Chrome • Windows</p>

              <p className="text-sm text-muted-foreground">Delhi, India • Active Now</p>
            </div>

            <Button variant="outline">Sign Out</Button>
          </div>

          <div className="flex justify-end">
            <Button variant="destructive">Sign Out All Devices</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
