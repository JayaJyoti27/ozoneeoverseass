import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CompanyInformationCard() {
  const company = {
    name: "ABC Healthcare",
    industry: "Healthcare",
    country: "Saudi Arabia",
    employees: "250+",
    registration: "REG-2026-001",
    website: "www.abchealthcare.com",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-5 md:grid-cols-2">
        <Info label="Company Name" value={company.name} />
        <Info label="Industry" value={company.industry} />
        <Info label="Country" value={company.country} />
        <Info label="Employees" value={company.employees} />
        <Info label="Registration No." value={company.registration} />
        <Info label="Website" value={company.website} />
      </CardContent>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
