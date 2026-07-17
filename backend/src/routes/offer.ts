import { Router } from "express";

import {
  createOffer,
  sendOffer,
  acceptOffer,
  rejectOffer,
  withdrawOffer,
  getOffer,
  listOffers,
} from "../controllers/offer";

const router = Router();

/*
|--------------------------------------------------------------------------
| Offers
|--------------------------------------------------------------------------
*/

/**
 * Create Offer
 *
 * POST /api/offers
 */
router.post("/", createOffer);

/**
 * List Offers
 *
 * GET /api/offers
 *
 * Query Params
 *
 * page
 * limit
 * employerId
 * candidateId
 * applicationId
 * jobOrderId
 * status
 */
router.get("/", listOffers);

/**
 * Get Offer
 *
 * GET /api/offers/:id
 */
router.get("/:id", getOffer);

/**
 * Send Offer
 *
 * PATCH /api/offers/:id/send
 */
router.patch("/:id/send", sendOffer);

/**
 * Accept Offer
 *
 * PATCH /api/offers/:id/accept
 */
router.patch("/:id/accept", acceptOffer);

/**
 * Reject Offer
 *
 * PATCH /api/offers/:id/reject
 */
router.patch("/:id/reject", rejectOffer);

/**
 * Withdraw Offer
 *
 * PATCH /api/offers/:id/withdraw
 */
router.patch("/:id/withdraw", withdrawOffer);

export default router;
