import { NextFunction, Request, Response } from "express";
import { Exception } from "../config/error.js";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof Exception) {
    console.log("error", error);
    res.status(error.statusCode).json({
      message: error.message,
      details: error.details,
    });
  } else {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
