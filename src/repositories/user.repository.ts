import { User } from "@prisma/client";
import prisma from "../config/database.js";

//get user
export async function getUser(id: number): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function getallUsersWithRoles() {
  return await prisma.userRole.findMany({
    include: {
      user: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });
}
