import { api } from "./api";
export async function getNotifications(page = 1) {
  const res = await api.get("/admin/notifications", {
    params: { page },
  });

  return res.data;
}

export async function getNotification(id: string) {
  const res = await api.get(`/admin/notifications/${id}`);

  return res.data.data;
}

export async function createNotification(payload: {
  userId: string;
  title: string;
  message: string;
  type: string;
  priority?: number;
  relatedEntity?: string;
  relatedEntityId?: string;
}) {
  const res = await api.post("/admin/notifications", payload);

  return res.data.data;
}

export async function markNotificationRead(id: string) {
  const res = await api.patch(`/admin/notifications/${id}/read`);

  return res.data.data;
}

export async function markAllNotificationsRead() {
  const res = await api.patch("/admin/notifications/read-all");

  return res.data.data;
}

export async function getUnreadCount() {
  const res = await api.get("/admin/notifications/unread-count");

  return res.data.data;
}

export async function deleteNotification(id: string) {
  const res = await api.delete(`/admin/notifications/${id}`);

  return res.data.data;
}
