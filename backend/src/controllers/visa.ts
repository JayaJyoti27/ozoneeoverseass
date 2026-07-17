import { Request, Response } from "express";

import * as VisaService from "../services/visa";

import {
  CreateVisaSchema,
  SubmitVisaSchema,
  ApproveVisaSchema,
  RejectVisaSchema,
  IssueVisaSchema,
} from "../validators/visaSchema";

/*
|--------------------------------------------------------------------------
| Temporary IDs
|--------------------------------------------------------------------------
| Replace with req.user after authentication
*/

const DEMO_ADMIN_ID = "00000000-0000-0000-0000-000000000002";

/*
|--------------------------------------------------------------------------
| Create Visa
|--------------------------------------------------------------------------
*/

export async function createVisa(req: Request, res: Response) {
  try {
    const parsed = CreateVisaSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await VisaService.createVisa(DEMO_ADMIN_ID, parsed.data);

    return res.status(201).json({
      success: true,
      message: "Visa created successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to create visa.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Submit Visa
|--------------------------------------------------------------------------
*/

export async function submitVisa(req: Request, res: Response) {
  try {
    const parsed = SubmitVisaSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await VisaService.submitVisa(String(req.params.id), DEMO_ADMIN_ID, parsed.data);

    return res.json({
      success: true,
      message: "Visa submitted successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to submit visa.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Approve Visa
|--------------------------------------------------------------------------
*/

export async function approveVisa(req: Request, res: Response) {
  try {
    const parsed = ApproveVisaSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await VisaService.approveVisa(String(req.params.id), DEMO_ADMIN_ID, parsed.data);

    return res.json({
      success: true,
      message: "Visa approved successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to approve visa.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Reject Visa
|--------------------------------------------------------------------------
*/

export async function rejectVisa(req: Request, res: Response) {
  try {
    const parsed = RejectVisaSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await VisaService.rejectVisa(String(req.params.id), DEMO_ADMIN_ID, parsed.data);

    return res.json({
      success: true,
      message: "Visa rejected successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to reject visa.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Issue Visa
|--------------------------------------------------------------------------
*/

export async function issueVisa(req: Request, res: Response) {
  try {
    const parsed = IssueVisaSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await VisaService.issueVisa(String(req.params.id), DEMO_ADMIN_ID, parsed.data);

    return res.json({
      success: true,
      message: "Visa issued successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to issue visa.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Get Visa
|--------------------------------------------------------------------------
*/

export async function getVisa(req: Request, res: Response) {
  try {
    const data = await VisaService.getVisa(String(req.params.id));

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message ?? "Visa record not found.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| List Visas
|--------------------------------------------------------------------------
*/

export async function listVisas(req: Request, res: Response) {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 20;

    const data = await VisaService.listVisas({
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

      message: err.message ?? "Unable to fetch visas.",
    });
  }
}
