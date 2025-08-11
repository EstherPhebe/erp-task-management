import {
  currentRole,
  getRole,
  newRole,
  updatePermission,
  updateUserRole,
} from "../repositories/role.repository.js";
import { Roles } from "../types/index.js";
import { createNewLog } from "./log.service.js";

export async function createRole(
  data: Roles,
  creatorRole: string,
  creatorId: number
) {
  const check = await getRole("role", data.role);
  if (check) {
    throw new Error(
      `${check.role} already exist, update permissions or create a different role`
    );
  }
  const role = await newRole(data);

  await createNewLog({
    userId: creatorId,
    userRole: creatorRole,
    action: "CREATE",
    value: JSON.stringify(role),
    information: `${creatorRole} created new role - ${role.role} with permissions ${role.permissions.join(", ")}`,
  });

  return role;
}

export async function editRolePermissions(
  userId: number,
  roleId: number,
  userRole: string,
  data: string[]
) {
  //get previous role permissions
  const role = await getRole("id", roleId);

  if (!role) {
    throw new Error("Role not found");
  }

  const updatedRole = await updatePermission(roleId, data);

  await createNewLog({
    userId,
    userRole,
    action: "UPDATE",
    prevValue: JSON.stringify(role),
    value: JSON.stringify(updatedRole),
    information: `${userRole} - Updated role permissions - ${updatedRole.role} with permissions ${updatedRole.permissions.join(", ")}`,
  });

  return updatedRole;
}

export async function editUserRole(
  userId: number,
  roleName: string,
  updaterRole: string,
  updaterId: number
) {
  //get previous role
  const role = await currentRole(userId);

  if (!role) {
    throw new Error("Role not found");
  }

  const updatedRole = await updateUserRole(userId, roleName);

  await createNewLog({
    userId: updaterId,
    userRole: updaterRole,
    action: "UPDATE",
    prevValue: JSON.stringify(role),
    value: JSON.stringify(updatedRole),
    information: `${updaterRole} Updated role - From ${role.role.role} to ${updatedRole.role.role}`,
  });

  return updatedRole;
}
