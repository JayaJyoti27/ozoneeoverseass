import { Request, Response } from "express";

import * as MedicalService from "../services/medical";

import {
  CreateMedicalSchema,
  ScheduleMedicalSchema,
  UploadMedicalReportSchema,
  ApproveMedicalSchema,
  RejectMedicalSchema,
} from "../validators/medicalSchema";

/*
|--------------------------------------------------------------------------
| Temporary IDs
|--------------------------------------------------------------------------
| Replace with req.user after authentication
*/

const DEMO_ADMIN_ID = "00000000-0000-0000-0000-000000000002";

const DEMO_CANDIDATE_ID = "00000000-0000-0000-0000-000000000001";

/*
|--------------------------------------------------------------------------
| Create Medical
|--------------------------------------------------------------------------
*/

export async function createMedical(req: Request, res: Response) {
  try {
    const parsed = CreateMedicalSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await MedicalService.createMedical(DEMO_ADMIN_ID, parsed.data);

    return res.status(201).json({
      success: true,
      message: "Medical created successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to create medical.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Schedule Medical
|--------------------------------------------------------------------------
*/

export async function scheduleMedical(req: Request, res: Response) {
  try {
    const parsed = ScheduleMedicalSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await MedicalService.scheduleMedical(
      String(req.params.id),
      DEMO_ADMIN_ID,
      parsed.data,
    );

    return res.json({
      success: true,
      message: "Medical scheduled successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to schedule medical.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Upload Report
|--------------------------------------------------------------------------
*/

export async function uploadMedicalReport(req: Request, res: Response) {
  try {
    const parsed = UploadMedicalReportSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await MedicalService.uploadMedicalReport(
      String(req.params.id),
      DEMO_ADMIN_ID,
      parsed.data,
    );

    return res.json({
      success: true,
      message: "Medical report uploaded successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to upload report.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Approve Medical
|--------------------------------------------------------------------------
*/

export async function approveMedical(req: Request, res: Response) {
  try {
    const parsed = ApproveMedicalSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await MedicalService.approveMedical(
      String(req.params.id),
      DEMO_ADMIN_ID,
      parsed.data,
    );

    return res.json({
      success: true,
      message: "Medical approved successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to approve medical.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Reject Medical
|--------------------------------------------------------------------------
*/

export async function rejectMedical(req: Request, res: Response) {
  try {
    const parsed = RejectMedicalSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await MedicalService.rejectMedical(
      String(req.params.id),
      DEMO_ADMIN_ID,
      parsed.data,
    );

    return res.json({
      success: true,
      message: "Medical rejected successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to reject medical.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Get Medical
|--------------------------------------------------------------------------
*/

export async function getMedical(req: Request, res: Response) {
  try {
    const data = await MedicalService.getMedical(String(req.params.id));

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message ?? "Medical record not found.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| List Medicals
|--------------------------------------------------------------------------
*/

export async function listMedicals(req: Request, res: Response) {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 20;

    const data = await MedicalService.listMedicals({
      page,

      limit,

      candidateId: req.query.candidateId as string,

      employerId: req.query.employerId as string,

      applicationId: req.query.applicationId as string,

      jobOrderId: req.query.jobOrderId as string,

      status: req.query.status as string,
    });

    return res.json({
      success: true,

      ...data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,

      message: err.message ?? "Unable to fetch medical records.",
    });
  }
}
