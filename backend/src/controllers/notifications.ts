import { Request, Response } from "express";
import * as NotificationsService from "../services/notifications";

export async function getNotifications(req: Request, res: Response) {
  try {
    const { data, error } = await NotificationsService.getNotifications();
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function markNotificationRead(req: Request, res: Response) {
  try {
    const { data, error } = await NotificationsService.markNotificationRead(String(req.params.id));
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}
