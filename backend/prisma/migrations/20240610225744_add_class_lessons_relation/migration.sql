/*
  Warnings:

  - You are about to drop the column `classId` on the `Lesson` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_classId_fkey";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "classId";

-- CreateTable
CREATE TABLE "ClassLessons" (
    "classId" INTEGER NOT NULL,
    "lessonName" TEXT NOT NULL,

    CONSTRAINT "ClassLessons_pkey" PRIMARY KEY ("classId","lessonName")
);

-- AddForeignKey
ALTER TABLE "ClassLessons" ADD CONSTRAINT "ClassLessons_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassLessons" ADD CONSTRAINT "ClassLessons_lessonName_fkey" FOREIGN KEY ("lessonName") REFERENCES "Lesson"("lessonName") ON DELETE RESTRICT ON UPDATE CASCADE;
