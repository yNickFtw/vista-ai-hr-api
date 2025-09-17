import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/services/database/prisma.service";

@Injectable()
export class GetAnalysisByIdUseCase {
    constructor(private readonly prisma: PrismaService) { }

    public async execute(id: string, userId: string) {
        const analysis = await this.prisma.analysis.findUnique({
            where: {
                id: id,
                userId: userId
            }
        })

        if (!analysis) throw new NotFoundException('Analysis not found');

        const users = await this.prisma.analysisCandidate.findMany({
            where: {
                analysisId: analysis.id
            },
            include: {
                candidate: {
                    include: {
                        experiences: true,
                        user_skills: {
                            include: {
                                skill: true
                            }
                        },
                        user_areas: {
                            include: {
                                area: true
                            }
                        },
                    }
                },
            }
        });

        users.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

        return { analysis, users };
    }
}