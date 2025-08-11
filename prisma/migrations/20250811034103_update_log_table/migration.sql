-- AlterTable
ALTER TABLE "public"."log" ADD COLUMN     "task_id" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."log" ADD CONSTRAINT "log_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
