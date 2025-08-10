import { Request, Response, NextFunction } from "express";
import { Exception } from "../config/error.js";

export function authorize(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user.role?.role;

    if (!userRole || !roles.includes(userRole)) {
      return new Exception(403, "Unauthorized", "INSUFFICIENT_PERMISSIONS");
    }

    next();
  };
}
