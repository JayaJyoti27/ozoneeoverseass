import { Router } from "express";

import {
  createVisa,
  submitVisa,
  approveVisa,
  rejectVisa,
  issueVisa,
  getVisa,
  listVisas,
} from "../controllers/visa";

const router = Router();

/*
|--------------------------------------------------------------------------
| Visa
|--------------------------------------------------------------------------
*/

/**
 * Create Visa
 *
 * POST /api/visa
 */
router.post("/", createVisa);

/**
 * List Visas
 *
 * GET /api/visa
 *
 * Query Params
 *
 * page
 * limit
 * applicationId
 * candidateId
 * employerId
 * jobOrderId
 * status
 */
router.get("/", listVisas);

/**
 * Get Visa
 *
 * GET /api/visa/:id
 */
router.get("/:id", getVisa);

/**
 * Submit Visa
 *
 * PATCH /api/visa/:id/submit
 */
router.patch("/:id/submit", submitVisa);

/**
 * Approve Visa
 *
 * PATCH /api/visa/:id/approve
 */
router.patch("/:id/approve", approveVisa);

/**
 * Reject Visa
 *
 * PATCH /api/visa/:id/reject
 */
router.patch("/:id/reject", rejectVisa);

/**
 * Issue Visa
 *
 * PATCH /api/visa/:id/issue
 */
router.patch("/:id/issue", issueVisa);

export default router;
