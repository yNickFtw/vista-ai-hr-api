import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AreaApplicationService } from "src/application/services/area/area.application.service";
import { CurrentUser } from "../../decorators/current-user.decorator";
import { AuthGuardService } from "../../guards/auth-guard.service";

@Controller('v1/areas')
export class AreaController {
    constructor(private readonly areaApplicationService: AreaApplicationService) { }

    @Get()
    public async listAreas(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('search') search?: string) {
        return await this.areaApplicationService.listAreas(Number(page), Number(limit), search);
    }

    @Get('user')
    @UseGuards(AuthGuardService)
    public async getUserArea(@CurrentUser() user: any) {
        return await this.areaApplicationService.getUserArea(user.sub);
    }

    @Post('user')
    @UseGuards(AuthGuardService)
    public async setUserArea(@CurrentUser() user: any, @Body('areaId') areaId: string) {
        return await this.areaApplicationService.setUserArea(user.sub, areaId);
    }
}