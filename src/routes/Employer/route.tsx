import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/Employer/Layout/AppShell";

export const Route = createFileRoute("/Employer")({
  component: EmployerLayout,
});

function EmployerLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
