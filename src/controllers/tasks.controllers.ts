import { NextFunction, Request, Response } from "express";
import { Exception } from "../config/error.js";
import {
  deleteTask,
  getSingleTask,
  getTaskWithFilters,
  newTask,
} from "../repositories/task.repository.js";
import { CreatedTask, TaskFilter, TaskQueryParams } from "../types/index.js";

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

//get all tasks - filter by assigned, status
export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, description } = req.body;
  try {
    await newTask({
      title,
      description,
      assignedId: req.user.userId,
      createdId: req.user.userId,
    });

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
  } catch (error) {}
}

//update tasks status - check (task.update, task.complete)

//Delete Tasks
export async function deleteTaskById(
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
    await deleteTask(parseInt(id));
    //log deletion -task - id, del by-user, task title
    return res.status(200).json({ success: true, message: "Task Deleted" });
  } catch (error) {
    console.error(error);
    return next(new Exception(500, "Cannot Delete", "DELETE_ERROR"));
  }
}
