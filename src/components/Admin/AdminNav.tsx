import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  ClipboardList,
  FileClock,
  Globe2,
  Menu,
  X,
  ChevronDown,
  LogOut,
} from "lucide-react";

const NAV_LINKS = [
  { to: "/Admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/Admin/candidates", label: "Candidates", icon: Users },
  { to: "/Admin/employer", label: "Employers", icon: Building2 },
  { to: "/Admin/jobs", label: "Jobs", icon: Briefcase },
  { to: "/Admin/applications", label: "Applications", icon: ClipboardList },
  { to: "/Admin/requirements", label: "Requirements", icon: FileClock },
  { to: "/Admin/countries", label: "Countries", icon: Globe2 },
];

export function AdminNav() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/Admin/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0A1F44]">
            <span className="text-sm font-extrabold text-white">O</span>
          </div>
          <span className="text-lg font-extrabold tracking-tight text-[#0A1F44]">
            Ozone <span className="font-semibold text-gray-400">Admin</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => {
            const active = isActive(to);
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-[#0A1F44] text-white"
                      : "text-gray-500 hover:bg-gray-50 hover:text-[#0A1F44]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side: profile */}
        <div className="hidden items-center gap-2 lg:flex">
          <div className="relative">
            <button
              onClick={() => setProfileOpen((o) => !o)}
              className="flex items-center gap-2 rounded-full border border-gray-200 py-1 pl-1 pr-3 transition hover:border-gray-300"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A1F44] text-xs font-bold text-white">
                AD
              </div>
              <ChevronDown
                className={`h-3.5 w-3.5 text-gray-400 transition ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1.5 shadow-lg">
                  <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#0A1F44] lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 lg:hidden">
          <ul className="space-y-1">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
              const active = isActive(to);
              return (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      active ? "bg-[#0A1F44] text-white" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
