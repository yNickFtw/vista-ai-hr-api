import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AddAnalysisToQueue {
    constructor(
        @Inject('ANALYSIS_SERVICE') private readonly client: ClientProxy
    ) { }

    public async execute(data: { analysisId: string; }) {
        this.client.emit('analysis_queue', data);
    }
}