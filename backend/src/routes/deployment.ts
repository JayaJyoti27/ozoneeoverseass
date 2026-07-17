import { Router } from "express";

import {
  createDeployment,
  bookTicket,
  confirmTravel,
  departCandidate,
  arriveCandidate,
  completeDeployment,
  cancelDeployment,
  getDeployment,
  listDeployments,
} from "../controllers/deployment";

const router = Router();

/*
|--------------------------------------------------------------------------
| Deployment
|--------------------------------------------------------------------------
*/

/**
 * Create Deployment
 *
 * POST /api/deployments
 */
router.post("/", createDeployment);

/**
 * List Deployments
 *
 * GET /api/deployments
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
router.get("/", listDeployments);

/**
 * Get Deployment
 *
 * GET /api/deployments/:id
 */
router.get("/:id", getDeployment);

/**
 * Book Ticket
 *
 * PATCH /api/deployments/:id/book-ticket
 */
router.patch("/:id/book-ticket", bookTicket);

/**
 * Confirm Travel
 *
 * PATCH /api/deployments/:id/confirm-travel
 */
router.patch("/:id/confirm-travel", confirmTravel);

/**
 * Mark Candidate Departed
 *
 * PATCH /api/deployments/:id/depart
 */
router.patch("/:id/depart", departCandidate);

/**
 * Mark Candidate Arrived
 *
 * PATCH /api/deployments/:id/arrive
 */
router.patch("/:id/arrive", arriveCandidate);

/**
 * Complete Deployment
 *
 * PATCH /api/deployments/:id/complete
 */
router.patch("/:id/complete", completeDeployment);

/**
 * Cancel Deployment
 *
 * PATCH /api/deployments/:id/cancel
 */
router.patch("/:id/cancel", cancelDeployment);

export default router;
