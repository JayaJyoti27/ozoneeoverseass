import { z } from "zod";
import { JOB_ORDER_STATUSES } from "../types/jobOrder";

export const CreateJobOrderSchema = z.object({
  employer_id: z.uuid(),

  requirement_id: z.uuid().optional(),

  title: z.string().trim().min(3).max(200),

  category: z.string().trim().max(100).optional(),

  country: z.string().trim().max(100).optional(),

  vacancies: z.number().int().min(1).max(500),

  salary_min: z.number().nonnegative().optional(),

  salary_max: z.number().nonnegative().optional(),

  currency: z.string().max(10).optional(),

  contract_duration: z.string().max(100).optional(),

  working_hours: z.string().max(100).optional(),

  accommodation: z.boolean().default(false),

  transport: z.boolean().default(false),

  food: z.boolean().default(false),

  job_description: z.string().max(10000).optional(),

  requirements: z.string().max(10000).optional(),

  benefits: z.string().max(5000).optional(),

  remarks: z.string().max(5000).optional(),
});

export const UpdateJobOrderSchema = CreateJobOrderSchema.partial().omit({
  employer_id: true,
  requirement_id: true,
});

export const UpdateJobOrderStatusSchema = z.object({
  status: z.enum(JOB_ORDER_STATUSES),

  remarks: z.string().max(2000).optional(),
});

export type CreateJobOrderDto = z.infer<typeof CreateJobOrderSchema>;

export type UpdateJobOrderDto = z.infer<typeof UpdateJobOrderSchema>;

export type UpdateJobOrderStatusDto = z.infer<typeof UpdateJobOrderStatusSchema>;
