-- CreateEnum
CREATE TYPE "PlantCategory" AS ENUM ('Flowers', 'Fruits', 'Vegetables');

-- CreateEnum
CREATE TYPE "ProductKind" AS ENUM ('fertilizer', 'pesticide');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('organic', 'chemical');

-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "meta" TEXT,
    "category" "PlantCategory" NOT NULL,
    "img" TEXT,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variety" (
    "id" SERIAL NOT NULL,
    "plantId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "trait" TEXT,
    "season" TEXT,
    "note" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Variety_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VarietyPhoto" (
    "id" SERIAL NOT NULL,
    "varietyId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "VarietyPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kind" "ProductKind" NOT NULL,
    "type" "ProductType" NOT NULL,
    "dosage" TEXT,
    "frequency" TEXT,
    "notes" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantProduct" (
    "plantId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "PlantProduct_pkey" PRIMARY KEY ("plantId","productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plant_slug_key" ON "Plant"("slug");

-- CreateIndex
CREATE INDEX "Variety_plantId_idx" ON "Variety"("plantId");

-- CreateIndex
CREATE INDEX "VarietyPhoto_varietyId_idx" ON "VarietyPhoto"("varietyId");

-- AddForeignKey
ALTER TABLE "Variety" ADD CONSTRAINT "Variety_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VarietyPhoto" ADD CONSTRAINT "VarietyPhoto_varietyId_fkey" FOREIGN KEY ("varietyId") REFERENCES "Variety"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantProduct" ADD CONSTRAINT "PlantProduct_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantProduct" ADD CONSTRAINT "PlantProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
