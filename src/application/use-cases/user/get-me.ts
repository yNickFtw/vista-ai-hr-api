import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/services/database/prisma.service";

@Injectable()
export class GetMeUseCase {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    public async execute(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                email: true,
                name: true,
                is_recruiter: true,
                experiences: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        startDate: true,
                        endDate: true,
                    },
                    orderBy: {
                        startDate: 'desc'
                    }
                },
                user_skills: {
                    select: {
                        id: true,
                        skill: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                            }
                        }
                    },
                },
                user_areas: {
                    select: {
                        id: true,
                        area: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                            }
                        }
                    }
                },
                user_summary: {
                    select: {
                        id: true
                    }
                }
            },
        });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return user;
    }
}