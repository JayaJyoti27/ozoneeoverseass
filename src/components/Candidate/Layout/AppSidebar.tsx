import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, LogOut, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { logout } from "@/lib/supabase";

export interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

interface Props {
  items: SidebarItem[];
  title: string;
  user: {
    name: string;
    email: string;
  };
}

export default function AppSidebar({ items, title, user }: Props) {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  async function handleLogout() {
    await logout();
    navigate({ to: "/candidate" });
  }

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-white transition-all duration-300",
        collapsed ? "w-20" : "w-72",
      )}
    >
      {/* Brand block */}
      <div className={cn("flex items-center gap-3 px-6 py-6", collapsed && "justify-center px-0")}>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-white">
          <ShieldCheck size={18} />
        </span>

        {!collapsed && (
          <div className="flex-1 leading-tight">
            <h1 className="font-display text-lg font-bold text-navy">
              Ozone <span className="text-blue">Overseas</span>
            </h1>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-blue">{title}</p>
          </div>
        )}

        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-ink hover:bg-blue-wash hover:text-navy"
            onClick={() => setCollapsed(true)}
          >
            <ChevronLeft size={18} />
          </Button>
        )}
      </div>

      {collapsed && (
        <div className="flex justify-center pb-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-ink hover:bg-blue-wash hover:text-navy"
            onClick={() => setCollapsed(false)}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      )}

      <div className="mx-6 h-px bg-border" />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                collapsed && "justify-center px-0",
                active
                  ? "bg-blue-wash text-navy"
                  : "text-ink hover:bg-blue-wash/60 hover:text-navy",
              )}
            >
              {active && !collapsed && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-blue" />
              )}

              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-lg transition",
                  active ? "bg-navy text-white" : "bg-blue-wash text-blue group-hover:bg-blue-soft",
                )}
              >
                <Icon size={16} />
              </span>

              {!collapsed && (
                <>
                  <span className="flex-1">{item.title}</span>

                  {!!item.badge && (
                    <span className="rounded-full bg-gold px-2 py-0.5 text-[11px] font-bold text-navy">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy font-display text-xs font-bold text-white">
            {user.name
              .split(" ")
              .map((x) => x[0])
              .slice(0, 2)
              .join("")}
          </span>

          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate font-medium text-navy">{user.name}</p>
              <p className="truncate text-xs text-ink">{user.email}</p>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "mt-4 w-full text-ink hover:bg-blue-wash hover:text-navy",
            collapsed ? "justify-center px-0" : "justify-start",
          )}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </aside>
  );
}
