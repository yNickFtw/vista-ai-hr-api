import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/services/database/prisma.service";

@Injectable()
export class GetUserAreaUseCase {
    constructor(private readonly prisma: PrismaService) { }

    public async execute(userId: string) {
        const userArea = await this.prisma.userArea.findFirst({
            where: {
                userId
            },
            include: {
                area: true
            }
        })

        if (!userArea) return null;

        return userArea.area;
    }
}