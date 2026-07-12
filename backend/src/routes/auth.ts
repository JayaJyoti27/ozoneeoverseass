import { Router } from "express";
import { login, logout, me } from "../controllers/auth";
import { verifyToken } from "../middleware/auth";

const router = Router();
router.post("/logout", logout);
router.post("/login", login);
router.get("/me", verifyToken, me);
export default router;
