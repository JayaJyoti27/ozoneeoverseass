import { Request, Response } from "express";
import { z } from "zod";
import * as CandidateService from "../services/candidatePortal";

/*
========================================
Validation
========================================
*/

const UpdateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().min(8).optional(),
  nationality: z.string().min(2).optional(),
  specialty: z.string().min(2).optional(),
  experience_years: z.coerce.number().min(0).optional(),
  target_countries: z.array(z.string()).optional(),
});

const ResumeSchema = z.object({
  cv_url: z.string().url(),
});

/*
========================================
GET PROFILE
========================================
*/

export async function getProfile(req: Request, res: Response) {
  try {
    const { data, error } = await CandidateService.getProfile();

    if (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
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
========================================
UPDATE PROFILE
========================================
*/

export async function updateProfile(req: Request, res: Response) {
  try {
    const parsed = UpdateProfileSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const { data, error } = await CandidateService.updateProfile(parsed.data);

    if (error) {
      throw error;
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
========================================
DASHBOARD
========================================
*/

export async function getDashboard(req: Request, res: Response) {
  try {
    const dashboard = await CandidateService.getDashboard();

    res.json({
      success: true,
      data: dashboard,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

/*
========================================
APPLICATIONS
========================================
*/

export async function getApplications(req: Request, res: Response) {
  try {
    const { data, error } = await CandidateService.getApplications();

    if (error) {
      throw error;
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
========================================
APPLICATION DETAILS
========================================
*/

export async function getApplication(req: Request, res: Response) {
  try {
    const { data, error } = await CandidateService.getApplication(req.params.id);

    if (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
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
========================================
UPDATE RESUME
========================================
*/

export async function updateResume(req: Request, res: Response) {
  try {
    const parsed = ResumeSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const { data, error } = await CandidateService.updateResume(parsed.data.cv_url);

    if (error) {
      throw error;
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
========================================
STATS
========================================
*/

export async function getStats(req: Request, res: Response) {
  try {
    const stats = await CandidateService.getStats();

    res.json({
      success: true,
      data: stats,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
