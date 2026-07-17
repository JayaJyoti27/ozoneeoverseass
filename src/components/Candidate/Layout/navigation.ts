import {
  Home,
  User,
  Briefcase,
  Bookmark,
  ClipboardList,
  FileText,
  CalendarClock,
  BadgeCheck,
  HeartPulse,
  Plane,
  PlaneTakeoff,
  Bell,
  Settings,
} from "lucide-react";

export const candidateNavigation = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/candidate/dashboard",
  },

  {
    title: "Profile",
    icon: User,
    href: "/candidate/profile",
  },

  {
    title: "Browse Jobs",
    icon: Briefcase,
    href: "/candidate/jobs",
  },

  {
    title: "Saved Jobs",
    icon: Bookmark,
    href: "/candidate/saved",
  },

  {
    title: "Applications",
    icon: ClipboardList,
    href: "/candidate/applications",
  },

  {
    title: "Documents",
    icon: FileText,
    href: "/candidate/documents",
  },

  {
    title: "Interviews",
    icon: CalendarClock,
    href: "/candidate/interviews",
  },

  {
    title: "Offers",
    icon: BadgeCheck,
    href: "/candidate/offers",
  },

  {
    title: "Medical",
    icon: HeartPulse,
    href: "/candidate/medical",
  },

  {
    title: "Visa",
    icon: Plane,
    href: "/candidate/visa",
  },

  {
    title: "Deployment",
    icon: PlaneTakeoff,
    href: "/candidate/deployment",
  },

  {
    title: "Notifications",
    icon: Bell,
    href: "/candidate/notifications",
  },

  {
    title: "Settings",
    icon: Settings,
    href: "/candidate/settings",
  },
];
