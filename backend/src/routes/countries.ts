import { Router } from "express";
import {
  listCountries,
  createCountry,
  updateCountry,
  deleteCountry,
} from "../controllers/countries";

const router = Router();

router.get("/", listCountries);
router.post("/", createCountry);
router.patch("/:id", updateCountry);
router.delete("/:id", deleteCountry);

export default router;
