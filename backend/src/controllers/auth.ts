import { Request, Response } from "express";
import { z } from "zod";
import * as AuthService from "../services/auth";
import { AuthRequest } from "../middleware/auth";
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export function me(req: AuthRequest, res: Response) {
  return res.json({
    success: true,
    user: req.user,
  });
}
export function logout(req: Request, res: Response) {
  return res.json({
    success: true,
    message: "Logged out successfully",
  });
}
export async function login(req: Request, res: Response) {
  try {
    const parsed = LoginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten(),
      });
    }

    const result = await AuthService.login(parsed.data.email, parsed.data.password);

    return res.status(result.status).json(result);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
