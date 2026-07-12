import { Router } from "express";

import {
  listApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  updateApplicationStatus,
} from "../controllers/application";

const router = Router();
router.patch("/:id/status", updateApplicationStatus);
router.get("/", listApplications);

router.get("/:id", getApplication);

router.post("/", createApplication);

router.put("/:id", updateApplication);

router.delete("/:id", deleteApplication);

export default router;
