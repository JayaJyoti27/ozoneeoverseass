import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Search, ChevronRight, UserCircle2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PAGE_TITLES: Record<string, string> = {
  "/Employer/dashboard": "Dashboard",
  "/Employer/company": "Company Profile",
  "/Employer/job-orders": "Job Orders",
  "/Employer/candidates": "Candidates",
  "/Employer/interviews": "Interviews",
  "/Employer/deployment": "Deployment",
  "/Employer/notifications": "Notifications",
  "/Employer/settings": "Settings",
};

export function AppTopbar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const pageTitle = PAGE_TITLES[pathname] ?? "Employer Portal";

  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-background">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/Employer/dashboard" className="hover:text-foreground">
              Employer
            </Link>

            <ChevronRight className="h-4 w-4" />

            <span>{pageTitle}</span>
          </div>

          <h1 className="text-xl font-semibold">{pageTitle}</h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Search */}

          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input placeholder="Search..." className="w-72 pl-9" />
          </div>

          {/* Notifications */}

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          {/* Employer */}

          <Button variant="outline" className="gap-3">
            <UserCircle2 className="h-5 w-5" />

            <div className="hidden text-left lg:block">
              <p className="text-sm font-medium">ABC Company</p>

              <p className="text-xs text-muted-foreground">Employer</p>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
