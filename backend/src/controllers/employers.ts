import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import { z } from "zod";

const RequirementSchema = z.object({
  company_name: z.string().min(1),
  contact_name: z.string().min(1),
  email: z.string().email(),
  country: z.string().min(1),
  sector: z.string().min(1),
  role: z.string().min(1),
  headcount: z.coerce.number().positive(),
  timeline: z.string().min(1),
  message: z.string().optional(),
});

export async function createRequirement(req: Request, res: Response) {
  try {
    const parsed = RequirementSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    const { data, error } = await supabase
      .from("employer_requirements")
      .insert({ ...parsed.data, status: "new" })
      .select()
      .single();
    if (error) throw error;
    res.status(201).json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function listRequirements(req: Request, res: Response) {
  try {
    let q = supabase
      .from("employer_requirements")
      .select("*")
      .order("created_at", { ascending: false });
    const { status, country, sector } = req.query;
    if (status) q = q.eq("status", status as string);
    if (country) q = q.eq("country", country as string);
    if (sector) q = q.eq("sector", sector as string);
    const { data, error } = await q;
    if (error) throw error;
    res.json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateRequirementStatus(req: Request, res: Response) {
  try {
    const { status } = req.body;
    if (!["new", "in-progress", "filled"].includes(status)) {
      res.status(400).json({ error: "Invalid status" });
      return;
    }
    const { data, error } = await supabase
      .from("employer_requirements")
      .update({ status })
      .eq("id", req.params.id)
      .select()
      .single();
    if (error) throw error;
    res.json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
