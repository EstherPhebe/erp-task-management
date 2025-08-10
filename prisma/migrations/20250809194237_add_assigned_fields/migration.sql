/*
  Warnings:

  - You are about to drop the column `userId` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `assignedId` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdId` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."tasks" DROP CONSTRAINT "tasks_userId_fkey";

-- DropIndex
DROP INDEX "public"."tasks_userId_key";

-- AlterTable
ALTER TABLE "public"."roles" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."tasks" DROP COLUMN "userId",
ADD COLUMN     "assignedId" INTEGER NOT NULL,
ADD COLUMN     "createdId" INTEGER NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."userroles" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "public"."tasks" ADD CONSTRAINT "tasks_createdId_fkey" FOREIGN KEY ("createdId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tasks" ADD CONSTRAINT "tasks_assignedId_fkey" FOREIGN KEY ("assignedId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
