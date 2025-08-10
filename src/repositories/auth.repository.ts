import { User } from "@prisma/client";
import prisma from "../config/database.js";

type Register = {
  name: string;
  email: string;
  password: string;
};

export async function register(details: Register) {
  //get default role with minimal permission
  const role = await prisma.role.findFirst({
    where: {
      role: "viewer",
    },
  });

  //create new user with default role
  const newUser = await prisma.user.create({
    data: {
      ...details,
      user_role: {
        create: {
          roleId: role.id,
        },
      },
    },
    include: {
      user_role: true,
    },
  });
  return newUser;
}

export async function emailExist(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { email },
  });
}
