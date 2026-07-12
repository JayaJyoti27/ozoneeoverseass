import { Link, useRouterState, Outlet } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Briefcase,
  User,
  Building2,
  FileText,
  Mail,
  Globe,
  FileEdit,
  TrendingUp,
  Settings,
  GitBranch,
  Bell,
  Search,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, type ReactNode } from "react";

const NAV = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { to: "/admin/candidates", label: "Candidates", icon: User },
  { to: "/admin/employers", label: "Employers", icon: Building2 },
  { to: "/admin/applications", label: "Applications", icon: FileText },
  { to: "/admin/leads", label: "Leads", icon: Mail },
  { to: "/admin/countries", label: "Countries", icon: Globe },
  { to: "/admin/content", label: "Content", icon: FileEdit },
  { to: "/admin/analytics", label: "Analytics", icon: TrendingUp },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const PAGE_TITLES: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/jobs": "Jobs",
  "/admin/candidates": "Candidates",
  "/admin/employers": "Employers",
  "/admin/applications": "Applications",
  "/admin/leads": "Leads",
  "/admin/countries": "Countries",
  "/admin/content": "Content",
  "/admin/analytics": "Analytics",
  "/admin/pipeline": "Recruitment Pipeline",
  "/admin/settings": "Settings",
};

export function AdminLayout() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const title = PAGE_TITLES[pathname] ?? "Admin";

  return (
    <div className="min-h-screen flex bg-[color:var(--color-brand-surface)] font-sans">
      <Sidebar pathname={pathname} />
      <div className="flex-1 flex flex-col min-w-0 ml-[240px]">
        <Topbar title={title} pathname={pathname} />
        <main className="flex-1 px-8 py-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function Sidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="fixed inset-y-0 left-0 w-[240px] bg-[color:var(--color-brand-navy)] flex flex-col z-20">
      <div className="px-5 py-5 flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-[color:var(--color-brand-gold)] flex items-center justify-center text-[color:var(--color-brand-navy)] font-extrabold text-lg">
          O
        </div>
        <div className="text-white font-bold tracking-tight">Ozone Admin</div>
      </div>

      <nav className="flex-1 px-3 mt-2 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => {
          const active = pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-white/10 text-white border-l-2 border-[color:var(--color-brand-gold)] pl-[10px]"
                  : "text-white/60 hover:text-white/90 hover:bg-white/5",
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
        <div className="pt-3 mt-3 border-t border-white/10">
          <Link
            to="/Admin/pipeline"
            className={cn(
              "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
              pathname.startsWith("/admin/pipeline")
                ? "bg-white/10 text-white border-l-2 border-[color:var(--color-brand-gold)] pl-[10px]"
                : "text-[color:var(--color-brand-gold)] hover:bg-white/5",
            )}
          >
            <GitBranch className="h-4 w-4 shrink-0" />
            <span className="font-semibold">Pipeline</span>
            <span className="ml-auto text-[10px] uppercase tracking-wider text-[color:var(--color-brand-gold)]/70">
              Live
            </span>
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="text-white/40 text-xs mb-2 truncate">admin@ozoneoverseas.com</div>
        <button className="flex items-center gap-2 text-rose-400/80 hover:text-rose-300 text-xs font-medium">
          <LogOut className="h-3.5 w-3.5" /> Logout
        </button>
      </div>
    </aside>
  );
}

function Topbar({ title, pathname }: { title: string; pathname: string }) {
  return (
    <header className="sticky top-0 z-10 h-16 bg-white border-b border-[color:var(--color-brand-border)] flex items-center px-8 gap-6">
      <div className="min-w-0">
        <div className="text-[13px] font-bold text-[color:var(--color-brand-navy)] leading-tight">
          {title}
        </div>
        <div className="text-[11px] text-neutral-500 truncate">
          Home / {pathname.split("/").filter(Boolean).join(" / ")}
        </div>
      </div>

      <div className="flex-1 max-w-xl mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <input
          placeholder="Search jobs, candidates, employers..."
          className="w-full h-10 pl-11 pr-4 rounded-full bg-neutral-100 border border-transparent text-sm focus:bg-white focus:border-[color:var(--color-brand-navy)] focus:outline-none transition-colors"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative h-9 w-9 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-600">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-1.5 right-1.5 h-4 min-w-4 px-1 rounded-full bg-[color:var(--color-brand-gold)] text-[10px] font-bold text-[color:var(--color-brand-navy)] flex items-center justify-center">
            3
          </span>
        </button>
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-[color:var(--color-brand-navy)] text-white text-xs font-bold flex items-center justify-center">
            AD
          </div>
          <div className="text-xs text-neutral-600 font-medium">Admin</div>
        </div>
      </div>
    </header>
  );
}

