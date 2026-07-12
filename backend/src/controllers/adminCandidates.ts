import { Request, Response } from "express";
import * as CandidateService from "../services/adminCandidate";
import { z } from "zod";

const CandidateSchema = z.object({
  name: z.string().min(2),

  email: z.string().email(),

  phone: z.string().min(8),

  nationality: z.string().min(2),

  specialty: z.string().min(2),

  experience_years: z.coerce.number().min(0),

  target_countries: z.array(z.string()),

  cv_url: z.string().optional(),

  status: z.enum(["active", "archived"]).default("active"),
});

export async function listCandidates(req: Request, res: Response) {
  try {
    const search = typeof req.query.search === "string" ? req.query.search : undefined;

    const status = typeof req.query.status === "string" ? req.query.status : undefined;

    const sort = typeof req.query.sort === "string" ? req.query.sort : "newest";

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { data, error, count } = await CandidateService.listCandidates({
      search,
      status,
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

export async function getCandidate(req: Request, res: Response) {
  try {
    const { data, error } = await CandidateService.getCandidate(String(req.params.id));

    if (error || !data) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
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

export async function createCandidate(req: Request, res: Response) {
  try {
    const parsed = CandidateSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.flatten(),
      });
    }

    const { data, error } = await CandidateService.createCandidate(parsed.data);

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

export async function updateCandidate(req: Request, res: Response) {
  try {
    const parsed = CandidateSchema.partial().safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.flatten(),
      });
    }

    const { data, error } = await CandidateService.updateCandidate(
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

export async function archiveCandidate(req: Request, res: Response) {
  try {
    const { data, error } = await CandidateService.archiveCandidate(String(req.params.id));

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
export async function deleteCandidate(req: Request, res: Response) {
  try {
    const { error } = await CandidateService.deleteCandidate(String(req.params.id));
    if (error) throw error;
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}
