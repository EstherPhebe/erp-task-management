import { Role, UserRole } from "@prisma/client";
import prisma from "../config/database.js";

type Roles = {
  role: string;
  permissions: string[];
};

export async function createRole(data: Roles): Promise<Role> {
  const role = await prisma.role.create({ data });
  return role;
}

//admin can see all roles - getRoles

//admin can update permissions on roles
export async function updatePermission(
  id: number,
  data: string[]
): Promise<Role> {
  return await prisma.role.update({
    where: {
      id,
    },
    data: {
      permissions: data,
    },
  });
}

//admin can delete roles
export async function deleteRole(id: number): Promise<void> {
  await prisma.role.delete({
    where: {
      id: id,
    },
  });
}

//admin can update a users role
export async function updateUserRole(
  user_id: number,
  role: string
): Promise<UserRole> {
  const getRole = await prisma.role.findFirst({
    where: {
      role: role,
    },
  });

  return await prisma.userRole.update({
    where: {
      userId: user_id,
    },
    data: {
      roleId: getRole?.id,
    },
  });
}

export async function currentRole(id: number) {
  const user = await prisma.userRole.findUnique({
    where: {
      userId: id,
    },
    include: {
      role: true,
    },
  });
  return user;
}
