import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../core/services/database/prisma.service';
import { CreateExperienceDto, UpdateExperienceDto } from '../../../infra/http/dtos/experience.dto';
import { CreateExperienceUseCase } from 'src/application/use-cases/experience/create-experience';
import { FindExperiencesByUserIdUseCase } from 'src/application/use-cases/experience/find-experiences-by-user-id';

@Injectable()
export class ExperienceApplicationService {
  constructor(
    private readonly createExperienceUseCase: CreateExperienceUseCase,
    private readonly findExperiencesByUserIdUseCase: FindExperiencesByUserIdUseCase
  ) {}

  public async createExperience(userId: string, createExperienceDto: CreateExperienceDto) {
    return await this.createExperienceUseCase.execute(userId, createExperienceDto)
  }

  public async findAllExperiences(userId: string) {
    return await this.findExperiencesByUserIdUseCase.execute(userId)
  }

  public async findExperiencesByUserId(userId: string) {
    return await this.findExperiencesByUserIdUseCase.execute(userId)
  }

}
