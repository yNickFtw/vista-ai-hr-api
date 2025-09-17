import { Module } from "@nestjs/common";
import { ServicesModule } from "src/core/services/services.module";
import { ApplicationServicesModule } from "src/application/services/application-services.service";
import { AuthController } from "./controllers/auth/auth.controller";
import { ExperienceController } from "./controllers/experience/experience.controller";
import { AuthGuardService } from "./guards/auth-guard.service";
import { UserController } from "./controllers/user/user.controller";
import { SkillController } from "./controllers/skill/skill.controller";
import { AreaController } from "./controllers/area/area.controller";
import { CandidatesSearchController } from "./controllers/candidates-search/candidates-search.controller";
import { AnalysisController } from "./controllers/analysis/analysis.controller";
import { AnalysisConsumer } from "./consumers/analysis.consumer";
import { HandleSearchUseCase } from "src/application/use-cases/candidate-search/handle-search";
  
@Module({
  imports: [ServicesModule, ApplicationServicesModule],
  controllers: [AuthController, ExperienceController, UserController, SkillController, AreaController, CandidatesSearchController, AnalysisController, AnalysisConsumer],
  providers: [AuthGuardService, HandleSearchUseCase],
})
export class HttpModule {}