import { NextFunction, Request, Response } from "express";
import { Exception } from "../config/error.js";
import {
  getSingleTask,
  getTaskWithFilters,
} from "../repositories/task.repository.js";
import { TaskFilter, TaskQueryParams } from "../types/index.js";
import { createTask, deleteTaskById } from "../service/task.service.js";

//create a task
export async function getTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    status,
    assigned,
    pages = 1,
    limit = 25,
  }: TaskQueryParams = req.query;
  try {
    const filter: TaskFilter = {};
    if (status || assigned) {
      filter.status = status;
      filter.assignedId = assigned;
    }

    if (pages < 1 || isNaN(pages)) {
      return res.status(400).json({ Error: "Invalid Page Number" });
    }
    if (limit < 1 || limit > 50 || isNaN(limit)) {
      return res.status(400).json({ Error: "Invalid Limit" });
    }

    const tasks = await getTaskWithFilters(filter, pages, limit);
    return res.status(200).json({ success: true, ...tasks });
  } catch (error) {
    console.error(error);
    return next(new Exception(500, "Cannot Fetch Tasks", "FETCH_ERROR"));
  }
}

export async function createNewTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, description } = req.body;
  try {
    const data = {
      title,
      description,
      assignedId: req.user.userId,
      createdId: req.user.userId,
    };

    await createTask(req.user.userId, data);

    return res.status(201).json({ success: true, message: "New Task Created" });
  } catch (error) {
    console.error(error);
    return next(new Exception(500, "Cannot Create Tasks", "CREATE_ERROR"));
  }
}

//Get task
export async function getTaskById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  try {
    const user = req.user?.userId;

    if (!user) {
      return next(
        new Exception(401, "Authentication Required", "UNAUTHORIZED")
      );
    }
    const task = await getSingleTask(parseInt(id));
    if (!task) {
      return next(new Exception(404, "Task not found", "NOT_FOUND"));
    }

    return res.status(200).json({ success: true, ...task });
  } catch (error) {
    console.error(error);
    return next(new Exception(500, "Cannot fetch tasks", "FETCH_ERROR"));
  }
}

//update tasks status - check (task.update, task.complete)

//Delete Tasks
export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  try {
    const user = req.user?.userId;

    if (!user) {
      return next(
        new Exception(401, "Authentication Required", "UNAUTHORIZED")
      );
    }

    await deleteTaskById(parseInt(id), user);
    return res.status(200).json({ success: true, message: "Task Deleted" });
  } catch (error) {
    console.error(error);
    return next(new Exception(500, "Cannot Delete", "DELETE_ERROR"));
  }
}
