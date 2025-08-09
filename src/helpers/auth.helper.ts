import "dotenv/config";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const env = process.env;

export async function hashPassword(password: string): Promise<string> {
  const hash = await argon2.hash(password);
  return hash;
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const verified = await argon2.verify(hash, password);

  return verified;
}

export function getToken(id: number) {
  const token = jwt.sign({ id: id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES,
  });

  return token;
}
