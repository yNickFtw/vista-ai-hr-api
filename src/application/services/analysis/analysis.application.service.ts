import { Injectable } from "@nestjs/common";
import { ListAllAnalysisUseCase } from "src/application/use-cases/analysis/list-all-analysis";
import { GetAnalysisByIdUseCase } from "src/application/use-cases/analysis/get-analysis-by-id";

@Injectable()
export class AnalysisApplicationService {
    constructor(private readonly listAllAnalysisUseCase: ListAllAnalysisUseCase, private readonly getAnalysisByIdUseCase: GetAnalysisByIdUseCase) { }

    public async listAllAnalysis(userId: string, page: number, limit: number) {
        return this.listAllAnalysisUseCase.execute(userId, page, limit);
    }

    public async getAnalysisById(id: string, userId: string) {
        return this.getAnalysisByIdUseCase.execute(id, userId);
    }
}