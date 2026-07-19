import { createFileRoute } from "@tanstack/react-router";

import { CompanyInformationCard } from "@/components/Employer/Company/CompanyInformationCard";
import { HRContactCard } from "@/components/Employer/Company/HRContactCard";
import { BranchesCard } from "@/components/Employer/Company/BranchesCard";
import { DocumentsCard } from "@/components/Employer/Company/DocumentsCard";

export const Route = createFileRoute("/Employer/company")({
  component: CompanyProfilePage,
});

function CompanyProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Company Profile</h1>

        <p className="text-muted-foreground">
          Manage your company information and required documents.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <CompanyInformationCard />

        <HRContactCard />
      </div>

      <BranchesCard />

      <DocumentsCard />
    </div>
  );
}
