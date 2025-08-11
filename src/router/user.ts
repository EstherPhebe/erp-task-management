import { Router } from "express";
import { getUsers } from "../controllers/user.js";
import { authenticate } from "../middleware/authenticate.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = Router();

router.get("/user", authenticate, authorize(["admin"]), getUsers);

export default router;
