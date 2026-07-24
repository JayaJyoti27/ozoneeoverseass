import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getProfile } from "@/lib/employer/api";

type CompanyProfile = {
  company_name: string;
  industry: string;
  country: string;
  contact_person: string;
  status: string;
  approval_status: string;
  logo_url: string | null;
  head_office: string | null;
  employee_count: number | null;
  website: string | null;
  license_number: string | null;
};

export function CompanyInformationCard() {
  const [company, setCompany] = useState<CompanyProfile | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProfile();
        setCompany(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  if (!company) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>

        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Info label="Company" value={company.company_name} />
        <Info label="Industry" value={company.industry} />
        <Info label="Country" value={company.country} />
        <Info label="Contact Person" value={company.contact_person} />
        <Info label="Status" value={company.status} />
        <Info label="Approval" value={company.approval_status} />

        <Info label="City" value={company.head_office ?? "—"} />
        <Info
          label="Employees"
          value={company.employee_count != null ? String(company.employee_count) : "—"}
        />
        <Info label="Website" value={company.website ?? "—"} />
        <Info label="License" value={company.license_number ?? "—"} />
      </CardContent>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
