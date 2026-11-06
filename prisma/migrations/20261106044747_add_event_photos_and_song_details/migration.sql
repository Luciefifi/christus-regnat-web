-- AlterTable
ALTER TABLE "EventVideo" ADD COLUMN     "composer" TEXT,
ADD COLUMN     "featuring" TEXT,
ADD COLUMN     "isSong" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "EventPhoto" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "src" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "EventPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventPhoto_eventId_position_key" ON "EventPhoto"("eventId", "position");

-- AddForeignKey
ALTER TABLE "EventPhoto" ADD CONSTRAINT "EventPhoto_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
