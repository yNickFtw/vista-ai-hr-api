import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/services/database/prisma.service";

@Injectable()
export class ListAllAnalysisUseCase {
    constructor(private readonly prisma: PrismaService) { }

    public async execute(userId: string, page: number, limit: number) {
        const analysis = await this.prisma.analysis.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip: (page - 1) * limit,
            take: limit
        })

        const total = await this.prisma.analysis.count({
            where: {
                userId: userId
            }
        })

        return {
            data: analysis,
            total,
            page,
            limit
        }
    }
}