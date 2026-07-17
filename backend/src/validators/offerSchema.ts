import { z } from "zod";

export const OFFER_STATUS = [
  "draft",
  "sent",
  "viewed",
  "accepted",
  "rejected",
  "withdrawn",
  "expired",
] as const;

export const CreateOfferSchema = z.object({
  application_id: z.string().uuid(),

  job_order_id: z.string().uuid(),

  employer_id: z.string().uuid(),

  candidate_id: z.string().uuid(),

  salary: z.number().nonnegative(),

  currency: z.string().min(1).max(10),

  contract_duration: z.string().min(1).max(100),

  joining_date: z.coerce.date(),

  location: z.string().min(2),

  accommodation: z.boolean().default(false),

  transport: z.boolean().default(false),

  food: z.boolean().default(false),

  notes: z.string().max(5000).optional(),

  expires_at: z.coerce.date(),
});

export const SendOfferSchema = z.object({
  offer_letter_url: z.string().url(),
});

export const AcceptOfferSchema = z.object({
  remarks: z.string().max(2000).optional(),
});

export const RejectOfferSchema = z.object({
  reason: z.string().min(5).max(2000),
});

export const WithdrawOfferSchema = z.object({
  reason: z.string().min(5).max(2000),
});

export type CreateOfferDto = z.infer<typeof CreateOfferSchema>;

export type SendOfferDto = z.infer<typeof SendOfferSchema>;

export type AcceptOfferDto = z.infer<typeof AcceptOfferSchema>;

export type RejectOfferDto = z.infer<typeof RejectOfferSchema>;

export type WithdrawOfferDto = z.infer<typeof WithdrawOfferSchema>;
