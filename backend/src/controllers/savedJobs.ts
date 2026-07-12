import { Request, Response } from "express";
import * as SavedJobsService from "../services/savedJobs";

export async function getSavedJobs(req: Request, res: Response) {
  try {
    const { data, error } = await SavedJobsService.getSavedJobs();
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function saveJob(req: Request, res: Response) {
  try {
    const { job_id } = req.body;
    if (!job_id) {
      return res.status(400).json({ success: false, message: "job_id is required" });
    }
    const { data, error } = await SavedJobsService.saveJob(job_id);
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function removeSavedJob(req: Request, res: Response) {
  try {
    const { data, error } = await SavedJobsService.removeSavedJob(req.params.id);
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}
