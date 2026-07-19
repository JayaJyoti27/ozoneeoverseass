import {
  LayoutDashboard,
  Building2,
  FileText,
  BriefcaseBusiness,
  Users,
  BarChart3,
  Bell,
  Settings,
} from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";

const items = [
  {
    title: "Dashboard",
    href: "/Admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Employers",
    href: "/Admin/employers",
    icon: Building2,
  },
  {
    title: "Requirements",
    href: "/Admin/requirements",
    icon: FileText,
  },
  {
    title: "Job Orders",
    href: "/Admin/job-orders",
    icon: BriefcaseBusiness,
  },
  {
    title: "Candidates",
    href: "/Admin/candidates",
    icon: Users,
  },
  {
    title: "Reports",
    href: "/Admin/reports",
    icon: BarChart3,
  },
  {
    title: "Notifications",
    href: "/Admin/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/Admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  return (
    <aside className="w-64 border-r bg-white flex flex-col">
      <div className="h-16 flex items-center px-6 border-b">
        <h1 className="font-bold text-xl">Admin</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition
              ${active ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-700"}`}
            >
              <Icon size={18} />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
