import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Exception } from "../config/error.js";
import { currentRole } from "../repositories/roles.repository.js";
import "dotenv/config";
const env = process.env;

export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const cookie = req.header("cookie");
  if (!cookie) {
    return next(new Exception(401, "Authentication Required", "UNAUTHORIZED"));
  }

  const token = cookie.replace("cookie=", "").trim();

  try {
    if (!env.JWT_SECRET) {
      throw new Error("Configuration error");
    }
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: number };
    //get the userid and current role - role might have changed and prev role might be cached - confirm from docs?

    const user = await currentRole(decoded.id);

    if (!user) {
      return next(
        new Exception(401, "Authentication Required", "UNAUTHORIZED")
      );
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return next(new Exception(500, "Authentication Failed", "FORBIDDEN"));
  }
}
