import { Request, Response } from "express";
import * as CountriesService from "../services/countries";
import { z } from "zod";

const CountrySchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1).max(5),
  status: z.enum(["active", "inactive"]).default("active"),
});

export async function listCountries(req: Request, res: Response) {
  try {
    const { data, error } = await CountriesService.listCountries();
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function createCountry(req: Request, res: Response) {
  try {
    const parsed = CountrySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, error: parsed.error.flatten() });
    }

    const { data, error } = await CountriesService.createCountry(parsed.data);
    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function updateCountry(req: Request, res: Response) {
  try {
    const parsed = CountrySchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, error: parsed.error.flatten() });
    }

    const { data, error } = await CountriesService.updateCountry(
      String(req.params.id),
      parsed.data,
    );
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function deleteCountry(req: Request, res: Response) {
  try {
    const { error } = await CountriesService.deleteCountry(String(req.params.id));
    if (error) throw error;
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}
