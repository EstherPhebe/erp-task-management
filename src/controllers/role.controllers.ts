import { NextFunction, Request, Response } from "express";
import { Exception } from "../config/error.js";
import { Roles } from "../types/index.js";
import {
  createRole,
  editRolePermissions,
  editUserRole,
} from "../service/role.service.js";

export async function createNewRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { role, permissions }: Roles = req.body;
  try {
    const user = req.user;

    if (!user) {
      return next(
        new Exception(401, "Authentication Required", "UNAUTHORIZED")
      );
    } else if (user.role.role === "admin") {
      return next(
        new Exception(401, "Insufficient Permissions", "UNAUTHORIZED")
      );
    }

    const data = {
      role: role.trim().toLowerCase(),
      permissions: permissions.filter(
        str => str.includes(".") && str.trim().toLowerCase()
      ),
    };

    const createdRole = await createRole(user.userId, user.role.role, data);

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
  const { id } = req.body;
  const { newRole } = req.body;
  try {
    const user = req.user;

    if (!user) {
      return next(
        new Exception(401, "Authentication Required", "UNAUTHORIZED")
      );
    } else if (user.role.role === "admin") {
      return next(
        new Exception(401, "Insufficient Permissions", "UNAUTHORIZED")
      );
    }

    const role = await editUserRole(id, user.role.role, newRole);

    return res
      .status(200)
      .json({ success: true, message: "User role updated", ...role.role });
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
    const user = req.user;

    if (!user) {
      return next(
        new Exception(401, "Authentication Required", "UNAUTHORIZED")
      );
    } else if (user.role.role === "admin") {
      return next(
        new Exception(401, "Insufficient Permissions", "UNAUTHORIZED")
      );
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
