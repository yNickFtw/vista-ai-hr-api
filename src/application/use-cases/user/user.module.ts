import { Module } from "@nestjs/common";
import { GetMeUseCase } from "./get-me";
import { ServicesModule } from "src/core/services/services.module";
import { GenerateAIUserSummaryUseCase } from "./generate-ai-user-summary";
import { GenerateAIUserSummaryToAllUseCase } from "./generate-ai-user-summary-to-all";

@Module({
    imports: [
        ServicesModule
    ],
    providers: [
        GetMeUseCase,
        GenerateAIUserSummaryUseCase,
        GenerateAIUserSummaryToAllUseCase
    ],
    exports: [
        GetMeUseCase,
        GenerateAIUserSummaryUseCase,
        GenerateAIUserSummaryToAllUseCase
    ]
})
export class UserModule { }