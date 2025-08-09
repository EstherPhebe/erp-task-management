import type { Request, Response } from "express";
import {
  hashPassword,
  verifyPassword,
  getToken,
} from "../helpers/auth.helper.js";
import { emailExist, register } from "../repositories/auth.repository.js";

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const existingUser = await emailExist(email);

  if (existingUser) {
    return res.status(409).json({ error: "Email exists. Log in" });
  }

  const hash = await hashPassword(password);
  await register({
    email,
    name,
    password: hash,
  });

  return res.status(201).json({ success: true, message: "Sign in successful" });
};

export const logIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await emailExist(email);
  if (!user) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }

  const verify = await verifyPassword(password, user.password);
  if (!verify) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }
  const token = getToken(user.id);

  return res
    .cookie("cookie", token, {
      maxAge: 1000 * 60 * 60,
    })
    .status(200)
    .json({ success: true, message: "Logged in" });
};
