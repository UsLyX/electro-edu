/*
  Warnings:

  - The `score` column on the `Answer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "studentScore" AS ENUM ('PERFECT', 'GOOD', 'SATISFACTORY', 'BAD', 'NOSCORE');

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "score",
ADD COLUMN     "score" "studentScore" NOT NULL DEFAULT 'NOSCORE';
