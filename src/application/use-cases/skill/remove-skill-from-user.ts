import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/services/database/prisma.service";

@Injectable()
export class RemoveSkillFromUserUseCase {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    public async execute(userId: string, skillId: string) {
        const userSkill = await this.prisma.userSkill.findFirst({
            where: {
                userId,
                skillId
            }
        })

        if (!userSkill) {
            throw new NotFoundException('Competência não encontrada');
        }

        await this.prisma.userSkill.delete({
            where: {
                id: userSkill.id
            }
        })

        return {
            message: 'Competência removida com sucesso'
        };
    }
}