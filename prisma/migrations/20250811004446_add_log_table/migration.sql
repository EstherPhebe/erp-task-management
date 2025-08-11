/*
  Warnings:

  - You are about to drop the column `assignedId` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `createdId` on the `tasks` table. All the data in the column will be lost.
  - The primary key for the `userroles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId]` on the table `userroles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `assigned_id` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_id` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."tasks" DROP CONSTRAINT "tasks_assignedId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tasks" DROP CONSTRAINT "tasks_createdId_fkey";

-- AlterTable
ALTER TABLE "public"."tasks" DROP COLUMN "assignedId",
DROP COLUMN "createdId",
ADD COLUMN     "assigned_id" INTEGER NOT NULL,
ADD COLUMN     "created_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."userroles" DROP CONSTRAINT "userroles_pkey",
ADD CONSTRAINT "userroles_pkey" PRIMARY KEY ("userId", "roleId");

-- CreateTable
CREATE TABLE "public"."log" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "changed_field" TEXT,
    "prev_value" TEXT,
    "value" TEXT,
    "information" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userroles_userId_key" ON "public"."userroles"("userId");

-- AddForeignKey
ALTER TABLE "public"."log" ADD CONSTRAINT "log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."userroles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tasks" ADD CONSTRAINT "tasks_created_id_fkey" FOREIGN KEY ("created_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tasks" ADD CONSTRAINT "tasks_assigned_id_fkey" FOREIGN KEY ("assigned_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
