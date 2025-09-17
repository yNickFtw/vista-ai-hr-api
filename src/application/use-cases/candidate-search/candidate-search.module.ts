import { Module } from "@nestjs/common";
import { ServicesModule } from "src/core/services/services.module";
import { HandleSearchUseCase } from "./handle-search";
import { CreateAnalysisUseCase } from "./create-analysis";
import { MessagingModule } from "src/core/messaging/messaging.module";

@Module({
    imports: [ServicesModule, MessagingModule],
    providers: [HandleSearchUseCase, CreateAnalysisUseCase],
    exports: [HandleSearchUseCase, CreateAnalysisUseCase]
})
export class CandidateSearchModule { }