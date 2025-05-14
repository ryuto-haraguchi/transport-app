-- DropIndex
DROP INDEX "User_phone_number_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone_number" SET DATA TYPE TEXT;
