import { Request, Response } from "express";
import * as ReportService from "../services/admin/reports";

/*
|--------------------------------------------------------------------------
| Dashboard Report
|--------------------------------------------------------------------------
*/

export async function getDashboardReport(req: Request, res: Response) {
  try {
    const data = await ReportService.getDashboardAnalytics();

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

/*
|--------------------------------------------------------------------------
| Employer Report
|--------------------------------------------------------------------------
*/

export async function getEmployerReport(req: Request, res: Response) {
  try {
    const data = await ReportService.getEmployerReport();

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

/*
|--------------------------------------------------------------------------
| Candidate Report
|--------------------------------------------------------------------------
*/

export async function getCandidateReport(req: Request, res: Response) {
  try {
    const data = await ReportService.getCandidateReport();

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

/*
|--------------------------------------------------------------------------
| Recruitment Report
|--------------------------------------------------------------------------
*/

export async function getRecruitmentReport(req: Request, res: Response) {
  try {
    const data = await ReportService.getRecruitmentReport();

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
