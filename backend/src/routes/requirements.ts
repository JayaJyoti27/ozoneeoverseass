import { Router } from "express";
import {
  listRequirements,
  approveRequirement,
  rejectRequirement,
  convertRequirement,
} from "../controllers/requirements";

const router = Router();

router.get("/", listRequirements);
router.patch("/:id/approve", approveRequirement);
router.patch("/:id/reject", rejectRequirement);
router.post("/:id/convert", convertRequirement);

export default router;
