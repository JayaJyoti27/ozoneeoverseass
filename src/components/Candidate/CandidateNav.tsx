import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  ClipboardList,
  Bookmark,
  Bell,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
} from "lucide-react";

const NAV_LINKS = [
  { to: "/Candidates/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/Candidates/jobs", label: "Jobs", icon: Briefcase },
  { to: "/Candidates/applications", label: "Applications", icon: ClipboardList },
  { to: "/Candidates/saved-jobs", label: "Saved", icon: Bookmark },
  { to: "/Candidates/profile", label: "Profile", icon: User },
  { to: "/Candidates/resume", label: "Resume", icon: FileText },
];

export function CandidateNav() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/Candidates/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0A1F44]">
            <span className="text-sm font-extrabold text-white">O</span>
          </div>
          <span className="text-lg font-extrabold tracking-tight text-[#0A1F44]">
            Ozone <span className="font-semibold text-gray-400">Overseas</span>
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

        {/* Right side: notifications + profile */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/Candidates/notifications"
            className={`relative flex h-10 w-10 items-center justify-center rounded-full transition ${
              isActive("/Candidate/notifications")
                ? "bg-[#0A1F44] text-white"
                : "text-gray-500 hover:bg-gray-50 hover:text-[#0A1F44]"
            }`}
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white" />
          </Link>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen((o) => !o)}
              className="flex items-center gap-2 rounded-full border border-gray-200 py-1 pl-1 pr-3 transition hover:border-gray-300"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A1F44] text-xs font-bold text-white">
                ME
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
                  <Link
                    to="/Candidates/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                  >
                    <User className="h-4 w-4 text-gray-400" />
                    My Profile
                  </Link>
                  <Link
                    to="/Candidates/resume"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                  >
                    <Settings className="h-4 w-4 text-gray-400" />
                    Resume
                  </Link>
                  <div className="my-1 h-px bg-gray-100" />
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
            {[
              ...NAV_LINKS,
              { to: "/Candidate/notifications", label: "Notifications", icon: Bell },
            ].map(({ to, label, icon: Icon }) => {
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
