import { Link } from "@tanstack/react-router";

import { Briefcase, ClipboardList, FileText, User, CalendarDays, BadgeCheck } from "lucide-react";

import { Card } from "@/components/ui/card";

const actions = [
  {
    title: "Complete Profile",
    description: "Update your personal information",
    icon: User,
    href: "/Candidate/profile",
  },

  {
    title: "Browse Jobs",
    description: "Find new overseas opportunities",
    icon: Briefcase,
    href: "/Candidate/jobs",
  },

  {
    title: "Upload Documents",
    description: "Passport, CV and certificates",
    icon: FileText,
    href: "/Candidate/documents",
  },

  {
    title: "My Applications",
    description: "Track your application progress",
    icon: ClipboardList,
    href: "/Candidate/applications",
  },

  {
    title: "Interviews",
    description: "Upcoming interview schedule",
    icon: CalendarDays,
    href: "/Candidate/interviews",
  },

  {
    title: "Offers",
    description: "View your offer letters",
    icon: BadgeCheck,
    href: "/Candidate/offers",
  },
];

export default function QuickActions() {
  return (
    <Card className="rounded-2xl p-6">
      <h2 className="mb-5 text-lg font-semibold">Quick Actions</h2>

      <div className="grid gap-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              to={action.href}
              className="group flex items-center gap-4 rounded-xl border p-4 transition-all hover:border-primary hover:bg-primary/5"
            >
              <div className="rounded-xl bg-primary/10 p-3">
                <Icon className="h-5 w-5 text-primary" />
              </div>

              <div className="flex-1">
                <h3 className="font-medium">{action.title}</h3>

                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
