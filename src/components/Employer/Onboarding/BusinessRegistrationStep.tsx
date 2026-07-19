import { Dispatch, SetStateAction } from "react";
import { ArrowLeft, ArrowRight, FileBadge2 } from "lucide-react";

import { EmployerRegistrationForm } from "./types";

import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  form: EmployerRegistrationForm;
  setForm: Dispatch<SetStateAction<EmployerRegistrationForm>>;
  next: () => void;
  back: () => void;
}

const companyTypes = [
  "Private Limited",
  "Public Limited",
  "Government",
  "Partnership",
  "Sole Proprietorship",
  "NGO",
  "Other",
];

export function BusinessRegistrationStep({ form, setForm, next, back }: Props) {
  return (
    <div className="space-y-8">
      <CardHeader className="px-0">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
          <FileBadge2 className="h-7 w-7 text-primary" />
        </div>

        <CardTitle className="text-3xl">Business Registration</CardTitle>

        <CardDescription>Provide your legal business registration details.</CardDescription>
      </CardHeader>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Company Type *</Label>

          <Select
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                companyType: value,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Company Type" />
            </SelectTrigger>

            <SelectContent>
              {companyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Registration Number *</Label>

          <Input
            value={form.registrationNumber}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                registrationNumber: e.target.value,
              }))
            }
            placeholder="CR-2026-123456"
          />
        </div>

        <div className="space-y-2">
          <Label>Tax / VAT Number</Label>

          <Input
            value={form.taxNumber}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                taxNumber: e.target.value,
              }))
            }
            placeholder="VAT123456789"
          />
        </div>

        <div className="space-y-2">
          <Label>Business License Number</Label>

          <Input
            value={form.licenseNumber}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                licenseNumber: e.target.value,
              }))
            }
            placeholder="LIC-987654"
          />
        </div>

        <div className="space-y-2">
          <Label>License Expiry Date</Label>

          <Input
            type="date"
            value={form.licenseExpiry}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                licenseExpiry: e.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Issuing Authority</Label>

          <Input
            value={form.issuingAuthority}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                issuingAuthority: e.target.value,
              }))
            }
            placeholder="Ministry of Commerce"
          />
        </div>
      </div>

      <div className="rounded-xl border bg-muted/30 p-6">
        <h3 className="font-semibold">Verification Notice</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          These details will be verified by our operations team before your organization is approved
          to submit job orders.
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
