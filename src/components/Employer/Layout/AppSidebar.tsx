import { Link, useRouterState } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { EMPLOYER_NAVIGATION } from "./navigation";

export function AppSidebar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <aside className="flex w-72 flex-col border-r border-border bg-white">
      {/* Brand block */}
      <div className="flex items-center gap-3 px-6 py-6">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-white">
          <ShieldCheck size={18} />
        </span>
        <div className="leading-tight">
          <h1 className="font-display text-lg font-bold text-navy">
            Ozone <span className="text-blue">Overseas</span>
          </h1>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-blue">
            Employer Portal
          </p>
        </div>
      </div>

      <div className="mx-6 h-px bg-border" />

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-4">
        {EMPLOYER_NAVIGATION.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition
              ${
                active ? "bg-blue-wash text-navy" : "text-ink hover:bg-blue-wash/60 hover:text-navy"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-blue" />
              )}
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition ${
                  active ? "bg-navy text-white" : "bg-blue-wash text-blue group-hover:bg-blue-soft"
                }`}
              >
                <Icon size={16} />
              </span>
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="m-4 rounded-2xl bg-blue-wash p-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Recruitment & Deployment
        </div>
        <p className="mt-1 text-[11px] text-ink">Manage requirements, job orders, and candidates</p>
      </div>
    </aside>
  );
}
