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
  
@Module({
  imports: [ServicesModule, ApplicationServicesModule],
  controllers: [AuthController, ExperienceController, UserController, SkillController, AreaController, CandidatesSearchController, AnalysisController],
  providers: [AuthGuardService],
})
export class HttpModule {}