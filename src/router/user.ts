import { Router } from "express";
import { getUsers } from "../controllers/user.js";
import { authenticate } from "../middleware/authenticate.middleware.js";

const router = Router();

router.get("/user", authenticate, getUsers);

export default router;
