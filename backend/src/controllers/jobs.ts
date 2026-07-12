import { Request, Response } from "express";
import * as JobsService from "../services/jobs";
import { z } from "zod";

const JobSchema = z.object({
  title: z.string().min(1),
  country: z.string().min(1),
  city: z.string().min(1),
  sector: z.string().min(1),
  employer_type: z.string().min(1),
  salary_min: z.coerce.number().positive(),
  salary_max: z.coerce.number().positive(),
  currency: z.string().min(1),
  experience_required: z.string().min(1),
  license_required: z.string(),
  description: z.string().min(1),
  status: z.enum(["active", "archived", "draft"]).default("active"),
});
export async function listJobs(req: Request, res: Response) {
  try {
    const country = typeof req.query.country === "string" ? req.query.country : undefined;

    const sector = typeof req.query.sector === "string" ? req.query.sector : undefined;

    const search = typeof req.query.search === "string" ? req.query.search : undefined;
    const sort = typeof req.query.sort === "string" ? req.query.sort : "newest";
    const city = typeof req.query.city === "string" ? req.query.city : undefined;

    const employerType =
      typeof req.query.employerType === "string" ? req.query.employerType : undefined;

    const experience = typeof req.query.experience === "string" ? req.query.experience : undefined;

    const salaryMin = req.query.salaryMin ? Number(req.query.salaryMin) : undefined;

    const salaryMax = req.query.salaryMax ? Number(req.query.salaryMax) : undefined;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

    const { data, error, count } = await JobsService.listJobs({
      country,
      city,
      sector,
      employerType,
      experience,
      salaryMin,
      salaryMax,
      search,
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

export async function getJob(req: Request, res: Response) {
  try {
    const { data, error } = await JobsService.getJob(String(req.params.id));

    if (error || !data) {
      return res.status(404).json({
        error: "Job not found",
      });
    }

    res.json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function createJob(req: Request, res: Response) {
  try {
    const parsed = JobSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.flatten(),
      });
    }

    const { data, error } = await JobsService.createJob(parsed.data);

    if (error) throw error;

    res.status(201).json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateJob(req: Request, res: Response) {
  try {
    const parsed = JobSchema.partial().safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.flatten(),
      });
    }

    const { data, error } = await JobsService.updateJob(String(req.params.id), parsed.data);

    if (error) throw error;

    res.json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function archiveJob(req: Request, res: Response) {
  try {
    const { data, error } = await JobsService.archiveJob(String(req.params.id));

    if (error) throw error;

    res.json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
export async function getSimilarJobs(req: Request, res: Response) {
  try {
    const { data, error } = await JobsService.getSimilarJobs(String(req.params.id));

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
export async function getFeaturedJobs(req: Request, res: Response) {
  try {
    const { data, error } = await JobsService.getFeaturedJobs();

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
export async function getJobStats(req: Request, res: Response) {
  try {
    const data = await JobsService.getJobStats();

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
