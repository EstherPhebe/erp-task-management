import prisma from "../config/database.js";

type Register = {
  name: string;
  email: string;
  password: string;
};

export async function register(data: Register) {
  const newUser = await prisma.user.create({
    data,
  });
  return newUser;
}

export async function emailExist(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}
