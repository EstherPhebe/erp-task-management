import { Router } from "express";
import { authenticate } from "../middleware/authenticate.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import {
  createNewRole,
  updateRolePermission,
  updateUserRole,
} from "../controllers/role.controllers.js";

const router = Router();

router.post("/role", authenticate, authorize(["admin"]), createNewRole);

router.put(
  "/role/:id",
  authenticate,
  authorize(["admin"]),
  updateRolePermission
);

router.put(
  "/user/:id/role",
  authenticate,
  authorize(["admin"]),
  updateUserRole
);

export default router;
