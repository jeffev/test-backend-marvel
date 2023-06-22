import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Md5 } from 'ts-md5/dist/md5';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarvelHero } from '../models/marvel-heros.entity';
import * as dotenv from 'dotenv';

@Injectable()
export class HerosService {
  private readonly baseUrl: string;
  private readonly publicKey: string;
  private readonly privateKey: string;

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(MarvelHero)
    private marvelHerosRepository: Repository<MarvelHero>
    ) {
      dotenv.config();
      
      this.baseUrl = 'https://gateway.marvel.com/v1/public';
      this.publicKey = process.env.PUBLIC_KEY;
      this.privateKey = process.env.PRIVATE_KEY;
  }

  async getMarvelDataByName(name: string) {
    const timestamp = Number(new Date());

    const response = await this.httpService.get(`${this.baseUrl}/characters`, {
      params: {
        nameStartsWith: name,
        ts: timestamp,
        apikey: this.publicKey,
        hash:Md5.hashStr(timestamp + this.privateKey + this.publicKey)
      },
    }).toPromise();
  
    return response.data;
  }

  async getMarvelDataById(id: number): Promise<MarvelHero> {
    const timestamp = Number(new Date());
    const url = `${this.baseUrl}/characters/${id}`;

    try {
      const response = await this.httpService.get(url, {
        params: {
          ts: timestamp,
          apikey: this.publicKey,
          hash:Md5.hashStr(timestamp + this.privateKey + this.publicKey)
        },
      }).toPromise();
    
      const herosRaw = await response.data.data.results;
      const hero: MarvelHero = new MarvelHero();
      
      for (const heroRaw of herosRaw) {
        hero.id = heroRaw.id;
        hero.name = heroRaw.name;
      }

      return hero;
    } catch (error) {
      return null;
    }
  }

  async findOne(id: number): Promise<MarvelHero | null> {
    return await this.marvelHerosRepository.findOneBy({ id });
  }

  async isExist(id: number): Promise<boolean> {
    const hero = await this.findOne(id);
    return hero !== null;
  }

  async searchHeroesAndSave(name: string): Promise<MarvelHero[]> {
    const heros = await this.getMarvelDataByName(name);
    const createdHeroes: MarvelHero[] = [];

    for (const heroRaw of heros.data.results) {
      const exists = await this.isExist(heroRaw.id);

      if (!exists) {
        const hero: MarvelHero = new MarvelHero();
        
        hero.id = heroRaw.id;
        hero.name = heroRaw.name;

        this.marvelHerosRepository.save(hero);
        createdHeroes.push(hero);
      }
    }

    return createdHeroes;
  }

  async findHerosMarvel(name: string): Promise<MarvelHero[]> {
    const heros = await this.getMarvelDataByName(name);
    const heroes: MarvelHero[] = [];

    for (const heroRaw of heros.data.results) {
      const hero: MarvelHero = new MarvelHero();
      
      hero.id = heroRaw.id;
      hero.name = heroRaw.name;

      heroes.push(hero);
    }

    return heroes;
  }

  async save (hero: MarvelHero) {
    const exists = await this.isExist(hero.id);
    if (!exists) {
      this.marvelHerosRepository.save(hero);
    }
  }

  async getAllHerosLocal(name: string): Promise<MarvelHero[]> {
    if (name == null) {
        return await this.marvelHerosRepository.find();
    } else {
      return await this.marvelHerosRepository
        .createQueryBuilder('marvel_hero')
        .where('marvel_hero.name LIKE :name', { name: `%${name}%` })
        .getMany();
    }
    
  }
}
