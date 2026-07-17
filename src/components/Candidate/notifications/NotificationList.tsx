import { useNotifications } from "@/lib/candidate/hooks";

import NotificationCard from "./NotificationCard";

export default function NotificationList() {
  const { data, isLoading } = useNotifications();

  if (isLoading) return <div>Loading...</div>;

  if (!data?.length)
    return <div className="rounded-xl border p-10 text-center">No notifications.</div>;

  return (
    <div className="space-y-4">
      {data.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
