import { Injectable } from "@nestjs/common";

@Injectable()
export class AddAnalysisToQueue {
    constructor() { }

    public async execute(data: { analysisId: string; }) {
        
    }
}