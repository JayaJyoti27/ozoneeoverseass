import { Request, Response } from "express";
import * as SettingsService from "../services/admin/settings";

export async function getSettings(req: Request, res: Response) {
  try {
    const data = await SettingsService.getSettings();

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function updateSettings(req: Request, res: Response) {
  try {
    const data = await SettingsService.updateSettings(req.body);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getCountries(req: Request, res: Response) {
  try {
    const data = await SettingsService.getCountries();

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getJobCategories(req: Request, res: Response) {
  try {
    const data = await SettingsService.getJobCategories();

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getEmailTemplates(req: Request, res: Response) {
  try {
    const data = await SettingsService.getEmailTemplates();

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
