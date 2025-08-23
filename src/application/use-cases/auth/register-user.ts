import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/services/database/prisma.service";
import { BcryptService } from "src/core/services/bcryptjs/bcrypt.service";
import { JwtService } from "src/core/services/jwt/jwt.service";

@Injectable()
export class RegisterUserUseCase {
    constructor(
        private readonly prisma: PrismaService,
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService
    ) { }

    public async execute(body: any) {
        if (!body.email || !body.password || !body.name) {
            throw new BadRequestException('Todos os campos são obrigatórios');
        }

        const userAlreadyExists = await this.prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        if (userAlreadyExists) {
            throw new ConflictException('Usuário já existe');
        }

        const hashedPassword = await this.bcryptService.hashPassword(body.password);

        const user = await this.prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                name: body.name
            }
        });

        const accessToken = this.jwtService.generateToken({
            sub: user.id,
            email: user.email,
            name: user.name
        });

        return { accessToken };
    }

}