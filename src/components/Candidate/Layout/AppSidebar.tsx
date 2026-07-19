import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

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

  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "border-r bg-background transition-all duration-300",
        collapsed ? "w-20" : "w-72",
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-xs text-muted-foreground">Recruitment Portal</p>
          </div>
        )}

        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      {/* Navigation */}
      <div className="h-[calc(100vh-170px)] overflow-y-auto p-3">
        <div className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center rounded-xl px-3 py-3 transition-colors",
                  active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                <Icon className="h-5 w-5" />

                {!collapsed && (
                  <>
                    <span className="ml-3 flex-1">{item.title}</span>

                    {item.badge && (
                      <span className="rounded-full bg-primary px-2 py-1 text-xs">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((x) => x[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate font-medium">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
          )}
        </div>

        <Button variant="ghost" className="mt-4 w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </aside>
  );
}
