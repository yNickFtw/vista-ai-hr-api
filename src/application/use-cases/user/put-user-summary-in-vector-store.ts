import { Document } from "@langchain/core/documents";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/services/database/prisma.service";
import { VectorStoreService } from "src/core/services/vector-store/vector-store.service";

@Injectable()
export class PutUserSummaryInVectorStoreUseCase {
    constructor(private readonly vectorStore: VectorStoreService, private readonly prisma: PrismaService) {}

    public async execute(userId: string) {
        const userSummary = await this.prisma.userSummary.findFirst({
            where: {
                userId
            }
        });

        const userArea = await this.prisma.userArea.findFirst({
            where: {
                userId
            }
        });

        const document = new Document({
            pageContent: userSummary?.content!,
            metadata: {
                userId,
                areaId: userArea?.areaId,
            },
            id: userId
        })

        await this.vectorStore.addDocuments([document]);
    }
}