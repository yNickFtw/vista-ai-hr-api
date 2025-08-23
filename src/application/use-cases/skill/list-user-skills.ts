import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/services/database/prisma.service";

@Injectable()
export class ListUserSkillsUseCase {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    public async execute(userId: string) {
        const userSkills = await this.prisma.userSkill.findMany({
            where: {
                userId
            },
            include: {
                skill: true
            }
        });

        return userSkills.map((userSkill) => userSkill.skill);
    }
}