import {
  Home,
  User,
  Briefcase,
  ClipboardList,
  FileText,
  CalendarClock,
  BadgeCheck,
  PlaneTakeoff,
  Bell,
} from "lucide-react";

export const candidateNavigation = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/Candidates/dashboard",
  },
  {
    title: "Profile",
    icon: User,
    href: "/Candidates/profile",
  },
  {
    title: "Browse Jobs",
    icon: Briefcase,
    href: "/Candidates/jobs",
  },
  // Remove this for now because the route doesn't exist
  // {
  //   title: "Saved Jobs",
  //   icon: Bookmark,
  //   href: "/Candidates/saved",
  // },
  {
    title: "Applications",
    icon: ClipboardList,
    href: "/Candidates/applications",
  },
  {
    title: "Documents",
    icon: FileText,
    href: "/Candidates/documents",
  },
  {
    title: "Interviews",
    icon: CalendarClock,
    href: "/Candidates/interviews",
  },
  {
    title: "Offers",
    icon: BadgeCheck,
    href: "/Candidates/offers",
  },

  {
    title: "Notifications",
    icon: Bell,
    href: "/Candidates/notifications",
  },
];