// --------- Reusable admin UI primitives ---------

export function PageHeader({ title, actions }: { title: string; actions?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-[color:var(--color-brand-navy)] tracking-tight">
        {title}
      </h1>
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
}

export function Card({
  children,
  className,
  dotGrid,
}: {
  children: ReactNode;
  className?: string;
  dotGrid?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative bg-white rounded-[20px] border border-[color:var(--color-brand-border)] shadow-[0_1px_2px_rgba(15,25,45,0.03),0_4px_16px_rgba(15,25,45,0.04)]",
        className,
      )}
    >
      {dotGrid && (
        <div
          aria-hidden
          className="absolute top-3 right-3 w-16 h-16 opacity-[0.06] pointer-events-none rounded-md"
          style={{
            backgroundImage: "radial-gradient(circle, #0B1F3A 1px, transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        />
      )}
      {children}
    </div>
  );
}

export function StatusChip({ status, className }: { status: string; className?: string }) {
  const s = status.toLowerCase();
  let cls = "bg-neutral-200 text-neutral-800";
  if (["active", "verified", "reviewing", "contacted"].includes(s))
    cls = "bg-[color:var(--color-brand-blue)] text-white";
  else if (["shortlisted", "interview", "in progress", "qualified"].includes(s))
    cls = "bg-[color:var(--color-brand-gold)] text-[color:var(--color-brand-navy)]";
  else if (["placed", "filled", "hired", "converted"].includes(s))
    cls = "bg-emerald-500 text-white";
  else if (["archived", "rejected", "inactive"].includes(s)) cls = "bg-rose-500/85 text-white";
  else if (s === "documentation") cls = "bg-indigo-500 text-white";
  else if (s === "visa") cls = "bg-orange-500 text-white";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap",
        cls,
        className,
      )}
    >
      {status}
    </span>
  );
}

export function SlideOut({
  open,
  onClose,
  title,
  children,
  width = 520,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: number;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="absolute right-0 top-0 h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        style={{ width }}
      >
        <div className="h-14 px-5 flex items-center justify-between border-b border-[color:var(--color-brand-border)] shrink-0">
          <div className="font-bold text-[color:var(--color-brand-navy)]">{title}</div>
          <button
            className="h-8 w-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  width = 480,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: number;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-[24px] shadow-2xl" style={{ width }}>
        <div className="h-14 px-5 flex items-center justify-between border-b border-[color:var(--color-brand-border)]">
          <div className="font-bold text-[color:var(--color-brand-navy)]">{title}</div>
          <button
            className="h-8 w-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export function FilterBar({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 p-3 bg-white rounded-[16px] border border-[color:var(--color-brand-border)] flex flex-wrap items-center gap-2">
      {children}
    </div>
  );
}

export function PillTabs<T extends string>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex bg-neutral-100 rounded-full p-1">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={cn(
            "px-3.5 h-8 rounded-full text-xs font-semibold transition-colors",
            value === opt
              ? "bg-white text-[color:var(--color-brand-navy)] shadow-sm"
              : "text-neutral-500 hover:text-neutral-800",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative flex-1 min-w-[200px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 pl-9 pr-3 rounded-full bg-neutral-100 text-sm focus:bg-white focus:outline focus:outline-2 focus:outline-[color:var(--color-brand-navy)]"
      />
    </div>
  );
}

export function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 rounded-lg border border-[color:var(--color-brand-border)] bg-white text-xs font-medium text-neutral-700 px-3 focus:outline-2 focus:outline-[color:var(--color-brand-navy)]"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function EmptyState({
  icon,
  title,
  subtitle,
  action,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="text-center py-16">
      <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-[color:var(--color-brand-lightblue)] flex items-center justify-center text-[color:var(--color-brand-blue)]">
        {icon}
      </div>
      <div className="font-semibold text-[color:var(--color-brand-navy)]">{title}</div>
      {subtitle && <div className="text-sm text-neutral-500 mt-1">{subtitle}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
