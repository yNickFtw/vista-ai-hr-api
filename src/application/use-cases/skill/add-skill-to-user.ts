import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/services/database/prisma.service";

@Injectable()
export class AddSkillToUserUseCase {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    public async execute(userId: string, skillId: string) {
        const userSkillsCount = await this.prisma.userSkill.count({
            where: {
                userId
            }
        })
        
        if (userSkillsCount >= 10) {
            throw new BadRequestException('Usuário já possui o máximo de competências (10)');
        }

        const userAlreadyHasSkill = await this.prisma.userSkill.findFirst({
            where: {
                userId,
                skillId
            }
        })
        
        if (userAlreadyHasSkill) {
            throw new BadRequestException('Usuário já possui essa competência');
        }

        const skill = await this.prisma.skill.findUnique({
            where: {
                id: skillId
            }
        })

        if (!skill) {
            throw new NotFoundException('Competência não encontrada');
        }

        const userSkill = await this.prisma.userSkill.create({
            data: {
                userId,
                skillId
            }
        })

        return userSkill;
    }
}