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
  userId: number,
  userRole: string,
  data: Roles
) {
  const role = await newRole(data);

  await createNewLog({
    userId,
    userRole,
    action: "CREATE",
    value: JSON.stringify(role),
    information: `${userRole} created new role - ${role.role} with permissions ${role.permissions.join(", ")}`,
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
    information: `Updated role permissions - ${updatedRole.role} with permissions ${updatedRole.permissions.join(", ")}`,
  });

  return updatedRole;
}

export async function editUserRole(
  userId: number,
  userRole: string,
  roleName: string
) {
  //get previous role
  const role = await currentRole(userId);

  if (!role) {
    throw new Error("Role not found");
  }

  const updatedRole = await updateUserRole(userId, roleName);

  await createNewLog({
    userId,
    userRole,
    action: "UPDATE",
    prevValue: JSON.stringify(role),
    value: JSON.stringify(updatedRole),
    information: `Updated role - From ${role.role.role} to ${updatedRole.role.role}`,
  });

  return updatedRole;
}
