import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodifController } from './codif.controller';
import { CodifService } from './codif.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([], 'znodePg'),
  ],
  controllers: [CodifController],
  providers: [CodifService]
})
export class CodifModule {}
