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

        {/* Backend doesn't provide these yet */}
        <Info label="City" value="—" />
        <Info label="Employees" value="—" />
        <Info label="Website" value="—" />
        <Info label="License" value="—" />
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
