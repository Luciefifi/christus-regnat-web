/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Person_slug_key" ON "Person"("slug");
