import { Task } from "@prisma/client";
import prisma from "../config/database.js";

//create a task - set interface for data
export async function createTask(data): Promise<Task> {
  const task = await prisma.task.create({
    data: {
      ...data,
    },
  });
  return task;
}

//get all tasks - filter by assigned, status
export async function getTaskWithFilters(params: type) {}

//update task/tasks status - check (task.update, task.complete)
export async function updateTask(
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
