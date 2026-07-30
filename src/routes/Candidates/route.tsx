import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import AppShell from "@/components/Candidate/Layout/AppShell";
import { candidateNavigation } from "@/components/Candidate/Layout/navigation";
import { getCurrentProfile } from "@/lib/supabase";

export const Route = createFileRoute("/Candidates")({
  beforeLoad: async () => {
    const profile = await getCurrentProfile();

    if (!profile || profile.role !== "candidate") {
      throw redirect({ to: "/candidate" });
    }

    return { profile };
  },
  component: CandidatesLayout,
});

function CandidatesLayout() {
  const { profile } = Route.useRouteContext();

  return (
    <AppShell
      title="Candidate Portal"
      items={candidateNavigation}
      user={{
        name: profile.full_name ?? "Candidate",
        email: profile.email,
      }}
    >
      <Outlet />
    </AppShell>
  );
}
