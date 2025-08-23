import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/services/database/prisma.service";

@Injectable()
export class SetUserAreaUseCase {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    public async execute(userId: string, areaId: string) {
        const userArea = await this.prisma.userArea.findFirst({
            where: {
                userId
            }
        });

        if (userArea) throw new BadRequestException('Usuário já possui uma área');

        const area = await this.prisma.area.findUnique({
            where: {
                id: areaId
            }
        })

        if (!area) throw new NotFoundException('Área não encontrada');

        await this.prisma.userArea.create({
            data: {
                userId,
                areaId
            }
        })

        return {
            message: 'Área definida com sucesso'
        }
    }
}