import { Injectable } from "@nestjs/common";
import { CreateAnalysisUseCase } from "../../use-cases/candidate-search/create-analysis";

@Injectable()
export class CandidateSearchApplicationService {
    constructor(
        private readonly createAnalysisUseCase: CreateAnalysisUseCase
    ) { }

    public async execute(query: string, userId: string) {
        return await this.createAnalysisUseCase.execute(query, userId);
    }
}