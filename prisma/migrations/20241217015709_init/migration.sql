-- CreateEnum
CREATE TYPE "RecordStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'PROCESSING');

-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "path" TEXT,
    "status" "RecordStatus" NOT NULL DEFAULT 'PROCESSING',

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Record_path_key" ON "Record"("path");
