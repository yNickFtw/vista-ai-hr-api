import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ExperienceModule } from "./experience/experience.module";
import { SkillModule } from "./skill/skill.module";
import { UserModule } from "./user/user.module";
import { AreaModule } from "./area/area.module";
import { CandidateSearchModule } from "./candidate-search/candidate-search.module";

@Module({
    imports: [AuthModule, ExperienceModule, UserModule, SkillModule, AreaModule, CandidateSearchModule],
    exports: [AuthModule, ExperienceModule, UserModule, SkillModule, AreaModule, CandidateSearchModule],
})
export class UseCasesModule {}
