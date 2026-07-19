import { Router } from "express";

import {
  getSettings,
  updateSettings,
  getCountries,
  getJobCategories,
  getEmailTemplates,
} from "../controllers/setiings";

const router = Router();

router.get("/", getSettings);

router.put("/", updateSettings);

router.get("/countries", getCountries);

router.get("/job-categories", getJobCategories);

router.get("/email-templates", getEmailTemplates);

export default router;
