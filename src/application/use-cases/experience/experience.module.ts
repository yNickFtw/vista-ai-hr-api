import { Module } from '@nestjs/common';
import { ServicesModule } from '../../../core/services/services.module';
import { CreateExperienceUseCase } from './create-experience';
import { FindExperiencesByUserIdUseCase } from './find-experiences-by-user-id';

@Module({
  imports: [ServicesModule],
  providers: [CreateExperienceUseCase, FindExperiencesByUserIdUseCase],
  exports: [CreateExperienceUseCase, FindExperiencesByUserIdUseCase],
})
export class ExperienceModule {}
