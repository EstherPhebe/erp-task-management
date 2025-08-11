import { Role } from "@prisma/client";
import { Roles, UserRoles } from "../types/index.js";
import prisma from "../config/database.js";

//get single role by id or name
export async function getRole(field: string, value: string | number) {
  return await prisma.role.findFirst({
    where: {
      [field]: value,
    },
  });
}

export async function newRole(data: Roles): Promise<Role> {
  const role = await prisma.role.create({ data });
  return role;
}

//admin can see all roles - getRoles
export async function allRoles(): Promise<Role[]> {
  const roles = await prisma.role.findMany();
  return roles;
}

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
): Promise<UserRoles> {
  const prevRole = await getRole("role", role);

  return await prisma.userRole.update({
    where: {
      userId: user_id,
    },
    data: {
      roleId: prevRole?.id,
    },
    include: {
      role: true,
    },
  });
}

export async function currentRole(id: number): Promise<UserRoles | null> {
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
