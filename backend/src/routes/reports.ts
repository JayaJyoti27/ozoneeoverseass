import { Router } from "express";

import {
  getDashboardReport,
  getEmployerReport,
  getCandidateReport,
  getRecruitmentReport,
  exportCandidateReport,
} from "../controllers/report";

const router = Router();

/*
|--------------------------------------------------------------------------
| Reports
|--------------------------------------------------------------------------
*/
router.get("/candidates/export", exportCandidateReport);
router.get("/dashboard", getDashboardReport);

router.get("/employers", getEmployerReport);

router.get("/candidates", getCandidateReport);

router.get("/recruitment", getRecruitmentReport);

export default router;
