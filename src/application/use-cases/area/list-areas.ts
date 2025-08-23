import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/services/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ListAreasUseCase {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(page: number = 1, limit: number = 10, search?: string) {
    let where: Prisma.AreaWhereInput = {};

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const areas = await this.prisma.area.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await this.prisma.area.count({
      where,
    });

    return {
      areas,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
