import { Injectable } from "@nestjs/common";
import { RegisterUserUseCase } from "src/application/use-cases/auth/register-user";
import { LoginUserUseCase } from "src/application/use-cases/auth/login-user";


@Injectable()
export class AuthApplicationService {
    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly loginUserUseCase: LoginUserUseCase
    ) { }

    public async register(body: any) {
        return await this.registerUserUseCase.execute(body);
    }

    public async login(body: any) {
        return await this.loginUserUseCase.execute(body);
    }

}