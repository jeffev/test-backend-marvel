import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HerosService } from './services/marvel-heros.service';
import { HerosController } from './controllers/marvel-heros.controller';
import { MarvelHero } from './models/marvel-heros.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ HttpModule, TypeOrmModule.forFeature([MarvelHero]) ],
  controllers: [HerosController],
  providers: [HerosService],
  exports: [HerosService],
})
export class HerosModule {}
