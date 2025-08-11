import { Log } from "@prisma/client";
import prisma from "../config/database.js";
import { LogData } from "../types/index.js";

export async function addNewLogs(log: LogData): Promise<Log> {
  return await prisma.log.create({
    data: {
      ...log,
    },
  });
}

export async function getUserLogs(
  userId: number,
  limit: number
): Promise<Log[] | null> {
  return await prisma.log.findMany({
    where: {
      userId,
    },
    orderBy: { created_at: "desc" },
    take: limit,
  });
}
