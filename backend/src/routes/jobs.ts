import { Router } from "express";

import {
  listJobs,
  getJob,
  createJob,
  updateJob,
  archiveJob,
  getFeaturedJobs,
  getSimilarJobs,
  getJobStats,
} from "../controllers/jobs";

import { verifyToken } from "../middleware/auth";
import { isAdmin } from "../middleware/admin";

const router = Router();

/* ===========================
   Public Routes
=========================== */

router.get("/", listJobs);
router.get("/featured", getFeaturedJobs);
router.get("/similar/:id", getSimilarJobs);
router.get("/stats", getJobStats);
router.get("/:id", getJob);

/* ===========================
   Admin Routes
=========================== */

router.post("/", verifyToken, isAdmin, createJob);
router.patch("/:id", verifyToken, isAdmin, updateJob);
router.delete("/:id", verifyToken, isAdmin, archiveJob);

export default router;
