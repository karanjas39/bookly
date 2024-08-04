-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "buyerId" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
