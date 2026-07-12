import { useRouterState } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const titles: Record<string, string> = {
  "/employer/dashboard": "Dashboard",
  "/employer/my-company": "My Company",
  "/employer/requirements": "Hiring Requirements",
  "/employer/jobs": "My Jobs",
  "/employer/applications": "Applications",
  "/employer/candidates": "Candidate Search",
  "/employer/settings": "Settings",
};

export function Topbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const title = titles[pathname] ?? "Employer Portal";

  return (
    <header className="sticky top-0 z-20 border-b border-[color:var(--brand-soft)] bg-white/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-8">
        <h1 className="font-display text-xl font-bold text-[color:var(--navy)]">{title}</h1>
        <div className="flex items-center gap-3">
          <button
            aria-label="Notifications"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl text-[color:var(--navy)] hover:bg-[color:var(--lightblue)]"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[color:var(--gold)]" />
          </button>
          <Avatar>
            <AvatarFallback>DC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
