import { Request, Response } from "express";
import { z } from "zod";
import * as ApplyService from "../services/apply";

const ApplySchema = z.object({
  job_id: z.string().uuid(),

  name: z.string().trim().min(2).max(100),

  email: z.string().trim().email(),

  phone: z
    .string()
    .trim()
    .min(10)
    .max(15)
    .regex(/^[0-9+\-\s()]+$/),

  nationality: z.string().trim().min(2),

  specialty: z.string().trim().min(2),

  experience_years: z.coerce.number().min(0).max(50),

  target_countries: z.array(z.string()).min(1),

  cv_url: z.string().url(),
});

export async function apply(req: Request, res: Response) {
  try {
    const parsed = ApplySchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    const result = await ApplyService.applyForJob(parsed.data);

    return res.status(result.status).json(result);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
