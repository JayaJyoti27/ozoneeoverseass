import { Router } from "express";
import {
  listCandidates,
  getCandidate,
  createCandidate,
  updateCandidate,
  archiveCandidate,
} from "../controllers/adminCandidates";

const router = Router();
import { deleteCandidate } from "../controllers/adminCandidates";

router.delete("/:id/hard", deleteCandidate);
// Get all candidates
router.get("/", listCandidates);

// Get single candidate
router.get("/:id", getCandidate);

// Create candidate
router.post("/", createCandidate);

// Update candidate
router.put("/:id", updateCandidate);

// Archive candidate
router.delete("/:id", archiveCandidate);

export default router;
