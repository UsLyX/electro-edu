/*
  Warnings:

  - The primary key for the `ClassLessons` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ClassLessons" DROP CONSTRAINT "ClassLessons_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ClassLessons_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "classLessonId" INTEGER NOT NULL,
    "questionDescription" TEXT NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "files" TEXT[],

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_classLessonId_fkey" FOREIGN KEY ("classLessonId") REFERENCES "ClassLessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
