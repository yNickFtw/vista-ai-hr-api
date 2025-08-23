import { Module } from "@nestjs/common";
import { ServicesModule } from "src/core/services/services.module";
import { ListSkillsUseCase } from "./list-skills";
import { ListUserSkillsUseCase } from "./list-user-skills";
import { AddSkillToUserUseCase } from "./add-skill-to-user";
import { RemoveSkillFromUserUseCase } from "./remove-skill-from-user";

@Module({
    imports: [ServicesModule],
    providers: [ListSkillsUseCase, ListUserSkillsUseCase, AddSkillToUserUseCase, RemoveSkillFromUserUseCase],
    exports: [ListSkillsUseCase, ListUserSkillsUseCase, AddSkillToUserUseCase, RemoveSkillFromUserUseCase]
})
export class SkillModule { }