import { Controller, Get, Post, Delete, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { FavoritesService } from '../services/favorites.service';
import { Response } from 'express';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async addToFavorites(@Body('heroId') heroId: number, @Res() res: Response): Promise<void> {
    try {
      const favorite = await this.favoritesService.addToFavorites(heroId);
      res.status(HttpStatus.CREATED).json(favorite);
    } catch (error) {
      let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      let errorMessage = 'Internal server error';

      if (error.message === 'Invalid hero ID') {
        statusCode = HttpStatus.BAD_REQUEST;
        errorMessage = 'Invalid hero ID';
      } else if (error.message === 'Hero not found') {
        statusCode = HttpStatus.NOT_FOUND;
        errorMessage = 'Hero not found';
      } else if (error.message === 'Favorite already exists') {
        statusCode = HttpStatus.CONFLICT;
        errorMessage = 'Favorite already exists';
      }

      res.status(statusCode).json({ error: errorMessage });
    }
  }

  @Get()
  getAllFavorites() {
    try {
      return this.favoritesService.getFavorites();
    } catch (error) {
      throw new HttpException('Error fetching favorites', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete()
  async deleteAllFavorites() {
    try {
      await this.favoritesService.deleteAllFavorites();
      return 'All favorites deleted successfully';
    } catch (error) {
      throw new HttpException('Error deleting favorites', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
