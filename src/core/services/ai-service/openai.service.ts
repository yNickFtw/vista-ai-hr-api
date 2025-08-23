import OpenAI from "openai";
import { Injectable } from "@nestjs/common";
import { ChatCompletionMessageParam, ChatCompletionTool, ChatModel } from "openai/resources";

@Injectable()
export class OpenAIService {
    private client: OpenAI;
    
    constructor() {
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
    }

    public async response({ messages, model, tools }: { messages: ChatCompletionMessageParam[], model: ChatModel; tools?: ChatCompletionTool[] }) {
        const response = await this.client.chat.completions.create({
            model,
            messages,
            temperature: 0.5,
            tools: tools,
            tool_choice: tools ? 'auto' : undefined
        });

        return response;
    }
}