import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from 'src/favorites/models/favorites.entity';
import { MarvelHero } from 'src/marvel-heros/models/marvel-heros.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [MarvelHero, Favorite],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
