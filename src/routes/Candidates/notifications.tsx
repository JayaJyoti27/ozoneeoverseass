import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Bell,
  Loader2,
  Inbox,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { CandidateNav } from "@/components/Candidate/CandidateNav";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, markNotificationRead } from "@/api/candidate";
export const Route = createFileRoute("/Candidates/notifications")({
  component: NotificationsPage,
});

type Notification = {
  id: string;
  title: string;
  message: string;
  created_at: string;
  read?: boolean;
  type?: string;
};

const TYPE_ICON: Record<string, React.ReactNode> = {
  application: <Briefcase className="h-4 w-4" />,
  status: <CheckCircle2 className="h-4 w-4" />,
  alert: <AlertCircle className="h-4 w-4" />,
  message: <MessageSquare className="h-4 w-4" />,
};

function iconFor(type?: string) {
  return TYPE_ICON[type?.toLowerCase() ?? ""] || <Bell className="h-4 w-4" />;
}

function timeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

function NotificationsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
  const queryClient = useQueryClient();
  const markRead = useMutation({
    mutationFn: (id: string) => markNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
  const notifications: Notification[] = data ?? [];
  const unreadCount = notifications.filter((n) => n.read === false).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
      </div>
    );
  }

  return (
    <>
      <CandidateNav />
      <div className="relative min-h-screen bg-[#F6F8FC]">
        <div className="pointer-events-none absolute left-6 top-8 grid grid-cols-6 gap-1.5 opacity-40">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-[#0A1F44]/30" />
          ))}
        </div>
        <div className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-blue-100/60 blur-2xl" />

        <div className="relative mx-auto max-w-3xl px-6 py-12">
          {/* Header */}
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
                <Bell className="h-3.5 w-3.5" />
                CANDIDATE · NOTIFICATIONS
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
                Notifications
              </h1>
              <p className="mt-2 max-w-lg text-gray-500">
                Updates on your applications and account activity.
              </p>
            </div>

            {unreadCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0A1F44] px-3.5 py-1.5 text-xs font-semibold text-white">
                {unreadCount} unread
              </span>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white py-20 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                <Inbox className="h-6 w-6 text-blue-500" />
              </div>
              <p className="font-semibold text-[#0A1F44]">You're all caught up</p>
              <p className="max-w-xs text-sm text-gray-500">
                New updates about your applications will show up here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((n) => {
                const isUnread = n.read === false;
                return (
                  <div
                    key={n.id}
                    onClick={() => isUnread && markRead.mutate(n.id)}
                    className={`relative flex gap-4 rounded-2xl border p-5 shadow-sm transition ${
                      isUnread
                        ? "cursor-pointer border-blue-200 bg-blue-50/40 hover:border-blue-300"
                        : "border-gray-100 bg-white"
                    }`}
                  >
                    {isUnread && (
                      <span className="absolute right-5 top-5 h-2 w-2 rounded-full bg-blue-500" />
                    )}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        isUnread ? "bg-blue-100 text-blue-600" : "bg-gray-50 text-gray-400"
                      }`}
                    >
                      {iconFor(n.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-semibold text-[#0A1F44]">{n.title}</h2>
                      <p className="mt-1 text-sm text-gray-600">{n.message}</p>
                      <p className="mt-2 text-xs text-gray-400">{timeAgo(n.created_at)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
