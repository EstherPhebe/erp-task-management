import { NextFunction, Request, Response } from "express";
import { Exception } from "../config/error.js";
import {
  hashPassword,
  verifyPassword,
  getToken,
} from "../helpers/auth.helper.js";
import { emailExist, register } from "../repositories/auth.repository.js";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await emailExist(email);

    if (existingUser) {
      return next(
        new Exception(409, "Email exists, Log in to continue", "EXISTING_USER")
      );
    }

    const hash = await hashPassword(password);
    await register({
      email,
      name,
      password: hash,
    });

    return res
      .status(201)
      .json({ success: true, message: "Sign in successful" });
  } catch (error) {
    return new Exception(500, "Server Error");
  }
};

export const logIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await emailExist(email);
    if (!user) {
      return new Exception(
        401,
        "Invalid Username or Password",
        "INVALID_CREDENTIALS"
      );
    }

    const verify = await verifyPassword(password, user.password);
    if (!verify) {
      return new Exception(
        401,
        "Invalid Username or Password",
        "INVALID_CREDENTIALS"
      );
    }
    const token = getToken(user.id);

    return res
      .cookie("cookie", token, {
        maxAge: 1000 * 60 * 60,
      })
      .status(200)
      .json({ success: true, message: "Logged in" });
  } catch (error) {
    return new Exception(500, "Server Error");
  }
};
