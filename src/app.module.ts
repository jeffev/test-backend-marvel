import { Module } from '@nestjs/common';
import { HerosModule } from './marvel-heros/marvel-heros.module'
import { FavoritesModule } from './favorites/favorite.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ DatabaseModule, HerosModule, FavoritesModule ],
})
export class AppModule {}
