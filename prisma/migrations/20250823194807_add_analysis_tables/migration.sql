-- CreateEnum
CREATE TYPE "api"."AnalysisStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "api"."analyses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "api"."AnalysisStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api"."analysis_candidates" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "analysis_summary" TEXT,
    "score" INTEGER,
    "technical_match_score" INTEGER,
    "business_fit_score" INTEGER,
    "behavioral_match_score" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "analysis_candidates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "analyses_userId_idx" ON "api"."analyses"("userId");

-- CreateIndex
CREATE INDEX "analysis_candidates_analysisId_candidateId_idx" ON "api"."analysis_candidates"("analysisId", "candidateId");

-- AddForeignKey
ALTER TABLE "api"."analyses" ADD CONSTRAINT "analyses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "api"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api"."analysis_candidates" ADD CONSTRAINT "analysis_candidates_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "api"."analyses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api"."analysis_candidates" ADD CONSTRAINT "analysis_candidates_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "api"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
