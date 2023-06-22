import { Module } from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { FavoritesController } from './controllers/favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './models/favorites.entity';
import { HerosModule } from 'src/marvel-heros/marvel-heros.module';

@Module({
  imports: [ TypeOrmModule.forFeature([Favorite]), HerosModule ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
