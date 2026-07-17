import { Router } from "express";

import {
  createJobOrder,
  listJobOrders,
  getJobOrder,
  updateJobOrder,
  updateJobOrderStatus,
  deleteJobOrder,
} from "../controllers/jobs";

const router = Router();

/*
|--------------------------------------------------------------------------
| Job Orders
|--------------------------------------------------------------------------
*/

/**
 * Create Job Order
 * POST /api/job-orders
 */
router.post("/", createJobOrder);

/**
 * List Job Orders
 * GET /api/job-orders
 *
 * Query Params
 * page
 * limit
 * employerId
 * country
 * category
 * status
 */
router.get("/", listJobOrders);

/**
 * Get Single Job Order
 * GET /api/job-orders/:id
 */
router.get("/:id", getJobOrder);

/**
 * Update Job Order
 * PATCH /api/job-orders/:id
 */
router.patch("/:id", updateJobOrder);

/**
 * Update Job Order Status
 * PATCH /api/job-orders/:id/status
 */
router.patch("/:id/status", updateJobOrderStatus);

/**
 * Soft Delete Job Order
 * DELETE /api/job-orders/:id
 */
router.delete("/:id", deleteJobOrder);

export default router;
