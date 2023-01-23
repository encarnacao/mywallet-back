import express from "express";
import { deleteEntry, getEntries, newEntry } from "../controllers/entriesControllers.js";
import { validateEntry } from "../middlewares/validateEntries.js";

const router = express.Router();

router.post("/entries",validateEntry, newEntry);
router.get("/entries", getEntries);
router.delete("/entries/:id", deleteEntry);

export default router;