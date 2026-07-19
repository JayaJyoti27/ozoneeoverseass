import { Link, useRouterState } from "@tanstack/react-router";
import { EMPLOYER_NAVIGATION } from "./navigation";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <aside className="flex h-screen w-72 shrink-0 border-r bg-background">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Ozone Overseas</h1>
            <p className="text-xs text-muted-foreground">Employer Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-1">
          {EMPLOYER_NAVIGATION.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5" />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t p-5">
          <div className="rounded-xl border bg-muted/40 p-4">
            <p className="text-sm font-semibold">Employer Portal</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Recruitment & Deployment Management
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
