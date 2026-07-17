import { Router } from "express";

import {
  createMedical,
  scheduleMedical,
  uploadMedicalReport,
  approveMedical,
  rejectMedical,
  getMedical,
  listMedicals,
} from "../controllers/medical";

const router = Router();

/*
|--------------------------------------------------------------------------
| Medical
|--------------------------------------------------------------------------
*/

/**
 * Create Medical
 *
 * POST /api/medical
 */
router.post("/", createMedical);

/**
 * List Medicals
 *
 * GET /api/medical
 *
 * Query Params
 *
 * page
 * limit
 * candidateId
 * employerId
 * applicationId
 * jobOrderId
 * status
 */
router.get("/", listMedicals);

/**
 * Get Medical
 *
 * GET /api/medical/:id
 */
router.get("/:id", getMedical);

/**
 * Schedule Medical
 *
 * PATCH /api/medical/:id/schedule
 */
router.patch("/:id/schedule", scheduleMedical);

/**
 * Upload Medical Report
 *
 * PATCH /api/medical/:id/upload-report
 */
router.patch("/:id/upload-report", uploadMedicalReport);

/**
 * Approve Medical
 *
 * PATCH /api/medical/:id/approve
 */
router.patch("/:id/approve", approveMedical);

/**
 * Reject Medical
 *
 * PATCH /api/medical/:id/reject
 */
router.patch("/:id/reject", rejectMedical);

export default router;
