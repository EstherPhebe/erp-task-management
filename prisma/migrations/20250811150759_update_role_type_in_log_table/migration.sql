/*
  Warnings:

  - You are about to drop the column `role_id` on the `log` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."log" DROP CONSTRAINT "log_role_id_fkey";

-- AlterTable
ALTER TABLE "public"."log" DROP COLUMN "role_id",
ADD COLUMN     "user_role" TEXT;

-- AddForeignKey
ALTER TABLE "public"."log" ADD CONSTRAINT "log_user_role_fkey" FOREIGN KEY ("user_role") REFERENCES "public"."roles"("role") ON DELETE SET NULL ON UPDATE CASCADE;
