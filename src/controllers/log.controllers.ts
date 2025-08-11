import { NextFunction, Request, Response } from "express";
import { Exception } from "../config/error.js";
import { readUserLogs } from "../service/log.service.js";

export async function getUserHistory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user?.userId;

    if (!user) {
      return next(
        new Exception(401, "Authentication Required", "UNAUTHORIZED")
      );
    }
    const history = await readUserLogs(user, 50);

    return res.status(200).json({ success: true, ...history });
  } catch (error) {
    console.error(error);
    return next(new Exception(500, "Cannot Fetch Logs", "FETCH_ERROR"));
  }
}
