import { Router } from "express";

import {
  createInterview,
  listInterviews,
  getInterview,
  rescheduleInterview,
  completeInterview,
  cancelInterview,
} from "../controllers/interview";

const router = Router();

/*
|--------------------------------------------------------------------------
| Interviews
|--------------------------------------------------------------------------
*/

/**
 * Schedule Interview
 *
 * POST /api/interviews
 */
router.post("/", createInterview);

/**
 * List Interviews
 *
 * GET /api/interviews
 *
 * Query Params
 * page
 * limit
 * applicationId
 * jobOrderId
 * interviewerEmail
 * status
 */
router.get("/", listInterviews);

/**
 * Get Interview
 *
 * GET /api/interviews/:id
 */
router.get("/:id", getInterview);

/**
 * Reschedule Interview
 *
 * PATCH /api/interviews/:id/reschedule
 */
router.patch("/:id/reschedule", rescheduleInterview);

/**
 * Complete Interview
 *
 * PATCH /api/interviews/:id/complete
 */
router.patch("/:id/complete", completeInterview);

/**
 * Cancel Interview
 *
 * PATCH /api/interviews/:id/cancel
 */
router.patch("/:id/cancel", cancelInterview);

export default router;
