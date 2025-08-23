import { Injectable } from "@nestjs/common";
import { ListSkillsUseCase } from "src/application/use-cases/skill/list-skills";
import { ListUserSkillsUseCase } from "src/application/use-cases/skill/list-user-skills";
import { AddSkillToUserUseCase } from "src/application/use-cases/skill/add-skill-to-user";
import { RemoveSkillFromUserUseCase } from "src/application/use-cases/skill/remove-skill-from-user";


@Injectable()
export class SkillApplicationService {
    constructor(
        private readonly listSkillsUseCase: ListSkillsUseCase,
        private readonly listUserSkillsUseCase: ListUserSkillsUseCase,
        private readonly addSkillToUserUseCase: AddSkillToUserUseCase,
        private readonly removeSkillFromUserUseCase: RemoveSkillFromUserUseCase
    ) { }

    public async listSkills(page: number = 1, limit: number = 20, search?: string) {
        return await this.listSkillsUseCase.execute(page, limit, search);
    }

    public async listUserSkills(userId: string) {
        return await this.listUserSkillsUseCase.execute(userId);
    }

    public async addSkillToUser(userId: string, skillId: string) {
        return await this.addSkillToUserUseCase.execute(userId, skillId);
    }

    public async removeSkillFromUser(userId: string, skillId: string) {
        return await this.removeSkillFromUserUseCase.execute(userId, skillId);
    }
}