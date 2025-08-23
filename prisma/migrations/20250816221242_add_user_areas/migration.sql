-- CreateTable
CREATE TABLE "api"."user_areas" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "areaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_areas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_areas_userId_areaId_idx" ON "api"."user_areas"("userId", "areaId");

-- AddForeignKey
ALTER TABLE "api"."user_areas" ADD CONSTRAINT "user_areas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "api"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api"."user_areas" ADD CONSTRAINT "user_areas_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "api"."areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
