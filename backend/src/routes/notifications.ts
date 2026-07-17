import { Router } from "express";

import {
  getNotifications,
  getNotification,
  createNotification,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  deleteNotification,
} from "../controllers/notifications";

const router = Router();

/*
|--------------------------------------------------------------------------
| Notifications
|--------------------------------------------------------------------------
*/

router.get("/", getNotifications);

router.get("/unread-count", getUnreadCount);

router.get("/:id", getNotification);

router.post("/", createNotification);

router.patch("/:id/read", markAsRead);

router.patch("/read-all", markAllAsRead);

router.delete("/:id", deleteNotification);

export default router;
