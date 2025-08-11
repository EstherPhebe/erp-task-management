import { Role, Task } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: UserRoles;
    }
  }
}

export interface CreatedTask {
  title: string;
  description?: string;
  status?: Task["status"];
  assignedId: number;
  createdId: number;
}

export interface TaskFilter {
  status?: Task["status"];
  assignedId?: number;
}

export interface TaskQueryParams {
  status?: Task["status"];
  assigned?: number;
  pages?: number;
  limit?: number;
}

export type Register = {
  name: string;
  email: string;
  password: string;
};

export interface LogData {
  userId: number;
  taskId?: number;
  userRole?: string;
  action: "CREATE" | "UPDATE" | "DELETE";
  changedField?: string;
  prevValue?: any;
  value?: any;
  information: string;
}

type UserRoles = {
  userId: number;
  roleId: number;
  createdAt: Date;
  updatedAt?: Date | null;
  role: Role;
};

type Roles = {
  role: string;
  permissions: string[];
};
