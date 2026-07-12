import { Request, Response } from "express";
import * as DashboardService from "../services/dashboard";

export async function stats(req: Request, res: Response) {
  const result = await DashboardService.getDashboardStats();

  res.status(result.status).json(result);
}
export async function recentApplications(req: Request, res: Response) {
  const result = await DashboardService.getRecentApplications();

  return res.status(result.status).json(result);
}
export async function applicationStatus(req: Request, res: Response) {
  const result = await DashboardService.getApplicationStatus();

  return res.status(result.status).json(result);
}
export async function recentJobs(req: Request, res: Response) {
  const result = await DashboardService.getRecentJobs();

  return res.status(result.status).json(result);
}

export async function adminDashboard(req: Request, res: Response) {
  const result = await DashboardService.getAdminDashboard();
  res.status(result.status).json(result);
}
