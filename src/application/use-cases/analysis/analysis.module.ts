import { Module } from "@nestjs/common";
import { ListAllAnalysisUseCase } from "./list-all-analysis";
import { ServicesModule } from "src/core/services/services.module";
import { GetAnalysisByIdUseCase } from "./get-analysis-by-id";

@Module({
    imports: [ServicesModule],
    providers: [ListAllAnalysisUseCase, GetAnalysisByIdUseCase],
    exports: [ListAllAnalysisUseCase, GetAnalysisByIdUseCase]
})
export class AnalysisModule {}