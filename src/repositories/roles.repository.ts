import prisma from "../config/database.js";

type Role = {
  role: string;
  permissions: string[];
};

export async function createRole(data: Role) {
  const role = await prisma.role.create({ data });
  return role;
}

//admin can see all roles - getRoles

//admin can update permissions on roles
export async function updatePermission(id: number, data: string[]) {
  const role = await prisma.role.update({
    where: {
      id,
    },
    data: {
      permissions: data,
    },
  });
}

export async function deleteRole(id: number): Promise<void> {
  await prisma.role.delete({
    where: {
      id: id,
    },
  });
}

export async function updateUserRole(user_id: number, role: string) {
  const getRole = await prisma.role.findFirst({
    where: {
      role: role,
    },
  });

  await prisma.userRole.update({
    where: {
      userId: user_id,
    },
    data: {
      roleId: getRole.id,
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
