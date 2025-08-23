import { Module } from "@nestjs/common";
import { ServicesModule } from "src/core/services/services.module";
import { HandleSearchUseCase } from "./handle-search";

@Module({
    imports: [ServicesModule],
    providers: [HandleSearchUseCase],
    exports: [HandleSearchUseCase]
})
export class CandidateSearchModule { }