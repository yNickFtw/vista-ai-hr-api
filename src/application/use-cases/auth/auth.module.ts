import { Module } from "@nestjs/common";
import { RegisterUserUseCase } from "./register-user";
import { ServicesModule } from "src/core/services/services.module";
import { LoginUserUseCase } from "./login-user";

@Module({
    imports: [ServicesModule],
    providers: [RegisterUserUseCase, LoginUserUseCase],
    exports: [RegisterUserUseCase, LoginUserUseCase],
})
export class AuthModule {}