import { NextFunction } from "express";
import { UserRoles } from "../types/index.js";
import { Exception } from "../config/error.js";

export function checkRole(
  user: UserRoles,
  roles: string[],
  next: NextFunction
) {
  if (!user) {
    next(new Exception(401, "Authentication Required", "UNAUTHORIZED"));
    return false;
  } else if (!roles.includes(user.role.role)) {
    next(new Exception(403, "Insufficient Permissions", "FORBIDDEN"));
    return false;
  }
  return true;
}
