import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { LoggerModule } from 'src/logger/logger.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CatService],
  controllers: [CatController],
  imports: [LoggerModule],
})
export class CatModule {}
