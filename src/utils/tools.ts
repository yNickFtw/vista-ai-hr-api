import { ChatCompletionTool } from "openai/resources";

export default {
    candidate_analysis_tools: [
        {
            type: 'function',
            function: {
                name: 'register_candidate_analysis',
                description: 'Registra uma análise de candidato no banco de dados',
                parameters: {
                    type: 'object',
                    properties: {
                        candidate_id: {
                            type: 'string',
                            description: 'ID do candidato que foi analisado'
                        },
                        analysis_summary: {
                            type: 'string',
                            description: 'Análise do candidato em formato de texto'
                        },
                        score: {
                            type: 'number',
                            description: 'Pontuação do candidato de 0 a 100 de acordo com a análise'
                        },
                        technical_match_score: {
                            type: 'number',
                            description: 'Pontuação técnica do candidato de 0 a 40 de acordo com a análise'
                        },
                        business_fit_score: {
                            type: 'number',
                            description: 'Pontuação de fit empresarial do candidato de 0 a 20 de acordo com a análise'
                        },
                        behavioral_match_score: {
                            type: 'number',
                            description: 'Pontuação de comportamental do candidato de 0 a 10 de acordo com a análise'
                        }
                    },
                    additionalProperties: false,
                    required: ['candidate_id', 'analysis_summary', 'score', 'technical_match_score', 'business_fit_score', 'behavioral_match_score']
                },
                strict: true
            }
        }
    ] as ChatCompletionTool[]
}