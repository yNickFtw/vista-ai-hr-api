import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/services/database/prisma.service";
import { PutUserSummaryInVectorStoreUseCase } from "./put-user-summary-in-vector-store";

@Injectable()
export class GenerateAIUserSummaryToAllUseCase {
    constructor(private readonly putUserSummaryInVectorStoreUseCase: PutUserSummaryInVectorStoreUseCase, private readonly prisma: PrismaService) { }

    public async execute() {
        const usersWithSummary = await this.prisma.userSummary.findMany();

        let usersWithoutSummaryIds = usersWithSummary.map(user => user.userId);

        const usersWithoutSummary = await this.prisma.user.findMany({
            where: {
                id: {
                    in: usersWithoutSummaryIds
                }
            }
        });

        let completedUsers: string[] = [];

        for (const user of usersWithoutSummary) {
            await this.putUserSummaryInVectorStoreUseCase.execute(user.id);
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