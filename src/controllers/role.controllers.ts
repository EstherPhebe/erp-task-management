import { NextFunction, Request, Response } from "express";
import { Exception } from "../config/error.js";
import { Roles } from "../types/index.js";
import {
  createRole,
  editRolePermissions,
  editUserRole,
} from "../service/role.service.js";
import { checkRole } from "../utils/utils.js";

export async function createNewRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { role, permissions }: Roles = req.body;
  try {
    const user = req.user!;

    if (!checkRole(user, ["admin"], next)) {
      return;
    }

    const data = {
      role: role.trim().toLowerCase(),
      permissions: permissions.filter(
        str => str.includes(".") && str.trim().toLowerCase()
      ),
    };

    const createdRole = await createRole(data, user.role.role, user.userId);

    return res.status(201).json({ success: true, ...createdRole });
  } catch (error) {
    console.error(error);
    return next(new Exception(500, "Cannot Create Role", "CREATE_ERROR"));
  }
}

export async function updateUserRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const user = req.user!;

    if (!checkRole(user, ["admin"], next)) {
      return;
    }

    const newRole = await editUserRole(
      parseInt(id),
      role,
      user.role.role,
      user.userId
    );

    return res
      .status(200)
      .json({ success: true, message: "User role updated", ...newRole.role });
  } catch (error) {
    console.error(error);
    return next(new Exception(500, "Cannot Update Role", "UPDATE_ERROR"));
  }
}

export async function updateRolePermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const permissions: string[] = req.body;
  try {
    const user = req.user!;

    if (!checkRole(user, ["admin"], next)) {
      return;
    }

    const data = permissions.filter(
      str => str.includes(".") && str.trim().toLowerCase()
    );
    if (data.length == 0) {
      return next(new Exception(400, "Invalid Permissions", "INVALID_DATA"));
    }

    const role = await editRolePermissions(
      user.userId,
      parseInt(id),
      user.role.role,
      data
    );

    return res.status(200).json({
      success: true,
      message: "Role permission updated",
      ...role.permissions,
    });
  } catch (error) {
    console.error(error);
    return next(new Exception(500, "Cannot Update Permission", "UPDATE_ERROR"));
  }
}
