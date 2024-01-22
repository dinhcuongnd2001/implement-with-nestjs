import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  providers: [CatService],
  controllers: [CatController],
  imports: [LoggerModule],
})
export class CatModule {}
