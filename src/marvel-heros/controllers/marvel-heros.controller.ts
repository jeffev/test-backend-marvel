import { Controller, Get, Post, HttpException, HttpStatus, Query } from '@nestjs/common';
import { HerosService } from '../services/marvel-heros.service';

@Controller('heros')
export class HerosController {
  constructor(private readonly marvelService: HerosService) {}

  @Get('/heros-local')
  async getAllHerosLocal(@Query('name') name: string) {
    try {
      const response = await this.marvelService.getAllHerosLocal(name);
      return response;
    } catch (error) {
      throw new HttpException('Error fetching heroes', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/heros-marvel')
  async getAllHerosMarvel(@Query('name') name: string) {
    try {
      const response = await this.marvelService.findHerosMarvel(name);
      return response;
    } catch (error) {
      throw new HttpException('Error fetching heroes', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/save-heros')
  async saveHeros(@Query('name') name: string) {
    try {
      const createdHeroes = await this.marvelService.searchHeroesAndSave(name);
      return createdHeroes;
    } catch (error) {
      throw new HttpException('Error creating heroes', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
