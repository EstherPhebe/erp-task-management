import { NextFunction, Request, Response } from "express";
import { Exception } from "../config/error.js";
import { readAllLogs, readUserLogs } from "../service/log.service.js";
import { checkRole } from "../utils/utils.js";

export async function getUserLogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  try {
    const user = req.user!;

    if (!checkRole(user, "admin", next)) {
      return;
    }
    const history = await readUserLogs(parseInt(id), 50);

    return res.status(200).json({ success: true, ...history });
  } catch (error) {
    console.error(error);
    return next(new Exception(500, "Cannot Fetch Logs", "FETCH_ERROR"));
  }
}

export async function getAllLogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user!;

    if (!checkRole(user, "admin", next)) {
      return;
    }
    const logs = await readAllLogs(50);

    return res.status(200).json({ success: true, ...logs });
  } catch (error) {
    console.error(error);
    return next(new Exception(500, "Cannot Fetch Logs", "FETCH_ERROR"));
  }
}
