import { Injectable } from "@nestjs/common";
import { OpenAIService } from "src/core/services/ai-service/openai.service";
import { PrismaService } from "src/core/services/database/prisma.service";
import { VectorStoreService } from "src/core/services/vector-store/vector-store.service";
import { PROMPTS } from "src/utils/prompts";

@Injectable()
export class HandleSearchUseCase {
    constructor(
        private readonly vectorStore: VectorStoreService,
        private readonly prisma: PrismaService,
        private readonly openai: OpenAIService
    ) { }

    public async execute(query: string) {
        const result = await this.vectorStore.search(query, 10);
        
        console.log(result);

        const users = (await this.prisma.user.findMany({
            where: {
                id: {
                    in: result.map(item => item.metadata.userId)
                }
            },
            include: {
                experiences: true,
                user_skills: {
                    include: {
                        skill: true
                    }
                },
                user_areas: {
                    include: {
                        area: true
                    }
                }
            }
        })).reverse();

        // rank candidates by user input
        const rankedCandidates = await this.openai.response({
            model: 'gpt-4.1',
            messages: [
                {
                    role: 'system',
                    content: PROMPTS.RANK_CANDIDATES_BY_USER_INPUT.replace('[CANDIDATES_PROFILES]', result.map((item) => item.pageContent).join('\n'))
                },
                {
                    role: 'user',
                    content: `**Critérios da busca:** ${query}`
                }
            ],
        })
        
        console.log(rankedCandidates.choices[0].message.content);

        return { textResult: rankedCandidates.choices[0].message.content, users };
    }

}