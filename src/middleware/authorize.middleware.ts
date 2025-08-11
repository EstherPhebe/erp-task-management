import { Request, Response, NextFunction } from "express";
import { Exception } from "../config/error.js";

export function authorize(roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        return next(
          new Exception(401, "Authentication Required", "UNAUTHORIZED")
        );
      }
      const userRole = user.role?.role;

      if (!userRole || !roles.includes(userRole)) {
        return next(
          new Exception(403, "Unauthorized", "INSUFFICIENT_PERMISSIONS")
        );
      }

      next();
    } catch (error) {
      console.error(error);
      return next(new Exception(500, "Authentication Failed", "FORBIDDEN"));
    }
  };
}
