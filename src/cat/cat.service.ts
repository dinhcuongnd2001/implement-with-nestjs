import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
@Injectable()
export class CatService {
  private readonly cats: any = [];

  constructor(private myLogger: LoggerService) {
    this.myLogger.setContext('CatService');
  }

  //   constructor() {}

  findAll(): any {
    // You can call all the default methods
    this.myLogger.warn('About to return cats!');
    return this.cats;
  }
}
