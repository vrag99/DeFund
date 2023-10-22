-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_investorId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "investorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
