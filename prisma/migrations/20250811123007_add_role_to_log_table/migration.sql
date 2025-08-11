/*
  Warnings:

  - A unique constraint covering the columns `[role]` on the table `roles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."log" ADD COLUMN     "role_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "roles_role_key" ON "public"."roles"("role");

-- AddForeignKey
ALTER TABLE "public"."log" ADD CONSTRAINT "log_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
