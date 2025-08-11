import { NextFunction, Request, Response } from "express";
import { Exception } from "../config/error.js";
import { readUserLogs } from "../service/log.service.js";

export async function getUserHistory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user.userId;
    const history = await readUserLogs(user, 50);

    res.status(200).json({ success: true, ...history });
  } catch (error) {
    console.error(error);
    return next(new Exception(500, "Cannot Fetch Logs", "FETCH_ERROR"));
  }
}
