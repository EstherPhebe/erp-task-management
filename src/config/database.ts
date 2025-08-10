import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  errorFormat: "pretty",
  log: ["query", "error", "info", "warn"],
});

async function databaseConnect() {
  try {
    await prisma.$connect();
    console.log("Connection Successful");
  } catch (error) {
    console.log(error);
  }
}

databaseConnect();

export default prisma;
