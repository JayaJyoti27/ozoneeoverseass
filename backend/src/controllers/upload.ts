import { Request, Response } from "express";
import * as UploadService from "../services/upload";

export async function uploadResume(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const url = await UploadService.uploadResume(req.file);

    res.json({
      success: true,
      url,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
