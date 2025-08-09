import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
