import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { SkillApplicationService } from "src/application/services/skill/skill.application.service";
import { CurrentUser } from "../../decorators/current-user.decorator";
import { AuthGuardService } from "../../guards/auth-guard.service";

@Controller('v1/skills')
export class SkillController {
    constructor(
        private readonly skillApplicationService: SkillApplicationService
    ) { }

    @Get()
    public async listSkills(@Query('page') page: number = 1, @Query('limit') limit: number = 20, @Query('search') search?: string) {
        return await this.skillApplicationService.listSkills(Number(page), Number(limit), search);
    }

    @Get('user')
    @UseGuards(AuthGuardService)
    public async listUserSkills(@CurrentUser() user: any) {
        return await this.skillApplicationService.listUserSkills(user.sub);
    }

    @Post('user')
    @UseGuards(AuthGuardService)
    public async addSkillToUser(@CurrentUser() user: any, @Body() body: { skillId: string }) {
        return await this.skillApplicationService.addSkillToUser(user.sub, body.skillId);
    }

    @Delete('user/:skillId')
    @UseGuards(AuthGuardService)
    public async removeSkillFromUser(@CurrentUser() user: any, @Param('skillId') skillId: string) {
        return await this.skillApplicationService.removeSkillFromUser(user.sub, skillId);
    }   
}