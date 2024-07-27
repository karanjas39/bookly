-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "sold" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "BuyRequest" ALTER COLUMN "sold" SET DEFAULT false;
