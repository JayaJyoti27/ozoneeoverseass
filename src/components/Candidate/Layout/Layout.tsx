import { Outlet, createFileRoute } from "@tanstack/react-router";

import AppShell from "@/components/Candidate/Layout/AppShell";
import { candidateNavigation } from "@/components/Candidate/Layout/navigation";

export const Route = createFileRoute("/")({
  component: CandidateLayout,
});

function CandidateLayout() {
  return (
    <AppShell
      title="Candidate Portal"
      items={candidateNavigation}
      user={{
        name: "Candidate",
        email: "candidate@example.com",
      }}
    >
      <Outlet />
    </AppShell>
  );
}
