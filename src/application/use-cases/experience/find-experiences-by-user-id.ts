import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/services/database/prisma.service";

@Injectable()
export class FindExperiencesByUserIdUseCase {
    constructor(private readonly prisma: PrismaService) {}

    public async execute(userId: string) {
        const experiences = await this.prisma.experience.findMany({
            where: { userId }
        })

        return experiences
    }
}