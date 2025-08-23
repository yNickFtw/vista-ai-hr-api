import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ExperienceApplicationService } from '../../../../application/services/experience/experience.application.service';
import { CreateExperienceDto } from '../../dtos/experience.dto';
import { AuthGuardService } from '../../guards/auth-guard.service';
import { CurrentUser } from '../../decorators/current-user.decorator';

@Controller('v1/experiences')
@UseGuards(AuthGuardService)
export class ExperienceController {
  constructor(private readonly experienceApplicationService: ExperienceApplicationService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() createExperienceDto: CreateExperienceDto,
    @CurrentUser() user: any,
  ) {
    return this.experienceApplicationService.createExperience(user.sub, createExperienceDto);
  }

  @Get('me')
  public async findLoggedUserExperiences(@CurrentUser() user: any) {
    return this.experienceApplicationService.findAllExperiences(user.sub);
  }

  @Get('by-user/:userId')
  public async findExperiencesByUserId(@Param('userId') userId: string) {
    return this.experienceApplicationService.findExperiencesByUserId(userId);
  }

}
