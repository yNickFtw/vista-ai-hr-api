import { Injectable } from "@nestjs/common";
import { OpenAIService } from "src/core/services/ai-service/openai.service";
import { PrismaService } from "src/core/services/database/prisma.service";
import { VectorStoreService } from "src/core/services/vector-store/vector-store.service";
import { GenerateAIUserSummaryUseCase } from "./generate-ai-user-summary";

@Injectable()
export class GenerateAIUserSummaryToAllUseCase {
    constructor(private readonly generateAiUserSummaryUseCase: GenerateAIUserSummaryUseCase, private readonly prisma: PrismaService) { }

    public async execute() {
        const usersWithSummary = await this.prisma.userSummary.findMany();

        let usersWithoutSummaryIds = usersWithSummary.map(user => user.userId);

        const usersWithoutSummary = await this.prisma.user.findMany({
            where: {
                id: {
                    notIn: usersWithoutSummaryIds
                }
            }
        });

        let completedUsers: string[] = [];

        for (const user of usersWithoutSummary) {
            await this.generateAiUserSummaryUseCase.execute(user.id);
            console.log(`Resumo gerado com sucesso para o usuário ${user.id}`);
            console.log('Usuários completos:', completedUsers.length + '/' + usersWithoutSummary.length);
            completedUsers.push(user.id);
        }

        return {
            message: 'Resumo gerado com sucesso',
            completedUsers
        };
    }

}