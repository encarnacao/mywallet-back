import express from "express";
import { signUp } from "../controllers/authControllers.js";
import { validateSignUp } from "../middlewares/validateUser.js";

const router = express.Router();

router.post("/sign-up", validateSignUp, signUp);

export default router;