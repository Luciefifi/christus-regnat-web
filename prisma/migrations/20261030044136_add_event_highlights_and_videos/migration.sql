-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "edition" INTEGER,
ADD COLUMN     "guests" TEXT[];

-- CreateTable
CREATE TABLE "EventTranslation" (
    "eventId" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "highlight" TEXT NOT NULL,

    CONSTRAINT "EventTranslation_pkey" PRIMARY KEY ("eventId","locale")
);

-- CreateTable
CREATE TABLE "EventVideo" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "EventVideo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventVideo_eventId_position_key" ON "EventVideo"("eventId", "position");

-- AddForeignKey
ALTER TABLE "EventTranslation" ADD CONSTRAINT "EventTranslation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventVideo" ADD CONSTRAINT "EventVideo_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
