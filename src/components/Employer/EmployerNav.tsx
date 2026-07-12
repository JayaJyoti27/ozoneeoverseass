import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  FileText,
  Users,
  Building2,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronDown,
} from "lucide-react";
// adjust import path to match your project

const NAV_LINKS = [
  { to: "/Employer/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/Employer/jobs", label: "Jobs", icon: Briefcase },
  { to: "/Employer/requirements", label: "Requirements", icon: ClipboardList },
  { to: "/Employer/applications", label: "Applications", icon: FileText },
  { to: "/Employer/candidate", label: "Candidates", icon: Users },
  { to: "/Employer/my-company", label: "Company", icon: Building2 },
];

export function EmployerNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  function isActive(path: string) {
    return location.pathname.startsWith(path);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/Employer/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A1F44] text-sm font-bold text-white">
            E
          </div>
          <span className="text-lg font-extrabold tracking-tight text-[#0A1F44]">
            Employer<span className="text-blue-600">Portal</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive(to)
                  ? "bg-[#0A1F44] text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-[#0A1F44]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side: profile dropdown (desktop) */}
        <div className="hidden items-center gap-3 lg:flex">
          <div className="relative">
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full border border-gray-200 py-1.5 pl-1.5 pr-3 transition hover:border-gray-300"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
                <Building2 className="h-3.5 w-3.5" />
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
            </button>

            {profileOpen && (
              <>
                {/* backdrop to close on outside click */}
                <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
                  <Link
                    to="/Employer/my-company"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
                  >
                    <Building2 className="h-4 w-4" />
                    My Company
                  </Link>
                  <Link
                    to="/Employer/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <button className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50">
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
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 lg:hidden">
          <ul className="space-y-1">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                    isActive(to) ? "bg-[#0A1F44] text-white" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/Employer/settings"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </li>
            <li>
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
