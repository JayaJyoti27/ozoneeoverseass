import { Request, Response } from "express";

import * as DocumentService from "../services/document";

import {
  UploadDocumentSchema,
  ReplaceDocumentSchema,
  ApproveDocumentSchema,
  RejectDocumentSchema,
} from "../validators/documentSchema";

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
| Upload Document
|--------------------------------------------------------------------------
*/

export async function uploadDocument(req: Request, res: Response) {
  try {
    const parsed = UploadDocumentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await DocumentService.uploadDocument(DEMO_CANDIDATE_ID, parsed.data);

    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to upload document.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Replace Document
|--------------------------------------------------------------------------
*/

export async function replaceDocument(req: Request, res: Response) {
  try {
    const parsed = ReplaceDocumentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await DocumentService.replaceDocument(
      String(req.params.id),
      DEMO_CANDIDATE_ID,
      parsed.data,
    );

    return res.json({
      success: true,
      message: "Document replaced successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to replace document.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Approve Document
|--------------------------------------------------------------------------
*/

export async function approveDocument(req: Request, res: Response) {
  try {
    const parsed = ApproveDocumentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await DocumentService.approveDocument(
      String(req.params.id),
      DEMO_ADMIN_ID,
      parsed.data.remarks,
    );

    return res.json({
      success: true,
      message: "Document approved successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to approve document.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Reject Document
|--------------------------------------------------------------------------
*/

export async function rejectDocument(req: Request, res: Response) {
  try {
    const parsed = RejectDocumentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await DocumentService.rejectDocument(
      String(req.params.id),
      DEMO_ADMIN_ID,
      parsed.data.reason,
    );

    return res.json({
      success: true,
      message: "Document rejected successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to reject document.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Get Document
|--------------------------------------------------------------------------
*/

export async function getDocument(req: Request, res: Response) {
  try {
    const data = await DocumentService.getDocument(String(req.params.id));

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message ?? "Document not found.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| List Documents
|--------------------------------------------------------------------------
*/

export async function listDocuments(req: Request, res: Response) {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 20;

    const data = await DocumentService.listDocuments({
      page,

      limit,

      applicationId: req.query.applicationId as string,

      candidateId: req.query.candidateId as string,

      employerId: req.query.employerId as string,

      jobOrderId: req.query.jobOrderId as string,

      status: req.query.status as string,

      type: req.query.type as string,
    });

    return res.json({
      success: true,

      ...data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,

      message: err.message ?? "Unable to fetch documents.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Download Document
|--------------------------------------------------------------------------
*/

export async function downloadDocument(req: Request, res: Response) {
  try {
    const data = await DocumentService.downloadDocument(String(req.params.id), DEMO_CANDIDATE_ID);

    return res.json({
      success: true,

      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,

      message: err.message ?? "Unable to download document.",
    });
  }
}
