import { Request, Response } from "express";

import * as InterviewService from "../services/interview";

import {
  CreateInterviewSchema,
  RescheduleInterviewSchema,
  CompleteInterviewSchema,
  CancelInterviewSchema,
} from "../validators/interviewSchema";

/*
|--------------------------------------------------------------------------
| TEMP USER IDS
|--------------------------------------------------------------------------
| Replace with req.user.id after authentication
*/

const DEMO_ADMIN_ID = "00000000-0000-0000-0000-000000000002";

/*
|--------------------------------------------------------------------------
| CREATE INTERVIEW
|--------------------------------------------------------------------------
*/

export async function createInterview(req: Request, res: Response) {
  try {
    const parsed = CreateInterviewSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await InterviewService.createInterview(DEMO_ADMIN_ID, parsed.data);

    return res.status(201).json({
      success: true,
      message: "Interview scheduled successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to schedule interview.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| LIST
|--------------------------------------------------------------------------
*/

export async function listInterviews(req: Request, res: Response) {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 20;

    const data = await InterviewService.listInterviews({
      page,

      limit,

      applicationId: req.query.applicationId as string,

      jobOrderId: req.query.jobOrderId as string,

      interviewerEmail: req.query.interviewerEmail as string,

      status: req.query.status as string,
    });

    return res.json({
      success: true,

      ...data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,

      message: err.message ?? "Unable to fetch interviews.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| GET
|--------------------------------------------------------------------------
*/

export async function getInterview(req: Request, res: Response) {
  try {
    const data = await InterviewService.getInterview(String(req.params.id));

    return res.json({
      success: true,

      data,
    });
  } catch (err: any) {
    return res.status(404).json({
      success: false,

      message: err.message ?? "Interview not found.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| RESCHEDULE
|--------------------------------------------------------------------------
*/

export async function rescheduleInterview(req: Request, res: Response) {
  try {
    const parsed = RescheduleInterviewSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,

        errors: parsed.error.flatten(),
      });
    }

    const data = await InterviewService.rescheduleInterview(
      String(req.params.id),

      DEMO_ADMIN_ID,

      parsed.data,
    );

    return res.json({
      success: true,

      message: "Interview rescheduled successfully.",

      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,

      message: err.message ?? "Unable to reschedule interview.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| COMPLETE
|--------------------------------------------------------------------------
*/

export async function completeInterview(req: Request, res: Response) {
  try {
    const parsed = CompleteInterviewSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,

        errors: parsed.error.flatten(),
      });
    }

    const data = await InterviewService.completeInterview(
      String(req.params.id),

      DEMO_ADMIN_ID,

      parsed.data,
    );

    return res.json({
      success: true,

      message: "Interview completed successfully.",

      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,

      message: err.message ?? "Unable to complete interview.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| CANCEL
|--------------------------------------------------------------------------
*/

export async function cancelInterview(req: Request, res: Response) {
  try {
    const parsed = CancelInterviewSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,

        errors: parsed.error.flatten(),
      });
    }

    const data = await InterviewService.cancelInterview(
      String(req.params.id),

      DEMO_ADMIN_ID,

      parsed.data,
    );

    return res.json({
      success: true,

      message: "Interview cancelled successfully.",

      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,

      message: err.message ?? "Unable to cancel interview.",
    });
  }
}
