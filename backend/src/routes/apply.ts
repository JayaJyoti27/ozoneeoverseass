import { Router } from "express";
import { apply } from "../controllers/apply";

const router = Router();

router.post("/", apply);

export default router;
