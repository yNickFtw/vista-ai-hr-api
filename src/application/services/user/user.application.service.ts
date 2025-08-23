import { Injectable } from "@nestjs/common";
import { GetMeUseCase } from "src/application/use-cases/user/get-me";
import { GenerateAIUserSummaryUseCase } from "src/application/use-cases/user/generate-ai-user-summary";
import { GenerateAIUserSummaryToAllUseCase } from "src/application/use-cases/user/generate-ai-user-summary-to-all";

@Injectable()
export class UserApplicationService {
    constructor(
        private readonly getMeUseCase: GetMeUseCase,
        private readonly generateAIUserSummaryUseCase: GenerateAIUserSummaryUseCase,
        private readonly generateAIUserSummaryToAllUseCase: GenerateAIUserSummaryToAllUseCase
    ) { }

    public async getMe(userId: string) {
        return await this.getMeUseCase.execute(userId);
    }

    public async generateAIUserSummary(userId: string) {
        return await this.generateAIUserSummaryUseCase.execute(userId);
    }

    public async generateAIUserSummaryToAll() {
        return await this.generateAIUserSummaryToAllUseCase.execute();
    }
}