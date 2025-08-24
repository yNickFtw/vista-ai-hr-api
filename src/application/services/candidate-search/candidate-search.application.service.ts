import { Injectable } from "@nestjs/common";
import { HandleSearchUseCase } from "../../use-cases/candidate-search/handle-search";

@Injectable()
export class CandidateSearchApplicationService {
    constructor(
        private readonly handleSearchUseCase: HandleSearchUseCase
    ) { }

    public async execute(query: string, userId: string) {
        return await this.handleSearchUseCase.execute(query, userId);
    }
}