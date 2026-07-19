import { Dispatch, SetStateAction } from "react";
import { ArrowLeft, ArrowRight, UserRound } from "lucide-react";

import { EmployerRegistrationForm } from "./types";

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  form: EmployerRegistrationForm;
  setForm: Dispatch<SetStateAction<EmployerRegistrationForm>>;
  next: () => void;
  back: () => void;
}

export function ContactInformationStep({ form, setForm, next, back }: Props) {
  return (
    <div className="space-y-8">
      <CardHeader className="px-0">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
          <UserRound className="h-7 w-7 text-primary" />
        </div>

        <CardTitle className="text-3xl">Contact Information</CardTitle>

        <CardDescription>Who should we contact regarding recruitment?</CardDescription>
      </CardHeader>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Contact Person *</Label>

          <Input
            placeholder="John Smith"
            value={form.contactPerson}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                contactPerson: e.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Designation *</Label>

          <Input
            placeholder="HR Manager"
            value={form.designation}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                designation: e.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Phone Number *</Label>

          <Input
            placeholder="+91 9876543210"
            value={form.phone}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Alternate Phone</Label>

          <Input
            placeholder="+91 9876543211"
            value={form.alternatePhone}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                alternatePhone: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <div className="rounded-xl border bg-muted/30 p-6">
        <h3 className="font-semibold">Why do we need this?</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Our recruitment team will communicate with this person regarding candidate shortlists,
          interviews, documentation, visa processing and deployment updates.
        </p>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={back}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button onClick={next}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
