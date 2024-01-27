import {
  ConflictException,
  Injectable,
  NotFoundException,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { Cart } from './interface';
@Injectable()
export class CatService {
  private readonly cats: Cart[] = [
    { id: '1', name: 'abc' },
    { id: '2', name: 'bca' },
  ];

  constructor(private myLogger: LoggerService) {
    this.myLogger.setContext('CatService');
  }

  //   constructor() {}

  findAll(): Cart[] {
    // You can call all the default methods
    try {
      return this.cats;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  create(data: Cart): Cart {
    try {
      const currentCat = this.cats.find((x) => x.id === data.id);
      if (currentCat)
        throw new HttpException('Cart is exist', HttpStatus.CONFLICT);

      this.cats.push(data);
      return data;
    } catch (error) {
      throw new ConflictException(
        error.response || 'Server error',
        error.status || '500',
      );
    }
  }
}
