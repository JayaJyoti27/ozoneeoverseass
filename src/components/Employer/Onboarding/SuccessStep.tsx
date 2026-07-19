import { BadgeCheck, Clock3, Mail, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function SuccessStep() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 text-center">
      <div className="flex justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
          <BadgeCheck className="h-12 w-12 text-green-600" />
        </div>
      </div>

      <div>
        <h1 className="text-4xl font-bold">Application Submitted</h1>

        <p className="mt-3 text-muted-foreground">
          Thank you for registering your company. Our operations team will review your application
          before activating your employer account.
        </p>
      </div>

      <div className="flex justify-center">
        <Badge variant="secondary" className="px-4 py-2 text-sm">
          <Clock3 className="mr-2 h-4 w-4" />
          Pending Verification
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What happens next?</CardTitle>

          <CardDescription>Average review time: 1–3 business days</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <BadgeCheck className="mt-1 h-6 w-6 text-green-600" />

            <div className="text-left">
              <h3 className="font-semibold">Application Received</h3>

              <p className="text-sm text-muted-foreground">
                We've securely received your registration details.
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex items-start gap-4">
            <ShieldCheck className="mt-1 h-6 w-6 text-primary" />

            <div className="text-left">
              <h3 className="font-semibold">Company Verification</h3>

              <p className="text-sm text-muted-foreground">
                Our team will verify your company registration and supporting documents.
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex items-start gap-4">
            <Mail className="mt-1 h-6 w-6 text-primary" />

            <div className="text-left">
              <h3 className="font-semibold">Email Notification</h3>

              <p className="text-sm text-muted-foreground">
                You'll receive an email once your company has been approved or if we require
                additional information.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-xl border bg-muted/40 p-6 text-left">
        <h2 className="font-semibold">After approval you'll be able to:</h2>

        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
          <li>✅ Create Job Orders</li>

          <li>✅ Search Candidates</li>

          <li>✅ Schedule Interviews</li>

          <li>✅ Track Deployments</li>

          <li>✅ Manage Recruitment Team</li>

          <li>✅ Receive Real-time Notifications</li>
        </ul>
      </div>

      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Button asChild size="lg">
          <Link to="/">Go to Login</Link>
        </Button>

        <Button asChild variant="outline" size="lg">
          <Link to="/">Track Application</Link>
        </Button>
      </div>
    </div>
  );
}
