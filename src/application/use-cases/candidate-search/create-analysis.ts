import { Injectable } from "@nestjs/common";
import { AnalysisStatus } from "@prisma/client";
import { AddAnalysisToQueue } from "src/core/messaging/producers/add-analysis-to-queue";
import { PrismaService } from "src/core/services/database/prisma.service";

@Injectable()
export class CreateAnalysisUseCase {
    constructor(
        private readonly prisma: PrismaService,
        private readonly addAnalysisToQueue: AddAnalysisToQueue
    ) { }

    public async execute(query: string, userId: string) {
        const analysis = await this.prisma.analysis.create({
            data: {
                query,
                userId,
                status: AnalysisStatus.PENDING
            }
        });

        await this.addAnalysisToQueue.execute({ analysisId: analysis.id });

        return { analysisId: analysis.id }
    }

}