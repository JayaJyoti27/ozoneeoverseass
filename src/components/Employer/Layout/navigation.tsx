import {
  Building2,
  LayoutDashboard,
  BriefcaseBusiness,
  Users,
  CalendarDays,
  Plane,
  Bell,
  Settings,
} from "lucide-react";

export interface EmployerNavItem {
  title: string;
  href: string;
  icon: typeof LayoutDashboard;
}

export const EMPLOYER_NAVIGATION: EmployerNavItem[] = [
  {
    title: "Dashboard",
    href: "/Employer/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Company Profile",
    href: "/Employer/company",
    icon: Building2,
  },
  {
    title: "Job Orders",
    href: "/Employer/job-orders",
    icon: BriefcaseBusiness,
  },
  {
    title: "Candidates",
    href: "/Employer/candidates",
    icon: Users,
  },
  {
    title: "Interviews",
    href: "/Employer/interviews",
    icon: CalendarDays,
  },
  {
    title: "Deployment",
    href: "/Employer/deployment",
    icon: Plane,
  },
  {
    title: "Notifications",
    href: "/Employer/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/Employer/settings",
    icon: Settings,
  },
];
