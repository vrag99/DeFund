-- AlterTable
ALTER TABLE "BaseUser" ADD COLUMN     "isInvestor" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSeeker" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "isFunded" SET DEFAULT false;
