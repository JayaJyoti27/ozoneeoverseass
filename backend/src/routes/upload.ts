import { Router } from "express";
import { upload } from "../middleware/upload";
import { uploadResume } from "../controllers/upload";

const router = Router();

router.post("/resume", upload.single("resume"), uploadResume);

export default router;
