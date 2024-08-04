/*
  Warnings:

  - Made the column `buyerId` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_buyerId_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "buyerId" SET NOT NULL,
ALTER COLUMN "buyerId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
