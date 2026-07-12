import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  type: z.enum(["candidate", "employer", "general"]),
  message: z.string().min(1),
  source_page: z.string().optional().nullable(),
});

export async function createLead(req: Request, res: Response) {
  try {
    const parsed = LeadSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    const { data, error } = await supabase.from("leads").insert(parsed.data).select().single();
    if (error) throw error;
    res.status(201).json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function listLeads(req: Request, res: Response) {
  try {
    let q = supabase.from("leads").select("*").order("created_at", { ascending: false });
    const { type } = req.query;
    if (type) q = q.eq("type", type as string);
    const { data, error } = await q;
    if (error) throw error;
    res.json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
