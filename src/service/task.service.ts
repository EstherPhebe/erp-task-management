import {
  deleteTask,
  getSingleTask,
  newTask,
  updateOneTask,
} from "../repositories/task.repository.js";
import { CreatedTask } from "../types/index.js";
import { createNewLog } from "./log.service.js";

export async function updateTaskById(
  taskId: number,
  userId: number,
  updates: Record<string, string | number>
) {
  const task = await getSingleTask(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  const updatedTask = await updateOneTask(taskId, updates);

  await createNewLog({
    userId,
    taskId: task.id,
    action: "UPDATE",
    prevValue: JSON.stringify(task),
    value: JSON.stringify(updatedTask),
    information: `Updated Task`,
  });
  return updatedTask;
}

export async function createTask(userId: number, data: CreatedTask) {
  const task = await newTask(data);

  await createNewLog({
    userId,
    taskId: task.id,
    action: "CREATE",
    value: JSON.stringify(task),
    information: `Created new task - ${task.title}`,
  });

  return task;
}

//Delete Tasks
export async function deleteTaskById(taskId: number, userId: number) {
  const task = await getSingleTask(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  await deleteTask(taskId);

  await createNewLog({
    userId,
    taskId: task.id,
    action: "DELETE",
    prevValue: JSON.stringify(task),
    information: `Deleted Task - ${task.title}`,
  });
}
