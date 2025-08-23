import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/core/services/database/prisma.service";
import { BcryptService } from "src/core/services/bcryptjs/bcrypt.service";
import { JwtService } from "src/core/services/jwt/jwt.service";

@Injectable()
export class LoginUserUseCase {
    constructor(
        private readonly prisma: PrismaService,
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService
    ) { }

    public async execute(body: any) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        const isPasswordValid = await this.bcryptService.comparePassword(body.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Senha inválida');
        }

        const accessToken = this.jwtService.generateToken({
            sub: user.id,
            email: user.email,
            name: user.name
        });

        return { accessToken };
    }
}