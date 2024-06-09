/*
  Warnings:

  - You are about to drop the column `firsttName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `firsttName` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "userStatus" AS ENUM ('ACCEPTED', 'REJECTED', 'PROCESSING');

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "firsttName",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "status" "userStatus" NOT NULL DEFAULT 'PROCESSING',
ALTER COLUMN "dateOfBirth" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "firsttName",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "status" "userStatus" NOT NULL DEFAULT 'PROCESSING';
