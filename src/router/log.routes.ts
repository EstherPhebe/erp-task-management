import { Router } from "express";
import { authenticate } from "../middleware/authenticate.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { getAllLogs, getUserLogs } from "../controllers/log.controllers.js";

const router = Router();

router.get("/logs", authenticate, authorize(["admin"]), getAllLogs);

router.get("/logs/:id", authenticate, authorize(["admin"]), getUserLogs);

export default router;
