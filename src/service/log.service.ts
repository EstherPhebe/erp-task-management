import { Log } from "@prisma/client";
import {
  addNewLogs,
  getAllLogs,
  getUserLogs,
} from "../repositories/log.repository.js";
import { LogData } from "../types/index.js";

export async function createNewLog(log: LogData) {
  try {
    const data = {
      userId: log.userId,
      action: log.action,
      ...(log.changedField && { changedField: log.changedField }),
      ...(log.value && { value: log.value }),
      ...(log.prevValue && { prevValue: log.prevValue }),
      information: log.information,
    };
    await addNewLogs(data);
  } catch (error) {
    console.error(error, "Failed");
  }
}

export async function readUserLogs(
  id: number,
  limit: number = 50
): Promise<Log[] | null> {
  try {
    return await getUserLogs(id, limit);
  } catch (error) {
    console.error(error, "Failed to fetch Logs");
    return null;
  }
}

export async function readAllLogs(limit: number = 50): Promise<Log[] | null> {
  try {
    return await getAllLogs(limit);
  } catch (error) {
    console.error(error, "Failed to fetch Logs");
    return null;
  }
}
