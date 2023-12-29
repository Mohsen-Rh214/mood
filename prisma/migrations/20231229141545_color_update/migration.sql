/*
  Warnings:

  - You are about to drop the column `color` on the `Analysis` table. All the data in the column will be lost.
  - Added the required column `moodColor` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textColor` to the `Analysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analysis" DROP COLUMN "color",
ADD COLUMN     "moodColor" TEXT NOT NULL,
ADD COLUMN     "textColor" TEXT NOT NULL;
