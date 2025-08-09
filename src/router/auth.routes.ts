import { Router } from "express";
import { logIn, registerUser } from "../controllers/auth.controller.js";

const router = Router();

//log-in
router.post("/login", logIn);

//register
router.post("/register", registerUser);

export default router;
