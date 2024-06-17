-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "ClassLessons" DROP CONSTRAINT "ClassLessons_lessonName_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_classLessonId_fkey";

-- AddForeignKey
ALTER TABLE "ClassLessons" ADD CONSTRAINT "ClassLessons_lessonName_fkey" FOREIGN KEY ("lessonName") REFERENCES "Lesson"("lessonName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_classLessonId_fkey" FOREIGN KEY ("classLessonId") REFERENCES "ClassLessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
