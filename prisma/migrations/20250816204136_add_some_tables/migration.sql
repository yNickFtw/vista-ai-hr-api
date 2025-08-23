-- CreateTable
CREATE TABLE "api"."areas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api"."skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "areaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api"."user_skills" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api"."user_summaries" (
    "id" TEXT NOT NULL,
    "content" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_summaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api"."experiences" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "areas_parentId_idx" ON "api"."areas"("parentId");

-- CreateIndex
CREATE INDEX "skills_areaId_idx" ON "api"."skills"("areaId");

-- CreateIndex
CREATE INDEX "user_skills_userId_skillId_idx" ON "api"."user_skills"("userId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "user_summaries_userId_key" ON "api"."user_summaries"("userId");

-- CreateIndex
CREATE INDEX "user_summaries_userId_idx" ON "api"."user_summaries"("userId");

-- CreateIndex
CREATE INDEX "experiences_userId_idx" ON "api"."experiences"("userId");

-- AddForeignKey
ALTER TABLE "api"."areas" ADD CONSTRAINT "areas_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "api"."areas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api"."skills" ADD CONSTRAINT "skills_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "api"."areas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api"."user_skills" ADD CONSTRAINT "user_skills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "api"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api"."user_skills" ADD CONSTRAINT "user_skills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "api"."skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api"."user_summaries" ADD CONSTRAINT "user_summaries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "api"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api"."experiences" ADD CONSTRAINT "experiences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "api"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
