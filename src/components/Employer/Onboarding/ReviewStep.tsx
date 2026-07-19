import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { EmployerRegistrationForm } from "./types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Props {
  form: EmployerRegistrationForm;
  next: () => void;
  back: () => void;
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function ReviewStep({ form, next, back }: Props) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="space-y-8">
      <CardHeader className="px-0">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
          <CheckCircle2 className="h-7 w-7 text-primary" />
        </div>

        <CardTitle className="text-3xl">Review Your Information</CardTitle>

        <CardDescription>
          Please verify everything before submitting your company for approval.
        </CardDescription>
      </CardHeader>

      <ReviewSection title="Company Information">
        <div className="grid gap-4 md:grid-cols-2">
          <p>
            <strong>Company:</strong> {form.companyName}
          </p>

          <p>
            <strong>Email:</strong> {form.companyEmail}
          </p>

          <p>
            <strong>Website:</strong> {form.website}
          </p>

          <p>
            <strong>Industry:</strong> {form.industry}
          </p>

          <p>
            <strong>Company Size:</strong> {form.companySize}
          </p>

          <p>
            <strong>Established:</strong> {form.establishedYear}
          </p>
        </div>
      </ReviewSection>

      <ReviewSection title="Primary Contact">
        <div className="grid gap-4 md:grid-cols-2">
          <p>
            <strong>Name:</strong> {form.contactPerson}
          </p>

          <p>
            <strong>Designation:</strong> {form.designation}
          </p>

          <p>
            <strong>Phone:</strong> {form.phone}
          </p>

          <p>
            <strong>Alternate Phone:</strong> {form.alternatePhone}
          </p>
        </div>
      </ReviewSection>

      <ReviewSection title="Company Address">
        <div className="grid gap-4 md:grid-cols-2">
          <p>
            <strong>Country:</strong> {form.country}
          </p>

          <p>
            <strong>State:</strong> {form.state}
          </p>

          <p>
            <strong>City:</strong> {form.city}
          </p>

          <p>
            <strong>Postal Code:</strong> {form.postalCode}
          </p>
        </div>

        <div className="mt-4">
          <p>
            <strong>Address</strong>
          </p>

          <p className="text-muted-foreground">{form.address}</p>
        </div>
      </ReviewSection>

      <ReviewSection title="Business Registration">
        <div className="grid gap-4 md:grid-cols-2">
          <p>
            <strong>Company Type:</strong> {form.companyType}
          </p>

          <p>
            <strong>Registration Number:</strong> {form.registrationNumber}
          </p>

          <p>
            <strong>VAT Number:</strong> {form.taxNumber}
          </p>

          <p>
            <strong>License:</strong> {form.licenseNumber}
          </p>

          <p>
            <strong>Expiry:</strong> {form.licenseExpiry}
          </p>

          <p>
            <strong>Authority:</strong> {form.issuingAuthority}
          </p>
        </div>
      </ReviewSection>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Checkbox checked={accepted} onCheckedChange={(value) => setAccepted(Boolean(value))} />

            <Label className="leading-6">
              I confirm that the information provided is accurate and I agree to the Terms &
              Conditions and Privacy Policy.
            </Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={back}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button disabled={!accepted} onClick={next}>
          Submit Application
        </Button>
      </div>
    </div>
  );
}
