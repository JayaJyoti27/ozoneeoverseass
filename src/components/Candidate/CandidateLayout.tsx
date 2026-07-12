import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  User,
  ClipboardList,
  FileText,
  FolderCheck,
  Bookmark,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { candidate, notifications } from "@/lib/candidate/candidate-mock";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/candidate/dashboard", label: "Dashboard", icon: LayoutDashboard, star: false },
  { to: "/candidate/profile", label: "My Profile", icon: User, star: false },
  { to: "/candidate/applications", label: "My Applications", icon: ClipboardList, star: false },
  { to: "/candidate/resume", label: "Resume", icon: FileText, star: false },
  { to: "/candidate/documents", label: "Documents", icon: FolderCheck, star: true },
  { to: "/candidate/saved-jobs", label: "Saved Jobs", icon: Bookmark, star: false },
  { to: "/candidate/notifications", label: "Notifications", icon: Bell, star: false },
  { to: "/candidate/settings", label: "Settings", icon: Settings, star: false },
] as const;

const MOBILE_NAV = [
  { to: "/candidate/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/candidate/applications", label: "Apps", icon: ClipboardList },
  { to: "/candidate/documents", label: "Docs", icon: FolderCheck },
  { to: "/candidate/saved-jobs", label: "Jobs", icon: Bookmark },
  { to: "/candidate/profile", label: "Profile", icon: User },
];

function pageMeta(pathname: string) {
  const item = NAV.find((n) => pathname.startsWith(n.to));
  if (pathname.startsWith("/candidate/applications/")) {
    return { title: "Application Detail", crumbs: ["Candidate", "Applications", "Detail"] };
  }
  return {
    title: item?.label ?? "Dashboard",
    crumbs: ["Candidate", item?.label ?? "Dashboard"],
  };
}

export function CandidateLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const meta = pageMeta(pathname);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[var(--ozone-surface)]">
      {/* Sidebar — desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col bg-[var(--ozone-navy)] text-white md:flex">
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-[var(--ozone-gold)] text-[var(--ozone-navy)] font-display font-bold">
              O
            </div>
            <div className="min-w-0">
              <p className="font-display text-base font-bold leading-tight">Ozone Overseas</p>
              <p className="text-[11px] uppercase tracking-wider text-[var(--ozone-gold)]/80">
                Candidate Portal
              </p>
            </div>
          </div>
        </div>
        <div className="mx-5 h-px bg-[var(--ozone-gold)]/40" />

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {NAV.map(({ to, label, icon: Icon, star }) => {
              const active =
                pathname === to || (to !== "/candidate/dashboard" && pathname.startsWith(to));
              return (
                <li key={to}>
                  <Link
                    to="/"
                    className={cn(
                      "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-white/10 text-white before:absolute before:inset-y-1.5 before:left-0 before:w-[3px] before:rounded-full before:bg-[var(--ozone-gold)]"
                        : "text-white/60 hover:bg-white/5 hover:text-white/90",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{label}</span>
                    {star && <span className="ml-auto text-[var(--ozone-gold)]">★</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mx-5 h-px bg-white/10" />
        <div className="px-5 py-4">
          <p className="truncate text-sm font-medium">{candidate.fullName}</p>
          <p className="text-[11px] uppercase tracking-wider text-white/40">Candidate Account</p>
          <button className="mt-3 inline-flex items-center gap-1.5 text-xs text-rose-300/80 hover:text-rose-200">
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </div>
      </aside>

      {/* Top bar */}
      <div className="md:pl-60">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-white px-4 md:px-8">
          <div className="min-w-0">
            <h1 className="truncate font-display text-lg font-bold text-[var(--ozone-navy)]">
              {meta.title}
            </h1>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
              {meta.crumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="h-3 w-3" />}
                  {c}
                </span>
              ))}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="relative grid h-9 w-9 place-items-center rounded-full border border-border bg-white text-[var(--ozone-navy)] hover:bg-muted"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-[16px] place-items-center rounded-full bg-[var(--ozone-gold)] px-1 text-[10px] font-bold text-[var(--ozone-navy)]">
                  {unread}
                </span>
              )}
            </Link>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ozone-blue)] text-xs font-semibold text-white">
                {candidate.initials}
              </div>
              <span className="hidden text-sm font-medium text-[var(--ozone-navy)] sm:inline">
                {candidate.fullName.split(" ")[0]}
              </span>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 pb-24 md:px-8 md:pb-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-white md:hidden">
        {MOBILE_NAV.map(({ to, label, icon: Icon }) => {
          const active = pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px]",
                active ? "text-[var(--ozone-navy)]" : "text-muted-foreground",
              )}
            >
              <Icon className={cn("h-5 w-5", active && "text-[var(--ozone-blue)]")} />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
