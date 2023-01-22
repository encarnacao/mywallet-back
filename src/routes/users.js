import express from "express";
import { login, signUp } from "../controllers/authControllers.js";
import { validateLogin, validateSignUp } from "../middlewares/validateUser.js";

const router = express.Router();

router.post("/sign-up", validateSignUp, signUp);
router.post("/login", validateLogin, login);

export default router;