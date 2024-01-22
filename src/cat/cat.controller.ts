import { LoggerService } from 'src/logger/logger.service';
import { CatService } from './cat.service';
import { Controller, Get } from '@nestjs/common';

@Controller('cat')
export class CatController {
  constructor(
    private readonly catService: CatService,
    private myLogger: LoggerService,
  ) {}

  @Get()
  findAll(): any {
    this.myLogger.log('Api: /cat => get all', 'CatController');
    return this.catService.findAll();
  }
}
