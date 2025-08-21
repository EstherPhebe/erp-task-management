import { Router } from "express";
import { authorize } from "../middleware/authorize.middleware.js";
import { authenticate } from "../middleware/authenticate.middleware.js";
import {
  createNewTask,
  deleteTask,
  getTaskById,
  getTasks,
} from "../controllers/task.controllers.js";

const router = Router();

router.post(
  "/task",
  authenticate,
  authorize(["admin", "manager"]),
  createNewTask
);

router.delete(
  "/task/:id",
  authenticate,
  authorize(["admin", "manager"]),
  deleteTask
);

router.get(
  "/task",
  authenticate,
  authorize(["admin", "manager", "user"]),
  getTasks
);

router.get(
  "/task/:id",
  authenticate,
  authorize(["admin", "manager", "user"]),
  getTaskById
);

export default router;
