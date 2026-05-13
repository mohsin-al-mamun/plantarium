-- CreateEnum
CREATE TYPE "PlantStatus" AS ENUM ('Seedling', 'Growing', 'Thriving', 'Dormant');

-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "status" "PlantStatus" NOT NULL DEFAULT 'Thriving';
