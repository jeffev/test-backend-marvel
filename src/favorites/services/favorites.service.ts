import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from '../models/favorites.entity';
import { Repository } from 'typeorm';
import { HerosService } from 'src/marvel-heros/services/marvel-heros.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
    private readonly herosService: HerosService
  ) { }

  async findOne(heroId: number): Promise<Favorite | null> {
    return await this.favoritesRepository
        .createQueryBuilder('favorite')
        .where('favorite.hero_id = :heroId', { heroId })
        .getOne();
  }

  async isExist(heroId: number): Promise<boolean> {
    const hero = await this.findOne(heroId);
    return hero !== null;
  }

  async addToFavorites(heroId: number): Promise<Favorite> {
    if (heroId == null || heroId == 0) {
      throw new Error('Invalid hero ID');
    }

    const existsFavorite = await this.isExist(heroId);
    const favorite: Favorite = new Favorite();

    if (!existsFavorite) {
      const hero = await this.herosService.getMarvelDataById(heroId);
      if (hero !== null) {
        await this.herosService.save(hero);
        favorite.hero = hero;

        await this.favoritesRepository.save(favorite);

        return favorite;
      } else {
        throw new Error('Hero not found');
      }
    } else {
      throw new Error('Favorite already exists');
    }
  }

  getFavorites(): Promise<Favorite[]> {
    return this.favoritesRepository.find();
  }

  deleteAllFavorites() {
    return this.favoritesRepository.delete({});
  }
}
