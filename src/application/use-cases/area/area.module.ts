import { Module } from "@nestjs/common";
import { ServicesModule } from "src/core/services/services.module";
import { SetUserAreaUseCase } from "./set-user-area";
import { ListAreasUseCase } from "./list-areas";
import { GetUserAreaUseCase } from "./get-user-area";

@Module({
    imports: [ServicesModule],
    providers: [SetUserAreaUseCase, ListAreasUseCase, GetUserAreaUseCase],
    exports: [SetUserAreaUseCase, ListAreasUseCase, GetUserAreaUseCase]
})
export class AreaModule { }