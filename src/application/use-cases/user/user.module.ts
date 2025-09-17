import { Module } from "@nestjs/common";
import { GetMeUseCase } from "./get-me";
import { ServicesModule } from "src/core/services/services.module";
import { GenerateAIUserSummaryUseCase } from "./generate-ai-user-summary";
import { GenerateAIUserSummaryToAllUseCase } from "./generate-ai-user-summary-to-all";
import { PutUserSummaryInVectorStoreUseCase } from "./put-user-summary-in-vector-store";

@Module({
    imports: [
        ServicesModule
    ],
    providers: [
        GetMeUseCase,
        GenerateAIUserSummaryUseCase,
        GenerateAIUserSummaryToAllUseCase,
        PutUserSummaryInVectorStoreUseCase,
    ],
    exports: [
        GetMeUseCase,
        GenerateAIUserSummaryUseCase,
        GenerateAIUserSummaryToAllUseCase,
        PutUserSummaryInVectorStoreUseCase
    ]
})
export class UserModule { }