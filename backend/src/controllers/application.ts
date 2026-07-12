import { Request, Response } from "express";
import * as ApplicationService from "../services/application";
import { z } from "zod";

const ApplicationSchema = z.object({
  candidate_id: z.string().uuid(),

  job_id: z.string().uuid(),

  status: z
    .enum(["applied", "screening", "interview", "offer", "hired", "rejected", "withdrawn"])
    .default("applied"),

  notes: z.string().optional(),
});
const StatusSchema = z.object({
  status: z.enum(["applied", "screening", "interview", "offer", "hired", "rejected", "withdrawn"]),
});
export async function updateApplicationStatus(req: Request, res: Response) {
  const parsed = StatusSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      errors: parsed.error.flatten(),
    });
  }

  const { data, error } = await ApplicationService.updateApplicationStatus(
    String(req.params.id),
    parsed.data.status,
  );

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  return res.json({
    success: true,
    data,
  });
}
export async function listApplications(req: Request, res: Response) {
  try {
    const status = typeof req.query.status === "string" ? req.query.status : undefined;

    const candidateId =
      typeof req.query.candidateId === "string" ? req.query.candidateId : undefined;

    const jobId = typeof req.query.jobId === "string" ? req.query.jobId : undefined;

    const sort = typeof req.query.sort === "string" ? req.query.sort : "newest";

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { data, error, count } = await ApplicationService.listApplications({
      status,
      candidateId,
      jobId,
      page,
      limit,
      sort,
    });

    if (error) throw error;

    res.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / limit),
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getApplication(req: Request, res: Response) {
  try {
    const { data, error } = await ApplicationService.getApplication(String(req.params.id));

    if (error || !data) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

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

export async function createApplication(req: Request, res: Response) {
  try {
    const parsed = ApplicationSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.flatten(),
      });
    }

    const { data, error } = await ApplicationService.createApplication(parsed.data);

    if (error) throw error;

    res.status(201).json({
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

export async function updateApplication(req: Request, res: Response) {
  try {
    const parsed = ApplicationSchema.partial().safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.flatten(),
      });
    }

    const { data, error } = await ApplicationService.updateApplication(
      String(req.params.id),
      parsed.data,
    );

    if (error) throw error;

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

export async function deleteApplication(req: Request, res: Response) {
  try {
    const { error } = await ApplicationService.archiveApplication(String(req.params.id));

    if (error) throw error;

    res.json({
      success: true,
      message: "Application deleted",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
