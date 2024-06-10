/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Lesson` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_teacherId_fkey";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "teacherId";

-- CreateTable
CREATE TABLE "TeacherLesson" (
    "id" SERIAL NOT NULL,
    "lessonName" TEXT NOT NULL,
    "teacherID" INTEGER NOT NULL,

    CONSTRAINT "TeacherLesson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeacherLesson" ADD CONSTRAINT "TeacherLesson_lessonName_fkey" FOREIGN KEY ("lessonName") REFERENCES "Lesson"("lessonName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherLesson" ADD CONSTRAINT "TeacherLesson_teacherID_fkey" FOREIGN KEY ("teacherID") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
