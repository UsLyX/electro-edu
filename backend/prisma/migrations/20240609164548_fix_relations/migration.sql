/*
  Warnings:

  - The primary key for the `TeacherLesson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TeacherLesson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TeacherLesson" DROP CONSTRAINT "TeacherLesson_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "TeacherLesson_pkey" PRIMARY KEY ("lessonName", "teacherID");
