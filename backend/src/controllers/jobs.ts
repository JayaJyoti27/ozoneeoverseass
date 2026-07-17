import { Request, Response } from "express";
import { z } from "zod";

import * as JobOrderService from "../services/jobs";

import {
  CreateJobOrderSchema,
  UpdateJobOrderSchema,
  UpdateJobOrderStatusSchema,
} from "../validators/jobOrderSchema";

/*
|--------------------------------------------------------------------------
| TEMP IDs
|--------------------------------------------------------------------------
| Replace with req.user.id after authentication is implemented.
*/

const DEMO_EMPLOYER_ID = "00000000-0000-0000-0000-000000000001";

const DEMO_ADMIN_ID = "00000000-0000-0000-0000-000000000002";

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/

export async function createJobOrder(req: Request, res: Response) {
  try {
    const parsed = CreateJobOrderSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await JobOrderService.create(DEMO_EMPLOYER_ID, parsed.data);

    return res.status(201).json({
      success: true,
      message: "Job Order created successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Failed to create Job Order.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| LIST
|--------------------------------------------------------------------------
*/

export async function listJobOrders(req: Request, res: Response) {
  try {
    const page = Number(req.query.page ?? 1);

    const limit = Number(req.query.limit ?? 20);

    const data = await JobOrderService.listJobOrders({
      page,
      limit,
      employerId: req.query.employerId as string,
      country: req.query.country as string,
      category: req.query.category as string,
      status: req.query.status as any,
    });

    return res.json({
      success: true,
      ...data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to fetch Job Orders.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| GET
|--------------------------------------------------------------------------
*/

export async function getJobOrder(req: Request, res: Response) {
  try {
    const data = await JobOrderService.getJobOrder(String(req.params.id));

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message ?? "Job Order not found.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

export async function updateJobOrder(req: Request, res: Response) {
  try {
    const parsed = UpdateJobOrderSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await JobOrderService.updateJobOrder(String(req.params.id), parsed.data);

    return res.json({
      success: true,
      message: "Job Order updated successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to update Job Order.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| UPDATE STATUS
|--------------------------------------------------------------------------
*/

export async function updateJobOrderStatus(req: Request, res: Response) {
  try {
    const parsed = UpdateJobOrderStatusSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await JobOrderService.updateJobOrder(String(req.params.id), parsed.data);

    return res.json({
      success: true,
      message: "Status updated successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to update status.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

export async function deleteJobOrder(req: Request, res: Response) {
  try {
    await JobOrderService.deleteJobOrder(String(req.params.id), DEMO_EMPLOYER_ID);

    return res.json({
      success: true,
      message: "Job Order deleted successfully.",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to delete Job Order.",
    });
  }
}
