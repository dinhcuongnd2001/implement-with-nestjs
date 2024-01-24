import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { CatModule } from './cat/cat.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './services/http-exception.filter';

@Module({
  imports: [LoggerModule, CatModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
