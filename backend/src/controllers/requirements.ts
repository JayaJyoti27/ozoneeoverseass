import { Request, Response } from "express";
import * as RequirementsService from "../services/requirements";

export async function listRequirements(req: Request, res: Response) {
  try {
    const search = typeof req.query.search === "string" ? req.query.search : undefined;
    const status = typeof req.query.status === "string" ? req.query.status : undefined;

    const { data, error } = await RequirementsService.listRequirements({ search, status });
    if (error) throw error;

    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function approveRequirement(req: Request, res: Response) {
  try {
    const { data, error } = await RequirementsService.approveRequirement(String(req.params.id));
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function rejectRequirement(req: Request, res: Response) {
  try {
    const { data, error } = await RequirementsService.rejectRequirement(String(req.params.id));
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function convertRequirement(req: Request, res: Response) {
  try {
    const { data, error } = await RequirementsService.convertRequirement(String(req.params.id));
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: error?.message ?? err.message });
  }
}
