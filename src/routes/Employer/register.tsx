import { createFileRoute } from "@tanstack/react-router";

import { EmployerOnboarding } from "@/components/Employer/Onboarding/EmployerOnboarding";

export const Route = createFileRoute("/Employer/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return <EmployerOnboarding />;
}
