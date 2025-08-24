import { Injectable } from "@nestjs/common";
import { AnalysisStatus } from "@prisma/client";
import { OpenAIService } from "src/core/services/ai-service/openai.service";
import { PrismaService } from "src/core/services/database/prisma.service";
import { VectorStoreService } from "src/core/services/vector-store/vector-store.service";
import { PROMPTS } from "src/utils/prompts";
import tools from "src/utils/tools";

@Injectable()
export class HandleSearchUseCase {
    constructor(
        private readonly vectorStore: VectorStoreService,
        private readonly prisma: PrismaService,
        private readonly openai: OpenAIService
    ) { }

    public async execute(query: string, userId: string) {
        const analysis = await this.prisma.analysis.create({
            data: {
                userId,
                status: AnalysisStatus.PENDING,
                query: query
            }
        });

        const result = await this.vectorStore.search(query, 6);

        const candidatesIds = result.map((item) => item.metadata.userId);

        const candidates = await this.prisma.user.findMany({
            where: {
                id: {
                    in: candidatesIds
                }
            }
        })

        const candidatesProfile = candidates.map((candidate) => {
            return `
            **ID:** ${candidate.id}
            **Nome:** ${candidate.name}
            **Profile** ${result.find((item) => item.metadata.userId === candidate.id)?.pageContent}
            `
        })

        const rankedCandidates = await this.openai.response({
            model: 'gpt-4.1',
            messages: [
                {
                    role: 'system',
                    content: PROMPTS.RANK_CANDIDATES_V2.replace('[SEARCH_CRITERIA]', query).replace('[CANDIDATES_PROFILE]', candidatesProfile.join('\n'))
                },
                {
                    role: 'user',
                    content: `**Critérios da busca:** ${query}`
                }
            ],
            tools: tools.candidate_analysis_tools
        })

        const toolsCalls = rankedCandidates.choices[0].message.tool_calls;

        if (toolsCalls) {
            for (const toolCall of toolsCalls) {
                await this.register_candidate_analysis(toolCall, analysis.id);
            }
        }

        await this.prisma.analysis.update({
            where: { id: analysis.id },
            data: { status: AnalysisStatus.COMPLETED }
        });

        const users = await this.prisma.analysisCandidate.findMany({
            where: {
                analysisId: analysis.id
            },
            include: {
                candidate: {
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
                        },
                    }
                },
            }
        });

        return { analysis: { id: analysis.id }, users };
    }

    private async register_candidate_analysis(toolCall: any, analysisId: string) {
        const { candidate_id, analysis_summary, score, technical_match_score, business_fit_score, behavioral_match_score } = JSON.parse(toolCall.function.arguments);
        
        await this.prisma.analysisCandidate.create({
            data: {
                analysisId,
                candidateId: candidate_id,
                analysis_summary,
                score,
                technical_match_score,
                business_fit_score,
                behavioral_match_score
            }
        });
    }

}