import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthApplicationService } from "src/application/services/auth/auth.application.service";
import { AuthGuardService } from "../../guards/auth-guard.service";
import { Public } from "../../decorators/public.decorator";
import { CurrentUser } from "../../decorators/current-user.decorator";

@Controller('v1/auth')
@UseGuards(AuthGuardService)
export class AuthController {

    constructor(private readonly authApplicationService: AuthApplicationService) { }

    @Public()
    @Post('register')
    public async register(@Body() body: any) {
        return await this.authApplicationService.register(body);
    }

    @Public()
    @Post('login')
    public async login(@Body() body: any) {
        return await this.authApplicationService.login(body);
    }

    @Get('me')
    public async me(@CurrentUser() user: any) {
        return user;
    }
}