import type { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Exception } from "../config/error.js";
import { currentRole } from "../repositories/roles.repository.js";
import "dotenv/config";
const env = process.env;

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookie = req.header("cookie");
  if (!cookie) {
    return new Exception(
      401,
      "Unauthorized, Log in to continue",
      "UNAUTHORIZED"
    );
  }

  const token = cookie.replace("cookie=", "").trim();

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET!) as { id: number };
    //get the userid and current role - role might have changed and prev role might be cached - confirm from docs?

    const user = await currentRole(decoded.id);

    if (!user) {
      return new Exception(401, "Invalid access", "UNAUTHORIZED");
    }

    req.user = user;
    next();
  } catch (error) {
    return new Exception(403, "Access Forbidden", "FORBIDDEN");
  }
}
