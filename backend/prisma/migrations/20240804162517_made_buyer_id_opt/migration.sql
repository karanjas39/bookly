-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_buyerId_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "buyerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
