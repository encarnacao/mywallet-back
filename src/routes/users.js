import express from "express";
import { signUp } from "../controllers/authControllers.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = express.Router();

router.post("/sign-up", validateUser, signUp);

export default router;