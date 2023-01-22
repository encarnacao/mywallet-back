import express from "express";
import { getEntries, newEntry } from "../controllers/entriesControllers.js";
import { validateEntry } from "../middlewares/validateEntries.js";

const router = express.Router();

router.post("/entries",validateEntry, newEntry);
router.get("/entries", getEntries);

export default router;