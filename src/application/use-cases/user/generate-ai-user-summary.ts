import { Document } from "@langchain/core/documents";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ChatCompletionMessageParam } from "openai/resources";
import { OpenAIService } from "src/core/services/ai-service/openai.service";
import { PrismaService } from "src/core/services/database/prisma.service";
import { VectorStoreService } from "src/core/services/vector-store/vector-store.service";
import { PROMPTS } from "src/utils/prompts";

@Injectable()
export class GenerateAIUserSummaryUseCase {
    constructor(private readonly prisma: PrismaService, private readonly openai: OpenAIService, private readonly vectorStore: VectorStoreService) { }

    public async execute(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) throw new NotFoundException('Usuário não encontrado');

        // check if already has a summary
        const userSummary = await this.prisma.userSummary.findUnique({
            where: {
                userId
            }
        })

        if (userSummary) throw new BadRequestException('Usuário já possui um resumo');

        const experiences = await this.prisma.experience.findMany({
            where: {
                userId
            },
        });

        const skills = (await this.prisma.userSkill.findMany({
            where: {
                userId
            },
            include: {
                skill: true
            }
        })).map(skill => skill.skill);

        const userAreas = (await this.prisma.userArea.findMany({
            where: {
                userId
            },
            include: {
                area: true
            }
        })).map(area => area.area);

        const userData = JSON.stringify({
            name: user.name,
            experiences,
            skills: skills.map(skill => skill.name),
            userArea: userAreas.map(area => area.name)
        })

        const messages: ChatCompletionMessageParam[] = [
            {
                role: 'system',
                content: PROMPTS.GENERATE_USER_SUMMARY.replace('[USER_DATA]', userData)
            }
        ]

        const response = await this.openai.response({
            messages,
            model: 'gpt-4.1-mini'
        })

        const content = response.choices[0].message.content;

        const document = new Document({
            pageContent: content!,
            metadata: {
                userId,
                areaId: userAreas[0].id,
            },
            id: userId
        })

        await this.vectorStore.addDocuments([document]);

        await this.prisma.userSummary.create({
            data: {
                userId,
                content
            }
        })

        return {
            message: 'Resumo gerado com sucesso'
        };
    }
}