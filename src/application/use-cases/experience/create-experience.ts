import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/services/database/prisma.service";
import { CreateExperienceDto } from "src/infra/http/dtos/experience.dto";

@Injectable()
export class CreateExperienceUseCase {
    constructor(private readonly prisma: PrismaService) {}

    public async execute(userId: string, createExperienceDto: CreateExperienceDto) {

        const experiencesCount = await this.prisma.experience.count({
            where: {
                userId: userId
            }
        })

        if (experiencesCount >= 15) {
            throw new BadRequestException({ type: 'MAX_EXPERIENCES_REACHED' })
        }

        const experience = await this.prisma.experience.create({
            data: {
                title: createExperienceDto.title,
                description: createExperienceDto.description,
                startDate: new Date(createExperienceDto.startDate),
                endDate: createExperienceDto.endDate ? new Date(createExperienceDto.endDate) : null,
                userId: userId
            }
        });

        return experience
    }
}