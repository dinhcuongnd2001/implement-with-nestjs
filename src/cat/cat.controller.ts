import { LoggerService } from 'src/logger/logger.service';
import { CatService } from './cat.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCatDto } from './dto';

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

  @Post()
  create(@Body() createCatDto: CreateCatDto): any {
    console.log('createCatDto :', createCatDto);
    this.myLogger.log('APi /cat => create', 'CatController');
    this.myLogger.warn('APi /cat => create', 'CatController');
    return 'Create Cat';
  }
}
