import { Request, Response } from "express";
import * as EmployerService from "../services/adminEmployer";
import { z } from "zod";

const EmployerSchema = z.object({
  company_name: z.string().min(2),
  contact_person: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  website: z.string().optional(),
  country: z.string().optional(),
  industry: z.string().optional(),
  logo_url: z.string().optional(),
  status: z.enum(["active", "archived"]).default("active"),
});

/*
=====================================
GET ALL
=====================================
*/

export async function listEmployers(req: Request, res: Response) {
  try {
    const search = typeof req.query.search === "string" ? req.query.search : undefined;

    const status = typeof req.query.status === "string" ? req.query.status : undefined;

    const sort = typeof req.query.sort === "string" ? req.query.sort : "newest";

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { data, error, count } = await EmployerService.listEmployers({
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

/*
=====================================
GET ONE
=====================================
*/

export async function getEmployer(req: Request, res: Response) {
  try {
    const { data, error } = await EmployerService.getEmployer(String(req.params.id));

    if (error || !data) {
      return res.status(404).json({
        success: false,
        message: "Employer not found",
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

/*
=====================================
CREATE
=====================================
*/

export async function createEmployer(req: Request, res: Response) {
  try {
    const parsed = EmployerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.flatten(),
      });
    }

    const { data, error } = await EmployerService.createEmployer(parsed.data);

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

/*
=====================================
UPDATE
=====================================
*/

export async function updateEmployer(req: Request, res: Response) {
  try {
    const parsed = EmployerSchema.partial().safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.flatten(),
      });
    }

    const { data, error } = await EmployerService.updateEmployer(
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

/*
=====================================
ARCHIVE
=====================================
*/

export async function archiveEmployer(req: Request, res: Response) {
  try {
    const { data, error } = await EmployerService.archiveEmployer(String(req.params.id));

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
export async function getEmployerDashboard(req: Request, res: Response) {
  try {
    const result = await EmployerService.getEmployerDashboard(String(req.params.id));

    return res.status(result.status).json(result);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
