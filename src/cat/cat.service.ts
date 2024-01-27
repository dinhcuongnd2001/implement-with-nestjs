import {
  ConflictException,
  Injectable,
  NotFoundException,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { Cat } from './interface';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class CatService {
  constructor(
    private myLogger: LoggerService,
    private prisma: PrismaService,
  ) {
    this.myLogger.setContext('CatService');
  }

  async findAll() {
    // You can call all the default methods
    try {
      return await this.prisma.cat.findMany();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async create(data: Cat) {
    try {
      const currentCat = await this.prisma.cat.findFirst({
        where: {
          name: data.name,
        },
      });
      if (currentCat) {
        throw new HttpException('Cart is exist', HttpStatus.CONFLICT);
      }
      return await this.prisma.cat.create({
        data,
      });
    } catch (error) {
      console.log('error :', error);
      throw new ConflictException(
        error.response || 'Server error',
        error.status || '500',
      );
    }
  }
}
