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
import { HttpExceptionFilter } from 'src/common/http-exception.filter';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  async findAll() {
    return await this.catService.findAll();
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return await this.catService.create(createCatDto);
  }
}
