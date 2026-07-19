import { Dispatch, SetStateAction } from "react";
import { ArrowRight, Building2, Upload } from "lucide-react";

import { EmployerRegistrationForm } from "./types";

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
}

const industries = [
  "Healthcare",
  "Construction",
  "Hospitality",
  "Oil & Gas",
  "Manufacturing",
  "Retail",
  "Logistics",
  "Education",
  "Information Technology",
  "Other",
];

const companySizes = ["1 - 10", "11 - 50", "51 - 200", "201 - 500", "500+"];

export function CompanyInformationStep({ form, setForm, next }: Props) {
  return (
    <div className="space-y-8">
      <CardHeader className="px-0">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
          <Building2 className="h-7 w-7 text-primary" />
        </div>

        <CardTitle className="text-3xl">Company Information</CardTitle>

        <CardDescription>Tell us about your organization.</CardDescription>
      </CardHeader>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Company Name *</Label>

          <Input
            value={form.companyName}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                companyName: e.target.value,
              }))
            }
            placeholder="ABC Healthcare"
          />
        </div>

        <div className="space-y-2">
          <Label>Company Email *</Label>

          <Input
            type="email"
            value={form.companyEmail}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                companyEmail: e.target.value,
              }))
            }
            placeholder="contact@company.com"
          />
        </div>

        <div className="space-y-2">
          <Label>Website</Label>

          <Input
            value={form.website}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                website: e.target.value,
              }))
            }
            placeholder="https://company.com"
          />
        </div>

        <div className="space-y-2">
          <Label>Industry *</Label>

          <Select
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                industry: value,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>

            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Company Size *</Label>

          <Select
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                companySize: value,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>

            <SelectContent>
              {companySizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Established Year</Label>

          <Input
            type="number"
            value={form.establishedYear}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                establishedYear: e.target.value,
              }))
            }
            placeholder="2010"
          />
        </div>
      </div>

      <div className="rounded-xl border-2 border-dashed p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="rounded-full bg-primary/10 p-4">
            <Upload className="h-6 w-6 text-primary" />
          </div>

          <div className="text-center">
            <p className="font-medium">Upload Company Logo</p>

            <p className="text-sm text-muted-foreground">PNG, JPG or SVG up to 5MB</p>
          </div>

          <Input type="file" className="max-w-sm" />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={next}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
