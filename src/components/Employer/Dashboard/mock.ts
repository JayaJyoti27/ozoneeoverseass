import {
  BriefcaseBusiness,
  ClipboardCheck,
  FileCheck2,
  Globe2,
  CalendarClock,
  Users,
  Plane,
} from "lucide-react";

export const dashboardStats = [
  {
    title: "Active Job Orders",
    value: 12,
    icon: BriefcaseBusiness,
    color: "text-blue-600",
  },
  {
    title: "Under Review",
    value: 4,
    icon: ClipboardCheck,
    color: "text-orange-600",
  },
  {
    title: "Legalization",
    value: 3,
    icon: FileCheck2,
    color: "text-purple-600",
  },
  {
    title: "Recruitment Open",
    value: 8,
    icon: Globe2,
    color: "text-green-600",
  },
  {
    title: "Interviews",
    value: 14,
    icon: CalendarClock,
    color: "text-indigo-600",
  },
  {
    title: "Candidates Selected",
    value: 9,
    icon: Users,
    color: "text-emerald-600",
  },
  {
    title: "Candidates Deployed",
    value: 21,
    icon: Plane,
    color: "text-cyan-600",
  },
];

export const recentActivity = [
  {
    id: 1,
    title: "Nurse requirement submitted",
    company: "ABC Hospital",
    time: "10 mins ago",
    status: "Submitted",
  },
  {
    id: 2,
    title: "Interview scheduled",
    company: "Dubai Medical Center",
    time: "2 hours ago",
    status: "Interview",
  },
  {
    id: 3,
    title: "Legalization completed",
    company: "Qatar Health",
    time: "Yesterday",
    status: "Completed",
  },
];

export const pendingActions = [
  {
    id: 1,
    title: "Approve clarification request",
    due: "Today",
  },
  {
    id: 2,
    title: "Upload missing company document",
    due: "Tomorrow",
  },
  {
    id: 3,
    title: "Confirm interview schedule",
    due: "26 Jul",
  },
];
