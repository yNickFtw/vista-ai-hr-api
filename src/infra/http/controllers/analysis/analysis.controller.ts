import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { AnalysisApplicationService } from "src/application/services/analysis/analysis.application.service";
import { AuthGuardService } from "../../guards/auth-guard.service";
import { CurrentUser } from "../../decorators/current-user.decorator";

@Controller('v1/analysis')
@UseGuards(AuthGuardService)
export class AnalysisController {
    constructor(private readonly analysisApplicationService: AnalysisApplicationService) { }

    @Get('list-all')
    public async listAllAnalysis(@Query('page') page: string, @Query('limit') limit: string, @Query('userId') userId: string) {
        return this.analysisApplicationService.listAllAnalysis(userId, Number(page), Number(limit));
    }

    @Get('get-by-id/:id')
    public async getAnalysisById(@CurrentUser('sub') userId: string, @Param('id') id: string) {
        return this.analysisApplicationService.getAnalysisById(id, userId);
    }
}