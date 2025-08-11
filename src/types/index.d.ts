import { Task } from "@prisma/client";

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
  action: "CREATE" | "UPDATE" | "DELETE";
  changedField?: string;
  prevValue?: any;
  value?: any;
  information: string;
}
