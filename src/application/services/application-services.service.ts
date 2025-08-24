import { Module } from "@nestjs/common";
import { AuthApplicationService } from "./auth/auth.application.service";
import { ServicesModule } from "src/core/services/services.module";
import { UseCasesModule } from "../use-cases/use-cases.module";
import { ExperienceApplicationService } from "./experience/experience.application.service";
import { UserApplicationService } from "./user/user.application.service";
import { SkillApplicationService } from "./skill/skill.application.service";
import { AreaApplicationService } from "./area/area.application.service";
import { CandidateSearchApplicationService } from "./candidate-search/candidate-search.application.service";
import { AnalysisApplicationService } from "./analysis/analysis.application.service";

@Module({
    imports: [ServicesModule, UseCasesModule],
    providers: [AuthApplicationService, ExperienceApplicationService, UserApplicationService, SkillApplicationService, AreaApplicationService, CandidateSearchApplicationService, AnalysisApplicationService],
    exports: [AuthApplicationService, ExperienceApplicationService, UserApplicationService, SkillApplicationService, AreaApplicationService, CandidateSearchApplicationService, AnalysisApplicationService],
})
export class ApplicationServicesModule {}