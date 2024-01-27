import bcrypt from 'bcrypt';
import { LoggerService } from 'src/logger/logger.service';
import { CatService } from './cat.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CreateCatDto } from './dto';
import { NotFoundException } from 'src/common/exception';
import { HttpExceptionFilter } from 'src/services/http-exception.filter';

@Controller('cat')
export class CatController {
  constructor(
    private readonly catService: CatService,
    private myLogger: LoggerService,
  ) {}

  @Get()
  findAll() {
    return this.catService.findAll();
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }
}
