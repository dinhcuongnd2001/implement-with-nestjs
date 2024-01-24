import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
@Injectable()
export class CatService {
  private readonly cats: any[] = [];

  constructor(private myLogger: LoggerService) {
    this.myLogger.setContext('CatService');
  }

  //   constructor() {}

  findAll(): any {
    // You can call all the default methods
    throw new NotFoundException();

    return this.cats;
  }

  create(): any {
    try {
      // const currentCat = this.cats.find(x => x.id === );
    } catch (error) {}
  }
}
