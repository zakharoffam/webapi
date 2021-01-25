import { Module } from '@nestjs/common';
import { PmService } from './pm.service';
import { PmController } from './pm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([], 'znodePg'),
  ],
  providers: [PmService],
  controllers: [PmController]
})
export class PmModule {}
