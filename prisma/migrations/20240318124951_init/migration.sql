/*
  Warnings:

  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Recipe";

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "rating" TEXT NOT NULL,
    "totalHours" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_title_key" ON "Course"("title");
