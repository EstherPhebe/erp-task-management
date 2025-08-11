import { Prisma, Task } from "@prisma/client";
import prisma from "../config/database.js";
import { TaskFilter, CreatedTask } from "../types/index.js";

//create a task - set interface for data
export async function newTask(data: CreatedTask): Promise<Task> {
  const task = await prisma.task.create({
    data: {
      ...data,
    },
  });
  return task;
}

//get all tasks - filter by assigned, status
export async function getTaskWithFilters(
  data: TaskFilter,
  page: number,
  limit: number
): Promise<Task[]> {
  const where: Prisma.TaskWhereInput = {};
  if (data.status !== undefined) {
    where.status = data.status;
  }

  if (data.assignedId !== undefined) {
    where.assignedId = data.assignedId;
  }
  return prisma.task.findMany({
    where,
    skip: page,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
}

//get task by id
export async function getSingleTask(id: number): Promise<Task | null> {
  return await prisma.task.findUnique({
    where: {
      id,
    },
  });
}

//update task/tasks status - check (task.update, task.complete)
export async function updateOneTask(
  id: number,
  updateValue: Record<string, string | number>
): Promise<Task> {
  return await prisma.task.update({
    where: {
      id,
    },
    data: {
      ...updateValue,
    },
  });
}

//delete a task (admin, manager) delete /tasks/delete/id
export async function deleteTask(id: number): Promise<void> {
  await prisma.task.delete({
    where: {
      id: id,
    },
  });
}
