import { z } from "zod";

export const DEPLOYMENT_STATUS = [
  "pending",
  "ticket_booked",
  "travel_confirmed",
  "departed",
  "arrived",
  "deployed",
  "cancelled",
] as const;

export const CreateDeploymentSchema = z.object({
  application_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  employer_id: z.string().uuid().optional(),
  job_order_id: z.string().uuid().optional(),
  visa_id: z.string().uuid(),
});

export const BookTicketSchema = z.object({
  airline_name: z.string().min(2),

  flight_number: z.string().min(2),

  ticket_number: z.string().min(2),

  departure_airport: z.string().min(2),

  arrival_airport: z.string().min(2),

  departure_time: z.coerce.date(),

  arrival_time: z.coerce.date(),

  ticket_document_id: z.string().uuid().optional(),

  remarks: z.string().optional(),
});

export const ConfirmTravelSchema = z.object({
  remarks: z.string().optional(),
});

export const DepartSchema = z.object({
  remarks: z.string().optional(),
});

export const ArriveSchema = z.object({
  remarks: z.string().optional(),
});

export const CompleteDeploymentSchema = z.object({
  remarks: z.string().optional(),
});

export const CancelDeploymentSchema = z.object({
  reason: z.string().min(5),
});

export type CreateDeploymentDto = z.infer<typeof CreateDeploymentSchema>;

export type BookTicketDto = z.infer<typeof BookTicketSchema>;

export type ConfirmTravelDto = z.infer<typeof ConfirmTravelSchema>;

export type DepartDto = z.infer<typeof DepartSchema>;

export type ArriveDto = z.infer<typeof ArriveSchema>;

export type CompleteDeploymentDto = z.infer<typeof CompleteDeploymentSchema>;

export type CancelDeploymentDto = z.infer<typeof CancelDeploymentSchema>;
