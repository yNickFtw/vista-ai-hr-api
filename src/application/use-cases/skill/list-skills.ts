import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/core/services/database/prisma.service";

@Injectable()
export class ListSkillsUseCase {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    public async execute(page: number = 1, limit: number = 20, search?: string) {
        
        let where: Prisma.SkillWhereInput = {}
        
        if (search) {
            where.name = {
                contains: search,
                mode: 'insensitive'
            }
        }
        
        const skills = await this.prisma.skill.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where
        });

        const total = await this.prisma.skill.count({
            where
        })

        return {
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            skills,
            total
        }
    }

}