import { Module } from "@nestjs/common";
import { JwtService } from "./jwt/jwt.service";
import { PrismaService } from "./database/prisma.service";
import { BcryptService } from "./bcryptjs/bcrypt.service";
import { OpenAIService } from "./ai-service/openai.service";
import { VectorStoreService } from "./vector-store/vector-store.service";

@Module({
  providers: [PrismaService, JwtService, BcryptService, OpenAIService, VectorStoreService],
  exports: [PrismaService, JwtService, BcryptService, OpenAIService, VectorStoreService],
})
export class ServicesModule {}
