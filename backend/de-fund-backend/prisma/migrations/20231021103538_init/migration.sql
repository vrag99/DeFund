-- CreateTable
CREATE TABLE "BaseUser" (
    "id" SERIAL NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BaseUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seeker" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Seeker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investor" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Investor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desciption" TEXT NOT NULL,
    "gitHubLink" TEXT NOT NULL,
    "amountSeeking" INTEGER NOT NULL,
    "youtubeVideLink" TEXT NOT NULL,
    "seekerId" INTEGER NOT NULL,
    "investorId" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seeker_userId_key" ON "Seeker"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_userId_key" ON "Investor"("userId");

-- AddForeignKey
ALTER TABLE "Seeker" ADD CONSTRAINT "Seeker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "BaseUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investor" ADD CONSTRAINT "Investor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "BaseUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_seekerId_fkey" FOREIGN KEY ("seekerId") REFERENCES "Seeker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
