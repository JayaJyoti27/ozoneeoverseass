import { Dispatch, SetStateAction } from "react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

import { EmployerRegistrationForm } from "./types";

import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  form: EmployerRegistrationForm;
  setForm: Dispatch<SetStateAction<EmployerRegistrationForm>>;
  next: () => void;
  back: () => void;
}

export function CompanyAddressStep({ form, setForm, next, back }: Props) {
  return (
    <div className="space-y-8">
      <CardHeader className="px-0">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
          <MapPin className="h-7 w-7 text-primary" />
        </div>

        <CardTitle className="text-3xl">Company Address</CardTitle>

        <CardDescription>Enter your registered business address.</CardDescription>
      </CardHeader>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Country *</Label>

          <Input
            placeholder="Saudi Arabia"
            value={form.country}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                country: e.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>State / Province *</Label>

          <Input
            placeholder="Riyadh"
            value={form.state}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                state: e.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>City *</Label>

          <Input
            placeholder="Riyadh"
            value={form.city}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                city: e.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Postal Code *</Label>

          <Input
            placeholder="11461"
            value={form.postalCode}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                postalCode: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Registered Office Address *</Label>

        <Textarea
          rows={5}
          placeholder="Street, Building Number, Area..."
          value={form.address}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              address: e.target.value,
            }))
          }
        />
      </div>

      <div className="rounded-xl border bg-muted/30 p-6">
        <h3 className="font-semibold">Address Verification</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          This address may be verified during company approval. Please ensure it matches your
          registration documents.
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
