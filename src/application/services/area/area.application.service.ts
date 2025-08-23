import { Injectable } from "@nestjs/common";
import { SetUserAreaUseCase } from "src/application/use-cases/area/set-user-area";
import { ListAreasUseCase } from "src/application/use-cases/area/list-areas";
import { GetUserAreaUseCase } from "src/application/use-cases/area/get-user-area";

@Injectable()
export class AreaApplicationService {
    constructor(
        private readonly setUserAreaUseCase: SetUserAreaUseCase,
        private readonly listAreasUseCase: ListAreasUseCase,
        private readonly getUserAreaUseCase: GetUserAreaUseCase
    ) { }

    public async setUserArea(userId: string, areaId: string) {
        return await this.setUserAreaUseCase.execute(userId, areaId);
    }

    public async listAreas(page: number = 1, limit: number = 10, search?: string) {
        return await this.listAreasUseCase.execute(page, limit, search);
    }

    public async getUserArea(userId: string) {
        return await this.getUserAreaUseCase.execute(userId);
    }
}