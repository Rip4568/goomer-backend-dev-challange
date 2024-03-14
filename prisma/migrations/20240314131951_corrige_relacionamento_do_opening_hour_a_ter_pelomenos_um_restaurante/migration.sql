/*
  Warnings:

  - Made the column `restaurantId` on table `opening_hours` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "opening_hours" DROP CONSTRAINT "opening_hours_restaurantId_fkey";

-- AlterTable
ALTER TABLE "opening_hours" ALTER COLUMN "restaurantId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "opening_hours" ADD CONSTRAINT "opening_hours_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
