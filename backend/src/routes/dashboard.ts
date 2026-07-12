import { Router } from "express";
import {
  applicationStatus,
  stats,
  recentApplications,
  recentJobs,
  adminDashboard,
} from "../controllers/dashboard";

const router = Router();

router.get("/", adminDashboard);
router.get("/application-status", applicationStatus);
router.get("/stats", stats);
router.get("/recent-applications", recentApplications);
router.get("/recent-jobs", recentJobs);

export default router;
