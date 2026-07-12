import { Router } from "express";

import {
  listEmployers,
  getEmployer,
  createEmployer,
  updateEmployer,
  archiveEmployer,
  getEmployerDashboard,
} from "../controllers/adminEmployer";

const router = Router();

/*
====================================
EMPLOYERS
====================================
*/

router.get("/", listEmployers);

router.get("/:id", getEmployer);

router.post("/", createEmployer);

router.put("/:id", updateEmployer);

router.delete("/:id", archiveEmployer);

router.get("/:id/dashboard", getEmployerDashboard);

export default router;
