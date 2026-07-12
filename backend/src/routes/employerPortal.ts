import { Router } from "express";

import {
  getProfile,
  updateProfile,
  getDashboard,
  getJobs,
  getRequirements,
  createRequirement,
  updateRequirement,
  getApplications,
} from "../controllers/employerPortal";

const router = Router();

/*
========================================
PROFILE
========================================
*/

router.get("/me", getProfile);

router.patch("/me", updateProfile);

/*
========================================
DASHBOARD
========================================
*/

router.get("/dashboard", getDashboard);

/*
========================================
JOBS
========================================
*/

router.get("/jobs", getJobs);

/*
========================================
REQUIREMENTS
========================================
*/

router.get("/requirements", getRequirements);

router.post("/requirements", createRequirement);

router.patch("/requirements/:id", updateRequirement);

/*
========================================
APPLICATIONS
========================================
*/

router.get("/applications", getApplications);

import {
  // ...existing imports
  createJob,
  getJobById,
  updateJob,
  getRequirementById,
  updateApplicationStatus,
  getCandidates,
  getCandidateById,
} from "../controllers/employerPortal";

// JOBS
router.post("/jobs", createJob);
router.get("/jobs/:id", getJobById);
router.patch("/jobs/:id", updateJob);

// REQUIREMENTS
router.get("/requirements/:id", getRequirementById);

// APPLICATIONS
router.patch("/applications/:id", updateApplicationStatus);

// CANDIDATES
router.get("/candidates", getCandidates);
router.get("/candidates/:id", getCandidateById);
export default router;
