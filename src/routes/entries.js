import express from "express";
import {
	deleteEntry,
	editEntry,
	getEntries,
	getEntry,
	newEntry,
} from "../controllers/entriesControllers.js";
import {
	validateEditEntry,
	validateEntry,
} from "../middlewares/validateEntries.js";

const router = express.Router();

router.post("/entries", validateEntry, newEntry);
router.get("/entries", getEntries);
router.delete("/entries/:id", deleteEntry);
router.get("/entries/:id", getEntry);
router.put("/entries/:id", validateEditEntry, editEntry);

export default router;
