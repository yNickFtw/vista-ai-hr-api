import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CandidateSearchApplicationService } from "src/application/services/candidate-search/candidate-search.application.service";
import { AuthGuardService } from "../../guards/auth-guard.service";
import { CurrentUser } from "../../decorators/current-user.decorator";

@Controller('v1/candidates-search')
@UseGuards(AuthGuardService)
export class CandidatesSearchController {
    constructor(
        private readonly candidateSearchApplicationService: CandidateSearchApplicationService
    ) { }

    @Post()
    public async search(@Body('query') query: string, @CurrentUser('sub') userId: string) {
        return await this.candidateSearchApplicationService.execute(query, userId);
    }
}