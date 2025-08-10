import type { Request, Response, NextFunction } from "express";
import { Exception } from "../config/error.js";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof Exception) {
    res.status(err.statusCode).json({
      message: err.message,
      details: err.details,
    });
  } else {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
