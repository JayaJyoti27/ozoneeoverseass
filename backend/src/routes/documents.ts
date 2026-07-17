import { Router } from "express";

import {
  uploadDocument,
  replaceDocument,
  approveDocument,
  rejectDocument,
  getDocument,
  listDocuments,
  downloadDocument,
} from "../controllers/document";

const router = Router();

/*
|--------------------------------------------------------------------------
| Documents
|--------------------------------------------------------------------------
*/

/**
 * Upload Document
 *
 * POST /api/documents
 */
router.post("/", uploadDocument);

/**
 * List Documents
 *
 * GET /api/documents
 *
 * Query Params
 *
 * page
 * limit
 * applicationId
 * candidateId
 * employerId
 * jobOrderId
 * type
 * status
 */
router.get("/", listDocuments);

/**
 * Get Document
 *
 * GET /api/documents/:id
 */
router.get("/:id", getDocument);

/**
 * Download Document
 *
 * GET /api/documents/:id/download
 */
router.get("/:id/download", downloadDocument);

/**
 * Replace Document
 *
 * PUT /api/documents/:id/replace
 */
router.put("/:id/replace", replaceDocument);

/**
 * Approve Document
 *
 * PATCH /api/documents/:id/approve
 */
router.patch("/:id/approve", approveDocument);

/**
 * Reject Document
 *
 * PATCH /api/documents/:id/reject
 */
router.patch("/:id/reject", rejectDocument);

export default router;
