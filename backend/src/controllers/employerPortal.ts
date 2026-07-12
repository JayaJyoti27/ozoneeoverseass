import { Request, Response } from "express";
import { z } from "zod";
import * as EmployerService from "../services/emplyerPortal";

const EmployerSchema = z.object({
  company_name: z.string().min(2).optional(),
  contact_person: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  country: z.string().optional(),
  industry: z.string().optional(),
  logo_url: z.string().optional(),
});

const RequirementSchema = z.object({
  company_name: z.string().min(2),
  contact_name: z.string().min(2),
  email: z.string().email(),
  country: z.string().min(2),
  sector: z.string().min(2),
  role: z.string().min(2),
  headcount: z.coerce.number().min(1),
  timeline: z.string().min(2),
  message: z.string().optional(),
});

/*
==================================
PROFILE
==================================
*/

export async function getProfile(req: Request, res: Response) {
  try {
    const { data, error } = await EmployerService.getProfile();

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

export async function updateProfile(req: Request, res: Response) {
  try {
    const parsed = EmployerSchema.partial().safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const { data, error } = await EmployerService.updateProfile(parsed.data);

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
==================================
DASHBOARD
==================================
*/

export async function getDashboard(req: Request, res: Response) {
  try {
    const data = await EmployerService.getDashboard();

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
==================================
JOBS
==================================
*/

export async function getJobs(req: Request, res: Response) {
  try {
    const { data, error } = await EmployerService.getJobs();

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
==================================
REQUIREMENTS
==================================
*/

export async function getRequirements(req: Request, res: Response) {
  try {
    const { data, error } = await EmployerService.getRequirements();

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

export async function createRequirement(req: Request, res: Response) {
  try {
    const parsed = RequirementSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const { data, error } = await EmployerService.createRequirement(parsed.data);

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

export async function updateRequirement(req: Request, res: Response) {
  try {
    const { data, error } = await EmployerService.updateRequirement(
      String(req.params.id),
      req.body,
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
==================================
APPLICATIONS
==================================
*/

export async function getApplications(req: Request, res: Response) {
  try {
    const { data, error } = await EmployerService.getApplications();

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
const JobSchema = z.object({
  title: z.string().min(2),
  country: z.string().min(2),
  city: z.string().optional(),
  sector: z.string().optional(),
  salary: z.coerce.number().optional(),
  currency: z.string().optional(),
  experience: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
});

/*
==================================
JOBS (additions)
==================================
*/

export async function createJob(req: Request, res: Response) {
  try {
    const parsed = JobSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.flatten() });
    }

    const { data, error } = await EmployerService.createJob(parsed.data);
    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getJobById(req: Request, res: Response) {
  try {
    const { data, error } = await EmployerService.getJobById(String(req.params.id));
    if (error) throw error;

    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function updateJob(req: Request, res: Response) {
  try {
    const { data, error } = await EmployerService.updateJob(String(req.params.id), req.body);
    if (error) throw error;

    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

/*
==================================
REQUIREMENTS (addition)
==================================
*/

export async function getRequirementById(req: Request, res: Response) {
  try {
    const { data, error } = await EmployerService.getRequirementById(String(req.params.id));
    if (error) throw error;

    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

/*
==================================
APPLICATIONS (addition)
==================================
*/

export async function updateApplicationStatus(req: Request, res: Response) {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: "status is required" });
    }

    const { data, error } = await EmployerService.updateApplicationStatus(
      String(req.params.id),
      status,
    );
    if (error) throw error;

    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

/*
==================================
CANDIDATES (addition)
==================================
*/

export async function getCandidates(req: Request, res: Response) {
  try {
    const { data, error } = await EmployerService.getCandidates();
    if (error) throw error;

    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getCandidateById(req: Request, res: Response) {
  try {
    const { data, error } = await EmployerService.getCandidateById(String(req.params.id));
    if (error) throw error;

    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}
