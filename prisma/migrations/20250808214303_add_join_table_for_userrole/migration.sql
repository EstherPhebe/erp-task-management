/*
  Warnings:

  - You are about to drop the column `roleId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_roleId_fkey";

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "roleId";

-- CreateTable
CREATE TABLE "public"."userroles" (
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "userroles_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "public"."userroles" ADD CONSTRAINT "userroles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."userroles" ADD CONSTRAINT "userroles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
