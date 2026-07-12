import { Router } from "express";

import {
  getProfile,
  updateProfile,
  getDashboard,
  getApplications,
  getApplication,
  updateResume,
  getStats,
} from "../controllers/candidatePortal";
import { getSavedJobs, saveJob, removeSavedJob } from "../controllers/savedJobs";

/*
========================================
SAVED JOBS
========================================
*/

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
APPLICATIONS
========================================
*/

router.get("/applications", getApplications);

router.get("/applications/:id", getApplication);

/*
========================================
RESUME
========================================
*/

router.patch("/resume", updateResume);

/*
========================================
STATS
========================================
*/

router.get("/stats", getStats);

router.get("/saved-jobs", getSavedJobs);
router.post("/saved-jobs", saveJob);
router.delete("/saved-jobs/:id", removeSavedJob);

import { getNotifications, markNotificationRead } from "../controllers/notifications";

/*
========================================
NOTIFICATIONS
========================================
*/

router.get("/notifications", getNotifications);
router.patch("/notifications/:id/read", markNotificationRead);

export default router;
