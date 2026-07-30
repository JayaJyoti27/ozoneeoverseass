import { Router } from "express";
import { verifySession } from "../middleware/verifyAuth";
import { completeCandidateSignup } from "../controllers/auth";

const router = Router();

router.post("/complete-candidate-signup", verifySession, completeCandidateSignup);

export default router;
