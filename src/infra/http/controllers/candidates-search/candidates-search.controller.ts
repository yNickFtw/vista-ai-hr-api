import { Body, Controller, Post } from "@nestjs/common";
import { CandidateSearchApplicationService } from "src/application/services/candidate-search/candidate-search.application.service";

@Controller('v1/candidates-search')
export class CandidatesSearchController {
    constructor(
        private readonly candidateSearchApplicationService: CandidateSearchApplicationService
    ) { }

    @Post()
    public async search(@Body('query') query: string) {
        return await this.candidateSearchApplicationService.execute(query);
    }
}