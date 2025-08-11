/*
  Warnings:

  - The `prev_value` column on the `log` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `value` column on the `log` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."log" DROP COLUMN "prev_value",
ADD COLUMN     "prev_value" JSONB,
DROP COLUMN "value",
ADD COLUMN     "value" JSONB;
