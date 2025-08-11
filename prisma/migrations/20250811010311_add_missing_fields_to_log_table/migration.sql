/*
  Warnings:

  - Added the required column `action` to the `log` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Action" AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- AlterTable
ALTER TABLE "public"."log" ADD COLUMN     "action" "public"."Action" NOT NULL;
