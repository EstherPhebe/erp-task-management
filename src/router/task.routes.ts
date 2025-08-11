import { Router } from "express";
import { authorize } from "../middleware/authorize.middleware.js";
import { authenticate } from "../middleware/authenticate.middleware.js";
import { createNewTask } from "../controllers/tasks.controllers.js";

const router = Router();

router.post("/task", authenticate, authorize["admin"], createNewTask);
