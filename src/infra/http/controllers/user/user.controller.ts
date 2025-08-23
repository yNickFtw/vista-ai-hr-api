import { Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { UserApplicationService } from "src/application/services/user/user.application.service";
import { AuthGuardService } from "../../guards/auth-guard.service";
import { CurrentUser } from "../../decorators/current-user.decorator";
import { Public } from "../../decorators/public.decorator";
import { Response } from "express";

@Controller('v1/users')
@UseGuards(AuthGuardService)
export class UserController {
    constructor(
        private readonly userApplicationService: UserApplicationService
    ) { }

    @Get('me')
    public async getMe(@CurrentUser() user: any) {
        return this.userApplicationService.getMe(user.sub);
    }

    @Post('summary/request')
    public async generateAIUserSummary(@CurrentUser() user: any) {
        return this.userApplicationService.generateAIUserSummary(user.sub);
    }

    @Public()
    @Post('summary/to-all')
    public async generateAIUserSummaryToAll(@Res() res: Response) {
        res.status(200).json({ message: 'Iniciando geração de resumos para todos os usuários...' });
        
        await this.userApplicationService.generateAIUserSummaryToAll();
    }
}