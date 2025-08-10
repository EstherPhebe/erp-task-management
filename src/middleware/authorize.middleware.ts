import { Request, Response, NextFunction } from "express";
import { Exception } from "../config/error.js";

export function authorize(roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const userRole = req.user.role?.role;

    if (!userRole || !roles.includes(userRole)) {
      return next(
        new Exception(403, "Unauthorized", "INSUFFICIENT_PERMISSIONS")
      );
    }

    next();
  };
}
