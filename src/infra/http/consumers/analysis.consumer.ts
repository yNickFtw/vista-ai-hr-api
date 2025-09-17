import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { HandleSearchUseCase } from "src/application/use-cases/candidate-search/handle-search";

@Controller()
export class AnalysisConsumer {
    constructor(
        private readonly handleSearchUseCase: HandleSearchUseCase
    ) { }

    @EventPattern('analysis_queue')
    public async handleAnalysisQueue(@Payload() data: { analysisId: string; }, @Ctx() context: RmqContext) {
        try {
            await this.handleSearchUseCase.execute(data.analysisId);

        } catch (error) {
            console.log('[ANALYSIS CONSUMER] Error on handle analysis queue', error);
        }
    }
}